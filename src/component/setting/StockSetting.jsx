import { useContext, useEffect, useState } from "react";
import { SettingContext } from "../../context/SettingContext";

function StockSetting() {
    const { allSettings } = useContext(SettingContext);
    const [setting, setSetting] = useState({});

    const handleSettingChange = (e) => {
        const { id, value } = e.target;
        console.log("e.targer", e.target);
        console.log("setting", setting);
    };
    useEffect(() => {
        setSetting(allSettings);
        console.log(allSettings.stock.lowStockAlert);
    }, []);
    return (
        <div>
            <div className="">
                <label hfmlFor="lowStockAlert">Low Stock</label>{" "}
                <input
                    type="number"
                    id="stock.lowStockAlert"
                    value={setting.stock.lowStockAlert}
                    onChange={handleSettingChange}
                />
            </div>
        </div>
    );
}

export default StockSetting;
