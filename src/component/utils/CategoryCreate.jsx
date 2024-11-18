import { useContext, useState } from "react";
import { emptyNewCategoryDetail } from "../../utils/emptyObject";
import { CategoryContext } from "../../context/CategoryContext";

function CategoryCreate(props) {
    const {
        closePopup = () => {
            console.log("Please add a function to handle calcel button.");
        },
    } = props;
    const { createNewCategory } = useContext(CategoryContext);
    const [newCategory, setNewCategory] = useState(emptyNewCategoryDetail);

    const handleInputChange = (e) => {
        setNewCategory((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleCreateButton = () => {
        createNewCategory(newCategory);
        closePopup();
    };

    const setColor = (color) => {
        setNewCategory((prev) => ({ ...prev, color }));
    };
    return (
        <div className="flex flex-col justify-center">
            <span className="text m-2 text-center">Create new category</span>
            <input
                type="text"
                value={newCategory.name}
                onChange={handleInputChange}
                className="rounded border px-1 py-4 text-center"
            />
            <div className="col-span-2 my-2 p-2">
                <label htmlFor="color">Color: </label>
                <div className="grid grid-cols-4 gap-2">
                    <div
                        className={`${newCategory.color === "bg-zinc-200" && "border-2"} size-14 border-black bg-zinc-200`}
                        onClick={() => setColor("bg-zinc-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-stone-300" && "border-2"} size-14 border-black bg-stone-300`}
                        onClick={() => setColor("bg-stone-300")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-lime-200" && "border-2"} size-14 border-black bg-lime-200`}
                        onClick={() => setColor("bg-lime-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-green-200" && "border-2"} size-14 border-black bg-green-200`}
                        onClick={() => setColor("bg-green-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-sky-200" && "border-2"} size-14 border-black bg-sky-200`}
                        onClick={() => setColor("bg-sky-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-purple-200" && "border-2"} size-14 border-black bg-purple-200`}
                        onClick={() => setColor("bg-purple-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-pink-200" && "border-2"} size-14 border-black bg-pink-200`}
                        onClick={() => setColor("bg-pink-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-yellow-200" && "border-2"} size-14 border-black bg-yellow-200`}
                        onClick={() => setColor("bg-yellow-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-amber-300" && "border-2"} size-14 border-black bg-amber-300`}
                        onClick={() => setColor("bg-amber-300")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-orange-200" && "border-2"} size-14 border-black bg-orange-200`}
                        onClick={() => setColor("bg-orange-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-rose-200" && "border-2"} size-14 border-black bg-rose-200`}
                        onClick={() => setColor("bg-rose-200")}
                    ></div>
                    <div
                        className={`${newCategory.color === "bg-blue-200" && "border-2"} size-14 border-black bg-blue-200`}
                        onClick={() => setColor("bg-blue-200")}
                    ></div>
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

export default CategoryCreate;
