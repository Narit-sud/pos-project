import { RECORD_URL } from "../utils/constants.js";
import axios from "axios";

const recordService = {
    getAllRecords: async () => {
        try {
            const res = await axios.get(RECORD_URL);
            console.log("Records has been loaded.");
            return res.data;
        } catch (error) {
            console.log("Cannot get record data.", error);
            return false;
        }
    },
    getSingleRecord: async (recordId) => {
        try {
            const res = await axios.get(`${RECORD_URL}/${recordId}`);
            return res.data;
        } catch (error) {
            console.log("Cannot get this record data.", error);
            return false;
        }
    },
    createNewRecord: async (newRecord) => {
        try {
            await axios.post(RECORD_URL, newRecord);
            console.log("Successfully created new record.");
            return true;
        } catch (error) {
            console.log("Cannot create new stock.", error);
            return false;
        }
    },
    updateRecord: async (recordId, updatedRecord) => {
        try {
            await axios.put(`${RECORD_URL}/${recordId}`, updatedRecord);
            console.log("Successfully updated new record.");
            return true;
        } catch (error) {
            console.log("Cannot update this stock.", error);
            return false;
        }
    },
    removeRecord: async (recordId) => {
        try {
            await axios.delete(`${RECORD_URL}/${recordId}`);
            return true;
        } catch (error) {
            console.log("Cannot remove this stock", error);
            return false;
        }
    },
};
export default recordService;
