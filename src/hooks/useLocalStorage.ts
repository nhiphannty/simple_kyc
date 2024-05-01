import { useState } from "react";

const useLocalStorage = <Type>(key: string, defaultValue?: any) => {
    const [localStorageValue, setLocalStorageValue] = useState<Type>(() => {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value) as Type;
        } else {
            if (defaultValue) localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = (value: Type) => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.removeItem(key);
        }
        setLocalStorageValue(value);
    };

    return [localStorageValue, setLocalStorageStateValue] as [Type, Function];
};

export default useLocalStorage;
