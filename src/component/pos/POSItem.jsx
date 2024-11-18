function POSItem(props) {
    const { product, addToCart, currentCart } = props;
    const thisItemAdded = currentCart.find((item) => item.id === product.id);
    const handleProductClick = () => {
        addToCart(product);
    };
    const availableQty = thisItemAdded
        ? parseInt(product.stock - thisItemAdded.qty)
        : parseInt(product.stock);

    return (
        <div
            className="relative m-1 select-none rounded-xl border p-2 text-center"
            onClick={handleProductClick}
        >
            <p>{product.brand}</p>
            <p>{product.name}</p>
            <p className="text-sm text-gray-500">(Available: {availableQty})</p>
            {thisItemAdded && (
                <p className="absolute right-1 top-1 size-6 rounded-full bg-red-500 text-center text-white">
                    {thisItemAdded.qty}
                </p>
            )}
        </div>
    );
}

export default POSItem;
