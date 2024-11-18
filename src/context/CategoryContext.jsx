import { createContext, useContext, useEffect, useState } from "react";
import categoryService from "../service/categoryService";
import { nanoid } from "nanoid";
import { ProductContext } from "./ProductContext";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const { loadProduct } = useContext(ProductContext);
    const [allCategories, setAllCategories] = useState([]);

    const loadCategory = async () => {
        const category = await categoryService.getAllCategories();
        setAllCategories(category.data);
    };

    const createNewCategory = async (newCategory) => {
        if (newCategory.name.trim() === "") {
            alert("Please enter category name.");
        } else {
            const newCategoryWithId = { ...newCategory, id: nanoid(8) };
            const res =
                await categoryService.createNewCategory(newCategoryWithId);
            if (res.status === 201) {
                alert("Success!");
                loadCategory();
            }
        }
    };

    const updateCategory = async (categoryId, updatedCategory) => {
        if (updatedCategory.name.trim() === "") {
            alert("Category name cannot be empty.");
        } else {
            const res = await categoryService.updateCategory(
                categoryId,
                updatedCategory,
            );
            if (res.status === 200) {
                alert("Success!");
                loadCategory();
                loadProduct();
            } else {
                alert("Failed to update this category. Please try again");
            }
        }
    };

    const removeCategory = async (categoryId) => {
        const res = await categoryService.removeCategory(categoryId);
        if (res.status === 200) {
            alert("Success!");
            loadCategory();
        } else {
            alert("Failed to remove this category. Please try again.");
        }
    };

    useEffect(() => {
        loadCategory();
    }, []);
    const share = {
        allCategories,
        createNewCategory,
        updateCategory,
        removeCategory,
    };
    return (
        <CategoryContext.Provider value={share}>
            {children}
        </CategoryContext.Provider>
    );
}
