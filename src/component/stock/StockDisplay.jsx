import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StockContext } from "../../context/StockContext";
import StockDisplayItem from "./StockDisplayItem";

function StockDisplay() {
    const { allStocks } = useContext(StockContext);
    const navigate = useNavigate();
    const handleCreateButton = () => {
        navigate("create");
    };
    return (
        <div className="relative h-[88vh] overflow-x-auto whitespace-nowrap p-2">
            <h1 className="flex flex-row text-3xl font-bold text-gray-500">
                Stock Records
            </h1>
            <button
                type="button"
                onClick={handleCreateButton}
                className="absolute bottom-2 right-2 flex size-12 items-center justify-center rounded-full border border-green-500 bg-green-500 px-4 py-2 text-xl text-white"
            >
                +
            </button>
            <div className="h-[80vh] overflow-x-auto rounded-lg border p-2 pb-20 text-center">
                <div className="grid w-full grid-cols-4 gap-8 border-b-2 font-bold">
                    <p>Date</p>
                    <p>Supplier</p>
                    <p>Items</p>
                    <p>Total</p>
                </div>
                <div className="h-fit">
                    {allStocks.map((record) => {
                        return (
                            <StockDisplayItem key={record.id} record={record} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default StockDisplay;
