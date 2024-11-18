import axios from "axios";
import { SUPPLIER_URL } from "../utils/constants.js";

const supplierService = {
    getAllSuppliers: async () => {
        try {
            const res = await axios.get(SUPPLIER_URL);
            return res;
        } catch (error) {
            console.log("Cannot get supplier data.", error);
        }
    },
    getSingleSupplier: async (supplierId) => {
        try {
            const res = await axios.get(`${SUPPLIER_URL}/${supplierId}`);
            return res;
        } catch (error) {
            console.log("Cannot get this supplier data.", error);
        }
    },
    createNewSupplier: async (newSupplier) => {
        try {
            const res = await axios.post(SUPPLIER_URL, newSupplier);
            return res;
        } catch (error) {
            console.log("Cannot create new supplier.", error);
        }
    },
    updateSupplier: async (supplierId, updatedSupplier) => {
        try {
            const res = await axios.put(
                `${SUPPLIER_URL}/${supplierId}`,
                updatedSupplier,
            );
            return res;
        } catch (error) {
            console.log("Cannot update this supplier.", error);
        }
    },
    removeSupplier: async (supplierId) => {
        try {
            const res = await axios.delete(`${SUPPLIER_URL}/${supplierId}`);
            return res;
        } catch (error) {
            console.log("Cannot remove this supplier", error);
        }
    },
};

export default supplierService;
