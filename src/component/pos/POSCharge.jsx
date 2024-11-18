import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import ChargeMoney from "./ChargeMoney";

function POSCharge(props) {
    const { closePopup } = props;
    const { handleCharge, totalPrice, cartDetail } = useContext(CartContext);
    const [received, setReceived] = useState(0);
    const [change, setChange] = useState(0);

    const handleAddReceive = (amount) => {
        setReceived((prev) => prev + amount);
    };

    const handleSaveButton = async () => {
        if (
            received >=
            parseFloat(totalPrice) - parseFloat(cartDetail.discount)
        ) {
            const saleClosed = await handleCharge();
            if (saleClosed) {
                closePopup();
            }
        } else {
            alert("Need more money.");
        }
    };

    useEffect(() => {
        setChange(parseInt(totalPrice - cartDetail.discount - received) * -1);
    }, [received]);
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="font-bold">
                <span>Total: </span>
                <span>{totalPrice - cartDetail.discount}</span>
            </div>
            <div className="font-bold">
                <span>Receive: </span>
                <span>{received}</span>
            </div>
            <div className="font-bold">
                <span>Change: </span>
                <span>{change > 0 ? change : "-"}</span>
            </div>
            <div className="flex flex-col place-items-center">
                <div className="flex flex-row">
                    <ChargeMoney
                        amount={1}
                        type="coin"
                        color="gray"
                        onClick={() => handleAddReceive(1)}
                    />
                    <ChargeMoney
                        amount={2}
                        type="coin"
                        color="bg-yellow-100 border-yellow-500 "
                        onClick={() => handleAddReceive(2)}
                    />
                    <ChargeMoney
                        amount={5}
                        type="coin"
                        style="bg-gray-100 border-gray-500"
                        onClick={() => handleAddReceive(5)}
                    />
                    <ChargeMoney
                        amount={10}
                        type="coin"
                        style="bg-yellow-100 border-gray-500"
                        onClick={() => handleAddReceive(10)}
                    />
                </div>
                <div className="flex flex-row">
                    <ChargeMoney
                        amount={20}
                        type="bill"
                        style="bg-green-100 border-green-500"
                        onClick={() => handleAddReceive(20)}
                    />
                    <ChargeMoney
                        amount={50}
                        type="bill"
                        style="bg-blue-100 border-blue-500"
                        onClick={() => handleAddReceive(50)}
                    />
                    <ChargeMoney
                        amount={100}
                        type="bill"
                        style="bg-red-100 border-red-500"
                        onClick={() => handleAddReceive(100)}
                    />
                </div>
                <div className="flex flex-row">
                    <ChargeMoney
                        amount={500}
                        type="bill"
                        style="bg-purple-100 border-purple-500"
                        onClick={() => handleAddReceive(500)}
                    />
                    <ChargeMoney
                        amount={1000}
                        type="bill"
                        style="bg-gray-100 border-gray-500"
                        onClick={() => handleAddReceive(1000)}
                    />
                </div>
            </div>
            <div className="my-3 flex justify-evenly">
                <button
                    type="button"
                    onClick={handleSaveButton}
                    className="m-1 rounded border border-green-500 bg-green-500 px-4 py-2 text-white"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={closePopup}
                    className="m-1 rounded border border-green-500 bg-white px-4 py-2 text-green-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default POSCharge;
