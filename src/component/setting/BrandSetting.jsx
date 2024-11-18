import { useContext, useState } from "react";
import { BrandContext } from "../../context/BrandContext";
import BrandSettingItem from "./BrandSettingItem";
import BrandCreate from "../utils/BrandCreate";
import Popup from "../../layout/Popup";

function BrandSetting() {
    const { allBrands } = useContext(BrandContext);
    const [createMode, setCreateMode] = useState(false);
    return (
        <div className="h-[85vh] overflow-y-auto pb-10">
            <div className="overflow-y-auto overflow-x-hidden sm:grid sm:h-fit sm:grid-cols-2">
                {allBrands.map((brand) => {
                    return <BrandSettingItem brand={brand} key={brand.id} />;
                })}
            </div>

            <div className="m-4 flex justify-center">
                <button
                    type="button"
                    onClick={() => setCreateMode(true)}
                    className="rounded-lg border border-green-500 bg-green-500 px-4 py-2 text-white"
                >
                    Create new brand
                </button>
            </div>
            {createMode && (
                <Popup
                    closePopup={() => {
                        setCreateMode(false);
                    }}
                >
                    <BrandCreate
                        closePopup={() => {
                            setCreateMode(false);
                        }}
                    />
                </Popup>
            )}
        </div>
    );
}

export default BrandSetting;
