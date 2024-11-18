import axios from "axios";
import { PRODUCT_URL } from "./constants.js";

const updateProductBrand = async (oldBrand, newBrand) => {
    const config = { params: { brand: oldBrand } };
    const products = await axios.get(PRODUCT_URL, config);

    const updatePromises = products.data.map(async (product) => {
        const updatedProduct = { ...product, brand: newBrand };
        return axios.put(`${PRODUCT_URL}/${product.id}`, updatedProduct);
    });

    await Promise.all(updatePromises);
    console.log(
        `Successfully updated ${products.data.length} products from brand: ${oldBrand} to brand: ${newBrand}`,
    );
};

export default updateProductBrand;
