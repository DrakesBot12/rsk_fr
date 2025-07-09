// components/Input.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

import ImageIcon from "@/assets/general/image.svg";

export default function Input({
    placeholder = "",
    type = "",
    children,
    accept = "image/*",
    className = "",
    dataFrom = "/data/regions.txt",
    onImageChange,
    value: controlledValue,
    onChange,
    name,
    required,
    ...props
}) {
    const [inputValue, setInputValue] = useState(controlledValue || "");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const [regions, setRegions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Sync internal value with external
    useEffect(() => {
        if (controlledValue !== undefined) {
            setInputValue(controlledValue);
        }
    }, [controlledValue]);

    // Fetch regions from file
    useEffect(() => {
        if (type === "dropdown") {
            fetch(dataFrom)
                .then((res) => res.text())
                .then((text) => {
                    const lines = text
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean);
                    setRegions(lines);
                })
                .catch((err) => console.error("Failed to load regions:", err));
        }
    }, [type, dataFrom]);

    // Filter dropdown items
    useEffect(() => {
        if (type !== "dropdown") return;
        if (inputValue === "") {
            setFiltered([]);
            setShowDropdown(false);
        } else {
            const matches = regions.filter((region) =>
                region.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFiltered(matches);
            setShowDropdown(matches.length > 0);
        }
    }, [type, inputValue, regions]);

    // Close dropdown on outside click
    useEffect(() => {
        if (type !== "dropdown") return;
        const handleClickOutside = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [type]);

    const handleChange = useCallback(
        (val) => {
            setInputValue(val);
            onChange?.({ target: { name, value: val } });
        },
        [name, onChange]
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            handleChange(file.name);
            onImageChange?.(file);
        };
        reader.readAsDataURL(file);
    };

    const handleImageRemove = () => {
        setImagePreview(null);
        setInputValue("");
        fileInputRef.current.value = "";
    };

    const getAutocomplete = () => {
        if (type === "password") return "current-password";
        if (type === "email") return "email";
        return "off";
    };

    if (type === "image") {
        return (
            <div className={`image-upload-wrapper ${className}`}>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept={accept}
                    onChange={handleImageChange}
                    className="hidden"
                    id={`image-upload-${name}`}
                    {...props}
                />
                <label htmlFor={`image-upload-${name}`} className="cursor-pointer w-full">
                    {imagePreview ? (
                        <div className="w-full">
                            <Image
                                src={imagePreview}
                                alt="Превью изображения"
                                className="object-contain"
                                width={100}
                                height={100}
                            />
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleImageRemove();
                                }}
                            >
                               <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.3333 4H6.66667C5.19391 4 4 5.19391 4 6.66667V25.3333C4 26.8061 5.19391 28 6.66667 28H25.3333C26.8061 28 28 26.8061 28 25.3333V6.66667C28 5.19391 26.8061 4 25.3333 4Z" stroke="#08090A" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.0002 14.6667C13.4729 14.6667 14.6668 13.4728 14.6668 12C14.6668 10.5273 13.4729 9.33337 12.0002 9.33337C10.5274 9.33337 9.3335 10.5273 9.3335 12C9.3335 13.4728 10.5274 14.6667 12.0002 14.6667Z" stroke="#08090A" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 20L23.8853 15.8853C23.3853 15.3854 22.7071 15.1046 22 15.1046C21.2929 15.1046 20.6147 15.3854 20.1147 15.8853L8 28" stroke="#08090A" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </a>
                        </div>
                    ) : (
                        <ImageIcon />
                    )}
                </label>
                {children}
            </div>
        );
    }

    if (type === "dropdown") {
        return (
            <div
                className={`input-wrapper relative${showDropdown ? " input-wrapper--dropdown-open" : ""} ${className}`}
                ref={dropdownRef}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => handleChange(e.target.value)}
                    name={name}
                    onFocus={() => {
                        if (inputValue) setShowDropdown(true);
                    }}
                    autoComplete="off"
                    required={required}
                    {...props}
                />
                {children}
                {showDropdown && (
                    <div className="dropdown-wrapper">
                        <div
                            className="dropdown"
                            style={{
                                transition:
                                    "opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1)",
                                opacity: showDropdown ? 1 : 0,
                                transform: showDropdown ? "translateY(0)" : "translateY(-10px)",
                            }}
                        >
                            {filtered.map((region) => (
                                <p
                                    key={region}
                                    onClick={() => handleChange(region)}
                                    className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                                >
                                    {region}
                                </p>
                            ))}
                        </div>
                        <div
                            className="absolute bottom-0 left-0 w-full h-[3.75rem] z-10"
                            hidden={filtered.length <= 4}
                        />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`input-wrapper ${className}`}>
            <input
                type={["password", "email"].includes(type) ? type : "text"}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                autoComplete={getAutocomplete()}
                name={name}
                required={required}
                className="w-full"
                {...props}
            />
            {children}
        </div>
    );
}