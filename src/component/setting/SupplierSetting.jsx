import { useContext, useState } from "react";
import { SupplierContext } from "../../context/SupplierContext";
import SupplierSettingItem from "./SupplierSettingItem";
import SupplierCreate from "../utils/SupplierCreate";
import Popup from "../../layout/Popup";

function SupplierSetting() {
    const { allSuppliers } = useContext(SupplierContext);
    const [createMode, setCreateMode] = useState(false);
    return (
        <div className="h-[85vh] overflow-y-auto overflow-x-hidden pb-10">
            {allSuppliers.map((supplier) => {
                return (
                    <SupplierSettingItem
                        supplier={supplier}
                        key={supplier.id}
                    />
                );
            })}
            <div className="m-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setCreateMode(true)}
                    className="rounded border border-green-500 bg-green-500 px-4 py-2 text-white"
                >
                    Create new supplier
                </button>
            </div>
            {createMode && (
                <Popup
                    closePopup={() => {
                        setCreateMode(false);
                    }}
                >
                    <SupplierCreate
                        closePopup={() => {
                            setCreateMode(false);
                        }}
                    />
                </Popup>
            )}
        </div>
    );
}

export default SupplierSetting;
