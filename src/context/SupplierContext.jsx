import { createContext, useState, useEffect } from "react";
import supplierService from "../service/supplierService";
import { nanoid } from "nanoid";

export const SupplierContext = createContext();

export function SupplierProvider({ children }) {
    const [allSuppliers, setAllSuppliers] = useState([]);

    const loadSupplier = async () => {
        const res = await supplierService.getAllSuppliers();
        setAllSuppliers(res.data);
    };

    const createNewSupplier = async (newSupplier) => {
        if (newSupplier.name.trim() === "") {
            alert("Please enter supplier name.");
        } else {
            const newSupplierWithId = { ...newSupplier, id: nanoid(8) };
            const res =
                await supplierService.createNewSupplier(newSupplierWithId);
            if (res.status === 201) {
                alert("Success!");
                loadSupplier();
            }
        }
    };

    const updateSupplier = async (supplierId, updatedSupplier) => {
        if (updatedSupplier.name.trim() === "") {
            alert("Supplier name cannot be empty.");
        } else {
            const res = await supplierService.updateSupplier(
                supplierId,
                updatedSupplier,
            );
            if (res.status === 200) {
                alert("Success!");
                loadSupplier();
            } else {
                alert("Failed to update this supplier. Please try again");
            }
        }
    };

    const removeSupplier = async (supplierId) => {
        const res = await supplierService.removeSupplier(supplierId);
        if (res.status === 200) {
            alert("Success!");
            loadSupplier();
        } else {
            alert("Failed to remove this supplier. Please try again.");
        }
    };

    useEffect(() => {
        loadSupplier();
    }, []);
    const share = {
        allSuppliers,
        loadSupplier,
        createNewSupplier,
        updateSupplier,
        removeSupplier,
    };
    return (
        <SupplierContext.Provider value={share}>
            {children}
        </SupplierContext.Provider>
    );
}
