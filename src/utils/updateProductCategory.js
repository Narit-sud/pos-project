import axios from "axios";
import { PRODUCT_URL } from "./constants.js";

const updateProductCategory = async (oldCategory, newCategory) => {
    const config = { params: { category: oldCategory } };
    const products = await axios.get(PRODUCT_URL, config);

    const updatePromises = products.data.map(async (product) => {
        const updatedProduct = { ...product, category: newCategory };
        return axios.put(`${PRODUCT_URL}/${product.id}`, updatedProduct);
    });

    await Promise.all(updatePromises);
    console.log(
        `Successfully updated ${products.data.length} products from category: ${oldCategory} to category: ${newCategory}`,
    );
};

export default updateProductCategory;
