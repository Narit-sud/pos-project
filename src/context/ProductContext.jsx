import { createContext, useEffect, useState } from "react";
import productService from "../service/productService.js";
import { nanoid } from "nanoid";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);

    const loadProduct = async () => {
        const productList = await productService.getAllProducts();
        setAllProducts(productList);
        console.log("Products has been loaded.");
    };

    const createNewProduct = async (newProduct) => {
        if (newProduct.name.trim() === "") {
            alert("Please enter product name.");
        } else {
            const newProductWithId = { ...newProduct, id: nanoid(8) };
            newProductWithId.stock = parseFloat(newProduct.stock);
            newProductWithId.price = parseFloat(newProduct.price);
            newProductWithId.cost = parseFloat(newProduct.cost);
            const isProductCreated =
                await productService.createNewProduct(newProductWithId);
            if (isProductCreated) {
                alert("Success!");
                loadProduct();
            } else {
                aler("Failed to create new product. Please try again.");
            }
        }
    };

    const updateProduct = async (productId, updatedProduct) => {
        const isProductUpdated = await productService.updateProduct(
            productId,
            updatedProduct,
        );
        if (isProductUpdated) {
            alert("Update Success!");
            loadProduct();
        } else {
            alert("Failed to update this product. Please try again");
        }
    };

    const removeProduct = async (productId) => {
        const isProductRemoved = await productService.removeProduct(productId);
        if (isProductRemoved) {
            alert("Success!");
            loadProduct();
        } else {
            alert("Failed to remove this product. Please try again.");
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);
    const share = {
        allProducts,
        createNewProduct,
        updateProduct,
        removeProduct,
        loadProduct,
    };
    return (
        <ProductContext.Provider value={share}>
            {children}
        </ProductContext.Provider>
    );
};
