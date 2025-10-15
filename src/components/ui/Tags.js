import LinkIcon from "@/assets/general/link.svg";
import VerifyIcon from "@/assets/general/verify.svg";
import CoinIcon from "@/assets/general/coin.svg";

export default function Tags({ tags = [] }) {
    return (
        <>
            {tags.map((tag, idx) => (
                <a key={idx} className={`tag small w-fit ${tag.color || ""} ${tag.icon === "link" && "items-center"} `} href={tag.link}>
                    {tag.icon === "verify" && <VerifyIcon />}
                    {tag.icon === "coin" && <CoinIcon />}

                    {tag.name}
                    {tag.icon === "link" && <LinkIcon className="color-(--color-gray-white) hover:color-black" style={{ transition: "all .3s ease-in-out" }} />}
                </a>
            ))}
        </>
    );
}
