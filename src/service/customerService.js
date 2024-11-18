import { CUSTOMER_URL } from "../utils/constants";
import axios from "axios";

const customerService = {
    getAllCustomers: async () => {
        try {
            const res = await axios.get(CUSTOMER_URL);
            return res;
        } catch (error) {
            console.log("Cannot get customer data.", error);
        }
    },
    getSingleCustomer: async (customerId) => {
        try {
            const res = await axios.get(`${CUSTOMER_URL}/${customerId}`);
            return res;
        } catch (error) {
            console.log("Cannot get this customer data.", error);
        }
    },
    createNewCustomer: async (newCustomer) => {
        try {
            const res = await axios.post(CUSTOMER_URL, newCustomer);
            return res;
        } catch (error) {
            console.log("Cannot create new customer.", error);
        }
    },
    updateCustomer: async (customerId, updatedCustomer) => {
        try {
            const res = await axios.put(
                `${CUSTOMER_URL}/${customerId}`,
                updatedCustomer,
            );
            return res;
        } catch (error) {
            console.log("Cannot update this customer.", error);
        }
    },
    removeCustomer: async (customerId) => {
        try {
            const res = await axios.delete(`${CUSTOMER_URL}/${customerId}`);
            return res;
        } catch (error) {
            console.log("Cannot remove this customer", error);
        }
    },
};
export default customerService;
