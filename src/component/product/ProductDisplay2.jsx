import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate, Link } from "react-router-dom";
import ProductFilter from "../utils/ProductFilter";
import { BrandContext } from "../../context/BrandContext";
import { CategoryContext } from "../../context/CategoryContext";
import setting from "../../service/setting";

function ProductDisplay2() {
    // ===============================================================================
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { allProducts } = useContext(ProductContext);
    const { allBrands } = useContext(BrandContext);
    const { allCategories } = useContext(CategoryContext);

    const [search, setSearch] = useState("");
    const [preSetFilter, setPreSetFilter] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("");
    const [filteredByCategory, setFilteredByCategory] = useState([]);

    const [selectableBrands, setSelectableBrands] = useState([]);
    const [brandFilter, setBrandFilter] = useState("");
    const [filteredByBrand, setFilteredByBrand] = useState([]);

    const [displayingProduct, setDisplayingProduct] = useState([]);

    // ===============================================================================

    const handleFilterChange = (e) => {
        setPreSetFilter("");
        const { name, value } = e.target;
        if (name === "category") {
            setCategoryFilter(value);
            const filtered = allProducts.filter(
                (product) => product.category === value,
            );
            setDisplayingProduct(filtered);
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
            setDisplayingProduct(filtered);
        }
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearch(value);
        handleSearch();
    };
    const handleSearch = () => {
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
        setDisplayingProduct(isSearched);
    };

    const handlePresetFilterClick = (filter) => {
        resetFilter();
        if (filter === preSetFilter) {
            setPreSetFilter("");
        } else {
            setPreSetFilter(filter);
        }
    };

    const resetFilter = () => {
        setSearch("");
        setCategoryFilter("");
        setBrandFilter("");
        setPreSetFilter("");
        setDisplayingProduct(allProducts);
    };

    const numShow = {
        outOfStock: allProducts.filter((product) => product.stock === 0).length,
        lowOnStock: allProducts.filter(
            (product) =>
                product.stock <= setting.stock.lowStockAlert &&
                product.stock !== 0,
        ).length,
    };
    const totalValue = allProducts.reduce((acc, product) => {
        return parseInt(acc + product.stock * product.cost);
    }, 0);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    useEffect(() => {
        setDisplayingProduct(allProducts);
    }, [allProducts]);

    useEffect(() => {
        if (preSetFilter === "readyToSell") {
            setDisplayingProduct(
                allProducts.filter(
                    (product) => product.stock > setting.stock.lowStockAlert,
                ),
            );
        } else if (preSetFilter === "lowOnStock") {
            setDisplayingProduct(
                allProducts.filter(
                    (product) =>
                        product.stock <= setting.stock.lowStockAlert &&
                        product.stock !== 0,
                ),
            );
        } else if (preSetFilter === "outOfStock") {
            setDisplayingProduct(
                allProducts.filter((product) => product.stock === 0),
            );
        } else {
            setDisplayingProduct(allProducts);
        }
    }, [preSetFilter]);

    return (
        <div className="mt-1 h-[91vh] overflow-y-auto p-2">
            <div className="flex flex-row justify-center gap-1">
                <div
                    className={`grid place-items-center rounded-lg border bg-green-100 p-2 text-center ${preSetFilter === "readyToSell" ? "border-4 border-blue-400" : ""}`}
                    onClick={() => {
                        handlePresetFilterClick("readyToSell");
                    }}
                >
                    <p className="text-lg font-bold text-green-600">
                        {allProducts.length -
                            numShow.outOfStock -
                            numShow.lowOnStock}
                    </p>
                    <img
                        src="../../../public/box-tick-svgrepo-com.svg"
                        alt=""
                        className="size-7"
                    />
                    <p className="text-gray-600">Ready to sell</p>
                </div>
                <div
                    className={`grid place-items-center rounded-lg border bg-yellow-100 p-2 text-center ${preSetFilter === "lowOnStock" ? "border-4 border-blue-400" : ""}`}
                    onClick={() => {
                        handlePresetFilterClick("lowOnStock");
                    }}
                >
                    <p className="text-lg font-bold text-yellow-600">
                        {numShow.lowOnStock}
                    </p>
                    <img
                        src="../../../public/box-add-svgrepo-com.svg"
                        alt=""
                        className="size-7"
                    />
                    <p className="text-gray-600">Low on stock</p>
                </div>
                <div
                    className={`grid place-items-center rounded-lg border bg-red-100 p-2 text-center ${preSetFilter === "outOfStock" ? "border-4 border-blue-400" : ""}`}
                    onClick={() => {
                        handlePresetFilterClick("outOfStock");
                    }}
                >
                    <p className="text-lg font-bold text-red-500">
                        {numShow.outOfStock}
                    </p>
                    <img
                        src="../../../public/box-remove-svgrepo-com.svg"
                        alt=""
                        className="size-7"
                    />
                    <p className="text-gray-600">Out of stock</p>
                </div>
            </div>

            <div className="p-2">
                <p className="text-center text-gray-400">{`${allProducts.length} items / total cost ${totalValue}`}</p>
            </div>

            <div className="">
                <button
                    className={`${categoryFilter !== "" || brandFilter !== "" || search !== "" ? "" : "hidden"} flex flex-row justify-between rounded border bg-red-500 px-3 py-1 text-white`}
                    onClick={resetFilter}
                >
                    Clear filter
                    <img
                        src="../../../public/filter-xmark-svgrepo-com.svg"
                        alt=""
                        className="size-5 fill-white"
                    />
                </button>
                <div className="grid grid-cols-4 gap-2">
                    <input
                        type="text"
                        value={search}
                        className="col-span-3 border p-1 text-center"
                        placeholder="Search by name"
                        onChange={handleSearchChange}
                    />
                    <button
                        type="button"
                        className={`flex justify-center rounded border border-gray-300 bg-gray-100 px-4 py-2 ${isFilterOpen && "bg-gray-300"}`}
                        onClick={toggleFilter}
                    >
                        <img
                            src="../../../public/filter-svgrepo-com.svg"
                            alt=""
                            className="size-6"
                        />
                    </button>
                </div>
                <div
                    className={`${isFilterOpen ? "flex flex-col md:grid md:grid-cols-2 md:gap-2" : "hidden"} `}
                >
                    <ProductFilter
                        text="All categories"
                        options={allCategories}
                        onChange={handleFilterChange}
                        value={categoryFilter}
                        name="category"
                        style="py-3 text-center border rounded-lg mt-2 bg-gray-100 border-gray-300 text-gray-600"
                    />
                    <ProductFilter
                        text="All brands"
                        options={selectableBrands}
                        onChange={handleFilterChange}
                        value={brandFilter}
                        name="brand"
                        style="py-3 text-center border rounded-lg mt-2 bg-gray-100 border-gray-300 text-gray-600"
                    />
                </div>
                <Link to={"create"}>
                    <button
                        type="button"
                        className="col-span-4 my-2 w-full rounded-lg bg-green-500 p-3 font-bold text-white"
                    >
                        Create product
                    </button>
                </Link>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border bg-white py-4 text-center">
                <div className="grid grid-cols-5">
                    <p>Category</p>
                    <p>Brand</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Stock</p>
                </div>
                <div className="text-center">
                    {displayingProduct.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className="grid grid-cols-5 border p-2"
                                onClick={() => {
                                    navigate(product.id, product.id);
                                }}
                            >
                                <p>{product.category || "-"}</p>
                                <p>{product.brand || "-"}</p>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.stock}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay2;
