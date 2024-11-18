import { useContext, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
function CustomerSettingItem(props) {
    const { customer } = props;
    const { updateCustomer, removeCustomer } = useContext(CustomerContext);
    const [thisCustomer, setThisCustomer] = useState(customer);
    const [isOpen, setIsOpen] = useState(false);

    const handleSaveButton = () => {
        //send data to context and validate there
        updateCustomer(thisCustomer.id, thisCustomer);
        //fold the edit section
        setIsOpen(false);
        //if name is empty, reset it
        if (thisCustomer.name.trim() === "") {
            setThisCustomer(customer);
        }
    };
    const handleRemoveButton = () => {
        //send data to context and validate there
        removeCustomer(thisCustomer.id, thisCustomer);
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setThisCustomer((prev) => ({ ...prev, [id]: value }));
    };
    return (
        <div className="my-1 rounded border">
            <div
                className={`${isOpen && "bg-gray-200"} mt-1 grid w-full grid-cols-3 place-items-center rounded p-4 text-center`}
            >
                <div className={`${isOpen ? "bg-gray-200" : ""} col-span-2`}>
                    <p>{thisCustomer.name}</p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <p
                        className={`${isOpen ? "" : "rotate-180"} w-full rounded-full px-2`}
                    >
                        ^
                    </p>
                </button>
            </div>
            {isOpen && (
                <div className="bg-gray-100 p-1">
                    <div className="grid grid-cols-2 place-items-center">
                        <label htmlFor="id">Id: </label>
                        <input
                            type="text"
                            id="id"
                            value={thisCustomer.id}
                            onChange={handleInputChange}
                            readOnly
                            className="m-1 w-[40vw] rounded border bg-gray-50 p-2"
                        />
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            value={thisCustomer.name}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] border p-2"
                        />

                        <label htmlFor="detail">Detail: </label>
                        <input
                            type="text"
                            id="detail"
                            value={thisCustomer.detail}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] border p-2"
                        />

                        <label htmlFor="tel">Phone number: </label>
                        <input
                            type="text"
                            id="tel"
                            value={thisCustomer.tel}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] border p-2"
                        />

                        <label htmlFor="location">Location: </label>
                        <input
                            type="text"
                            id="location"
                            value={thisCustomer.location}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] border p-2"
                        />
                        <div className="col-span-2 grid grid-cols-2 place-items-center">
                            <button
                                type="button"
                                onClick={handleSaveButton}
                                className="m-1 rounded border-green-500 bg-green-500 px-4 py-2 text-white"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleRemoveButton}
                                className="m-1 rounded border border-green-500 bg-white px-4 py-2 text-green-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerSettingItem;
