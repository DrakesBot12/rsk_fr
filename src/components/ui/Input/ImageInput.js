import { useState, useEffect, useRef } from "react";

import Image from "next/image";
import ImageIcon from "@/assets/general/image.svg";

export default function ImageInput({
    value: controlledValue,
    onChange,
    onImageChange,
    accept = "image/*",
    name,
    ...props
}) {
    const [value, setValue] = useState(controlledValue || "");
    const [preview, setPreview] = useState(null);
    const fileRef = useRef();

    useEffect(() => {
        if (controlledValue !== undefined) setValue(controlledValue);
    }, [controlledValue]);

    const handleFile = (file) => {
        setValue(file.name);
        onChange?.({ target: { name, value: file.name } });
        onImageChange?.(file);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            handleFile(file);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setPreview(null);
        setValue("");
        fileRef.current.value = "";
        onChange?.({ target: { name, value: "" } });
    };

    return (
        <>
            <input
                type="file"
                ref={fileRef}
                accept={accept}
                onChange={handleImageChange}
                className="hidden"
                id={`image-upload-${name}`}
                {...props}
            />
            <label htmlFor={`image-upload-${name}`} className="cursor-pointer w-full block">
                {preview ? (
                    <div className="relative w-full">
                        <Image
                            src={preview}
                            alt="Превью изображения"
                            className="object-contain"
                            width={100}
                            height={100}
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRemove();
                            }}
                        >✖</button>
                    </div>
                ) : <ImageIcon />}
            </label>
        </>
    );
}
