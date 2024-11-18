import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { BrandContext } from "../context/BrandContext";
import { CategoryContext } from "../context/CategoryContext";

function HomePage() {
    const { allProducts } = useContext(ProductContext);
    const { allBrands } = useContext(BrandContext);
    const { allCategories } = useContext(CategoryContext);
    return (
        <div className="flex h-[90%] flex-col items-center justify-center">
            <p className="m-10 text-3xl">Home</p>
            <div>
                <span>Categories: </span> <span>{allCategories.length}</span>
            </div>
            <div>
                <span>Brands: </span> <span>{allBrands.length}</span>
            </div>
            <div>
                <span>Products: </span> <span>{allProducts.length}</span>
            </div>
        </div>
    );
}

export default HomePage;
