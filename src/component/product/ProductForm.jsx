import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emptyNewProductDetail } from "../../utils/emptyObject";
import CategorySelect from "../utils/CategorySelect";
import BrandSelect from "../utils/BrandSelect";
import { ProductContext } from "../../context/ProductContext";
import { useLoaderData } from "react-router-dom";
import validateProduct from "../../utils/validateProduct";
import transactionService from "../../service/transactionService";
import { nanoid } from "nanoid";

function ProductForm() {
    const { createNewProduct, updateProduct, removeProduct } =
        useContext(ProductContext);
    const loader = useLoaderData();
    const navigate = useNavigate();
    const [product, setProduct] = useState(emptyNewProductDetail);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProduct((prev) => ({ ...prev, [id]: value }));
    };

    const getCategory = (category) => {
        setProduct((prev) => ({ ...prev, category }));
    };

    const getBrand = (brand) => {
        setProduct((prev) => ({ ...prev, brand }));
    };

    const handleCreateButton = () => {
        //validate empty items
        const isProductValid = validateProduct(product);
        if (isProductValid) {
            if (loader) {
                updateProduct(product.id, product);
            } else {
                const newProduct = {
                    ...product,
                    stock: parseFloat(product.stock),
                };
                const newTransaction = {
                    id: nanoid(8),
                    items: product,
                    type: "initialized",
                };
                createNewProduct(newProduct);
            }
            navigate("/product");
        }
    };

    const handleRemoveButton = () => {
        const confirmRemove = confirm(
            "This product will perminently removed. Continue?",
        );
        if (confirmRemove) {
            removeProduct(loader.id);
            navigate("/product");
        }
        navigate("/product");
    };

    const handleCancelButton = () => {
        if (!loader) {
            //if there is no loader data.
            if (
                //check if product is filled?
                JSON.stringify(product) !==
                JSON.stringify(emptyNewProductDetail)
            ) {
                const confirmCancel = confirm(
                    "Your product details will be gone. Continue?",
                );
                if (confirmCancel) {
                    navigate("/product");
                }
            } else {
                navigate("/product");
            }
        } else {
            //if there is loader data.
            const compare1 = JSON.stringify(product);
            const compare2 = JSON.stringify(loader);

            if (compare1 !== compare2) {
                //check if product is edited?
                console.log("Product edited and wants confirmation to exit");
                const confirmCancel = confirm(
                    "Your product details will be gone. Continue?",
                );
                if (confirmCancel) {
                    navigate("/product");
                }
            } else {
                console.log(
                    "Product is not edited and want to exit immidietly",
                );
                navigate("/product");
            }
        }
    };

    useEffect(() => {
        if (loader) {
            setProduct(loader);
        }
    }, []);
    return (
        <div className="overflow-y-auto">
            <div className="h-[fit] flex-grow px-1 py-10 sm:grid sm:grid-cols-2">
                <div className="flex h-20 justify-evenly sm:col-span-2">
                    <input
                        type="text"
                        id="name"
                        required
                        value={product.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className={`${product.name.trim() === "" ? "border-b-2 border-red-500" : "border-b"} h-full w-[93%] px-4 py-3 text-3xl`}
                    />
                </div>
                <div className="my-2 grid p-2">
                    <span className="pl-1 text-sm text-gray-500">Brand</span>
                    <BrandSelect
                        output={getBrand}
                        value={loader ? loader.brand : product.brand}
                        style={
                            "bg-white border-b-2 border-b-gray-300 py-4 w-[97%] m-1 px-2"
                        }
                    />
                </div>

                <div className="my-2 grid p-2">
                    <span className="pl-1 text-sm text-gray-500">Category</span>
                    <CategorySelect
                        output={getCategory}
                        value={loader ? loader.category : product.category}
                        style={
                            "bg-white border-b-2 border-b-gray-300 py-4 w-[97%] m-1 px-2"
                        }
                    />
                </div>

                <div className="my-2 h-24 p-2 sm:col-span-2">
                    <input
                        type="text"
                        id="detail"
                        placeholder="More detail"
                        value={product.detail}
                        onChange={handleInputChange}
                        className="h-full w-full rounded border-2 px-4 py-3"
                    />
                </div>

                <div className="my-2 grid p-2">
                    <span className="pl-1 text-sm text-gray-500">Price</span>
                    <input
                        type="number"
                        id="price"
                        value={product.price}
                        onChange={handleInputChange}
                        className={`${product.price === "" ? "border-b-2 border-red-500" : ""} border-b-2 px-4 py-4 text-lg`}
                    />
                </div>
                <div className="my-2 grid p-2">
                    <span className="pl-1 text-sm text-gray-500">Cost</span>
                    <input
                        type="number"
                        id="cost"
                        value={product.cost}
                        onChange={handleInputChange}
                        className={`${product.cost === "" ? "border-b-2 border-red-500" : ""} border-b-2 px-4 py-4 text-lg`}
                    />
                </div>

                <div className="my-2 grid p-2">
                    <span className="pl-1 text-sm text-gray-500">
                        {loader ? "Current Stock" : "Initial Stock"}
                    </span>
                    <input
                        type="number"
                        id="stock"
                        value={product.stock}
                        onChange={handleInputChange}
                        className={`${product.stock === "" ? "border-b-2 border-red-500" : ""} border-b-2 px-4 py-4 text-lg`}
                    />
                </div>

                <div className="my-2 grid p-2">
                    <span className="pl-1 text-sm text-gray-500">Barcode</span>
                    <input
                        type="text"
                        id="barcode"
                        value={product.barcode}
                        onChange={handleInputChange}
                        className="rounded border-b-2 px-4 py-4 text-lg"
                    />
                </div>

                <div className="flex flex-row justify-center sm:col-span-2 sm:place-items-center">
                    <button
                        type="button"
                        onClick={handleCreateButton}
                        className="m-1 h-fit w-fit rounded border border-green-500 bg-green-500 px-4 py-2 text-white"
                    >
                        {loader ? "Save" : "Create"}
                    </button>
                    {loader && (
                        <button
                            type="button"
                            onClick={handleRemoveButton}
                            className="m-1 h-fit w-fit rounded border border-red-500 bg-red-500 px-4 py-2 text-white"
                        >
                            Remove
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleCancelButton}
                        className="m-1 h-fit w-fit rounded border border-green-500 px-4 py-2 text-green-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
