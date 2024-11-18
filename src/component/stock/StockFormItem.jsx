function StockFormItem(props) {
    const { item, removeItem, handleItemChange, editMode } = props;

    // const newItem = { id, brand, category, cost, qty: 0 };
    return (
        <div className="my-1 grid w-full grid-cols-7 place-items-center border-b">
            <p>{item.category}</p>
            <p>{item.brand}</p>
            <p>{item.name}</p>
            <input
                type="text"
                id={item.id}
                name="qty"
                value={item.qty}
                onChange={handleItemChange}
                min={1}
                className={`${editMode ? "font-bold" : "bg-gray-200"} w-10 border-b text-center`}
                readOnly={!editMode}
            />
            <input
                type="number"
                name="cost"
                id={item.id}
                value={item.cost}
                onChange={handleItemChange}
                min={0}
                className={`${editMode ? "font-bold" : "bg-gray-200"} w-10 border-b text-center`}
                readOnly={!editMode}
            />
            <p>{item.total}</p>
            <button
                type="button"
                onClick={() => {
                    removeItem(item.id);
                }}
                className={`${editMode ? "border-red-500 text-red-500" : "border-gray-500 text-gray-500"} rounded border p-1`}
                disabled={!editMode}
            >
                Remove
            </button>
        </div>
    );
}

export default StockFormItem;
