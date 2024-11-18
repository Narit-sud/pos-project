import { useContext, useState } from "react";
import { emptyNewSupplierDetail } from "../../utils/emptyObject";
import { SupplierContext } from "../../context/SupplierContext";

function SupplierCreate(props) {
    const {
        closePopup = () => {
            console.log("Please add a function to handle calcel button.");
        },
    } = props;
    const { createNewSupplier } = useContext(SupplierContext);
    const [newSupplier, setNewSupplier] = useState(emptyNewSupplierDetail);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewSupplier((prev) => ({ ...prev, [id]: value }));
    };

    const handleCreateButton = () => {
        createNewSupplier(newSupplier);
        closePopup();
    };
    return (
        <div className="flex flex-col justify-center">
            <span className="text m-2 text-center">Create new supplier</span>
            <div className="flex flex-col items-center justify-center">
                <div className="m-1">
                    <span className="pl-1 text-sm text-gray-400">
                        Supplier name
                    </span>
                    <input
                        type="text"
                        id="name"
                        required
                        placeholder="Name"
                        value={newSupplier.name}
                        onChange={handleInputChange}
                        className={`${newSupplier.name.trim() === "" ? "border-2 border-red-500" : ""} w-full rounded border px-2 py-4 text-2xl`}
                    />
                </div>
                <div className="m-1">
                    <span className="pl-1 text-sm text-gray-400">
                        More detail
                    </span>
                    <input
                        type="text"
                        id="detail"
                        value={newSupplier.detail}
                        onChange={handleInputChange}
                        className="w-full rounded border px-2 py-4"
                    />
                </div>
                <div className="m-1">
                    <span className="pl-1 text-sm text-gray-400">
                        Phone number
                    </span>
                    <input
                        type="text"
                        id="tel"
                        value={newSupplier.tel}
                        onChange={handleInputChange}
                        className="w-full rounded border px-2 py-4"
                    />
                </div>
                <div className="m-1">
                    <span className="pl-1 text-sm text-gray-400">Location</span>
                    <input
                        type="text"
                        id="location"
                        value={newSupplier.location}
                        onChange={handleInputChange}
                        className="w-full rounded border px-2 py-4"
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <button
                    type="button"
                    onClick={handleCreateButton}
                    className="m-1 rounded border border-green-500 bg-green-500 px-4 py-2 text-white"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={closePopup}
                    className="m-1 rounded border border-green-500 px-4 py-2 text-green-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default SupplierCreate;
