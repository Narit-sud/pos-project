import React from "react";

function ReportCard(props) {
    const { text = "Report Header", amount = 0 } = props;
    return (
        <div className="flex h-20 w-32 flex-col items-center justify-center rounded-md border-2 bg-white">
            <p className="text-sm">{text}</p>
            <p className="text-xl">{amount} ฿</p>
            <p></p>
        </div>
    );
}

export default ReportCard;
