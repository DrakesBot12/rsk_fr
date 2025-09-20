import Link from "next/link";
import { useState } from "react";
import { organs } from "@/components/pages/organizations/_organs";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import Case from "@/components/ui/Case";
import Button from "@/components/ui/Button";
import Switcher from "@/components/ui/Switcher";
import Input from "@/components/ui/Input/Input";

import Index from "@/assets/general/index.svg";
import Search from "@/assets/general/search.svg";
import Notify from '@/assets/general/notify.svg';
import SortUp from "@/assets/general/sortUp.svg";
import Persons from "@/assets/general/persons.svg";
import SortDown from "@/assets/general/sortDown.svg";
import SortCoins from "@/assets/general/sortCoins.svg";
import SortNames from "@/assets/general/sortNames.svg";

export default function OrganIndexPage() {
    const [sortBy, setSortBy] = useState('coins') // names, members
    const [sortLetter, setSortLetter] = useState('a') // e, z, d
    const [sortWay, setSortWay] = useState('up') // down

    const [caseType, setCaseType] = useState('all');
    const [search, setSearch] = useState(false);

    return (
        <Layout>
            <Header>
                <Header.Heading>Команды <span className='text-(--color-gray-black)'>/</span> Список</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content", position: 'relative', overflow: 'hidden' }}>
                <div className={`flex flex-col col-span-${search ? 6 : 12} gap-[1.25rem]`}>
                    <div className="flex w-full justify-between h-fit">
                        <div className={`flex gap-[.75rem] w-${search ? 'full' : '1/2'}`}>
                            <Input type="search" id="searchorgan" name="searchorgan" autoComplete="off" placeholder="Введите название команды" className="w-full" />
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
                        {organs.map((organ, idx) => (
                            <Link href={`/organizations/${organ.url}`} key={idx} className="group flex flex-col p-[1rem] rounded-[1rem] gap-[.75rem] h-fit
                                border-[1.5px] border-(--color-gray-plus-50) transition-all duration-300 cursor-pointer
                                hover:bg-(--color-white-gray) hover:border-(--color-white-gray) hover:shadow-none"
                                tabIndex={0} aria-label={`Команда: ${organ.name}, место ${idx + 1}`} role="button"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-[.75rem] items-center">
                                        <div className="size-[2rem] rounded-full bg-(--color-red-noise)"></div>
                                        <span className="link big group-hover:text-(--color-blue)">{organ.name}</span>
                                    </div>
                                    <span className="link big text-(--color-gray-black)">#{idx + 1}</span>
                                </div>
                                <div className="flex gap-[1.5rem] items-center">
                                    <div className="flex gap-[.25rem] items-center group-hover:text-(--color-blue)">
                                        <Index />
                                        <span className="link small">{Object.values(organ.indexes).reduce((sum, value) => sum + value, 0)} индексов</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black) group-hover:text-(--color-black)">
                                        <Persons />
                                        <span className="link small">{organ.members.length} участников</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black) group-hover:text-(--color-black)">
                                        <Persons />
                                        <span className="link small">{organ.teams} команд</span>
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
                                <Switcher.Option value="coins"><SortCoins /> По индексам</Switcher.Option>
                                <Switcher.Option value="names"><SortNames /> По названию</Switcher.Option>
                                <Switcher.Option value="members"><Persons /> По участникам</Switcher.Option>
                            </Switcher>
                            <Switcher value={sortWay} onChange={setSortWay} className="!w-full">
                                <Switcher.Option value="down"><SortDown /> По убыванию</Switcher.Option>
                                <Switcher.Option value="up"><SortUp /> По возрастанию</Switcher.Option>
                            </Switcher>
                        </div>
                        <div className="flex flex-col gap-[.5rem]">
                            <span className="link big">Регион</span>
                            <Input placeholder="Белгородская область" id="sortByReg" name="sortByReg" autoComplete="off" />
                        </div>
                        {/* <div className="flex flex-col gap-[.5rem]">
                            <span className="link big">Лимиты</span>
                            <Switcher value={sortLetter} onChange={setSortLetter} className="!w-full">
                                <Switcher.Option value="e">Е</Switcher.Option>
                                <Switcher.Option value="e">Е</Switcher.Option>
                                <Switcher.Option value="z">З</Switcher.Option>
                                <Switcher.Option value="d">Д</Switcher.Option>
                                <Switcher.Option value="a">А</Switcher.Option>
                            </Switcher>
                            <div className="flex w-full gap-[.75rem]">
                                <Input type="number" min={0} max={5} step={0.1} className="!w-full" id="min" name="min" autoComplete="off" placeholder="Минимум" />
                                <Input type="number" min={0} max={5} step={0.1} className="!w-full" id="max" name="max" autoComplete="off" placeholder="Максимум" />
                                <Button inverted className="!w-fit">{`+`}</Button>
                            </div>
                        </div> */}
                    </div>
                    <Button>Найти организацию</Button>
                </div>
            </div>
        </Layout>
    )
}