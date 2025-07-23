export default function Header({ children }) {
    return <header>{ children }</header>
}

Header.Heading = function Heading({ children, className }) {
    return (
        <h5 className={`flex gap-[0.25rem] items-center ${className}`}>
            { children }
        </h5>
    );
}