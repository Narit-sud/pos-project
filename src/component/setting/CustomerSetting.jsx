import { useState, useContext } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import CustomerCreate from "../utils/CustomerCreate";
import CustomerSettingItem from "./CustomerSettingItem";
import Popup from "../../layout/Popup";

function CustomerSetting() {
    const { allCustomers } = useContext(CustomerContext);
    const [createMode, setCreateMode] = useState(false);
    return (
        <div className="h-[85vh] overflow-y-auto overflow-x-hidden pb-10">
            {allCustomers.map((customer) => {
                return (
                    <CustomerSettingItem
                        customer={customer}
                        key={customer.id}
                    />
                );
            })}
            <div className="m-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setCreateMode(true)}
                    className="rounded border border-green-500 bg-green-500 px-4 py-2 text-white"
                >
                    Create new customer
                </button>
            </div>
            {createMode && (
                <Popup
                    closePopup={() => {
                        setCreateMode(false);
                    }}
                >
                    <CustomerCreate
                        closePopup={() => {
                            setCreateMode(false);
                        }}
                    />
                </Popup>
            )}
        </div>
    );
}

export default CustomerSetting;
