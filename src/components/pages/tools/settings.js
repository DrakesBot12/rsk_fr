import { useState } from "react";
import Header from "@/components/layout/Header";

import TimeIcon from '@/assets/general/time.svg';
import SettsIcon from '@/assets/general/setts.svg';

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input/Input";

export default function SettingsPage({ goTo }) {
    const tokenUsageFromBackend = 70;

    // Общий максимум (тоже можно получать с бекенда, если нужно)
    const max = 180;

    // Заводим state, чтобы потом могли изменять
    const [value, setValue] = useState(tokenUsageFromBackend);

    // Определяем диапазон для смены фона
    const getRangeClass = (val) => {
        if (val < 30) return "range-low";
        if (val < 80) return "range-mid";
        return "range-high";
    };

    return (
        <>
            <Header>
                <Header.Heading>
                    МАЯК ОКО
                </Header.Heading>
                <Button icon onClick={() => goTo('history')}><TimeIcon /></Button>
                <Button icon active onClick={() => goTo('mayakOko')}><SettsIcon /></Button>
            </Header>
            <div className='hero' style={{placeItems: 'center'}}>
                <div className="flex flex-col gap-[1.6rem] items-center h-full col-span-4 col-start-5 col-end-9">
                    <h3>Настройки</h3>
                    <div className="flex flex-col gap-[0.75rem]">
                        <div className="flex flex-col gap-[0.5rem]">
                            <span className="big">Данные токена</span>
                            <p className="small text-(--color-gray-black)">Это ваш токен доступа. Он имеет ограниченное количество использований. На шкале под полем отображается, сколько запросов уже израсходовано</p>                            
                        </div>
                        <Input placeholder="MA8YQ-OKO2V-P3XZM-LR9QD-K7N4E" />
                        <div className="flex flex-col gap-[0.25rem]">
                        <span className={getRangeClass(value)}>{value}/{max}</span>
                            <meter 
                                id="meter-my"
                                min="0"
                                max={max}
                                low="30"
                                high="80"
                                optimum="100"
                                value={value}
                                className={getRangeClass(value)}
                            ></meter>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}