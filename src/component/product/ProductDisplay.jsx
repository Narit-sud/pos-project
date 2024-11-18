import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductDisplayItem from "./ProductDisplayItem";
import ProductFilter from "../utils/ProductFilter";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryContext";
import { BrandContext } from "../../context/BrandContext";

function ProductDisplay(props) {
    const { enableCreate = true } = props;
    const { allProducts } = useContext(ProductContext);
    const { allCategories } = useContext(CategoryContext);
    const { allBrands } = useContext(BrandContext);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectableBrands, setSelectableBrands] = useState([]);
    const [brandFilter, setBrandFilter] = useState("");
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [filteredByCategory, setFilteredByCategory] = useState([]);
    const [filteredByBrand, setFilteredByBrand] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            setCategoryFilter(value);
            const filtered = allProducts.filter(
                (product) => product.category === value,
            );
            setFilteredProduct(filtered);
            setFilteredByCategory(filtered);
            setBrandFilter("");
            const filteredSelectableBrands = allBrands.filter(
                (brand) => brand.category === value,
            );
            setSelectableBrands(filteredSelectableBrands);
        }
        if (name === "brand") {
            setBrandFilter(value);
            const filtered = filteredByCategory.filter(
                (product) => product.brand === value,
            );
            setFilteredByBrand(filtered);
            setFilteredProduct(filtered);
        }
    };

    const handleSearchButton = () => {
        let isSearched = [];
        if (!categoryFilter && !brandFilter) {
            //if categoryFilter and brandFilter are empty
            //filter from allProducts
            isSearched = allProducts.filter((product) =>
                JSON.stringify(product)
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            );
        } else if (categoryFilter && !brandFilter) {
            //if categoryFilter is not empty but brandFilter is empty
            //filter from filteredByCategory
            isSearched = filteredByCategory.filter((product) =>
                JSON.stringify(product)
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            );
        } else if (brandFilter) {
            //if brandFilter is not empty
            //filter from filteredByBrand
            isSearched = filteredByBrand.filter((product) =>
                JSON.stringify(product)
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            );
        } else {
            alert("Something went wrong with searching.");
        }
        setFilteredProduct(isSearched);
    };

    const handleResetSearchButton = () => {
        setFilteredProduct(allProducts);

        setSearch("");
        setSelectableBrands([]);

        setFilteredByCategory([]);
        setCategoryFilter("");

        setFilteredByBrand([]);
        setBrandFilter("");
    };
    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchButton();
        }
    };

    useEffect(() => {
        setFilteredProduct(allProducts);
    }, [allProducts]);
    return (
        <div className="flex max-h-[92vh] flex-col">
            {enableCreate && (
                <div className="grid grid-cols-3">
                    <Link to={"create"}>
                        <button
                            type="button"
                            className="m-1 rounded bg-green-500 p-2 text-white"
                        >
                            Create product
                        </button>
                    </Link>
                    <ProductFilter
                        text="All categories"
                        options={allCategories}
                        onChange={handleFilterChange}
                        value={categoryFilter}
                        name="category"
                    />
                    <ProductFilter
                        text="All brands"
                        options={selectableBrands}
                        onChange={handleFilterChange}
                        value={brandFilter}
                        name="brand"
                    />
                    <div className="col-span-3 mx-1 grid grid-cols-5">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            className="col-span-3 h-12 w-full rounded border text-center"
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            type="button"
                            className="m-1 rounded border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                            onClick={handleSearchButton}
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            className="m-1 rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                            onClick={handleResetSearchButton}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
            <div className="mt-1 grid grid-cols-5 place-items-center rounded border p-3 text-center font-bold sm:grid-cols-6 md:grid-cols-7">
                <span>Brand</span>
                <span>Name</span>
                <span>Price</span>
                <span>Cost</span>
                <span className="hidden sm:inline">Stock</span>
                <span className="hidden md:inline">Barcode</span>
                <span>..</span>
            </div>
            <div className="flex-grow overflow-y-auto">
                {filteredProduct.map((product) => {
                    return (
                        <ProductDisplayItem
                            product={product}
                            key={product.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ProductDisplay;
