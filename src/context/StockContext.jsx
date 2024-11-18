import { createContext, useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext.jsx";
import recordService from "../service/recordService.js";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [allStocks, setAllStocks] = useState([]);
    const { loadProduct } = useContext(ProductContext);

    const loadStocks = async () => {
        const res = await recordService.getAllRecords();
        setAllStocks(res);
    };

    const createNewStock = async (newStock, newMovement) => {
        //send request to create new stock record
        // const newStockRequest = await recordService.createNewStock(newStock);
        // if (newStockRequest.status === 201) {
        //     alert("Success!");
        //     const newMovementRequest =
        //         await stockMovementService.new(newMovement);
        //     if (newMovementRequest.status === 201) {
        //         loadStocks();
        //         loadProduct();
        //         return true;
        //     }
        // } else {
        //     aler("Failed to create new stock. Please try again.");
        //     return false;
        // }
    };

    //handle removing record
    const removeStock = async (recordId) => {
        const res = await recordService.removeRecord(recordId);
        if (res.status === 200) {
            alert("Success!");
            loadStocks();
        } else {
            alert("Failed to remove this stock. Please try again.");
        }
    };

    //first load stock
    useEffect(() => {
        loadStocks();
    }, []);
    const share = {
        allStocks,
        createNewStock,
        removeStock,
        loadStocks,
    };
    return (
        <StockContext.Provider value={share}>{children}</StockContext.Provider>
    );
};
