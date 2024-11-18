import { CATEGORY_URL } from "../utils/constants.js";
import axios from "axios";

const categoryService = {
    getAllCategories: async () => {
        try {
            const res = await axios.get(CATEGORY_URL);
            return res;
        } catch (error) {
            console.log("Cannot get category data.", error);
        }
    },
    getSingleCategory: async (categoryId) => {
        try {
            const res = await axios.get(`${CATEGORY_URL}/${categoryId}`);
            return res;
        } catch (error) {
            console.log("Cannot get this category data.", error);
        }
    },
    createNewCategory: async (newCategory) => {
        try {
            const res = await axios.post(CATEGORY_URL, newCategory);
            return res;
        } catch (error) {
            console.log("Cannot create new category.", error);
        }
    },
    updateCategory: async (categoryId, updatedCategory) => {
        try {
            const res = await axios.put(
                `${CATEGORY_URL}/${categoryId}`,
                updatedCategory,
            );
            return res;
        } catch (error) {
            console.log("Cannot update this category.", error);
        }
    },
    removeCategory: async (categoryId) => {
        try {
            const res = await axios.delete(`${CATEGORY_URL}/${categoryId}`);
            return res;
        } catch (error) {
            console.log("Cannot remove this category", error);
        }
    },
};
export default categoryService;
