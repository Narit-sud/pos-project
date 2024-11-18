import { useContext, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import updateProductCategory from "../../utils/updateProductCategory";

function CategorySettingItem(props) {
    const { category } = props;
    const { updateCategory, removeCategory } = useContext(CategoryContext);

    const [thisCategory, setThisCategory] = useState(category);
    const [isOpen, setIsOpen] = useState(false);

    const handleSaveButton = () => {
        //send data to context and validate there
        updateCategory(thisCategory.id, thisCategory);
        updateProductCategory(category.name, thisCategory.name);
        //fold the edit section
        setIsOpen(false);
        //if name is empty, reset it
        if (thisCategory.name.trim() === "") {
            setThisCategory(category);
        }
    };
    const handleRemoveButton = () => {
        //send data to context and validate there
        removeCategory(thisCategory.id, thisCategory);
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setThisCategory((prev) => ({ ...prev, [id]: value }));
    };

    const setColor = (color) => {
        setThisCategory((prev) => ({ ...prev, color }));
    };

    return (
        <div className={`my-1 rounded border`}>
            <div
                className={`${isOpen && "bg-gray-200"} grid w-full grid-cols-3 place-items-center rounded p-3 text-center`}
            >
                <div
                    className={`size-10 ${thisCategory.color} rounded-md border-2 border-gray-500`}
                ></div>
                <p>{thisCategory.name}</p>
                {/* </div> */}
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
                            value={thisCategory.id}
                            onChange={handleInputChange}
                            readOnly
                            className="m-1 w-[40vw] rounded border bg-gray-50 p-2 sm:w-full"
                        />
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            value={thisCategory.name}
                            onChange={handleInputChange}
                            className="m-1 w-[40vw] rounded border bg-gray-50 p-2 sm:w-full"
                        />
                        <div className="col-span-2 my-2 p-2">
                            <label htmlFor="color">Color: </label>
                            <div className="grid grid-cols-4 gap-2">
                                <div
                                    className={`${thisCategory.color === "bg-zinc-200" && "border-2"} size-16 border-black bg-zinc-200`}
                                    onClick={() => setColor("bg-zinc-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-stone-300" && "border-2"} size-16 border-black bg-stone-300`}
                                    onClick={() => setColor("bg-stone-300")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-lime-200" && "border-2"} size-16 border-black bg-lime-200`}
                                    onClick={() => setColor("bg-lime-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-green-200" && "border-2"} size-16 border-black bg-green-200`}
                                    onClick={() => setColor("bg-green-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-sky-200" && "border-2"} size-16 border-black bg-sky-200`}
                                    onClick={() => setColor("bg-sky-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-purple-200" && "border-2"} size-16 border-black bg-purple-200`}
                                    onClick={() => setColor("bg-purple-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-pink-200" && "border-2"} size-16 border-black bg-pink-200`}
                                    onClick={() => setColor("bg-pink-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-yellow-200" && "border-2"} size-16 border-black bg-yellow-200`}
                                    onClick={() => setColor("bg-yellow-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-amber-300" && "border-2"} size-16 border-black bg-amber-300`}
                                    onClick={() => setColor("bg-amber-300")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-orange-200" && "border-2"} size-16 border-black bg-orange-200`}
                                    onClick={() => setColor("bg-orange-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-rose-200" && "border-2"} size-16 border-black bg-rose-200`}
                                    onClick={() => setColor("bg-rose-200")}
                                ></div>
                                <div
                                    className={`${thisCategory.color === "bg-blue-200" && "border-2"} size-16 border-black bg-blue-200`}
                                    onClick={() => setColor("bg-blue-200")}
                                ></div>
                            </div>
                        </div>

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
