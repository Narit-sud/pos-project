const validateProduct = (product) => {
    //validate empty items
    if (
        product.name.trim() === "" ||
        product.price === "" ||
        product.cost === "" ||
        product.stock === ""
    ) {
        alert("Please fill required field.");
        return false;
    }
    //validate numbers
    if (product.price < 0 || product.cost < 0 || product.stock < 0) {
        alert("Number cannot be negative.");
        return false;
    } else {
        return true;
    }
};

export default validateProduct;
