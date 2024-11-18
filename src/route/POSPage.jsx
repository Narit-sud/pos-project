import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";
import POSItem from "../component/pos/POSItem";
import POSCart from "../component/pos/POSCart";
import Popup from "../layout/Popup";
import { CartContext } from "../context/CartContext";
import POSCharge from "../component/pos/POSCharge";
import POSSavedCarts from "../component/pos/POSSavedCarts";

function POSPage() {
    const { allProducts } = useContext(ProductContext);
    const { allCategories } = useContext(CategoryContext);
    const { allBrands } = useContext(BrandContext);
    const { currentCart, cartDetail, addItemToCart } = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);
    const [cartMode, setCartMode] = useState("");
    const [catFilter, setCatFilter] = useState("");
    const [braFilter, setBraFilter] = useState("");
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSetCatFilter = (filter) => {
        setBraFilter("");
        if (filter === catFilter) {
            setCatFilter("");
        } else {
            setCatFilter(filter);
        }
    };

    const handleSetBraFilter = (filter) => {
        setBraFilter(filter);
        if (filter === braFilter) {
            setBraFilter("");
        } else {
            setBraFilter(filter);
        }
    };

    const changeCartMode = (mode) => {
        setCartMode(mode);
    };

    const toggleShowCart = () => {
        setShowCart(!showCart);
        changeCartMode("");
    };

    useEffect(() => {
        //initialized products
        if (!catFilter) {
            setFilteredProducts(allProducts);
        } else {
            //if allProducts arrived, braFilter is set, catFilter is set.
            //create filtered products.
            const catFiltered = allProducts.filter(
                (product) => product.category === catFilter,
            );
            if (!braFilter) {
                //if braFilter is empty, return only category filtered products.
                setFilteredProducts(catFiltered);
            } else {
                //if braFilter is not empty.
                //create another filtered product which filtered by brand.
                const braFiltered = catFiltered.filter(
                    (product) => product.brand === braFilter,
                );
                //return filtered by category and brand filtered products.
                setFilteredProducts(braFiltered);
            }
        }
    }, [catFilter, braFilter, allProducts]);

    useEffect(() => {
        //if catFilter is set, filter brands buttons to display on screen.
        const filteredBrand = allBrands.filter(
            (bra) => bra.category === catFilter,
        );
        setFilteredBrands(filteredBrand);
    }, [catFilter]);
    return (
        <div className="bg-gray-50 p-2">
            <p className="text-sm text-gray-500">Category:</p>
            <div className="flex h-[50px] flex-nowrap gap-1 overflow-x-auto rounded-lg border bg-white p-1 font-bold">
                <button
                    className={`${catFilter === "" && "m-1 border-2 border-green-500 text-sm"} text-nowrap rounded-lg border bg-white px-4 py-2`}
                    onClick={() => {
                        handleSetCatFilter("");
                    }}
                >
                    All
                </button>

                {allCategories.map((cat) => {
                    return (
                        <button
                            className={`${catFilter === cat.name && "m-1 border-2 border-green-500 text-sm"} ${cat.color} text-nowrap rounded-lg border px-4 py-2`}
                            key={cat.id}
                            onClick={() => {
                                handleSetCatFilter(cat.name);
                            }}
                        >
                            {cat.name}
                        </button>
                    );
                })}
            </div>
            <p className="text-sm text-gray-500">Brand:</p>
            <div className="bf-white flex h-[50px] flex-nowrap gap-1 overflow-x-auto rounded-lg border bg-white p-1 font-bold">
                <button
                    className={`${braFilter === "" && "m-1 border-2 border-green-500 text-sm"} text-nowrap rounded-lg border px-4 py-2`}
                    onClick={() => {
                        handleSetBraFilter("");
                    }}
                >
                    All
                </button>

                {filteredBrands.map((bra) => {
                    return (
                        <button
                            className={`${braFilter === bra.name && "m-1 border-2 border-green-500 text-sm"} text-nowrap rounded-lg border px-4 py-2`}
                            key={bra.id}
                            onClick={() => {
                                handleSetBraFilter(bra.name);
                            }}
                        >
                            {bra.name}
                        </button>
                    );
                })}
            </div>
            <div className="my-2 grid h-fit max-h-[67vh] grid-cols-3 overflow-y-auto overflow-x-hidden rounded-xl border bg-white p-1 pb-2 sm:grid-cols-4 lg:grid-cols-5">
                {filteredProducts.map((product) => {
                    return (
                        <POSItem
                            product={product}
                            addToCart={addItemToCart}
                            key={product.id}
                            currentCart={currentCart}
                        />
                    );
                })}
            </div>
            <button
                type="button"
                className="fixed right-3 top-2 h-10 w-14 rounded-lg bg-black text-white sm:right-5 sm:top-4 sm:h-12 sm:w-16"
                onClick={toggleShowCart}
            >
                Cart
            </button>
            {currentCart.length > 0 && (
                <p className="fixed right-1 top-1 size-5 rounded-full bg-red-500 text-center text-sm text-white">
                    {currentCart.length}
                </p>
            )}
            {showCart && (
                <Popup closePopup={toggleShowCart}>
                    {cartMode === "" && (
                        <POSCart
                            currentCart={currentCart}
                            cartDetail={cartDetail}
                            closePopup={toggleShowCart}
                            changeCartMode={changeCartMode}
                        />
                    )}
                    {cartMode === "savedCarts" && (
                        <POSSavedCarts closePopup={toggleShowCart} />
                    )}
                    {cartMode === "charge" && (
                        <POSCharge closePopup={toggleShowCart} />
                    )}
                </Popup>
            )}
        </div>
    );
}

export default POSPage;
