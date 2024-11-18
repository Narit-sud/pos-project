import { SALES_URL } from "../utils/constants.js";
import axios from "axios";
import updateStock from "../utils/updateStock.js";

const salesService = {
    getAllSales: async () => {
        try {
            const res = await axios.get(SALES_URL);
            return res.data;
        } catch (error) {
            console.log("Cannot get sales data.", error);
            return false;
        }
    },
    getSingleSale: async (salesId) => {
        try {
            const res = await axios.get(`${SALES_URL}/${salesId}`);
            return res.data;
        } catch (error) {
            console.log("Cannot get this sales data.", error);
            return false;
        }
    },
    createNewSale: async (newSale) => {
        try {
            await axios.post(SALES_URL, newSale);
            return true;
        } catch (error) {
            console.log("Cannot create new sales.", error);
            return false;
        }
    },
    updateSale: async (saleId, updatedSale) => {
        try {
            await axios.put(`${SALES_URL}/${saleId}`, updatedSale);
            return true;
        } catch (error) {
            console.log("Cannot update this sales.", error);
            return false;
        }
    },
    removeSale: async (saleId) => {
        try {
            const saleObject = await salesService.getSingleSale(saleId);
            await updateStock.revert(saleObject);
            await axios.delete(`${SALES_URL}/${saleId}`);
            return true;
        } catch (error) {
            console.log("Cannot remove this sales", error);
            return false;
        }
    },
};
export default salesService;
