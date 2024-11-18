import productService from "../service/productService.js";

const adjustStock = {
    adjust: async (arrayOfProducts) => {
        try {
            const updatePromises = arrayOfProducts.map(
                async (productUpdateData) => {
                    //get existed product data
                    const product = await productService.getSingleProduct(
                        productUpdateData.id,
                    );
                    //update its stock qty
                    product.stock =
                        parseFloat(product.stock) +
                        parseFloat(productUpdateData.qty);
                    //send update to replace old one
                    return await productService.updateProduct(
                        productUpdateData.id,
                        product,
                    );
                },
            );
            //wait for everything to complete
            await Promise.all(updatePromises);
            //anounce it
            console.log(
                `Successfully updated ${arrayOfProducts.length} products' stock.`,
            );
            //return true for checking
            return true;
        } catch (error) {
            //anounce it
            console.log("Cannot adjust product(s) stock.", error);
            //return fause for checking
            return false;
        }
    },

    reverse: async (arrayOfProducts) => {
        try {
            const updatePromises = arrayOfProducts.map(
                async (productUpdateData) => {
                    //get existed product data
                    const product = await productService.getSingleProduct(
                        productUpdateData.id,
                    );
                    //update its stock qty
                    product.stock =
                        parseFloat(product.stock) -
                        parseFloat(productUpdateData.qty);
                    //send update to replace old one
                    return await productService.updateProduct(
                        productUpdateData.id,
                        product,
                    );
                },
            );
            //wait for everything to complete
            await Promise.all(updatePromises);
            //anounce it
            console.log(
                `Successfully reverse ${arrayOfProducts.length} products' stock.`,
            );
            //return true for checking
            return true;
        } catch (error) {
            //anounce it
            console.log(
                `Cannot revert ${arrayOfProducts.length} items' stock. `,
            );
            //return false for checking
            return false;
        }
    },
};

export default adjustStock;
