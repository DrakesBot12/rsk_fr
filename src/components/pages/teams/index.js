import { useRouter } from "next/router";
import { teams } from "./_teams";
import TeamNotFound from "./not-found";

import Header from "@/components/layout/Header";

import Button from "@/components/ui/Button";

import Folder from "@/components/other/Folder";

import LinkIcon from '@/assets/general/link.svg';
import Notify from '@/assets/general/notify.svg';
import SettsIcon from '@/assets/general/setts.svg';

export default function TeamIndexPage({ goTo }) {
    const router = useRouter();
    const { team: url } = router.query;

    const team = teams.find((t) => t.url === url);

    if (!team) return <TeamNotFound goTo={goTo} />;

    return (
        <>
            <Header>
                <Header.Heading>Команды <span className='text-(--color-gray-black)'>/</span> {team.name}</Header.Heading>
                <Button icon onClick={() => goTo('settings')}><SettsIcon /></Button>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gap: '2.5rem', gridTemplateRows: 'max-content' }}>
                <div className="grid col-span-12 grid-cols-12 gap-[1.25rem]">
                    <div className="gap-[1rem] bg-(--color-white-gray) col-span-12 h-fit flex items-center justify-center rounded-[1rem] px-[1rem] py-[.75rem]">
                        <div className="h-[2rem] aspect-square rounded-full bg-(--color-blue-noise)"></div>
                        <h6>{team.name}</h6>
                    </div>
                    <div className="block-wrapper col-span-4 h-fit">
                        <div className="flex flex-col gap-[.5rem]">
                            <h6>Описание</h6>
                            <p>{team.description}</p>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-[.5rem]">
                            <h6>Руководитель</h6>
                            <div className="flex items-center gap-[.5rem]">
                                <div className="h-[2rem] aspect-square rounded-full bg-(--color-orange-noise)"></div>
                                <span className="link">{team.owner.name}</span>
                            </div>
                            <div className="flex w-2/3 items-center gap-[.5rem]">
                                <Button small>Вступить</Button>
                                <Button small disabled>Выйти</Button>
                            </div>
                        </div>
                    </div>
                    <div className="block-wrapper col-span-4 h-fit">
                        <div className='flex flex-col gap-[.5rem]'>
                            <h6>Организация</h6>
                            <div className='group cursor-pointer flex items-center justify-between w-full'>
                                <span className='flex-1 link'>{team.organization}</span>
                                <LinkIcon className="text-(--color-gray-white) group-hover:text-(--color-black)" style={{ transition: "all .3s ease-in-out" }} />    
                            </div>
                        </div>
                        <hr />
                        <div className='flex flex-col gap-[.5rem]'>
                            <h6>Регион</h6>
                            <p>{team.region}</p>
                        </div>
                    </div>
                    <Folder projects={team.projects} cases={team.cases.length} coins={team.coins} onClick={() => goTo("workfolder")} team />
                </div>
                <div className="block-wrapper gap-[1.25rem] col-span-12 h-fit">
                    <h5>Участники</h5>
                    <div className="grid grid-cols-3 gap-[.75rem]">
                        {team.members.map((member, idx) => (
                            <div key={idx} className="group flex items-center p-[1rem] rounded-[1rem] gap-[.75rem] cursor-pointer
                                border-solid border-[1.5px] border-(--color-gray-plus-50) hover:bg-(--color-gray-plus-50) transition" aria-label={member.name}
                            >
                                <div className="h-[2rem] aspect-square rounded-full bg-(--color-red-noise)"></div>
                                <span className="link big group-hover:text-(--color-blue)">{member.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}