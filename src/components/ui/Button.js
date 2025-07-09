export default function Button({ children, roundeful, big, small, inverted, icon, active, disabled = false, className, ...props }) {
    const classes = `${big ? 'big' : small ? 'small' : ''} ${roundeful ? 'roundeful' : ''} ${inverted ? 'inverted' : ''} ${icon ? 'icon' : ''} ${active ? 'active' : ''} ${className}`

    return (
        <button disabled={disabled} className={classes} {...props}>
            { children }
        </button>
    )
}