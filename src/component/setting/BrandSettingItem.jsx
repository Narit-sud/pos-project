import { useContext, useState } from "react";
import { BrandContext } from "../../context/BrandContext";
import { CategoryContext } from "../../context/CategoryContext";
import updateProductBrand from "../../utils/updateProductBrand";

function CategorySettingItem(props) {
    const { brand } = props;
    const { updateBrand, removeBrand } = useContext(BrandContext);
    const { allCategories } = useContext(CategoryContext);

    const [thisBrand, setThisBrand] = useState(brand);
    const [isOpen, setIsOpen] = useState(false);

    const handleSaveButton = () => {
        //send data to context and validate there
        updateBrand(thisBrand.id, thisBrand);
        updateProductBrand(brand.name, thisBrand.name);
        //fold the edit section
        setIsOpen(false);
        //if name is empty, reset it
        if (thisBrand.name.trim() === "") {
            setThisBrand(brand);
        }
    };
    const handleRemoveButton = () => {
        const confirmRemove = confirm(
            "Confirm to remove this brand? This action cannot be undone.",
        );
        if (confirmRemove) {
            //send data to context and validate there
            removeBrand(thisBrand.id, thisBrand);
        }
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setThisBrand((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="my-1 rounded border">
            <div
                className={`${isOpen && "bg-gray-200"} mt-1 grid w-full grid-cols-3 place-items-center rounded p-4 text-center`}
            >
                <div className={`${isOpen ? "bg-gray-200" : ""} col-span-2`}>
                    <span>{thisBrand.name}</span>
                    <span className="ml-1 text-xs text-gray-400">
                        ({thisBrand.category || "No category"})
                    </span>
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
                            value={thisBrand.id}
                            onChange={handleInputChange}
                            readOnly
                            className="m-1 w-[40vw] rounded border bg-gray-50 p-2 sm:w-full"
                        />
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            value={thisBrand.name}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] rounded border bg-white p-2 sm:w-full"
                        />

                        <label htmlFor="name">Category: </label>
                        <select
                            type="text"
                            id="category"
                            value={thisBrand.category}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] rounded border bg-white p-2 sm:w-full"
                        >
                            <option value="">No category</option>
                            {allCategories.map((cat) => {
                                return (
                                    <option value={cat.name} key={cat.id}>
                                        {cat.name}
                                    </option>
                                );
                            })}
                        </select>

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
