import salesService from "../service/salesService.js";
import productService from "../service/productService.js";
import categoryService from "../service/categoryService.js";

const utilities = {
    sales: {
        removeAllSales: async () => {
            const allSales = await salesService.getAllSales();
            allSales.data.forEach(async (sale) => {
                const remove = await salesService.removeSale(sale.id);
                if (remove.status === 200) {
                    console.log(`Removed sale id:${sale.id}`);
                }
            });
        },
    },
    stock: {
        set: async (qty) => {
            try {
                const allProducts = await productService.getAllProducts();
                if (allProducts) {
                    console.log("All products loaded.");
                }
                allProducts.forEach(async (product) => {
                    if (product.stock !== qty) {
                        const updatedProduct = { ...product, stock: qty };
                        const isUpdated = await productService.updateProduct(
                            product.id,
                            updatedProduct,
                        );
                        if (isUpdated) {
                            console.log(
                                `Product ${product.id}'s stock has been set.(from ${product.stock} to ${updatedProduct.stock})`,
                            );
                        } else {
                            console.log("Failed to set stock.");
                        }
                    } else {
                        console.log(`${product.id} skipped.`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        reset: async () => {
            try {
                const allProducts = await productService.getAllProducts();
                if (allProducts.status === 200) {
                    console.log("All products loaded.");
                }
                allProducts.forEach(async (product) => {
                    if (product.stock !== 0) {
                        const updatedProduct = { ...product, stock: 0 };
                        const sendUpdate = await productService.updateProduct(
                            product.id,
                            updatedProduct,
                        );
                        if (sendUpdate.status === 200) {
                            console.log(
                                `Product ${product.id}'s stock has been reset.(from ${product.stock} to ${updatedProduct.stock})`,
                            );
                        }
                    } else {
                        console.log(`${product.id} has been skipped.`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    category: {
        setAllColor: async () => {
            const allCategories = await categoryService.getAllCategories();
            allCategories.data.map(async (cat) => {
                try {
                    const catHasColor = { ...cat, color: "bg-zinc-300" };
                    const sendUpdate = await categoryService.updateCategory(
                        cat.id,
                        catHasColor,
                    );
                    if (sendUpdate.status === 200) {
                        console.log(
                            `"${cat.name}" has set color to "${catHasColor.color}"`,
                        );
                    } else {
                        console.log("Update failed");
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        },
    },
};

utilities.stock.set(10);
