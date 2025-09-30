import { useRouter } from "next/router";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import { categories } from "../_categories";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import Index from "@/assets/general/index.svg";
import Notify from '@/assets/general/notify.svg';
import Link from "next/link";

export default function CategoryPage() {
    const router = useRouter();
    const { category: url } = router.query;

    // Ждем, пока router будет готов
    if (!router.isReady || !url) return <Layout><div>Загрузка...</div></Layout>;

    const category = categories.find((t) => t.url === url);
    
    // Проверка на существование категории
    if (!category) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты</Header.Heading>
                </Header>
                <div className="hero" style={{ placeItems: 'center' }}>
                    <div className="flex flex-col gap-[1rem] col-start-4 col-end-10">
                        <h1>Проект &quot{url}&quot не найдена</h1>
                        <Button big onClick={() => router.push('/projects')}>Вернуться назад</Button>
                    </div>
                 </div>
            </Layout>
        );
    }
    
    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты <span className='text-(--color-gray-black)'>/</span> {category.name}</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content" }}>
                <div className="col-span-12 flex items-start justify-between">
                    <hgroup>
                        <h3>{category.name}</h3>
                        <p className="text-(--color-gray-black)">{category.desc}</p>
                    </hgroup>
                    <Card>
                        <Card.Heading>
                            <h5>Вы выполнили <span className="text-(--color-blue)">4</span> проекта из <span className="text-(--color-blue)">6</span></h5>
                            <div className="w-full rounded-[6.25rem] overflow-hidden bg-(--color-blue-noise) h-[.75rem]">
                                <div className="bg-(--color-blue) h-full" style={{
                                    width: `${4/6 *100}%`
                                }}></div>
                            </div>
                        </Card.Heading>
                        <Card.Footer className="text-(--color-white)">
                            <div className="z-10">Вы в тройке лучших по этой категории</div>
                        </Card.Footer>
                    </Card>
                </div>
                {(() => {
                    const projects = category.levels[0].map((project, idx) => ({ ...project, originalIdx: idx }));
                    const sorted = [
                        ...projects.filter(p => p.status === "open"),
                        ...projects.filter(p => p.status !== "open")
                    ];
                    return (
                        <div className="col-span-12 grid grid-cols-3 gap-[1.25rem] h-fit">
                            {sorted.map((project) => (
                                <Link
                                    href={`/projects/${category.url}/${project.url}`}
                                    key={project.originalIdx}
                                    className="flex flex-col min-h-[200px] justify-between gap-[1rem] p-[1.25rem]
                                    rounded-[1rem] border-[1.5px] border-(--color-gray-plus-50) hover:bg-(--color-white-gray) hover:border-(--color-white-gray) transition"
                                >
                                    <div className="flex flex-col gap-[.5rem]">
                                        <div className="flex justify-between items-center gap-[.5rem]">
                                            <h5>{project.name}</h5>
                                            {/* Нумерация по исходному порядку */}
                                            <span className="link big text-(--color-gray-white)">#{project.originalIdx + 1}</span>
                                        </div>
                                        <p className="text-(--color-gray-black)">{project.desc}</p>
                                    </div>
                                    <div className={`flex items-center justify-center px-[.75rem] py-[1rem] rounded-[6.25rem] ${project.status === "open" ? "bg-(--color-green-noise) text-(--color-green-black)" : "bg-(--color-gray-plus-50) text-(--color-black)"}`}>
                                        {project.status === "open" ? "Выполнено" : "Выполнить"}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    );
                })()}
            </div>
        </Layout>
    )
}