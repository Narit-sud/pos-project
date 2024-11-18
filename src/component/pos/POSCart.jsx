import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { CustomerContext } from "../../context/CustomerContext";
import Selector from "../utils/Selector";

function POSCart(props) {
    const { currentCart, cartDetail, closePopup, changeCartMode } = props;
    const { allCustomers } = useContext(CustomerContext);
    const {
        clearCart,
        handleDetailChange,
        handleDiscountChange,
        totalPrice,
        saveCart,
        savedCarts,
        handleReduceItem,
    } = useContext(CartContext);

    const handleChargeButton = () => {
        if (currentCart.length === 0) {
            alert("Please add some item.");
            closePopup();
        } else {
            changeCartMode("charge");
        }
    };
    const handleSaveButton = () => {
        saveCart();
        closePopup();
    };

    const handleSavedCartsButton = () => {
        changeCartMode("savedCarts");
    };

    const handleCloseButton = () => {
        closePopup();
    };

    return (
        <div className="">
            <div className="mb-1 grid h-fit grid-cols-3 gap-1">
                <button
                    type="button"
                    onClick={handleSaveButton}
                    className="rounded border border-green-500 bg-green-500 px-2 py-2 text-sm text-white"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleSavedCartsButton}
                    className="relative rounded border border-green-500 p-2 text-sm text-green-500"
                >
                    Load
                    {savedCarts.length > 0 && (
                        <p className="absolute bottom-6 left-16 size-5 rounded-full bg-red-500 text-center text-sm text-white">
                            {savedCarts.length}
                        </p>
                    )}
                </button>
                <button
                    type="button"
                    onClick={clearCart}
                    className="rounded border border-red-500 bg-red-500 px-2 py-2 text-sm text-white"
                >
                    Clear
                </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto border p-1">
                <div className="my-1 h-fit min-h-[30vh]">
                    {currentCart.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="grid grid-cols-7 place-items-center border-b py-2 text-sm sm:text-lg"
                            >
                                <button
                                    type="button"
                                    className="flex size-4 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white"
                                    onClick={() => handleReduceItem(item.id)}
                                >
                                    <p>-</p>
                                </button>
                                <p className="col-span-3">
                                    {`${item.brand} ${item.name}`}
                                </p>
                                <p>
                                    {item.price}x{item.qty}
                                </p>
                                <p>=</p>
                                <p className="underline">
                                    {item.price * item.qty}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <div className="my-2 grid grid-cols-2 rounded border bg-gray-100 p-1 text-center sm:text-lg">
                    <span>Total Items:</span>
                    <span>{currentCart.length}</span>
                    <span>Customer:</span>
                    <Selector
                        text="General"
                        options={allCustomers}
                        value={cartDetail.customer}
                        onChange={handleDetailChange}
                        id="customer"
                        style="sm:p-1"
                    />
                    <span>Before Discount:</span>
                    <span>{totalPrice}</span>
                    <span>Discount:</span>
                    <div className="flex justify-evenly">
                        <button
                            type="button"
                            onClick={() => {
                                handleDiscountChange(-1);
                            }}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            id="discount"
                            value={cartDetail.discount}
                            className="w-[40px] border text-center"
                            onChange={handleDetailChange}
                            min={0}
                        ></input>
                        <button
                            type="button"
                            onClick={() => {
                                handleDiscountChange(+1);
                            }}
                        >
                            +
                        </button>
                    </div>
                    <span>Total:</span>
                    <span>{totalPrice - cartDetail.discount}</span>
                </div>
                <div className="grid h-fit grid-cols-2 gap-1">
                    <button
                        type="button"
                        className="rounded border border-green-500 bg-green-500 px-2 py-2 text-white"
                        onClick={handleChargeButton}
                    >
                        Charge
                    </button>
                    <button
                        type="button"
                        className="rounded border border-green-500 px-2 py-2 text-green-500"
                        onClick={handleCloseButton}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default POSCart;
