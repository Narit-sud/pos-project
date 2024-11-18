import axios from "axios";
import { SETTING_URL } from "../utils/constants";

const settingService = {
    getAllSettings: async () => {
        try {
            const res = await axios.get(SETTING_URL);
            return res.data;
        } catch (error) {
            console.log("Cannot load setting.", error);
            return false;
        }
    },
    update: async (updatedSetting) => {
        try {
            // const res = await axios.pos(`${}/${}`)
        } catch (error) {
            console.log("Cannot update setting.", error);
        }
    },
};
export default settingService;
