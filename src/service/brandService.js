import { BRAND_URL } from "../utils/constants";
import axios from "axios";

const brandService = {
    getAllBrands: async () => {
        try {
            const res = await axios.get(BRAND_URL);
            return res;
        } catch (error) {
            console.log("Cannot get brand data.", error);
        }
    },
    getSingleBrand: async (brandId) => {
        try {
            const res = await axios.get(`${BRAND_URL}/${brandId}`);
            return res;
        } catch (error) {
            console.log("Cannot get this brand data.", error);
        }
    },
    createNewBrand: async (newBrand) => {
        try {
            const res = await axios.post(BRAND_URL, newBrand);
            return res;
        } catch (error) {
            console.log("Cannot create new brand.", error);
        }
    },
    updateBrand: async (brandId, updatedBrand) => {
        try {
            const res = await axios.put(
                `${BRAND_URL}/${brandId}`,
                updatedBrand,
            );
            return res;
        } catch (error) {
            console.log("Cannot update this brand.", error);
        }
    },
    removeBrand: async (brandId) => {
        try {
            const res = await axios.delete(`${BRAND_URL}/${brandId}`);
            return res;
        } catch (error) {
            console.log("Cannot remove this brand", error);
        }
    },
};
export default brandService;
