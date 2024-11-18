import { createContext, useEffect, useState } from "react";
import customerService from "../service/customerService";
import { nanoid } from "nanoid";

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
    const [allCustomers, setAllCustomers] = useState([]);

    const loadCustomers = async () => {
        const res = await customerService.getAllCustomers();
        setAllCustomers(res.data);
    };

    const createNewCustomer = async (newCustomer) => {
        const newCustomerWithId = { ...newCustomer, id: nanoid(8) };
        const res = await customerService.createNewCustomer(newCustomerWithId);
        if (res.status === 201) {
            alert("Success!");
            loadCustomers();
        }
    };

    const updateCustomer = async (customerId, updatedCustomer) => {
        const res = await customerService.updateCustomer(
            customerId,
            updatedCustomer,
        );
        if (res.status === 200) {
            alert("Success!");
            loadCustomers();
        } else {
            alert("Failed to update this customer. Please try again");
        }
    };

    const removeCustomer = async (customerId) => {
        const res = await customerService.removeCustomer(customerId);

        if (res.status === 200) {
            alert("Success!");
            loadCustomers();
        } else {
            alert("Failed to remove this customer. Please try again.");
        }
    };
    useEffect(() => {
        loadCustomers();
    }, []);
    const share = {
        allCustomers,
        loadCustomers,
        createNewCustomer,
        updateCustomer,
        removeCustomer,
    };
    return (
        <CustomerContext.Provider value={share}>
            {children}
        </CustomerContext.Provider>
    );
};

export default CustomerProvider;
