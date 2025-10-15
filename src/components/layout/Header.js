export default function Header({ children, ...props }) {
    return <header {...props}>{children}</header>;
}

Header.Heading = function Heading({ children, ...props }) {
    return (
        <h5 className={`flex gap-[0.25rem] items-center ${props.className}`} {...props}>
            {children}
        </h5>
    );
};
