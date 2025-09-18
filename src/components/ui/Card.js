export default function Card({ children, className = '', ...props }) {
    return (
        <div className={`card col-span-4 h-fit ${className}`} {...props}>
            { children }
        </div>
    )
}

Card.Heading = function Heading({ children, className = '', ...props }) {
    return (
        <div className={`card-info ${className}`} {...props}>
            { children }
        </div>
    )
}

Card.Footer = function Footer({ children, className = '', ...props }) {
    return (
        <div className={`card-action ${className}`} {...props}>
            { children }
            <div className="bg-(--color-blue) w-full h-full absolute"></div>
        </div>
    )
}