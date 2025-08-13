import TextInput from "./TextInput";
import DropdownInput from "./DropdownInput";
import ImageInput from "./ImageInput";

export default function Input({
    type = "",
    className = "",
    children,
    ...props
}) {
    const wrapperClass = (base) => `${base} ${className}`;

    switch (type) {
        case "image":
            return (
                <div className={wrapperClass("image-upload-wrapper")}>
                    <ImageInput {...props} />
                    {children}
                </div>
            );
        
        case "dropdown":
            return (
                <div className={wrapperClass("input-wrapper relative")}>
                    <DropdownInput {...props} />
                    {children}
                </div>
            );
        
        default:
            return (
                <div className={wrapperClass("input-wrapper")}>
                    <TextInput type={type} {...props} />
                    {children}
                </div>
            );
    }
}