import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const navEnable = "py-2 border-b rounded w-full text-center text-black";
    const navDisable = "py-2 border-b rounded w-full text-center text-gray-300";

    return (
        <div id="navbarContainer" className="z-10 flex flex-col">
            <div className="flex h-[8vh] content-center justify-center bg-green-500">
                <button
                    type="button"
                    className="fixed left-3 top-2 z-10 size-10 rounded-lg bg-black sm:left-5 sm:top-5 sm:size-11"
                    onClick={toggleNav}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="absolute left-3 top-2 h-5 w-5 sm:top-3"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <span
                    onClick={() => {
                        navigate("");
                    }}
                    className="mt-2 h-fit w-fit text-center text-[1.5rem] font-bold text-white sm:mt-5"
                >
                    Narit POS
                </span>
            </div>
            {isNavOpen && (
                <nav
                    id="layout-nav-content"
                    className="flex flex-col transition-all duration-300 ease-in-out"
                >
                    <Link onClick={toggleNav} to="pos" className={navEnable}>
                        <div className="flex flex-row items-center justify-center">
                            <img
                                src="../../public/cart-plus-svgrepo-com.svg"
                                alt=""
                                className="size-6"
                            />
                            POS
                        </div>
                    </Link>
                    <Link
                        onClick={toggleNav}
                        to="product"
                        className={navEnable}
                    >
                        <div className="flex flex-row items-center justify-center">
                            <img
                                src="../../public/box-open-2-svgrepo-com.svg"
                                alt=""
                                className="size-7"
                            />
                            Products
                        </div>
                    </Link>
                    <Link onClick={toggleNav} to="stock" className={navEnable}>
                        <div className="flex flex-row items-center justify-center">
                            <img
                                src="../../public/bill-svgrepo-com.svg"
                                alt=""
                                className="size-6"
                            />
                            Stock
                        </div>
                    </Link>

                    <Link onClick={toggleNav} to="report" className={navEnable}>
                        <div className="flex flex-row items-center justify-center">
                            <img
                                src="../../public/graph-up-svgrepo-com.svg"
                                alt=""
                                className="size-6"
                            />
                            Sales Report
                        </div>
                    </Link>
                    <Link
                        onClick={toggleNav}
                        to="setting"
                        className={navEnable}
                    >
                        <div className="flex flex-row items-center justify-center">
                            <img
                                src="../../public/gear-svgrepo-com.svg"
                                alt=""
                                className="size-6"
                            />
                            Setting
                        </div>
                    </Link>
                </nav>
            )}
        </div>
    );
}

export default Navbar;
