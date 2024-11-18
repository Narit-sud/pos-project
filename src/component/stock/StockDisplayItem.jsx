import { useEffect, useState } from "react";
import transactionService from "../../service/transactionService";
import { useNavigate } from "react-router-dom";

function StockDisplayItem(props) {
    const { record } = props;
    const navigate = useNavigate();
    const [itemsQty, setItemsQty] = useState(0);

    const handleItemClick = () => {
        navigate(record.id, record.id);
    };

    const loadTransaction = async () => {
        const transaction = await transactionService.getSingleTransaction(
            record.transactionId,
        );
        setItemsQty(transaction.items.length);
    };

    useEffect(() => {
        loadTransaction();
    }, []);
    return (
        <div
            onClick={handleItemClick}
            className="my-2 grid w-full grid-cols-4 gap-8 border-b"
        >
            <span>{record.dateRecord}</span>
            <span>{record.supplier}</span>
            <span>{itemsQty}</span>
            <span>{record.total} ฿</span>
        </div>
    );
}

export default StockDisplayItem;
