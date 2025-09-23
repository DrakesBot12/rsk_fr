// helpers.js
import { useState, useEffect } from "react";

export function useDropdownFilter(controlledValue, onChange, src, name, options) {
    // Добавляем параметр options
    const [value, setValue] = useState(controlledValue || "");
    const [regions, setRegions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // sync controlledValue
    useEffect(() => {
        if (controlledValue !== undefined) setValue(controlledValue);
    }, [controlledValue]);

    // fetch regions только если не передан options или он пустой, и src указан
    useEffect(() => {
        // Если передан options, это массив и он не пустой, используем его вместо загрузки из файла
        if (options && Array.isArray(options) && options.length > 0) {
            // Уникализируем и сортируем опции для лучшего UX (опционально, но рекомендуется)
            const uniqueOptions = [...new Set(options)];
            uniqueOptions.sort((a, b) => a.localeCompare(b));
            setRegions(uniqueOptions);
            return;
        }

        // Иначе загружаем из файла как раньше
        if (src) {
            fetch(src)
                .then((res) => res.text())
                .then((text) => {
                    const loadedRegions = text
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean);
                    // Уникализируем и сортируем загруженные данные (опционально)
                    const uniqueLoaded = [...new Set(loadedRegions)];
                    uniqueLoaded.sort((a, b) => a.localeCompare(b));
                    setRegions(uniqueLoaded);
                })
                .catch((err) => console.error("Failed to load regions:", err));
        }
    }, [src, options]); // Добавляем options в зависимости

    // filter
    useEffect(() => {
        if (!value) {
            setFiltered([]);
            setShowDropdown(false);
            return;
        }
        const matches = regions.filter((r) => r.toLowerCase().includes(value.toLowerCase()));
        setFiltered(matches);
        setShowDropdown(matches.length > 0);
    }, [value, regions]);

    const handleInput = (val) => {
        setValue(val);
        setShowDropdown(true);
    };

    const handleSelect = (val) => {
        setValue(val);
        onChange?.({ target: { name: name || "", value: val } });
        setShowDropdown(false);
    };

    const handleEnter = () => {
        if (filtered.length > 0) {
            const firstItem = filtered[0];
            setValue(firstItem);
            onChange?.({ target: { name: name || "", value: firstItem } });
            setShowDropdown(false);
        }
    };

    return {
        value,
        filtered,
        showDropdown,
        setShowDropdown,
        handleInput,
        handleSelect,
        handleEnter,
    };
}
