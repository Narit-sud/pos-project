import { useState, useEffect, useContext } from "react";
import { SupplierContext } from "../../context/SupplierContext";
import Popup from "../../layout/Popup";
import SupplierCreate from "./SupplierCreate";

function SupplierSelect(props) {
    const {
        text = "Select Supplier",
        output, //a function that take param as this component value.
        enableCreate = true, //ability to select "create" option.
        style = "rounded border px-1 py-4",
        value = "",
        editMode,
    } = props;
    const { allSuppliers } = useContext(SupplierContext);
    const [supplier, setSupplier] = useState("");
    const [createMode, setCreateMode] = useState(false);

    const handleSelectChange = (e) => {
        setSupplier(e.target.value);
    };

    const handleCreateMode = () => {
        if (supplier === "create") {
            setCreateMode(true);
        } else {
            setCreateMode(false);
        }
    };

    const closePopup = () => {
        setSupplier("");
    };

    useEffect(() => {
        handleCreateMode();
        output(supplier);
    }, [supplier]);

    return (
        <div>
            <select
                value={value}
                className={style}
                onChange={handleSelectChange}
                disabled={!editMode}
            >
                <option value="">{text}</option>
                {allSuppliers.map((category) => {
                    return (
                        <option value={category.name} key={category.id}>
                            {category.name}
                        </option>
                    );
                })}
                {enableCreate && (
                    <option value="create">Create new supplier</option>
                )}
            </select>
            {createMode && (
                <Popup closePopup={closePopup}>
                    <SupplierCreate closePopup={closePopup} />
                </Popup>
            )}
        </div>
    );
}

export default SupplierSelect;
