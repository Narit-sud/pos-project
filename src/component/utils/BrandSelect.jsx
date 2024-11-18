import { useState, useEffect, useContext } from "react";
import { BrandContext } from "../../context/BrandContext";
import Popup from "../../layout/Popup";
import BrandCreate from "./BrandCreate";

function BrandSelect(props) {
    const {
        text = "Select Brand",
        output, //a function that take param as this component value.
        enableCreate = true, //ability to select "create" option
        style = "rounded border px-1 py-4",
        value,
    } = props;
    const { allBrands } = useContext(BrandContext);
    const [brand, setBrand] = useState(value || "");
    const [createMode, setCreateMode] = useState(false);

    const handleSelectChange = (e) => {
        setBrand(e.target.value);
    };

    const handleCreateMode = () => {
        if (brand === "create") {
            setCreateMode(true);
        } else {
            setCreateMode(false);
        }
    };

    const closePopup = () => {
        setBrand("");
    };

    useEffect(() => {
        handleCreateMode();
        output(brand);
    }, [brand]);
    return (
        <div>
            <select
                value={brand}
                className={style}
                onChange={handleSelectChange}
            >
                <option value="">{text}</option>
                {allBrands.map((brand) => {
                    return (
                        <option value={brand.name} key={brand.id}>
                            {brand.name}
                        </option>
                    );
                })}
                {enableCreate && (
                    <option value="create">Create new brand</option>
                )}
            </select>
            {createMode && (
                <Popup closePopup={closePopup}>
                    <BrandCreate closePopup={closePopup} />
                </Popup>
            )}
        </div>
    );
}

export default BrandSelect;
