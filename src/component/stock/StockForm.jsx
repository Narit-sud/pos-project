import { useContext, useEffect, useState } from "react";
import { emptyNewProcurementRecord } from "../../utils/emptyObject";
import StockFormItem from "./StockFormItem";
import SupplierSelect from "../utils/SupplierSelect";
import Popup from "../../layout/Popup";
import StockAddingItem from "./adding/StockAddingItem";
import { useLoaderData, useNavigate } from "react-router-dom";
import { StockContext } from "../../context/StockContext";
import { ProductContext } from "../../context/ProductContext";
import { validateStock } from "../../utils/validateStock";
import { nanoid } from "nanoid";
import formatDate from "../../utils/formatDate";
import recordService from "../../service/recordService";
import transactionService from "../../service/transactionService";
import adjustStock from "../../utils/adjustStock";

function StockForm() {
    // ===============================================================================
    const navigate = useNavigate();
    const loader = useLoaderData();

    const { loadStocks } = useContext(StockContext);
    const { loadProduct } = useContext(ProductContext);

    const [header, setHeader] = useState(emptyNewProcurementRecord);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [transaction, setTransaction] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const [selectMode, setSelectMode] = useState(false);
    // ===============================================================================

    const loadItems = async () => {
        ////load items list from stock movement
        const transaction = await transactionService.getSingleTransaction(
            loader.transactionId,
        );
        setTransaction(transaction);
        setItems(transaction.items);
        setHeader(loader);
        return transaction.items;
    };

    const handleInputChange = (e) => {
        const { name, id, value } = e.target;
        if (name === "header") {
            setHeader((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleItemChange = (e) => {
        //extracts
        const { name, id, value } = e.target;
        setItems((prev) =>
            prev.map((item) =>
                //is this the right item to edit?
                item.id === id
                    ? //yes, edit it
                      name === "qty"
                        ? //if editing quantity parseFloat value
                          { ...item, [name]: parseFloat(value) }
                        : //else set it normally
                          { ...item, [name]: value }
                    : //no, return it and don't touch it.
                      item,
            ),
        );
        //when everyrhing is done, update the total to display right now
        updateItemsTotal(id);
    };

    const updateItemsTotal = (id) => {
        //take id for target the right item in the items
        setItems((prev) =>
            prev.map((item) =>
                //check if this is the right place to edit?
                item.id === id
                    ? //if yes, edit it
                      { ...item, total: parseFloat(item.qty * item.cost) }
                    : //if no, return it to the nature
                      item,
            ),
        );
        //when item's total updated, update the grand total
    };

    const getSupplier = (supplier) => {
        setHeader((prev) => ({ ...prev, supplier }));
    };

    const handleAddButton = () => {
        setSelectMode(true);
    };

    const handleAddItem = (item) => {
        //extract only wanted keys from data received
        const { id, name, brand, category, cost } = item;
        //check if item existed?

        const itemExisted = items.find((item) => item.id === id);
        if (itemExisted) {
            alert(
                `${item.category} ${item.brand} ${item.name} is already added.`,
            );
            return;
        }
        const newItem = {
            id,
            name,
            brand,
            category,
            cost,
            qty: 1,
            total: parseFloat(cost),
        };
        //add it into the items
        setItems((prev) => [...prev, newItem]);
    };

    const handleRemoveItem = (itemId) => {
        if (editMode) {
            setItems((item) => item.filter((item) => item.id !== itemId));
        } else {
            return;
        }
    };

    const handleRemoveButton = async () => {
        const confirmRemove = confirm(
            "Are you sure to remove this stock record?",
        );
        if (confirmRemove) {
            //reverse stock agjusted
            const isTransactionReversed = await adjustStock.reverse(
                transaction.items,
            );

            //delete stock record
            const isRecordRemoved = await recordService.removeRecord(loader.id);

            //delete transaction
            const isThisRecordTransactionRemoved =
                await transactionService.removeTransaction(transaction.id);

            //check if completed
            if (
                isTransactionReversed &&
                isThisRecordTransactionRemoved &&
                isRecordRemoved
            ) {
                alert("Success!");
                loadStocks();
                loadProduct();
                navigate("/stock");
            } else {
                alert(
                    "Faile to remove this record an its transaction. Please try again.",
                );
            }
        }
    };

    const handleSaveButton = async () => {
        //generate ids
        const transactionId = nanoid(8);
        const recordId = nanoid(8);

        //thisRecord will have no id here
        let thisRecord = {
            ...header,
            total,
        };

        let thisTransaction = {
            ...transaction,
            timeStamp: formatDate.now(),
            items,
            type: "purchase",
        };
        //check if this is valid to send the data?
        const isRecordValid = validateStock(thisRecord, items);
        if (isRecordValid) {
            //if there is no loader which means it is going to create new one
            if (!loader) {
                //add id for transaction and record
                thisRecord = { ...thisRecord, id: recordId, transactionId };
                thisTransaction = {
                    ...thisTransaction,
                    id: transactionId,
                    recordId,
                };

                //create record
                const isRecordCreated =
                    await recordService.createNewRecord(thisRecord);

                //create transaction(items list)
                const isTransactionCreated =
                    await transactionService.createNewTransaction(
                        thisTransaction,
                    );

                //adjust stock accourding to the items in the list
                const isStockAdjusted = await adjustStock.adjust(items);

                //if everything works perfect
                if (
                    isRecordCreated &&
                    isStockAdjusted &&
                    isTransactionCreated
                ) {
                    alert("Success!");
                    loadProduct();
                    loadStocks();
                    navigate("/stock");
                }
                //if not
                else {
                    alert("Failed to create new record. Please try again.");
                }
            }
            //if there is loader which means it is going to update the existed data
            else {
                //send updated record
                const isRecordUpdated = await recordService.updateRecord(
                    thisRecord.id,
                    thisRecord,
                );

                //send updated transaction(items list)
                const isTransactionUpdated =
                    await transactionService.updateTransaction(
                        loader.transactionId,
                        thisTransaction,
                    );

                //reserse stock of items
                const isReversed = await adjustStock.reverse(transaction.items);
                if (isReversed) {
                    //adjust stock accourding to the items in the list
                    const isStockAdjusted = await adjustStock.adjust(items);

                    //if everything works perfect
                    if (
                        isRecordUpdated &&
                        isStockAdjusted &&
                        isTransactionUpdated
                    ) {
                        alert("Success!");
                        loadProduct();
                        loadStocks();
                        navigate("/stock");
                    }
                    //if not
                    else {
                        alert(
                            "Failed to update this record. Please try again.",
                        );
                    }
                }
            }
        }
    };

    const handleCancelButton = () => {
        //if there is loader
        if (loader) {
            //compare header
            const headerCompare1 = JSON.stringify(loader);
            const headerCompare2 = JSON.stringify(header);
            const isHeaderUpdated = headerCompare1 !== headerCompare2;

            //compare items
            const itemsCompare1 = JSON.stringify(transaction.items);
            const itemsCompare2 = JSON.stringify(items);
            const isItemsUpdated = itemsCompare1 !== itemsCompare2;

            //if header is updated or items is updated, ask for exit
            if (isHeaderUpdated || isItemsUpdated) {
                //if it is different, ask for the exit
                const confirmToExit = confirm(
                    "Confirm to exit and leave all the update?",
                );
                if (confirmToExit) {
                    navigate("/stock");
                }
            } else {
                //nothing change, exit without asking
                navigate("/stock");
            }
        }
        //if there is no loader
        else {
            //just get out
            navigate("/stock");
        }
    };

    const closePopup = () => {
        setSelectMode(false);
    };

    //only handle grandTotal at footer of the bill when items change
    useEffect(() => {
        const grandTotal = items.reduce((acc, item) => {
            return parseFloat(acc) + parseFloat(item.total);
        }, 0);
        setTotal(grandTotal);
    }, [items]);

    useEffect(() => {
        //if loader existed, load items if on, don't do anything
        if (loader) {
            loadItems();
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }, []);

    return (
        <div className="h-[92vh] overflow-y-auto bg-gray-100 p-2">
            <div id="header" className="rounded-lg border bg-white p-2">
                <div className="mb-1 flex flex-row justify-between px-8 md:grid md:grid-cols-4 md:place-items-center">
                    <span className="font-bold md:col-start-2">
                        Date record:{" "}
                    </span>
                    <input
                        type="date"
                        id="dateRecord"
                        name="header"
                        value={header.dateRecord}
                        onChange={handleInputChange}
                        className={`${editMode ? "" : "bg-gray-200"} rounded border-2 text-right md:col-start-3 md:w-full`}
                        readOnly
                    />
                </div>
                <div className="mb-1 flex flex-row justify-between px-8 md:grid md:grid-cols-4 md:place-items-center">
                    <span className="font-bold md:col-start-2">
                        Date order:{" "}
                    </span>
                    <input
                        type="date"
                        id="datePurchase"
                        name="header"
                        value={header.datePurchase}
                        max={header.dateRecord}
                        onChange={handleInputChange}
                        className={`${editMode ? "" : "bg-gray-200"} rounded border-2 text-center md:col-start-3 md:w-full ${header.datePurchase === "" ? "border-red-500" : ""}`}
                        readOnly={!editMode}
                    />
                </div>
                <div className="mb-1 flex flex-row justify-between px-8 md:grid md:grid-cols-4 md:place-items-center">
                    <span className="font-bold md:col-start-2">
                        Date received:{" "}
                    </span>
                    <input
                        type="date"
                        id="dateReceived"
                        name="header"
                        value={header.dateReceived}
                        min={header.datePurchase}
                        max={header.dateRecord}
                        onChange={handleInputChange}
                        className={`${editMode ? "" : "bg-gray-200"} rounded border-2 text-center md:col-start-3 md:w-full ${header.dateReceived === "" ? "border-red-500" : ""}`}
                        readOnly={!editMode}
                    />
                </div>
                <div className="mb-1 flex flex-row justify-between px-8 md:grid md:grid-cols-4 md:place-items-center">
                    <span className="font-bold md:col-start-2">Supplier: </span>
                    <SupplierSelect
                        value={header.supplier}
                        output={getSupplier}
                        editMode={editMode}
                        style={`${editMode ? "" : "bg-gray-300"} border-2 md:col-start-3 md:w-full rounded p-1 text-center max-sm:ml-1 ${header.supplier === "" ? "border-red-500" : ""}`}
                    />
                </div>
                <div className="m-2 flex flex-col items-center">
                    <button
                        type="button"
                        onClick={handleAddButton}
                        className={`${editMode ? "" : "hidden"} w-full rounded-lg border border-green-500 bg-green-500 py-2 text-white`}
                    >
                        Add product
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setEditMode(true);
                        }}
                        className={`${editMode ? "hidden" : ""} w-full rounded-lg border border-yellow-500 bg-yellow-500 py-2 text-white`}
                    >
                        Edit
                    </button>
                </div>
            </div>
            <div
                id="body"
                className={`${editMode ? "bg-white" : "bg-gray-200"} my-2 flex min-h-[35vh] w-full flex-col overflow-x-auto rounded-lg border p-1 lg:items-center`}
            >
                <div className="w-[800px]">
                    <div className="grid w-full grid-cols-7 place-items-center overflow-x-auto overflow-y-hidden border-b-2 border-b-gray-300 py-2 font-bold">
                        <span>Category</span>
                        <span>Brand</span>
                        <span>Name</span>
                        <span>Qty</span>
                        <span>Cost</span>
                        <span>Total</span>
                        <span>...</span>
                    </div>
                    <div className="grid w-full grid-flow-row overflow-y-auto overflow-x-hidden">
                        {items.map((item) => {
                            return (
                                <StockFormItem
                                    key={item.id}
                                    item={item}
                                    removeItem={handleRemoveItem}
                                    handleItemChange={handleItemChange}
                                    editMode={editMode}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <div id="footer" className="my-1 mb-2 rounded border bg-white p-2">
                <div className="grid grid-cols-2 place-items-center">
                    <span>Total item(s):</span>
                    <span>{items.length}</span>
                    <span className="font-bold">Grand total: </span>
                    <span className="font-bold">{total}</span>
                </div>
                <div className="my-2 flex flex-row justify-evenly">
                    <button
                        type="button"
                        onClick={handleSaveButton}
                        className={`${editMode ? "" : "hidden"} rounded border border-green-500 bg-green-500 px-4 py-2 text-white`}
                    >
                        {(loader && "Update") || "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={handleRemoveButton}
                        className={`${editMode && loader ? "" : "hidden"} rounded border border-red-500 bg-red-500 px-4 py-2 text-white`}
                    >
                        Remove
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelButton}
                        className="rounded border border-green-500 bg-white px-4 py-2 text-green-500"
                    >
                        {editMode ? "Cancel" : "Back"}
                    </button>
                </div>
            </div>
            {selectMode && (
                <Popup closePopup={closePopup}>
                    <StockAddingItem
                        closePopup={closePopup}
                        addItem={handleAddItem}
                    />
                </Popup>
            )}
        </div>
    );
}

export default StockForm;
