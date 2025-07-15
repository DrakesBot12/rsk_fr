import VerifyIcon from '@/assets/general/verify.svg';
import CoinIcon from '@/assets/general/coin.svg';

export default function Tags({ tags = [] }) {
    return (
        <>
            {tags.map((tag, idx) => (
                <a key={idx} className={`tag small w-fit ${tag.color || ''}`}>
                    {tag.icon === 'verify' && (<VerifyIcon />)}
                    {tag.icon === 'coin' && (<CoinIcon />)}

                    {tag.name}
                </a>
            ))}
        </>
    );
}