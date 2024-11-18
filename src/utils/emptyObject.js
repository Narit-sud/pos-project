import formatDate from "./formatDate";

export const emptyNewProductDetail = {
    id: "",
    name: "",
    brand: "",
    category: "",
    detail: "",
    cost: parseFloat(0),
    price: parseFloat(0),
    stock: parseInt(0),
    barcode: "",
};

export const emptyNewCategoryDetail = {
    id: "",
    name: "",
    color: "bg-zinc-200",
};

export const emptyNewBrandDetail = {
    id: "",
    name: "",
};

export const emptyNewSupplierDetail = {
    id: "",
    name: "",
    tel: "",
    location: "",
    detail: "",
};

export const emptyNewCustomer = {
    id: "",
    name: "",
    location: "",
    tel: "",
    detail: "",
};

export const emptyNewProcurementRecord = {
    id: "",
    supplier: "",
    datePurchase: "",
    dateReceived: "",
    dateRecord: formatDate.today(),
    total: 0,
};

export const emptyNewProcurementItem = {
    id: "",
    refId: "",
    brand: "",
    name: "",
    qty: 0,
    cost: 0,
    total: 0,
};
