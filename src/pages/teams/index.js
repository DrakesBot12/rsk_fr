import { useState } from "react";

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

const teams = [
    { 
        name: "Институт Информационных Технологий (ИИТ)",
        coins: 4000,
        persons: 4,
        projects: 2,
        cases: 55
    },
    { 
        name: "Центр Искусственного Интеллекта (ЦИИ)",
        coins: 5800,
        persons: 6,
        projects: 5,
        cases: 78
    },
    { 
        name: "Лаборатория Кибербезопасности (ЛКБ)",
        coins: 3200,
        persons: 3,
        projects: 1,
        cases: 42
    },
    { 
        name: "Департамент Больших Данных (ДБД)",
        coins: 4500,
        persons: 5,
        projects: 3,
        cases: 67
    },
    { 
        name: "Академия Робототехники (АР)",
        coins: 5100,
        persons: 6,
        projects: 4,
        cases: 89
    },
    { 
        name: "Центр Разработки Игр (ЦРИ)",
        coins: 3800,
        persons: 4,
        projects: 2,
        cases: 51
    },
    { 
        name: "Институт Квантовых Технологий (ИКТ)",
        coins: 6200,
        persons: 6,
        projects: 6,
        cases: 95
    },
    { 
        name: "Лаборатория Нейросетей (ЛНС)",
        coins: 4900,
        persons: 5,
        projects: 3,
        cases: 73
    },
    { 
        name: "Центр Машинного Обучения (ЦМО)",
        coins: 5300,
        persons: 6,
        projects: 4,
        cases: 82
    },
    { 
        name: "Институт Цифровых Трансформаций (ИЦТ)",
        coins: 4100,
        persons: 4,
        projects: 2,
        cases: 58
    },
    { 
        name: "Департамент Виртуальной Реальности (ДВР)",
        coins: 4700,
        persons: 5,
        projects: 3,
        cases: 64
    },
    { 
        name: "Академия Блокчейн Технологий (АБТ)",
        coins: 5500,
        persons: 6,
        projects: 5,
        cases: 77
    },
    { 
        name: "Центр Криптографии (ЦК)",
        coins: 3900,
        persons: 4,
        projects: 2,
        cases: 49
    },
    { 
        name: "Лаборатория Искусственного Зрения (ЛИЗ)",
        coins: 4400,
        persons: 5,
        projects: 3,
        cases: 61
    },
    { 
        name: "Институт Программной Инженерии (ИПИ)",
        coins: 5000,
        persons: 6,
        projects: 4,
        cases: 70
    },
    { 
        name: "Центр Автоматизации Процессов (ЦАП)",
        coins: 3600,
        persons: 3,
        projects: 1,
        cases: 45
    },
    { 
        name: "Академия Интернета Вещей (АИВ)",
        coins: 5200,
        persons: 6,
        projects: 5,
        cases: 80
    },
    { 
        name: "Департамент Облачных Технологий (ДОТ)",
        coins: 4800,
        persons: 5,
        projects: 3,
        cases: 66
    },
    { 
        name: "Лаборатория Биоинформатики (ЛБИ)",
        coins: 4300,
        persons: 4,
        projects: 2,
        cases: 59
    },
    { 
        name: "Центр Разработки Мобильных Приложений (ЦРМП)",
        coins: 5400,
        persons: 6,
        projects: 4,
        cases: 84
    },
    { 
        name: "Институт Автоматизации Бизнеса (ИАБ)",
        coins: 3700,
        persons: 3,
        projects: 1,
        cases: 47
    },
    { 
        name: "Академия Цифрового Маркетинга (АЦМ)",
        coins: 4900,
        persons: 5,
        projects: 3,
        cases: 72
    },
    { 
        name: "Центр Аналитики Данных (ЦАД)",
        coins: 5600,
        persons: 6,
        projects: 5,
        cases: 88
    },
    { 
        name: "Лаборатория Умных Городов (ЛУГ)",
        coins: 4100,
        persons: 4,
        projects: 2,
        cases: 53
    },
    { 
        name: "Институт Технологий Будущего (ИТБ)",
        coins: 6000,
        persons: 6,
        projects: 6,
        cases: 92
    },
    { 
        name: "Департамент Разработки ПО (ДРПО)",
        coins: 4500,
        persons: 5,
        projects: 3,
        cases: 65
    },
    { 
        name: "Центр Тестирования Программ (ЦТП)",
        coins: 3800,
        persons: 4,
        projects: 2,
        cases: 50
    },
    { 
        name: "Академия ИТ Консалтинга (АИК)",
        coins: 5200,
        persons: 6,
        projects: 5,
        cases: 79
    },
    { 
        name: "Лаборатория Компьютерной Графики (ЛКГ)",
        coins: 4700,
        persons: 5,
        projects: 3,
        cases: 68
    },
    { 
        name: "Институт Автономных Систем (ИАС)",
        coins: 5800,
        persons: 6,
        projects: 5,
        cases: 85
    },
    { 
        name: "Центр Развития IT-Стартапов (ЦРИС)",
        coins: 4900,
        persons: 5,
        projects: 3,
        cases: 74
    },
    { 
        name: "Департамент Цифровых Коммуникаций (ДЦК)",
        coins: 4300,
        persons: 4,
        projects: 2,
        cases: 57
    },
    { 
        name: "Академия Технологий Здравоохранения (АТЗ)",
        coins: 5400,
        persons: 6,
        projects: 4,
        cases: 81
    },
    { 
        name: "Лаборатория Роботизированной Хирургии (ЛРХ)",
        coins: 6100,
        persons: 6,
        projects: 6,
        cases: 94
    },
    { 
        name: "Институт Космических Технологий (ИКТ)",
        coins: 5900,
        persons: 6,
        projects: 5,
        cases: 90
    }
];

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
                            <div key={idx} className="group flex flex-col p-[1rem] rounded-[1rem] gap-[.75rem] h-fit
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
                                        <span className="link small">{team.persons} / 6</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black) group-hover:text-(--color-black)">
                                        <Projects />
                                        <span className="link small">{team.projects} проектов</span>
                                    </div>
                                    <div className="flex gap-[.25rem] items-center text-(--color-gray-black) group-hover:text-(--color-black)">
                                        <Del />
                                        <span className="link small">{team.cases} дел</span>
                                    </div>
                                </div>
                            </div>
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