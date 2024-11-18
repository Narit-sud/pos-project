import { useContext, useState } from "react";
import { SupplierContext } from "../../context/SupplierContext";

function CategorySettingItem(props) {
    const { supplier } = props;
    const { updateSupplier, removeSupplier } = useContext(SupplierContext);

    const [thisSupplier, setThisSupplier] = useState(supplier);
    const [isOpen, setIsOpen] = useState(false);

    const handleSaveButton = () => {
        //send data to context and validate there
        updateSupplier(thisSupplier.id, thisSupplier);
        //fold the edit section
        setIsOpen(false);
        //if name is empty, reset it
        if (thisSupplier.name.trim() === "") {
            setThisSupplier(supplier);
        }
    };
    const handleRemoveButton = () => {
        //send data to context and validate there
        const confirmRemove = confirm(
            "Confirm to remove this supplier? This action cannot be undone.",
        );
        if (confirmRemove) {
            removeSupplier(thisSupplier.id, thisSupplier);
        }
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setThisSupplier((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="my-1 rounded border">
            <div
                className={`${isOpen && "bg-gray-200"} mt-1 grid w-full grid-cols-3 place-items-center rounded p-4 text-center`}
            >
                <img
                    src="../../../public/person-svgrepo-com.svg"
                    alt=""
                    className="size-6"
                />
                <div className={`${isOpen ? "bg-gray-200" : ""} `}>
                    <p>{thisSupplier.name}</p>
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
                            value={thisSupplier.id}
                            onChange={handleInputChange}
                            readOnly
                            className="m-1 w-[40vw] rounded border bg-gray-50 p-2"
                        />
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            value={thisSupplier.name}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] border p-2"
                        />

                        <label htmlFor="detail">Detail: </label>
                        <input
                            type="text"
                            id="detail"
                            value={thisSupplier.detail}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] border p-2"
                        />

                        <label htmlFor="tel">Phone number: </label>
                        <input
                            type="text"
                            id="tel"
                            value={thisSupplier.tel}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] border p-2"
                        />

                        <label htmlFor="location">Location: </label>
                        <input
                            type="text"
                            id="location"
                            value={thisSupplier.location}
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

export default CategorySettingItem;
