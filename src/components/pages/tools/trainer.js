import { useState } from 'react';

import Header from "@/components/layout/Header";

import InfoIcon from '@/assets/general/info.svg';
import LinkIcon from '@/assets/general/link.svg';
import CopyIcon from '@/assets/general/copy.svg';
import TimeIcon from '@/assets/general/time.svg';
import Plusicon from '@/assets/general/plus.svg';
import SettsIcon from '@/assets/general/setts.svg';
import RandomIcon from '@/assets/general/random.svg';

import Input from '@/components/ui/Input/Input';
import Button from "@/components/ui/Button";
import Switcher from '@/components/ui/Switcher';

export default function TrainerPage({ goTo }) {
    const [visualType, setVisualType] = useState('visual-static');
    const [type, setType] = useState('text');

    const [userType, setUserType] = useState('student'); // or teacher
    const [who, setWho] = useState('i') // or we

    return (
        <>
            <Header>
                <Header.Heading>
                    МАЯК ОКО
                </Header.Heading>
                <Button icon onClick={() => goTo('history')}><TimeIcon /></Button>
                <Button icon onClick={() => goTo('settings')}><SettsIcon /></Button>
            </Header>
            <div className='hero'>
                <div className="block-wrapper col-span-6 !h-full">
                    <form className="flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-[1.25rem]">
                            <div className="flex flex-col gap-[1rem]">
                                <Switcher value={type} onChange={setType} className='!w-full'>
                                    <Option value="text">Текст</Option>
                                    <Option value="audio">Аудио</Option>
                                    <Option value="visual">Визуал</Option>
                                    <Option value="interactive">Интерактив</Option>
                                    <Option value="data">Данные</Option>
                                </Switcher>
                                <Switcher value={visualType} onChange={setVisualType} className={`!w-full ${type === 'visual' ? 'flex' : '!hidden'}`}>
                                    <Option value="visual-static">Статика</Option>
                                    <Option value="visual-dynamic">Динамика</Option>
                                </Switcher>
                            </div>
                            <div className="flex flex-col gap-[0.5rem]">
                                <span className="big">Цели и целевая направленность</span>
                                <div className="group flex w-full gap-[0.5rem]">
                                    <Input className="w-full" placeholder="М - Миссия" />
                                    <Button icon className="!hidden group-hover:!flex"><CopyIcon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><Plusicon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><RandomIcon /></Button>
                                </div>
                                <div className="group flex w-full gap-[0.5rem]">
                                    <Input className="w-full" placeholder="А - Аудитория" />
                                    <Button icon className="!hidden group-hover:!flex"><CopyIcon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><Plusicon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><RandomIcon /></Button>
                                </div>
                                <div className="group flex w-full gap-[0.5rem]">
                                    <Input className="w-full" placeholder="Я - Роль" />
                                    <Button icon className="!hidden group-hover:!flex"><CopyIcon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><Plusicon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><RandomIcon /></Button>
                                </div>
                                <div className="group flex w-full gap-[0.5rem]">
                                    <Input className="w-full" placeholder="К - Критерии" />
                                    <Button icon className="!hidden group-hover:!flex"><CopyIcon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><Plusicon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><RandomIcon /></Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[0.5rem]">
                                <span className="big">Условия реализации и параметры оформления</span>
                                <div className="group flex w-full gap-[0.5rem]">
                                    <Input className="w-full" placeholder="О - Ограничения" />
                                    <Button icon className="!hidden group-hover:!flex"><CopyIcon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><Plusicon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><RandomIcon /></Button>
                                </div>
                                <div className="group flex w-full gap-[0.5rem]">
                                    <Input className="w-full" placeholder="К - Контекст" />
                                    <Button icon className="!hidden group-hover:!flex"><CopyIcon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><Plusicon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><RandomIcon /></Button>
                                </div>
                                <div className="group flex w-full gap-[0.5rem]">
                                    <Input className="w-full" placeholder="О - Оформление" />
                                    <Button icon className="!hidden group-hover:!flex"><CopyIcon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><Plusicon /></Button>
                                    <Button icon className="!hidden group-hover:!flex"><RandomIcon /></Button>
                                </div>
                            </div>
                        </div>
                        <Button className="blue" type="button">Создать&nbsp;запрос</Button>
                    </form>
                </div>

                <div className="flex flex-col justify-between col-span-6 h-full">
                    <div className="flex flex-col gap-[1.6rem]">
                        <div className="flex gap-[1.6rem]">
                            <h3 className="w-full">Тренажёр</h3>
                            <div className='flex gap-[0.5rem]'>
                                <Button inverted className="!bg-(--color-blue-noise) !text-(--color-blue)">48:00</Button>
                                <Button inverted className="!bg-(--color-red-noise) !text-(--color-red)" onClick={() => goTo('mayakOko')}>Завершить&nbsp;сессию</Button>
                            </div>
                            
                        </div>
                        <div className="flex gap-[0.5rem]">
                            <Switcher value={userType} onChange={setUserType} className="!w-full">
                                <Switcher.Option value="student">Студент</Switcher.Option>
                                <Switcher.Option value="teacher">Преподаватель</Switcher.Option>
                            </Switcher>
                            <Switcher value={who} onChange={setWho} className="!w-full">
                                <Switcher.Option value="i">Я</Switcher.Option>
                                <Switcher.Option value="we">Мы</Switcher.Option>
                            </Switcher>
                        </div>
                        <div className="flex flex-col gap-[0.75rem]">
                            <Input placeholder="Номер задания" />
                            <div className="flex gap-[0.5rem]">
                                <Button>Скачать материал</Button>
                                <Button inverted>WebSim <LinkIcon /></Button>
                                <Button inverted className="!w-fit"><InfoIcon /></Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[1rem]'>
                        <div className='block-wrapper col-span-4'>
                            <h6 className='text-(--color-gray-black)'>Ваш промт</h6>
                            <p>Представь, что ты копирайтер, создающий продающие тексты для digital-сфер и ты известен тем, что отлично справляешься с глубокая аналитика, подтверждённая авторитетными источниками. Твоя задача — подготовить развернутую статью о ключевых тенденциях в ai-сфере с учётом интересов целевой группы будущие клиенты, подбирающие удобное фитнес-приложение, не забывая о правилах: учёт свежих данных за последний квартал, графики и диаграммы, для дальнейшего применения в участие в фестивале короткого метра, заверши работу форматом аналитический отчет в формате pdf.</p>
                        </div>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <div className='flex gap-[0.5rem]'>
                                <Button inverted className="stroke-(--color-gray-black)">WebSim <LinkIcon /></Button>
                                <Button inverted className="stroke-(--color-gray-black)">DeepSeek <LinkIcon /></Button>
                                <Button inverted className="stroke-(--color-gray-black)">Разное <LinkIcon /></Button>
                            </div>
                            <Button>Скопировать</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}