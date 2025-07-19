import Image from "next/image";
import FolderIcon from '@/assets/general/folder.svg'

export default function Folder({ projects, works, exp, min, ...props }) {
    return (
        <a className={`workfolder-wrapper col-span-4 cursor-pointer group ${min ? 'aspect-video' : 'aspect-square'}`} {...props}>
            <div className="workfolder-back">
                <Image priority={true} src="/workfolder.png" width={500} height={500} alt="workfolder" className="w-full h-full object-cover blur-[8px]" />
                {min ? ('') : ( <FolderIcon className="group-hover:stroke-(--color-white)" /> )}
            </div>
            <div className={`workfolder`}>
                <svg width="220" height="30" viewBox="0 0 220 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 16C0 7.16344 7.16344 0 16 0H185.711C190.227 0 194.532 1.90806 197.565 5.25346L220 30H0V16Z" fill="#1B1C1E"/></svg>
                <div className='folder'>
                    <div className="folder-heading">
                        <h4>Рабочая папка</h4>
                        {min ? '' : (
                            <span className="link">Дела участника</span>
                        )}
                    </div>
                    <div className="folder-footer">
                        <div className={`folder-footer-left ${min ? '!text-(--color-gray-black)' : ''}`}>
                            <h3>{ projects }</h3>
                            <p className="big">проекта</p>
                        </div>
                        <div className={`folder-footer-right ${min ? '!text-(--color-gray-black)' : ''}`}>
                            <span className="link">{ works } дел</span>
                            <span className="link">{ exp } баллов</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}