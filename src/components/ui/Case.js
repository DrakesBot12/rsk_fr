import { useState } from "react";
import Tags from "@/components/ui/Tags";
import { Switcher, Option } from "@/components/ui/Switcher";

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
                        <div className="block-wrapper col-span-4" key={idx}>
                            <h6>{card.name}</h6>
                            <p className="text-(--color-gray-black)">{card.desc}</p>
                            <div className="flex flex-wrap gap-[.5rem]">
                                <Tags tags={card.tags} />
                            </div>
                        </div>
                    )))}
                    {caseType === 'projects' && (cases.filter(card => card.tags.some(tag => tag.name ===  "Проект")).map((card, idx) => (
                        <div className="block-wrapper col-span-4" key={idx}>
                            <h6>{card.name}</h6>
                            <p className="text-(--color-gray-black)">{card.desc}</p>
                            <div className="flex flex-wrap gap-[.5rem]">
                                <Tags tags={card.tags} />
                            </div>
                        </div>
                    )))}
                    {caseType === 'case' && (cases.filter(card => card.tags.some(tag => tag.name ===  "Дело")).map((card, idx) => (
                        <div className="block-wrapper col-span-4" key={idx}>
                            <h6>{card.name}</h6>
                            <p className="text-(--color-gray-black)">{card.desc}</p>
                            <div className="flex flex-wrap gap-[.5rem]">
                                <Tags tags={card.tags} />
                            </div>
                        </div>
                    )))}
                </div>
            </div>
            <Switcher className="!w-full" value={opt} onChange={setOpt}>
                <Option value="opt1">1</Option>
                <Option value="opt2">2</Option>
                <Option value="opt3">3</Option>
                <Option value="opt4">4</Option>
                <Option value="opt5">5</Option>
                <Option value="next">&gt;</Option>
            </Switcher>
        </div>
    )
}