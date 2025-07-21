import { useEffect, useRef } from "react";
import { useDropdownFilter } from "./helpers";

export default function DropdownInput({
    value: controlledValue,
    onChange,
    dataFrom = "/data/regions.txt",
    ...props
}) {
    const dropdownRef = useRef(null);
    const {
        value,
        filtered,
        showDropdown,
        handleInput,
        handleSelect,
        setShowDropdown,
    } = useDropdownFilter(controlledValue, onChange, dataFrom);

    // закрываем по клику вне
    useEffect(() => {
        const close = (e) => { 
            if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [setShowDropdown]);

    return (
        <div ref={dropdownRef} className="w-full">
            <input
                type="text"
                value={value}
                onChange={(e) => handleInput(e.target.value)}
                onFocus={() => value && setShowDropdown(true)}
                autoComplete="off"
                {...props}
            />
            {showDropdown && (
                <div
                    className="dropdown"
                    style={{
                        transition:
                            "opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1)",
                        opacity: showDropdown ? 1 : 0,
                        transform: showDropdown ? "translateY(0)" : "translateY(-10px)",
                    }}
                >
                    {filtered.map((item) => (
                        <p key={item} onClick={() => handleSelect(item)} className="cursor-pointer hover:bg-gray-100 px-2 py-1">
                            {item}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
