import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

function ProductPage2() {
    const navigate = useNavigate();
    const { allProducts } = useContext(ProductContext);
    const ProductOutOfStock = allProducts.filter(
        (product) => product.stock === 0,
    ).length;
    const ProductLowOnStock = allProducts.filter(
        (product) => product.stock <= 5,
    ).length;
    const ProductReadyToSell =
        allProducts.length - ProductOutOfStock - ProductLowOnStock;
    return (
        <div className="mt-1 h-[91vh] overflow-y-auto">
            <div className="flex flex-row justify-center gap-1">
                <div className="rounded-lg border bg-green-100 p-2 text-center">
                    <p className="text-lg font-bold text-green-600">
                        {ProductReadyToSell}
                    </p>
                    <p className="text-gray-600">Ready to sell</p>
                </div>
                <div className="rounded-lg border bg-yellow-100 p-2 text-center">
                    <p className="text-lg font-bold text-yellow-600">
                        {ProductReadyToSell}
                    </p>
                    <p className="text-gray-600">Low on stock</p>
                </div>
                <div className="rounded-lg border bg-red-100 p-2 text-center">
                    <p className="text-lg font-bold text-red-600">
                        {ProductReadyToSell}
                    </p>
                    <p className="text-gray-600">Out of stock</p>
                </div>
            </div>
            <div className="w-full overflow-x-auto text-center">
                <div className="grid grid-cols-5">
                    <p>Category</p>
                    <p>Brand</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Stock</p>
                </div>
                <div className="w-fit text-center">
                    {allProducts.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className="grid grid-cols-5 border p-2"
                                onClick={() => {
                                    navigate(product.id, product.id);
                                }}
                            >
                                <p>{product.category}</p>
                                <p>{product.brand}</p>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.stock}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductPage2;
