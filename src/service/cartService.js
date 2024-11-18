import { CART_URL, SAVEDCART_URL } from "../utils/constants";
import formatDate from "../utils/formatDate";
import axios from "axios";

const cartService = {
    getSavedCarts: async () => {
        try {
            const res = await axios.get(SAVEDCART_URL);
            return res;
        } catch (error) {
            console.log("Cannot get saved carts data.", error);
        }
    },
    getSingleSavedCart: async (cartId) => {
        try {
            const res = await axios.get(`${SAVEDCART_URL}/${cartId}`);
            return res;
        } catch (error) {
            console.log("Cannot get this cart data.", error);
        }
    },
    saveNewCart: async (newCart) => {
        try {
            const res = await axios.post(SAVEDCART_URL, newCart);
            return res;
        } catch (error) {
            console.log("Cannot save new cart.", error);
        }
    },
    updateSavedCart: async (cartId, updatedCart) => {
        try {
            const res = await axios.put(
                `${SAVEDCART_URL}/${cartId}`,
                updatedCart,
            );
            return res;
        } catch (error) {
            console.log("Cannot update this cart.", error);
        }
    },
    removeSavedCart: async (cartId) => {
        try {
            const res = await axios.delete(`${SAVEDCART_URL}/${cartId}`);
            return res;
        } catch (error) {
            console.log("Cannot remove this cart.", error);
        }
    },
};
export default cartService;
