import productService from "../service/productService.js";
import salesService from "../service/salesService.js";

const updateStock = {
    fromSale: async (saleObject) => {
        //loop through every items.
        saleObject.items.forEach(async (item) => {
            try {
                //find matched product for each sale item.
                const matchedProduct = await productService.getSingleProduct(
                    item.id,
                );
                //update it.
                const updatedProduct = {
                    ...matchedProduct,
                    stock: matchedProduct.stock - item.qty,
                };
                //send the updated version.
                const sendUpdate = await productService.updateProduct(
                    matchedProduct.id,
                    updatedProduct,
                );
                //if update success.
                if (sendUpdate.status === 200) {
                    console.log(
                        `Success updated ${matchedProduct.name}'s stock from ${matchedProduct.stock} to ${updatedProduct.stock}`,
                    );
                }
            } catch (error) {
                console.log("Error", error);
            }
        });

        //set marked as registed to sale object.
        const updatedSaleObject = { ...saleObject, isRegistered: true };
        const updateSale = await salesService.updateSale(
            saleObject.id,
            updatedSaleObject,
        );
        if (updateSale.status) {
            console.log("This sale items stocks' have been updated");
        }
    },
    revert: async (saleObject) => {
        //loop through every items.
        saleObject.items.forEach(async (item) => {
            try {
                //find matched product for each sale item.
                const matchedProduct = await productService.getSingleProduct(
                    item.id,
                );
                //update it.
                const updatedProduct = {
                    ...matchedProduct,
                    stock: matchedProduct.stock + item.qty,
                };
                //send the updated version.
                const sendUpdate = await productService.updateProduct(
                    matchedProduct.id,
                    updatedProduct,
                );
                //if update success.
                if (sendUpdate.status === 200) {
                    console.log(`Success reverted ${matchedProduct.name}`);
                }
            } catch (error) {
                console.log("Error", error);
            }
        });
    },
};

export default updateStock;
