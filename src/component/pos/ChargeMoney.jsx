import { useState } from "react";

function ChargeMoney(props) {
    const {
        amount = 0,
        onClick = () => {
            console.log("please add onClick handler");
        },
        type = "coin",
        style = "",
    } = props;
    const [count, setCount] = useState(0);
    return (
        <div
            onClick={() => {
                onClick();
                setCount((prev) => prev + 1);
            }}
            className={`${type === "coin" && "size-16 rounded-full"} ${type === "bill" && "h-14 w-20"} relative m-1 flex items-center justify-center border-2 ${style}`}
        >
            {amount} Bth
            {count > 0 && (
                <p className="absolute right-0 top-0 size-4 rounded-full bg-red-500 text-center text-xs text-white">
                    {count}
                </p>
            )}
        </div>
    );
}

export default ChargeMoney;
