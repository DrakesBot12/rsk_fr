import { useState } from 'react';

import Header from "@/components/layout/Header";

import TimeIcon from '@/assets/general/time.svg';
import SettsIcon from '@/assets/general/setts.svg';
import CopyIcon from '@/assets/general/copy.svg';

import Button from "@/components/ui/Button";
import Switcher from '@/components/ui/Switcher';

export default function HistoryPage({ goTo }) {
    const [type, setType] = useState('text');
    const [visualType, setVisualType] = useState('visual-static');

    return (
        <>
            <Header>
                <Header.Heading>
                    МАЯК ОКО
                </Header.Heading>
                <Button icon active onClick={() => goTo('mayakOko')}><TimeIcon /></Button>
                <Button icon onClick={() => goTo('settings')}><SettsIcon /></Button>
            </Header>
            <div className='hero' style={{ placeItems: 'center' }}>
                <div className=" flex flex-col gap-[1.6rem] items-center col-start-4 col-end-10 h-full">
                    <div className="flex flex-col gap-[1rem] w-full">
                        <div className="flex flex-col gap-[0.5rem]">
                            <Switcher value={type} onChange={setType} className='!w-full'>
                                <Switcher.Option value="text">Текст</Switcher.Option>
                                <Switcher.Option value="audio">Аудио</Switcher.Option>
                                <Switcher.Option value="visual">Визуал</Switcher.Option>
                                <Switcher.Option value="interactive">Интерактив</Switcher.Option>
                                <Switcher.Option value="data">Данные</Switcher.Option>
                            </Switcher>
                            <Switcher value={visualType} onChange={setVisualType} className={`!w-full ${type === 'visual' ? 'flex' : '!hidden'}`}>
                                <Switcher.Option value="visual-static">Статика</Switcher.Option>
                                <Switcher.Option value="visual-dynamic">Динамика</Switcher.Option>
                            </Switcher>
                        </div>
                    </div>
                    <section className='flex flex-col gap-[1.6rem] items-center w-[70%]'>
                        <h3>История</h3>
                        <div className='flex flex-col gap-[0.75rem]'>
                            <article className='flex flex-col gap-[0.25rem]'>
                                <span className='link big'>История создания запросов</span>
                                <p className='small text-(--color-gray-black)'>Здесь отображается история промтов по выбранной выше категории</p>
                            </article>
                            <article className='block-wrapper col-span-4'>
                                <p className='line-clamp-3'>Представь, что ты копирайтер, создающий продающие тексты для digital-сфер и ты известен тем, что отлично справляешься с глубокая аналитика, подтверждённая авторитетными источниками. Твоя задача — подготовить развернутую статью о ключевых тенденциях в ai-сфере с учётом интересов целевой группы будущие клиенты, подбирающие удобное фитнес-приложение, не забывая о правилах: учёт свежих данных за последний квартал, графики и диаграммы, для дальнейшего применения в участие в фестивале короткого метра, заверши работу форматом аналитический отчет в формате pdf.</p>
                                <div className='flex items-center'>
                                    <span className='link text-(--color-gray-black) w-full'>12.06.2025</span>
                                    <Button inverted className="!w-fit"><CopyIcon /></Button>
                                </div>
                            </article>
                            <article  className='block-wrapper col-span-4'>
                                <p className='line-clamp-3'>Представь, что ты копирайтер, создающий продающие тексты для digital-сфер и ты известен тем, что отлично справляешься с глубокая аналитика, подтверждённая авторитетными источниками. Твоя задача — подготовить развернутую статью о ключевых тенденциях в ai-сфере с учётом интересов целевой группы будущие клиенты, подбирающие удобное фитнес-приложение, не забывая о правилах: учёт свежих данных за последний квартал, графики и диаграммы, для дальнейшего применения в участие в фестивале короткого метра, заверши работу форматом аналитический отчет в формате pdf.</p>
                                <div className='flex items-center'>
                                    <span className='link text-(--color-gray-black) w-full'>12.06.2025</span>
                                    <Button inverted className="!w-fit"><CopyIcon /></Button>
                                </div>
                            </article>
                            <article className='block-wrapper col-span-4'>
                                <p className='line-clamp-3'>Представь, что ты копирайтер, создающий продающие тексты для digital-сфер и ты известен тем, что отлично справляешься с глубокая аналитика, подтверждённая авторитетными источниками. Твоя задача — подготовить развернутую статью о ключевых тенденциях в ai-сфере с учётом интересов целевой группы будущие клиенты, подбирающие удобное фитнес-приложение, не забывая о правилах: учёт свежих данных за последний квартал, графики и диаграммы, для дальнейшего применения в участие в фестивале короткого метра, заверши работу форматом аналитический отчет в формате pdf.</p>
                                <div className='flex items-center'>
                                    <span className='link text-(--color-gray-black) w-full'>12.06.2025</span>
                                    <Button inverted className="!w-fit"><CopyIcon /></Button>
                                </div>
                            </article>
                            <article className='block-wrapper col-span-4'>
                                <p className='line-clamp-3'>Представь, что ты копирайтер, создающий продающие тексты для digital-сфер и ты известен тем, что отлично справляешься с глубокая аналитика, подтверждённая авторитетными источниками. Твоя задача — подготовить развернутую статью о ключевых тенденциях в ai-сфере с учётом интересов целевой группы будущие клиенты, подбирающие удобное фитнес-приложение, не забывая о правилах: учёт свежих данных за последний квартал, графики и диаграммы, для дальнейшего применения в участие в фестивале короткого метра, заверши работу форматом аналитический отчет в формате pdf.</p>
                                <div className='flex items-center'>
                                    <span className='link text-(--color-gray-black) w-full'>12.06.2025</span>
                                    <Button inverted className="!w-fit"><CopyIcon /></Button>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}