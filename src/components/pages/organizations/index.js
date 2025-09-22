import { useRouter } from "next/router";
import { organs } from "./_organs";
import OrganNotFound from "./not-found";

import Header from "@/components/layout/Header";

import Button from "@/components/ui/Button";

import Notify from "@/assets/general/notify.svg";
import DelIcon from "@/assets/general/masterBig.svg";
import PersonIcon from "@/assets/general/personsBig.svg";

export default function OrganIndexPage({ goTo }) {
    const router = useRouter();
    const { organ: url } = router.query;

    const organ = organs.find((t) => t.url === url);

    if (!organ) return <OrganNotFound goTo={goTo} />;

    return (
        <>
            <Header>
                <Header.Heading>
                    Организации <span className="text-(--color-gray-black)">/</span> {organ.name}
                </Header.Heading>
                {/* <Button icon><Notify /></Button> */}
            </Header>
            <div className="hero">
                <div className="flex flex-col gap-[1.25rem] col-span-12">
                    <div className="gap-[1rem] bg-(--color-white-gray) col-span-12 h-fit flex items-center justify-center rounded-[1rem] px-[1rem] py-[.75rem]">
                        <div className="h-[2rem] aspect-square rounded-full bg-(--color-blue-noise)"></div>
                        <h6>{organ.name}</h6>
                    </div>
                    <div className="flex gap-[1.25rem]">
                        <div type="button" onClick={() => goTo("members")} className="w-1/3 cursor-pointer gap-[1rem] bg-(--color-white-gray) h-fit flex items-center justify-center rounded-[1rem] px-[1rem] py-[.75rem]">
                            <PersonIcon className="w-[1.375rem] h-[1.375rem] text-(--color-gray-black)" />
                            <h6>{organ.members.length} участников</h6>
                        </div>
                        <div className="w-1/3 gap-[1rem] bg-(--color-white-gray) h-fit flex items-center justify-center rounded-[1rem] px-[1rem] py-[.75rem]">
                            <DelIcon className="w-[1.375rem] h-[1.375rem] text-(--color-gray-black)" />
                            <h6>Мастерская</h6>
                        </div>
                        <div className="w-1/3 gap-[1rem] bg-(--color-white-gray) h-fit flex items-center justify-center rounded-[1rem] px-[1rem] py-[.75rem]">
                            <PersonIcon className="w-[1.375rem] h-[1.375rem] text-(--color-gray-black)" />
                            <h6>{organ.teams} команд</h6>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 h-full flex items-end">
                    <div className="gap-[1rem] border-(--color-gray-plus-50) border-[1.5px] w-full flex flex-col rounded-[1rem] p-[1.25rem]">
                        <h6>Звезда организации</h6>
                        <div className="flex flex-col gap-[.5rem]">
                            <div className="w-full flex items-center gap-[1.25rem]">
                                <span className="w-[25%] link big">Знания</span>
                                <div className="w-full flex items-center gap-[.625rem]">
                                    <div className="w-full h-[1.375rem] rounded-[.5rem] bg-(--color-blue-noise)">
                                        <div className="h-[1.375rem] rounded-[.5rem] bg-(--color-blue)" style={{ width: `${(organ.indexes.znaniya / 5) * 100}%` }}></div>
                                    </div>
                                    <div
                                        className="flex items-center justify-center link
                                        w-[5rem] px-[.875rem] py-[.5rem] rounded-[.625rem]
                                        bg-(--color-blue-noise) text-(--color-blue) small">
                                        {organ.indexes.znaniya}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-[1.25rem]">
                                <span className="w-[25%] link big text-(--color-gray-black)">Взаимодествие</span>
                                <div className="w-full flex items-center gap-[.625rem]">
                                    <div className="w-full h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus-50)">
                                        <div className="h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus)" style={{ width: `${(organ.indexes.vzaim / 5) * 100}%` }}></div>
                                    </div>
                                    <div
                                        className="flex items-center justify-center link
                                        w-[5rem] px-[.875rem] py-[.5rem] rounded-[.625rem]
                                        bg-(--color-gray-plus-50) text-(--color-black) small">
                                        {organ.indexes.vzaim}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-[1.25rem]">
                                <span className="w-[25%] link big text-(--color-gray-black)">Среда</span>
                                <div className="w-full flex items-center gap-[.625rem]">
                                    <div className="w-full h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus-50)">
                                        <div className="h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus)" style={{ width: `${(organ.indexes.sreda / 5) * 100}%` }}></div>
                                    </div>
                                    <div
                                        className="flex items-center justify-center link
                                        w-[5rem] px-[.875rem] py-[.5rem] rounded-[.625rem]
                                        bg-(--color-gray-plus-50) text-(--color-black) small">
                                        {organ.indexes.sreda}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-[1.25rem]">
                                <span className="w-[25%] link big text-(--color-gray-black)">Защита</span>
                                <div className="w-full flex items-center gap-[.625rem]">
                                    <div className="w-full h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus-50)">
                                        <div className="h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus)" style={{ width: `${(organ.indexes.zashita / 5) * 100}%` }}></div>
                                    </div>
                                    <div
                                        className="flex items-center justify-center link
                                        w-[5rem] px-[.875rem] py-[.5rem] rounded-[.625rem]
                                        bg-(--color-gray-plus-50) text-(--color-black) small">
                                        {organ.indexes.zashita}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-[1.25rem]">
                                <span className="w-[25%] link big text-(--color-gray-black)">Данные</span>
                                <div className="w-full flex items-center gap-[.625rem]">
                                    <div className="w-full h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus-50)">
                                        <div className="h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus)" style={{ width: `${(organ.indexes.dannie / 5) * 100}%` }}></div>
                                    </div>
                                    <div
                                        className="flex items-center justify-center link
                                        w-[5rem] px-[.875rem] py-[.5rem] rounded-[.625rem]
                                        bg-(--color-gray-plus-50) text-(--color-black) small">
                                        {organ.indexes.dannie}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-[1.25rem]">
                                <span className="w-[25%] link big text-(--color-gray-black)">Автоматизация</span>
                                <div className="w-full flex items-center gap-[.625rem]">
                                    <div className="w-full h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus-50)">
                                        <div className="h-[1.375rem] rounded-[.5rem] bg-(--color-gray-plus)" style={{ width: `${(organ.indexes.auto / 5) * 100}%` }}></div>
                                    </div>
                                    <div
                                        className="flex items-center justify-center link
                                        w-[5rem] px-[.875rem] py-[.5rem] rounded-[.625rem]
                                        bg-(--color-gray-plus-50) text-(--color-black) small">
                                        {organ.indexes.auto}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
