import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

function ProductDisplayItem(props) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { removeProduct } = useContext(ProductContext);
    const toggleOpen = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };
    const {
        product = {
            id: "",
            name: "",
            brand: "",
            category: "",
            detail: "",
            cost: 0,
            price: 0,
            stock: 0,
            barcode: "",
        },
    } = props;

    const handleProductClick = () => {
        navigate(product.id, product.id);
    };
    const handleRemoveProduct = () => {
        removeProduct(product.id);
    };
    return (
        <div
            className="flex w-full flex-col items-center"
            onClick={handleProductClick}
        >
            {/* main display */}
            <div
                className={`${isOpen && "bg-gray-100"} mt-1 grid w-full grid-cols-5 place-items-center rounded border p-3 text-center sm:grid-cols-6 md:grid-cols-7`}
            >
                <span>{product.brand}</span>
                <span>{product.name}</span>
                <span>{product.price}</span>
                <span>{product.cost}</span>
                <span className="hidden sm:inline">{product.stock}</span>
                <span className="hidden md:inline">{product.barcode}</span>
                <button
                    type="button"
                    onClick={toggleOpen}
                    className={`size-8 rounded-full bg-gray-50 text-center`}
                >
                    <p
                        className={`${isOpen ? "" : "rotate-180"} w-full rounded-full`}
                    >
                        ^
                    </p>
                </button>
            </div>

            {/* options display */}
            {isOpen && (
                <div className="m-1 w-[90%] rounded bg-gray-100 p-1">
                    <button type="button" onClick={handleRemoveProduct}>
                        remove
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductDisplayItem;
