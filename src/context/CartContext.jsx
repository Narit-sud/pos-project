import { createContext, useContext, useEffect, useState } from "react";
import formatDate from "../utils/formatDate";
import { nanoid } from "nanoid";
import cartService from "../service/cartService";
import salesService from "../service/salesService";
import updateStock from "../utils/updateStock";
import { ProductContext } from "./ProductContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { loadProduct } = useContext(ProductContext);
    const [savedCarts, setSavedCarts] = useState([]);
    const [currentCart, setCurrentCart] = useState([]);
    const [cartDetail, setCartDetail] = useState({
        customer: "",
        discount: 0,
        total: 0,
        items: [],
        date: formatDate.now(),
    });
    const [totalPrice, setTotalPrice] = useState(0);

    const loadSavedCarts = async () => {
        const res = await cartService.getSavedCarts();
        setSavedCarts(res.data);
    };

    const addItemToCart = (item) => {
        //destructuring item
        const { id, name, brand, category, cost, price, stock } = item;
        //check if stock is not empty and addable
        if (stock <= 0) {
            // alert(
            //     "Cannot add this item to the cart. This item stock is equal to 0.",
            // );
            return;
        }
        //reconstruct item
        const addingItem = { id, name, brand, category, cost, price, qty: 1 };
        //check if item is added to the cart
        const itemAdded = currentCart.find((item) => item.id === addingItem.id);
        if (!itemAdded) {
            setCurrentCart((prev) => [...prev, addingItem]);
        } else {
            //if not added to the cart
            if (stock <= itemAdded.qty) {
                // alert("Cannot add more than stock.");
                return;
            }
            setCurrentCart((prev) =>
                prev.map((item) =>
                    item.id === addingItem.id
                        ? { ...item, qty: item.qty + addingItem.qty }
                        : item,
                ),
            );
        }
    };

    const handleReduceItem = (itemId) => {
        const targetItem = currentCart.find((item) => item.id === itemId);
        if (targetItem.qty > 1) {
            setCurrentCart((prev) =>
                prev.map((item) =>
                    item.id === itemId ? { ...item, qty: item.qty - 1 } : item,
                ),
            );
        } else {
            setCurrentCart((prev) => prev.filter((item) => item.id !== itemId));
        }
    };

    const resetCart = () => {
        setCurrentCart([]);
        setCartDetail({
            customer: "",
            discount: 0,
            items: [],
            date: formatDate.now(),
            total: totalPrice,
        });
        localStorageHandler.reset();
    };

    const clearCart = () => {
        if (currentCart.length === 0) {
            //if no item in cart, clear cart details without confirm
            resetCart();
        } else {
            //if items in cart, confirm before clear
            const confirmClearCart = confirm(
                "Current cart details and items will be perminently removed. Continue?",
            );
            if (confirmClearCart) {
                resetCart();
            }
        }
    };

    const saveCart = async () => {
        //if cart is empty, do nothing.
        if (currentCart.length === 0) {
            alert("Please add some items.");
            return;
        }
        //check if cart is added
        const cartAlreadySaved = savedCarts.find(
            (cart) => cart.id === cartDetail.id,
        );
        if (cartAlreadySaved) {
            //construct updated cart.
            const updatedCart = {
                ...cartDetail,
                items: currentCart,
                date: formatDate.now(),
                total: totalPrice,
            };
            //send updated cart.
            const res = await cartService.updateSavedCart(
                cartAlreadySaved.id,
                updatedCart,
            );
            if (res.status === 200) {
                alert("This cart has been updated.");
                loadSavedCarts();
                resetCart();
            } else {
            }
            return;
        }

        //if cart is not added.
        //construct new cart
        const newCart = {
            ...cartDetail,
            items: currentCart,
            date: formatDate.now(),
            id: nanoid(8),
            total: totalPrice,
        };
        //save new cart
        const res = await cartService.saveNewCart(newCart);
        if (res.status === 201) {
            alert("Cart saved!");
            resetCart();
            loadSavedCarts();
        }
    };

    const loadCart = (cartData) => {
        const { items, id, total, customer, discount } = cartData;
        if (currentCart.length > 0) {
            clearCart();
        } else {
            resetCart();
        }
        setCurrentCart(items);
        setCartDetail({ id, customer, discount, total });
    };

    const removeSavedCart = async (cartId) => {
        const confirmRemoveCart = confirm(
            "This cart will be perminently removed. Continue?",
        );
        if (confirmRemoveCart) {
            const res = await cartService.removeSavedCart(cartId);
            if (res.status === 200) {
                alert("Cart removed!");
                loadSavedCarts();
            }
        }
    };

    const handleDetailChange = (e) => {
        const { id, value } = e.target;
        if (id === "discount") {
            if (value === "") {
                setCartDetail((prev) => ({ ...prev, [id]: 0 }));
            } else {
                const parseValue = parseInt(value);
                setCartDetail((prev) => ({ ...prev, [id]: parseValue }));
            }
        } else {
            setCartDetail((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleDiscountChange = (amount) => {
        if (cartDetail.discount === 0 && amount < 0) {
            return;
        } else {
            setCartDetail((prev) => ({
                ...prev,
                discount: prev.discount + amount,
            }));
        }
    };

    const handleTotalPrice = () => {
        const newTotalPrice = currentCart.reduce((acc, item) => {
            return (acc = parseInt(item.price * item.qty) + acc);
        }, 0);
        setTotalPrice(newTotalPrice);
    };

    const localStorageHandler = {
        get: () => {
            const data = JSON.parse(localStorage.getItem("data"));
            if (!data) {
                localStorageHandler.reset();
            } else {
                const { currentCart, cartDetail } = data;
                const updateTime = { ...cartDetail, date: formatDate.now() };
                const updatedData = { cartDetail: updateTime, currentCart };
                return updatedData;
            }
        },
        update: () => {
            const data = { currentCart, cartDetail };
            localStorage.setItem("data", JSON.stringify(data));
        },
        reset: () => {
            const currentCart = [];
            const cartDetail = {
                customer: "",
                discount: 0,
                items: [],
                date: formatDate.now(),
                total: totalPrice,
            };
            const data = { currentCart, cartDetail };
            localStorage.setItem("data", JSON.stringify(data));
        },
    };

    useEffect(() => {
        handleTotalPrice();
    }, [currentCart]);

    useEffect(() => {
        if (currentCart.length !== 0) {
            localStorageHandler.update();
        }
    }, [currentCart, cartDetail]);

    useEffect(() => {
        loadSavedCarts();
        const localSto = localStorageHandler.get();
        if (localSto) {
            setCurrentCart(localSto.currentCart);
            setCartDetail(localSto.cartDetail);
        }
    }, []);

    const handleCharge = async () => {
        //if this cartDetail has id, it is a saved cart. remove it from save location.
        if (cartDetail.id) {
            const res = await cartService.removeSavedCart(cartDetail.id);
            if (res.status === "200") {
                console.log(
                    "This cart has been charged. Removed it from save.",
                );
            }
        }
        //create new sales.
        const newSale = {
            ...cartDetail,
            items: currentCart,
            date: formatDate.now(),
            id: nanoid(8),
            total: totalPrice,
            isRegistered: false,
        };
        const newSaleCreated = await salesService.createNewSale(newSale);
        if (newSaleCreated) {
            alert("Sale closed!");
            await updateStock.fromSale(newSale);
            resetCart();
            loadSavedCarts();
            loadProduct();
        } else {
            alert("Failed to close sale. Please try again.");
        }
        return true;
    };

    const share = {
        currentCart,
        cartDetail,
        addItemToCart,
        clearCart,
        handleDetailChange,
        handleDiscountChange,
        totalPrice,
        handleCharge,
        savedCarts,
        saveCart,
        loadCart,
        removeSavedCart,
        handleReduceItem,
    };
    return (
        <CartContext.Provider value={share}>{children}</CartContext.Provider>
    );
};
export default CartProvider;
