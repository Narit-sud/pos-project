import { useState } from "react";
import Popup from "../../layout/Popup";
import SaleReportDisplay from "./SaleReportDisplay";

function SaleReportItem(props) {
    const { sale } = props;
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            onClick={togglePopup}
            className="grid grid-cols-6 gap-10 whitespace-nowrap border p-2 text-center max-md:w-[500px]"
        >
            <span className="col-span-2">{sale.date}</span>
            <span>{sale.customer || "General"}</span>
            <span>{sale.items.length}</span>
            <span>{sale.discount}</span>
            <span>{sale.total - sale.discount}</span>
            {isOpen && (
                <Popup closePopup={togglePopup}>
                    <SaleReportDisplay closePopup={togglePopup} sale={sale} />
                </Popup>
            )}
        </div>
    );
}

export default SaleReportItem;
