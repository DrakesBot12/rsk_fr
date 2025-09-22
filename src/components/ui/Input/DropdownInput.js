import { useEffect, useRef } from "react";
import { useDropdownFilter } from "./helpers";

export default function DropdownInput({
    value: controlledValue,
    onChange,
    name, // Добавляем проп name
    src = "/data/regions.txt",
    ...props
}) {
    const dropdownRef = useRef(null);
    const { value, filtered, showDropdown, handleInput, handleSelect, setShowDropdown, handleEnter } = useDropdownFilter(controlledValue, onChange, src, name); // Передаем name в хук

    // Обработчик нажатия клавиш
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleEnter(); // Выбираем первый вариант при нажатии Enter
        }
    };

    // закрываем по клику вне
    useEffect(() => {
        const close = (e) => {
            if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [setShowDropdown]);

    return (
        <div className={`input-wrapper relative w-full ${showDropdown ? " input-wrapper--dropdown-open" : ""}`} ref={dropdownRef}>
            <input
                type="text"
                value={value}
                onChange={(e) => handleInput(e.target.value)}
                onFocus={() => value && setShowDropdown(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                name={name} // Передаем name в input
                {...props}
            />
            {showDropdown && (
                <div className="dropdown-wrapper">
                    <div
                        className="dropdown"
                        style={{
                            transition: "opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1)",
                            opacity: showDropdown ? 1 : 0,
                            transform: showDropdown ? "translateY(0)" : "translateY(-10px)",
                        }}>
                        {filtered.map((item) => (
                            <p key={item} onClick={() => handleSelect(item)} className="cursor-pointer hover:bg-gray-100 px-2 py-1">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
