import axios from "axios";
import { PRODUCT_URL } from "../utils/constants.js";

const productService = {
    getAllProducts: async () => {
        try {
            const res = await axios.get(PRODUCT_URL);
            return res.data;
        } catch (error) {
            console.log("Cannot get product data.", error);
            return false;
        }
    },
    getSingleProduct: async (productId) => {
        try {
            const res = await axios.get(`${PRODUCT_URL}/${productId}`);
            return res.data;
        } catch (error) {
            console.log("Cannot get this product data.", error);
            return false;
        }
    },
    createNewProduct: async (newProduct) => {
        try {
            await axios.post(PRODUCT_URL, newProduct);
            return true;
        } catch (error) {
            console.log("Cannot create new product.", error);
            return false;
        }
    },
    updateProduct: async (productId, updatedProduct) => {
        try {
            await axios.put(`${PRODUCT_URL}/${productId}`, updatedProduct);
            return true;
        } catch (error) {
            console.log("Cannot update this product.", error);
            return false;
        }
    },
    removeProduct: async (productId) => {
        try {
            await axios.delete(`${PRODUCT_URL}/${productId}`);
            return true;
        } catch (error) {
            console.log("Cannot remove this product", error);
            return false;
        }
    },
};

export default productService;
