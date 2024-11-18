import axios from "axios";
import { TRANSACTIONS_URL } from "../utils/constants";

const transactionService = {
    getAllTransactions: async () => {
        try {
            const res = await axios.get(TRANSACTIONS_URL);
            console.log("Transactions loaded.");
            return res.data;
        } catch (error) {
            console.log("Cannot get transactions dat.", error);
            return false;
        }
    },
    getSingleTransaction: async (transactionId) => {
        try {
            const res = await axios.get(`${TRANSACTIONS_URL}/${transactionId}`);
            console.log(`Successfully loaded transaction ${transactionId}.`);
            return res.data;
        } catch (error) {
            console.log("Cannot get this transaction data.", error);
            return false;
        }
    },
    createNewTransaction: async (newTransaction) => {
        try {
            await axios.post(TRANSACTIONS_URL, newTransaction);
            console.log("Successfully created new transaction.");
            return true;
        } catch (error) {
            console.log("Cannot create new transaction.", error);
            return false;
        }
    },
    updateTransaction: async (transactionId, updatedTransaction) => {
        try {
            await axios.put(
                `${TRANSACTIONS_URL}/${transactionId}`,
                updatedTransaction,
            );
            console.log("Successfully updated this transaction.");
            return true;
        } catch (error) {
            console.log("Cannot update this transaction.", error);
            return false;
        }
    },
    removeTransaction: async (transactionId) => {
        try {
            await axios.delete(`${TRANSACTIONS_URL}/${transactionId}`);
            console.log("Successfully removed this transaction.");
            return true;
        } catch (error) {
            console.log("Cannot remove this transaction.");
            return false;
        }
    },
};

export default transactionService;
