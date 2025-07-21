import { useState, useEffect } from "react";

export function useDropdownFilter(controlledValue, onChange, dataFrom) {
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
        fetch(dataFrom).then((res) => res.text())
            .then((text) => {
                setRegions(
                    text.split("\n").map((l) => l.trim()).filter(Boolean)
                );
            })
            .catch((err) => console.error("Failed to load regions:", err));
    }, [dataFrom]);

    // filter
    useEffect(() => {
        if (!value) {
            setFiltered([]);
            setShowDropdown(false);
            return;
        }
        const matches = regions.filter((r) =>
            r.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(matches);
        setShowDropdown(matches.length > 0);
    }, [value, regions]);

    const handleInput = (val) => {
        setValue(val);
        onChange?.({ target: { name: "", value: val } });
    };

    const handleSelect = (val) => {
        setValue(val);
        onChange?.({ target: { name: "", value: val } });
        setShowDropdown(false);
    };

    return {
        value,
        filtered,
        showDropdown,
        setShowDropdown,
        handleInput,
        handleSelect,
    };
}