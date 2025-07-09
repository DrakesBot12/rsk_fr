export default function Block({ children, className, ...props }) {
    return (
        <div className={`block-wrapper col-span-4 ${className}`} {...props}>
            { children }
        </div>
    )
}