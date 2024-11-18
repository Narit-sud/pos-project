import salesService from "../../service/salesService";

function SaleReportDisplay(props) {
    const { sale, closePopup } = props;

    const handleRemoveButton = async () => {
        const confirmedRemove = confirm(
            "This sale will be deleted forever, items contained in this sale will be rolled back. Continue?",
        );
        if (confirmedRemove) {
            const isSaleRemoved = await salesService.removeSale(sale.id);
            if (isSaleRemoved) {
                alert("Sale has been removed.");
                closePopup();
            }
        }
    };
    return (
        <div className="flex flex-col rounded-lg border p-2">
            <div className="flex flex-col text-left">
                <div>
                    <span className="font-bold">Date: </span>
                    <span>{sale.date}</span>
                </div>

                <div>
                    <span className="font-bold">Customer: </span>
                    <span>{sale.customer || "General"}</span>
                </div>

                <div>
                    <span className="font-bold">Price before discount: </span>
                    <span>{sale.total}</span>
                </div>

                <div>
                    <span className="font-bold">Discount: </span>
                    <span>{sale.discount}</span>
                </div>

                <div>
                    <span className="font-bold">Price after discount: </span>
                    <span>{sale.total - sale.discount}</span>
                </div>
            </div>
            <div className="max-h-[30vh] overflow-y-scroll rounded-md border p-1">
                <div className="flex flex-col">
                    {sale.items.map((item) => {
                        return (
                            <span className="mt-1" key={item.id}>
                                {item.category} {item.brand} {item.name} x
                                {item.qty} ={item.qty * item.price}
                            </span>
                        );
                    })}
                </div>
            </div>
            <div className="my-2 flex justify-evenly">
                <button
                    type="button"
                    onClick={handleRemoveButton}
                    className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-white"
                >
                    Delete
                </button>
                <button
                    type="button"
                    onClick={closePopup}
                    className="rounded-lg border border-green-500 bg-white px-4 py-2 text-green-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default SaleReportDisplay;
