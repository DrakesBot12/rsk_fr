import { useRouter } from "next/router";

export default function Button({ children, roundeful, big, small, inverted, icon, active, disabled = false, className, to, ...props }) {
    const router = useRouter();

    const classes = `
        ${big ? "big" : small ? "small" : ""}
        ${roundeful ? "roundeful" : ""}
        ${inverted ? "inverted" : ""}
        ${icon ? "icon" : ""}
        ${active ? "active" : ""}
        ${className || ""}
    `;

    const handleClick = (e) => {
        if (to) {
            e.preventDefault();
            router.push(to);
        }
        if (props.onClick) props.onClick(e);
    };

    return (
        <button disabled={disabled} className={classes} onClick={handleClick} {...props}>
            {children}
        </button>
    );
}
