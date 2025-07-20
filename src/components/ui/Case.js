import { useState } from "react";
import Switcher from "@/components/ui/Switcher";
import Block from "./Block";
import Tags from "@/components/ui/Tags";

export default function Case({ cases = [] }) {
    const [caseType, setCaseType] = useState('all')
    const [opt, setOpt] = useState('opt1')
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-[1rem] !w-full">
                <Switcher className="!w-full" value={caseType} onChange={setCaseType}>
                    <span value="all">Все</span>
                    <span value="projects">Проекты</span>
                    <span value="case">Дела</span>
                </Switcher>
                <div className="flex flex-col gap-[.75rem]">
                    {caseType === 'all' && (cases.map((card, idx) => (
                        <Block key={idx}>
                            <h6>{card.name}</h6>
                            <p className="text-(--color-gray-black)">{card.desc}</p>
                            <div className="flex flex-wrap gap-[.5rem]">
                                <Tags tags={card.tags} />
                            </div>
                        </Block>
                    )))}
                    {caseType === 'projects' && (cases.filter(card => card.tags.some(tag => tag.name ===  "Проект")).map((card, idx) => (
                        <Block key={idx}>
                            <h6>{card.name}</h6>
                            <p className="text-(--color-gray-black)">{card.desc}</p>
                            <div className="flex flex-wrap gap-[.5rem]">
                                <Tags tags={card.tags} />
                            </div>
                        </Block>
                    )))}
                    {caseType === 'case' && (cases.filter(card => card.tags.some(tag => tag.name ===  "Дело")).map((card, idx) => (
                        <Block key={idx}>
                            <h6>{card.name}</h6>
                            <p className="text-(--color-gray-black)">{card.desc}</p>
                            <div className="flex flex-wrap gap-[.5rem]">
                                <Tags tags={card.tags} />
                            </div>
                        </Block>
                    )))}
                </div>
            </div>
            <Switcher className="!w-full" value={opt} onChange={setOpt}>
                <span value="opt1">1</span>
                <span value="opt2">2</span>
                <span value="opt3">3</span>
                <span value="opt4">4</span>
                <span value="opt5">5</span>
                <span value="next">&gt;</span>    
            </Switcher>
        </div>
    )
}