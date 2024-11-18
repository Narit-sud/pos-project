import { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import Popup from "../../layout/Popup";
import CategoryCreate from "./CategoryCreate";

function CategorySelect(props) {
    const {
        text = "Select Category",
        output, //a function that take param as this component value.
        enableCreate = true, //ability to select "create" option
        style = "rounded border px-1 py-4",
        value,
    } = props;
    const { allCategories } = useContext(CategoryContext);
    const [category, setCategory] = useState(value || "");
    const [createMode, setCreateMode] = useState(false);

    const handleSelectChange = (e) => {
        setCategory(e.target.value);
    };

    const handleCreateMode = () => {
        if (category === "create") {
            setCreateMode(true);
        } else {
            setCreateMode(false);
        }
    };

    const closePopup = () => {
        setCategory("");
    };

    useEffect(() => {
        handleCreateMode();
        output(category);
    }, [category]);
    return (
        <div>
            <select
                value={category}
                className={style}
                onChange={handleSelectChange}
            >
                <option value="">{text}</option>
                {allCategories.map((category) => {
                    return (
                        <option value={category.name} key={category.id}>
                            {category.name}
                        </option>
                    );
                })}
                {enableCreate && (
                    <option value="create">Create new category</option>
                )}
            </select>
            {createMode && (
                <Popup closePopup={closePopup}>
                    <CategoryCreate closePopup={closePopup} />
                </Popup>
            )}
        </div>
    );
}

export default CategorySelect;
