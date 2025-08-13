import { useState } from "react";
import { useRouter } from "next/router";

import { organs } from "@/components/pages/organizations/_organs";
import OrganNotFound from "./not-found";

import Header from "@/components/layout/Header";

import Case from "@/components/ui/Case";
import Button from "@/components/ui/Button";
import Switcher from "@/components/ui/Switcher";
import Input from "@/components/ui/Input/Input";

import Del from "@/assets/general/del.svg";

import Coins from "@/assets/general/coin.svg";
import CoinsBig from "@/assets/general/coinsBig.svg";
import Search from "@/assets/general/search.svg";
import Notify from '@/assets/general/notify.svg';
import SortUp from "@/assets/general/sortUp.svg";
import SortDown from "@/assets/general/sortDown.svg";
import SortNames from "@/assets/general/sortNames.svg";

export default function OrganMembersPage({ goTo }) {
    const router = useRouter();
    const { organ: url } = router.query;

    const [sortBy, setSortBy] = useState('names'); // names, coins
    const [sortWay, setSortWay] = useState('up'); // down
    const [caseType, setCaseType] = useState('all');
    const [search, setSearch] = useState(false);

    const organ = organs.find((t) => t.url === url);

    if (!organ) return <OrganNotFound goTo={goTo} />;

    return (
        <>
            <Header>
                <Header.Heading>Оранизации <span className='text-(--color-gray-black)'>/</span> {organ.name} <span className='text-(--color-gray-black)'>/</span> Участники</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content", position: 'relative', overflow: 'hidden' }}>
                <div className={`flex flex-col col-span-${search ? 6 : 12} gap-[1.25rem]`}>
                    <div className="flex w-full justify-between h-fit">
                        <div className={`flex gap-[.75rem] w-${search ? 'full' : '1/2'}`}>
                            <Input type="search" id="searchorgan" name="searchorgan" autoComplete="off" placeholder="Введите имя участника" className="w-full" />
                            <Button inverted icon><Search/></Button>                        
                        </div>
                        {search ? '' : (
                            <div className="flex gap-[.75rem] w-fit">
                                <Button inverted className="!w-fit" onClick={() => setSearch(true)}>Параметры&nbsp;поиска</Button>
                            </div> 
                        )}
                    </div>
                    <Case value={caseType} onChange={setCaseType} perPage={7}
                        className="flex-col-reverse justify-end gap-[1.25rem]" classChildren={`grid grid-cols-${search ? 1 : 2} overflow-auto h-${search ? '[72vh]' : 'fit'}`}
                    >
                        {organ.members.map((member, idx) => (
                            <div key={idx} className="group flex flex-col p-[1rem] rounded-[1rem] gap-[.75rem] h-fit
                                border-[1.5px] border-(--color-gray-plus-50)"
                                tabIndex={0} aria-label={`Участник: ${member.name}, место ${idx + 1}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-[.75rem] items-center">
                                        <div className="size-[2rem] rounded-full bg-(--color-red-noise)"></div>
                                        <span className="link big">{member.name}</span>
                                    </div>
                                    <span className="link big text-(--color-gray-black)">#{idx + 1}</span>
                                </div>
                                <div className="flex gap-[1.5rem] items-center">
                                    <div className="flex gap-[.25rem] items-center">
                                        <Coins />
                                        <span className="link small">{member.coins}</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black)">
                                        <Del />
                                        <span className="link small">{member.cases} дел</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Case>
                </div>
                <div className={`
                        ${search ? 'flex' : 'hidden'} flex-col col-span-6 h-full
                        bg-(--color-white-gray) mb-[1.5rem] justify-between rounded-[1rem] p-[1rem]
                    `}
                >
                    <div className="flex flex-col gap-[1.25rem]">
                        <h6>Настройки поиска</h6>
                        <div className="flex flex-col gap-[.5rem]">
                            <span className="link big">Сортировка</span>
                            <Switcher value={sortBy} onChange={setSortBy} className="!w-full">
                                <Switcher.Option value="names"><SortNames /> По имени</Switcher.Option>
                                <Switcher.Option value="coins"><CoinsBig className="w-[1.375rem] h-[1.375rem]" /> По баллам</Switcher.Option>
                            </Switcher>
                            <Switcher value={sortWay} onChange={setSortWay} className="!w-full">
                                <Switcher.Option value="down"><SortDown /> По убыванию</Switcher.Option>
                                <Switcher.Option value="up"><SortUp /> По возрастанию</Switcher.Option>
                            </Switcher>
                        </div>
                        <div className="flex flex-col gap-[.5rem]">
                            <span className="link big">Лимиты</span>
                            <div className="flex w-full gap-[.75rem]">
                                <Input type="number" min={0} max={5} step={0.1} className="!w-full" id="min" name="min" autoComplete="off" placeholder="Минимум" />
                                <Input type="number" min={0} max={5} step={0.1} className="!w-full" id="max" name="max" autoComplete="off" placeholder="Максимум" />
                            </div>
                        </div>
                    </div>
                    <Button>Найти участника</Button>
                </div>
            </div>
        </>
    )
}