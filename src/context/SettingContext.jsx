import { createContext, useEffect, useState } from "react";
import settingService from "../service/settingService";

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
    const [allSettings, setAllSetting] = useState([]);

    const loadSettings = async () => {
        const settings = await settingService.getAllSettings();
        setAllSetting(settings);
    };

    useEffect(() => {
        loadSettings();
    });

    const share = { allSettings, loadSettings };
    return (
        <SettingContext.Provider value={share}>
            {children}
        </SettingContext.Provider>
    );
};
