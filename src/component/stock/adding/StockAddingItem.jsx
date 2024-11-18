import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { BrandContext } from "../../../context/BrandContext";
import { CategoryContext } from "../../../context/CategoryContext";

function StockAddingItem(props) {
    const {
        closePopup = () => {
            console.log("add popup closer function please.");
        },
        addItem,
    } = props;
    const { allProducts } = useContext(ProductContext);
    const { allBrands } = useContext(BrandContext);
    const { allCategories } = useContext(CategoryContext);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectableBrand, setSelectableBrand] = useState([]);

    const handleCategoryButton = (value) => {
        setSelectedCategory(value);
        const filter = allProducts.filter(
            (product) => product.category === value,
        );
        setFilteredProducts(filter);
        setSelectedBrand("");
    };

    const handleBrandButton = (value) => {
        const filter = filterProduct(value);
        setSelectedBrand(value);
        setFilteredProducts(filter);
    };

    const handleProductButton = (value) => {
        addItem(value);
        closePopup();
    };

    const filterProduct = (brand) => {
        const firstFiltered = allProducts.filter(
            (product) => product.category === selectedCategory,
        );
        const secondFiltered = firstFiltered.filter(
            (product) => product.brand === brand,
        );
        return secondFiltered;
    };

    useEffect(() => {
        const filteredBrands = allBrands.filter(
            (brand) => brand.category === selectedCategory,
        );
        setSelectableBrand(filteredBrands);
    }, [selectedCategory]);
    return (
        <div className="flex h-[80vh] w-full flex-col justify-center">
            <span className="mb-2 text-center font-bold">Select Product</span>
            <span className="ml-1 text-sm text-gray-600">
                Category: {selectedCategory}
            </span>
            <div
                id="categorySection"
                className="h-[20vh] w-full overflow-x-auto rounded border p-2"
            >
                <div className="grid grid-cols-2 gap-1">
                    {allCategories.map((category) => {
                        return (
                            <button
                                key={category.id}
                                onClick={() =>
                                    handleCategoryButton(category.name)
                                }
                                className={`w-full whitespace-nowrap rounded border px-2 py-1 font-bold ${selectedCategory === category.name ? "bg-yellow-200" : ""}`}
                            >
                                {category.name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <span className="ml-1 text-sm text-gray-600">
                Brand: {selectedBrand}
            </span>
            <div
                id="brandSection"
                className="w-full overflow-x-auto rounded border p-2"
            >
                <div className="grid h-auto max-h-[20vh] grid-cols-2 gap-1">
                    {selectableBrand.map((brand) => {
                        return (
                            <button
                                key={brand.id}
                                onClick={() => handleBrandButton(brand.name)}
                                className={`rounded border px-2 py-1 font-bold ${selectedBrand === brand.name ? "bg-yellow-200" : ""}`}
                                disabled={selectedBrand === brand.name}
                            >
                                {brand.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <span className="ml-1 text-sm text-gray-600">Product</span>
            <div
                id="productSection"
                className="h-[40vh] overflow-y-auto rounded border p-2"
            >
                <div className="h-fit">
                    {filteredProducts.map((product) => {
                        return (
                            <button
                                key={product.id}
                                onClick={() => handleProductButton(product)}
                                className="w-full rounded border px-1 py-1"
                            >
                                {`${product.brand} ${product.name}`}
                            </button>
                        );
                    })}
                </div>
            </div>
            <button
                type="button"
                onClick={closePopup}
                className="my-2 rounded border border-green-500 bg-white px-4 py-2 text-green-500"
            >
                Close
            </button>
        </div>
    );
}

export default StockAddingItem;
