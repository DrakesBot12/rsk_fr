import Switcher from '@/components/ui/Switcher';
import { useState } from 'react';

export default function Calendar() {
    const [tab, setTab] = useState('works')
    return (
        <div className="activity-calendar col-span-12">
            <div className="heading">
                <div className='flex items-center gap-[1rem]'>
                    <div className='flex items-center cursor-pointer h-full px-[0.875rem] py-[0.5rem] bg-(--color-white-gray) rounded-[0.625rem] gap-[0.625rem]'>
                        <span className='w-[1.375rem] aspect-square rounded-full bg-(--color-gray-plus-50)'></span>
                        <a className='small'>Без проекта</a>
                    </div>
                    <h6>Календарь активности</h6>
                </div>
                <Switcher value={tab} onChange={setTab}>
                    <Switcher.Option value="works">Дела</Switcher.Option>
                    <Switcher.Option value="projects">Проекты</Switcher.Option>
                </Switcher>
            </div>
            <section className="calendar">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div
                        key={i}
                        className={`calendar-block__${i}`}
                    ></div>
                ))}
            </section>
            <div className="footer">
                <span>Февраль</span>
                <span>Март</span>
                <span>Апрель</span>
                <span>Май</span>
            </div>
        </div>
    )
}