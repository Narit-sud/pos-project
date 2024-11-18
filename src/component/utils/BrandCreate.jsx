import { useContext, useState } from "react";
import { emptyNewCategoryDetail as emptyNewBrandDetail } from "../../utils/emptyObject";
import { BrandContext } from "../../context/BrandContext";
import { CategoryContext } from "../../context/CategoryContext";

function BrandCreate(props) {
    const {
        closePopup = () => {
            console.log("Please add a function to handle calcel button.");
        },
    } = props;
    const { createNewBrand } = useContext(BrandContext);
    const { allCategories } = useContext(CategoryContext);
    const [newBrand, setNewBrand] = useState(emptyNewBrandDetail);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewBrand((prev) => ({ ...prev, [id]: value }));
    };

    const handleCreateButton = () => {
        createNewBrand(newBrand);
        closePopup();
    };
    return (
        <div className="flex flex-col justify-center">
            <span className="text m-2 text-center font-bold">
                Create new brand
            </span>
            <input
                type="text"
                id="name"
                placeholder="Brand name"
                value={newBrand.name}
                onChange={handleInputChange}
                className="my-1 rounded border px-1 py-4 text-center"
            />
            <select
                type="text"
                id="category"
                value={newBrand.category}
                onChange={handleInputChange}
                className="my-1 rounded border px-1 py-4 text-center"
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

export default BrandCreate;
