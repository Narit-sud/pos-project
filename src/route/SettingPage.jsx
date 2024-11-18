import { useState } from "react";
import CategorySetting from "../component/setting/CategorySetting";
import BrandSetting from "../component/setting/BrandSetting";
import SupplierSetting from "../component/setting/SupplierSetting";
import CustomerSetting from "../component/setting/CustomerSetting";
import StockSetting from "../component/setting/StockSetting";

function SettingPage() {
    const [setting, setSetting] = useState("category");

    const disabledButtion = "hidden";

    const buttonStyle = "border p-2 rounded mr-2 bg-white";
    const selectedButtonStyle = "bg-gray-500 p-1 rounded mr-1 text-white";

    return (
        <div className="p-2">
            <div
                className="h-fit w-full overflow-x-auto rounded border bg-gray-200 md:grid md:place-items-center"
                id="tabs-container"
            >
                <div className="m-2 w-fit whitespace-nowrap">
                    <button
                        type="button"
                        onClick={() => setSetting("category")}
                        className={`${setting === "category" ? selectedButtonStyle : buttonStyle}`}
                    >
                        Category
                    </button>
                    <button
                        type="button"
                        onClick={() => setSetting("brand")}
                        className={`${setting === "brand" ? selectedButtonStyle : buttonStyle}`}
                    >
                        Brand
                    </button>
                    {/* <button */}
                    {/*     type="button" */}
                    {/*     onClick={() => setSetting("stock")} */}
                    {/*     className={`${setting === "stock" ? selectedButtonStyle : buttonStyle}`} */}
                    {/* > */}
                    {/*     Stock */}
                    {/* </button> */}
                    <button
                        type="button"
                        onClick={() => setSetting("supplier")}
                        className={`${setting === "supplier" ? selectedButtonStyle : buttonStyle}`}
                    >
                        Supplier
                    </button>
                    <button
                        type="button"
                        onClick={() => setSetting("customer")}
                        className={`${setting === "customer" ? selectedButtonStyle : buttonStyle}`}
                    >
                        Customer
                    </button>
                    <button
                        type="button"
                        onClick={() => setSetting("pos")}
                        className={`${setting === "pos" ? "bg-gray-500 text-white" : disabledButtion} ${buttonStyle}`}
                    >
                        POS page
                    </button>
                </div>
            </div>
            <div>
                {setting === "category" && <CategorySetting />}
                {setting === "brand" && <BrandSetting />}
                {setting === "supplier" && <SupplierSetting />}
                {setting === "customer" && <CustomerSetting />}
                {setting === "stock" && <StockSetting />}
                {setting === "pos" && (
                    <span>POS page setting is under construction</span>
                )}
            </div>
        </div>
    );
}

export default SettingPage;
