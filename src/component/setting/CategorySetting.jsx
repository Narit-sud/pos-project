import { useContext, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import CategorySettingItem from "./CategorySettingItem";
import CategoryCreate from "../utils/CategoryCreate";
import Popup from "../../layout/Popup";

function CategorySetting() {
    const { allCategories } = useContext(CategoryContext);
    const [createMode, setCreateMode] = useState(false);
    return (
        <div className="h-[85vh] overflow-y-auto pb-10">
            <div className="overflow-x-hidden sm:grid sm:h-fit sm:grid-cols-2">
                {allCategories.map((category) => {
                    return (
                        <CategorySettingItem
                            category={category}
                            key={category.id}
                        />
                    );
                })}
            </div>
            <div className="m-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setCreateMode(true)}
                    className="rounded-lg border border-green-500 bg-green-500 px-4 py-2 text-white"
                >
                    Create new category
                </button>
            </div>
            {createMode && (
                <Popup
                    closePopup={() => {
                        setCreateMode(false);
                    }}
                >
                    <CategoryCreate
                        closePopup={() => {
                            setCreateMode(false);
                        }}
                    />
                </Popup>
            )}
        </div>
    );
}

export default CategorySetting;
