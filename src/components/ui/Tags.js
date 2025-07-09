import VerifyIcon from '@/assets/general/verify.svg'

export default function Tags({ tags = [] }) {
    return (
        <>
            {tags.map((tag, idx) => (
                <a key={idx} className={`tag small w-fit ${tag.color || ''}`}>{tag.verify && (<VerifyIcon />)} {tag.name}</a>
            ))}
        </>
    );
}