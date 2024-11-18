import { useContext, useState } from "react";
import { emptyNewCustomer } from "../../utils/emptyObject";
import { CustomerContext } from "../../context/CustomerContext";

function CustomerCreate(props) {
    const {
        closePopup = () => {
            console.log("Please add a function to handle cancel button.");
        },
    } = props;
    const { createNewCustomer } = useContext(CustomerContext);
    const [newCustomer, setNewCustomer] = useState(emptyNewCustomer);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewCustomer((prev) => ({ ...prev, [id]: value }));
    };

    const handleCreateButton = () => {
        if (newCustomer.name.trim() !== "") {
            createNewCustomer(newCustomer);
            closePopup();
        } else {
            alert("Please enter customer name.");
        }
    };
    return (
        <div className="flex flex-col justify-center">
            <span className="text m-2 text-center font-bold">
                Create new customer
            </span>
            <div className="flex flex-col items-center justify-center">
                <div className="m-1">
                    <span className="pl-1 text-sm text-gray-400">
                        Customer name
                    </span>
                    <input
                        type="text"
                        id="name"
                        required
                        placeholder="Name"
                        value={newCustomer.name}
                        onChange={handleInputChange}
                        className={`${newCustomer.name.trim() === "" ? "border-2 border-red-500" : ""} w-full rounded border px-2 py-4 text-2xl`}
                    />
                </div>
                <div className="m-1">
                    <span className="pl-1 text-sm text-gray-400">
                        More detail
                    </span>
                    <input
                        type="text"
                        id="detail"
                        value={newCustomer.detail}
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
                        value={newCustomer.tel}
                        onChange={handleInputChange}
                        className="w-full rounded border px-2 py-4"
                    />
                </div>
                <div className="m-1">
                    <span className="pl-1 text-sm text-gray-400">Location</span>
                    <input
                        type="text"
                        id="location"
                        value={newCustomer.location}
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

export default CustomerCreate;
