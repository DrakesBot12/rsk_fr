import { useState } from "react";

import { useRouter } from "next/router";
import { teams } from "./_teams";
import TeamNotFound from "./not-found";

import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Folder from '@/components/other/Folder';
import Case from '@/components/ui/Case';
import Tags from "@/components/ui/Tags";

import NotifyIcon from '@/assets/general/notify.svg';
import SettsIcon from '@/assets/general/setts.svg';

export default function TeamWorkFolderPage({ goTo }) {
    const [caseType, setCaseType] = useState('all');

    const router = useRouter();
    const { team: url } = router.query;

    const team = teams.find((t) => t.url === url);

    if (!team) return <TeamNotFound goTo={goTo} />;

    return (
        <>
            <Header>
                <Header.Heading>
                    Команды
                    <span className="text-(--color-gray-white)" style={{ font: 'inherit' }}>/</span>
                    {team.name}
                    <span className="text-(--color-gray-white)" style={{ font: 'inherit' }}>/</span>
                    Рабочая папка
                </Header.Heading>
                <Button icon><SettsIcon /></Button>
                <Button icon><NotifyIcon /></Button>
            </Header>
            <div className='hero'>
                <div className='flex flex-col gap-[0.75rem] col-span-4'>
                    <Button inverted onClick={() => goTo('index')}>Назад</Button>
                    <Folder min projects="2" works="12" exp="100" team />
                </div>
                <div className='flex flex-col gap-[1rem] col-start-7 col-end-13'>
                    <h4>Дела команды</h4>
                    <Case tabs={[ 
                            { name: 'all', label: 'Всё' },
                            { name: 'projects', label: 'Проекты' },
                            { name: 'cases', label: 'Дела' } 
                        ]} value={caseType} onChange={setCaseType} perPage={3} className="h-full gap-[1rem]"
                    >
                        <Case.Tab tab="all">
                            {team.cases.map((casee, idx) => (
                                <div className="block-wrapper col-span-4" key={idx}>
                                    <h6 className="!text-(--color-black)">{casee.name}</h6>
                                    <p className="text-(--color-gray-black)">{casee.desc}</p>
                                    <div className="flex flex-wrap gap-[.5rem]">
                                        <Tags tags={casee.tags} />
                                    </div>
                                </div>
                            ))}
                        </Case.Tab>
                        <Case.Tab tab="projects">
                            {team.cases.filter(casee => casee.tags.some(tag => tag.name ===  "Проект")).map((casee, idx) => (
                                <div className="block-wrapper col-span-4" key={idx}>
                                    <h6 className="!text-(--color-black)">{casee.name}</h6>
                                    <p className="text-(--color-gray-black)">{casee.desc}</p>
                                    <div className="flex flex-wrap gap-[.5rem]">
                                        <Tags tags={casee.tags} />
                                    </div>
                                </div>
                            ))}
                        </Case.Tab>
                        <Case.Tab tab="cases">
                            {team.cases.filter(casee => casee.tags.some(tag => tag.name ===  "Дело")).map((casee, idx) => (
                                <div className="block-wrapper col-span-4" key={idx}>
                                    <h6 className="!text-(--color-black)">{casee.name}</h6>
                                    <p className="text-(--color-gray-black)">{casee.desc}</p>
                                    <div className="flex flex-wrap gap-[.5rem]">
                                        <Tags tags={casee.tags} />
                                    </div>
                                </div>
                            ))}
                        </Case.Tab>
                   </Case>
                </div>
            </div>
        </>
    )
}