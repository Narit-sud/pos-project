import { createContext, useState, useEffect, useContext } from "react";
import brandService from "../service/brandService";
import { nanoid } from "nanoid";
import { ProductContext } from "./ProductContext";

export const BrandContext = createContext();

export function BrandProvider({ children }) {
    const { loadProduct } = useContext(ProductContext);
    const [allBrands, setAllBrands] = useState([]);

    const loadBrand = async () => {
        const res = await brandService.getAllBrands();
        setAllBrands(res.data);
    };
    const createNewBrand = async (newBrand) => {
        if (newBrand.name.trim() === "") {
            alert("Please enter brand name.");
        } else {
            const newBrandWithId = { ...newBrand, id: nanoid(8) };
            const res = await brandService.createNewBrand(newBrandWithId);
            if (res.status === 201) {
                alert("Success!");
                loadBrand();
            }
        }
    };

    const updateBrand = async (brandId, updatedBrand) => {
        if (updatedBrand.name.trim() === "") {
            alert("Brand name cannot be empty.");
        } else {
            const res = await brandService.updateBrand(brandId, updatedBrand);
            if (res.status === 200) {
                alert("Success!");
                loadBrand();
                loadProduct();
            } else {
                alert("Failed to update this brand. Please try again");
            }
        }
    };

    const removeBrand = async (brandId) => {
        const res = await brandService.removeBrand(brandId);
        if (res.status === 200) {
            alert("Success!");
            loadBrand();
        } else {
            alert("Failed to remove this brand. Please try again.");
        }
    };

    useEffect(() => {
        loadBrand();
    }, []);
    const share = {
        allBrands,
        loadBrand,
        createNewBrand,
        updateBrand,
        removeBrand,
    };
    return (
        <BrandContext.Provider value={share}>{children}</BrandContext.Provider>
    );
}
