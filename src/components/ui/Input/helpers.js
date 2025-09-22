import { useState, useEffect } from "react";

export function useDropdownFilter(controlledValue, onChange, src, name) {
    // Добавляем параметр name
    const [value, setValue] = useState(controlledValue || "");
    const [regions, setRegions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // sync controlledValue
    useEffect(() => {
        if (controlledValue !== undefined) setValue(controlledValue);
    }, [controlledValue]);

    // fetch regions
    useEffect(() => {
        fetch(src)
            .then((res) => res.text())
            .then((text) => {
                setRegions(
                    text
                        .split("\n")
                        .map((l) => l.trim())
                        .filter(Boolean)
                );
            })
            .catch((err) => console.error("Failed to load regions:", err));
    }, [src]);

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
        // Теперь передаем правильное имя поля
        onChange?.({ target: { name: name || "", value: val } });
        setShowDropdown(false);
    };

    const handleEnter = () => {
        if (filtered.length > 0) {
            const firstItem = filtered[0];
            setValue(firstItem);
            // И здесь тоже передаем правильное имя поля
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
