import Link from "next/link";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import { categories } from "./_categories";

import Button from "@/components/ui/Button";

import Index from "@/assets/general/index.svg";
import Notify from '@/assets/general/notify.svg';

export default function Projects() {
    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content" }}>
                <hgroup className="flex flex-col col-span-4 gap-[.5rem]">
                    <h3>Проекты</h3>
                    <p className="text-(--color-gray-black)">Выберите категорию проектов, которую хотите выполнять. Каждая из них развивает одно из направлений звезды</p>
                </hgroup>
                <div className="col-span-12 grid grid-cols-3 gap-[1.25rem] h-fit">
                    {categories.map((category, idx) => (
                        <Link href={"/projects/" + category.url} key={idx} className="flex flex-col min-h-[200px] justify-between p-[1.25rem]
                        rounded-[1rem] border-[1.5px] border-(--color-gray-plus-50) hover:bg-(--color-white-gray) hover:border-(--color-white-gray) transition">
                            <div className="flex flex-col gap-[.5rem]">
                                <div className="flex w-full justify-between">
                                    <h5>{category.name}</h5>
                                    <div className="flex items-center justify-center h-fit rounded-[6.25rem] text-(--color-blue) px-[.75rem] py-[.5rem] bg-(--color-blue-noise)">
                                        {category.currentLvl}&nbsp;уровень
                                    </div>
                                </div>
                                <p className="text-(--color-gray-black)">{category.desc}</p>
                            </div>
                            <div className="w-full flex flex-col text-(--color-blue) gap-[.25rem]">
                                <div className="flex gap-[.5rem] items-center">
                                    <Index /> {category.index} / 6
                                </div>
                                <div className="w-full h-[.25rem] rounded-[6.25rem] overflow-hidden bg-(--color-blue-noise)">
                                    <div
                                        className="bg-(--color-blue) h-full"
                                        style={{
                                            width: `${(category.index / 6) * 100}%`,
                                            transition: "width 0.3s"
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    )
}