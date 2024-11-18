export const registerStock = (record) => {
    if (!record.isRegistered) {
        //extract items to edit
        const { items } = record;
        console.log("I will handle this:", items);

        const registeredRecord = {
            ...record,
            isRegistered: true,
            items,
        };
        console.log(registeredRecord);
    } else {
        console.log("I am not going to do this job.");
    }
};
