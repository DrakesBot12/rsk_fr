import Link from "next/link";
import { useState } from "react";
import { teams } from "@/components/pages/teams/_teams";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import Case from "@/components/ui/Case";
import Button from "@/components/ui/Button";
import Switcher from "@/components/ui/Switcher";
import Input from "@/components/ui/Input/Input";

import Del from "@/assets/general/del.svg";
import Coins from "@/assets/general/coin.svg";
import Search from "@/assets/general/search.svg";
import Notify from '@/assets/general/notify.svg';
import SortUp from "@/assets/general/sortUp.svg";
import Persons from "@/assets/general/persons.svg";
import Projects from "@/assets/general/projects.svg";
import SortDown from "@/assets/general/sortDown.svg";
import SortCoins from "@/assets/general/sortCoins.svg";
import SortNames from "@/assets/general/sortNames.svg";

export default function Teams() {
    const [sortBy, setSortBy] = useState('coins') // names
    const [sortOrgReg, setSortOrgReg] = useState('org') // reg
    const [sortType, setSortType] = useState('student') // teacher
    const [sortWay, setSortWay] = useState('up') // up

    const [caseType, setCaseType] = useState('all');
    const [search, setSearch] = useState(false);

    return (
        <Layout className="max-h-screen">
            <Header>
                <Header.Heading>Команды <span className='text-(--color-gray-black)'>/</span> Список</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content", position: 'relative', overflow: 'hidden' }}>
                <div className={`flex flex-col col-span-${search ? 6 : 12} gap-[1.25rem]`}>
                    <div className="flex w-full justify-between h-fit">
                        <div className={`flex gap-[.75rem] w-${search ? 'full' : '1/2'}`}>
                            <Input type="search" id="searchTeam" name="searchTeam" autoComplete="off" placeholder="Введите название команды" className="w-full" />
                            <Button inverted icon><Search/></Button>                        
                        </div>
                        {search ? '' : (
                            <div className="flex gap-[.75rem] w-fit">
                                <Button inverted disabled className="!w-fit">Создать&nbsp;команду</Button>
                                <Button inverted className="!w-fit" onClick={() => setSearch(true)}>Параметры&nbsp;поиска</Button>
                            </div> 
                        )}
                    </div>
                    <Case value={caseType} onChange={setCaseType} perPage={7}
                        className="flex-col-reverse justify-end gap-[1.25rem]" classChildren={`grid grid-cols-${search ? 1 : 2} overflow-auto h-${search ? '[72vh]' : 'fit'}`}
                    >
                        {teams.map((team, idx) => (
                            <Link href={`/teams/${team.url}`} key={idx} className="group flex flex-col p-[1rem] rounded-[1rem] gap-[.75rem] h-fit
                                border-[1.5px] border-(--color-gray-plus-50) transition-all duration-300 cursor-pointer
                                hover:bg-(--color-white-gray) hover:border-(--color-white-gray) hover:shadow-none"
                                tabIndex={0} aria-label={`Команда: ${team.name}, место ${idx + 1}`} role="button"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-[.75rem] items-center">
                                        <div className="size-[2rem] rounded-full bg-(--color-red-noise)"></div>
                                        <span className="link big group-hover:text-(--color-blue)">{team.name}</span>
                                    </div>
                                    <span className="link big text-(--color-gray-black)">#{idx + 1}</span>
                                </div>
                                <div className="flex gap-[1.5rem] items-center">
                                    <div className="flex gap-[.25rem] items-center group-hover:text-(--color-blue)">
                                        <Coins />
                                        <span className="link small">{team.coins}</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black) group-hover:text-(--color-black)">
                                        <Persons />
                                        <span className="link small">{team.members.length} / 6</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black) group-hover:text-(--color-black)">
                                        <Projects />
                                        <span className="link small">{team.projects} проектов</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black) group-hover:text-(--color-black)">
                                        <Del />
                                        <span className="link small">{team.cases.length} дел</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Case>
                </div>
                <div className={`
                        ${search ? 'flex' : 'hidden'} flex-col col-span-6
                        bg-(--color-white-gray) mb-[1.5rem] justify-between rounded-[1rem] p-[1rem]
                    `}
                >
                    <div className="flex flex-col gap-[1.25rem]">
                        <h6>Настройки поиска</h6>
                        <div className="flex flex-col gap-[.5rem]">
                            <span className="link big">Сортировка</span>
                            <Switcher value={sortBy} onChange={setSortBy} className="!w-full">
                                <Switcher.Option value="coins"><SortCoins /> По баллам</Switcher.Option>
                                <Switcher.Option value="names"><SortNames /> По названию</Switcher.Option>
                            </Switcher>
                            <Switcher value={sortWay} onChange={setSortWay} className="!w-full">
                                <Switcher.Option value="down"><SortDown /> По убыванию</Switcher.Option>
                                <Switcher.Option value="up"><SortUp /> По возрастанию</Switcher.Option>
                            </Switcher>
                        </div>
                        <div className="flex flex-col gap-[.5rem]">
                            <div className="flex w-full items-center justify-between">
                                <span className="link big">
                                    Организация <span className='text-(--color-gray-black)'>/</span> Регион
                                </span>
                                
                                <Switcher value={sortOrgReg} onChange={setSortOrgReg}>
                                    <Switcher.Option value="org">Оранизация</Switcher.Option>
                                    <Switcher.Option value="reg">Регион</Switcher.Option>
                                </Switcher>
                            </div>
                            <Input placeholder="БГТУ им. В.Г. Шухова" id="sortByOrg" name="sortByOrg" autoComplete="off" disabled={sortOrgReg !== 'org'} />
                            <Input placeholder="Белгородская область" id="sortByReg" name="sortByReg" autoComplete="off" disabled={sortOrgReg !== 'reg'} />
                        </div>
                        <div className="flex flex-col gap-[.5rem]">
                            <span className="link big">Лимиты</span>
                            <div className="flex gap-[.75rem]">
                                <Input className="w-full" placeholder="Минимум баллов" id="sortByMinCoins" name="sortByMinCoins" autoComplete="off" />
                                <Input className="w-full" placeholder="Максимум баллов" id="sortByMaxCoins" name="sortByMaxCoins" autoComplete="off" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[.5rem]">
                            <span className="link big">Прочее</span>
                            <Switcher value={sortType} onChange={setSortType} className="!w-full">
                                <Switcher.Option value="student">Студенческая</Switcher.Option>
                                <Switcher.Option value="teacher">Преподавательская</Switcher.Option>
                            </Switcher>
                        </div>
                    </div>
                    <Button>Найти команду</Button>
                </div>
            </div>
        </Layout>
    )
}