import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function POSSavedCarts(props) {
    const { closePopup } = props;
    const { savedCarts, loadCart, removeSavedCart } = useContext(CartContext);

    const handleLoadButton = (cartData) => {
        loadCart(cartData);
        closePopup();
    };
    return (
        <div className="max-h-[70vh] w-full overflow-y-auto rounded border p-2 text-sm">
            <div className="h-fit">
                {savedCarts.length === 0 && (
                    <p className="text-center">No saved cart.</p>
                )}
                {savedCarts.map((cart) => {
                    return (
                        <div
                            key={cart.id}
                            className="grid grid-cols-3 rounded border p-2"
                        >
                            <div className="col-span-2">
                                <div>
                                    <span>Date: </span>
                                    <span>{cart.date}</span>
                                </div>
                                <div>
                                    <span>Customer: </span>
                                    <span>{cart.customer || "General"}</span>
                                </div>
                                <div>
                                    <span>Items: </span>
                                    <span>{cart.items.length}</span>
                                </div>
                                <div>
                                    <span>Discount: </span>
                                    <span>{cart.discount}</span>
                                </div>
                                <div>
                                    <span>Total: </span>
                                    <span>{cart.total}</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleLoadButton(cart);
                                    }}
                                    className="m-1 rounded border border-green-500 bg-white p-2 text-green-500"
                                >
                                    Load
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        removeSavedCart(cart.id);
                                    }}
                                    className="m-1 rounded border border-red-500 bg-white p-2 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default POSSavedCarts;
