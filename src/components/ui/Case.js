import React, { useState, createContext, useContext } from "react";

import Switcher from "@/components/ui/Switcher";
const CaseValueContext = createContext();

export default function Case({ value, onChange, children, tabs }) {
    const [opt, setOpt] = useState('opt1');
    
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-[1rem] !w-full">
                {tabs && 
                    <Switcher className="!w-full" value={value} onChange={onChange}>
                        {tabs.map(tab => <Switcher.Option value={tab.name}>{tab.label}</Switcher.Option>)}
                    </Switcher>
                }
                <div className="flex flex-col gap-[.75rem]">
                    <CaseValueContext.Provider value={value}>
                        {children}
                    </CaseValueContext.Provider>
                </div>
            </div>
            <Switcher className="!w-full" value={opt} onChange={setOpt}>
                <Switcher.Option value="opt1">1</Switcher.Option>
                <Switcher.Option value="opt2">2</Switcher.Option>
                <Switcher.Option value="opt3">3</Switcher.Option>
                <Switcher.Option value="opt4">4</Switcher.Option>
                <Switcher.Option value="opt5">5</Switcher.Option>
                <Switcher.Option value="next">&gt;</Switcher.Option>
            </Switcher>
        </div>
    )
}

Case.Tab = function Tab({ children, tab = "" }) {
    const value = useContext(CaseValueContext);

    // Если tab не указан — всегда показываем
    if (!tab) return { children };
    // Если tab совпадает с value — показываем
    if (tab === value) return { children };
    // В остальных случаях ничего не рендерим
    return null;
}


{/*
import Case from '@/components/ui/Case';

const [caseType, setCaseType] = useState('all');

<Case tabs={[ 
        { name: 'all', label: 'Отображаемое имя таба' },
        { name: 'projects', label: 'Отображаемое имя таба' },
        { name: 'cases', label: 'Отображаемое имя таба' } 
    ]} value={caseType} onChange={setCaseType}
>
    <Case.Tab tab="all"> Показывается только на табе 'all'< /Case.Tab>
    <Case.Tab tab="projects"> Показывается только на табе 'projects' </Case.Tab>
    <Case.Tab tab="cases"> Показывается только на табе 'cases' </Case.Tab>
    <Case.Tab> Показывается на всех табах </Case.Tab>
</Case>
*/}