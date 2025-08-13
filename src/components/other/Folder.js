import Image from "next/image";
import FolderIcon from '@/assets/general/folder.svg';
import Workfolder from "@/assets/general/workfolder.svg";

export default function Folder({ projects = 0, cases = 0, coins = 0, min, ...props }) {
    return (
        <div className={`workfolder-wrapper col-span-4 cursor-pointer link group ${min ? 'aspect-video' : 'aspect-square'}`} {...props}>
            <div className="workfolder-back">
                <Image priority={true} src={`/images/${props.team ? 'teamBack.png' : 'workfolder.png'}`} width={500} height={500} alt="workfolder" className="w-full h-full object-cover blur-[8px]" />
                {min ? ('') : ( <FolderIcon className="group-hover:stroke-(--color-white)" /> )}
            </div>
            <div className={`workfolder`}>
                <Workfolder className="text-(--color-gray-minus-50)" />
                <div className='folder'>
                    <div className="folder-heading">
                        <h4>Рабочая папка</h4>
                        {min && <span className="link">Дела {props.team ? 'команды' : 'участника'} </span>}
                        {props.team && !min && <span className="link">Дела команды</span>}
                    </div>
                    <div className="folder-footer">
                        <div className={`folder-footer-left ${min ? '!text-(--color-gray-black)' : ''}`}>
                            <h3>{ projects }</h3>
                            <p className="big">проекта</p>
                        </div>
                        <div className={`folder-footer-right ${min ? '!text-(--color-gray-black)' : ''}`}>
                            <span className="link">{ cases } дел</span>
                            <span className="link">{ coins } баллов</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}