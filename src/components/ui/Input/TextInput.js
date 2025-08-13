import { useEffect, useState } from "react";

export default function TextInput({
    value: controlledValue,
    onChange,
    name,
    big,
    small,
    ...props
}) {
    const [value, setValue] = useState(controlledValue || "");
    const handle = (val) => { setValue(val); onChange?.({ target: { name, value: val } }); };

    useEffect(() => { if (controlledValue !== undefined) setValue(controlledValue); }, [controlledValue]);

    return (
        <input
            value={value}
            onChange={(e) => handle(e.target.value)}
            name={name}
            className={`w-full ${big ? "big" : small ? "small" : ""}`}
            {...props}
        />
    );
}
