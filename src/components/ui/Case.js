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
    if (!tab) return <div>{children}</div>;
    // Если tab совпадает с value — показываем
    if (tab === value) return <div>{children}</div>;
    // В остальных случаях ничего не рендерим
    return null;
}