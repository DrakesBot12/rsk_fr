export default function Textarea({ inverted, ...props }) {
    const classes = `${inverted ? 'inverted' : ''}`
    return (
        <div className={`textarea-wrapper ${classes}`}>
            <textarea {...props}></textarea>
        </div>
    )
}
