export const validateStock = (header, items) => {
    if (
        //check header data
        header.supplier === "" ||
        header.dateReceived === "" ||
        header.dateOrder === ""
    ) {
        alert("Please add date and supplier details.");
        return false;
    } else if (!items.length) {
        //check items if empty?
        alert("Please add product.");
        return false;
    } else {
        const invalidNumbers = items.some(
            //if some cost or qty is unparsefloatable, return true
            (item) => !parseFloat(item.cost) || !parseFloat(item.qty),
        );
        if (invalidNumbers) {
            //check cost and qty field
            alert(`Some "Cost" or "Qty" are missing.`);
            return false;
        } else {
            return true;
        }
    }
};
