import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { categories as staticCategories } from "@/pages/projects/_categories";

import Notify from "@/assets/general/notify.svg";
import PointsIcon from "@/assets/general/pointsicons.svg";
import Link from "next/link";

function getCategoryName(url) {
    const category = staticCategories.find((c) => c.url === url);
    return category ? category.name : url;
}

function calculateProgress(tasks) {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter((task) => task.status === "SUCCESS").length;
    const total = tasks.length;
    return Math.round((completed / total) * 100);
}

const AICourses = () => {
    const router = useRouter();
    const { id_project } = router.query;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjectInfo = async () => {
            try {
                const res = await fetch(`/api/projects/detail/${id_project}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Ошибка:", err);
                setData({ success: false });
            } finally {
                setLoading(false);
            }
        };

        if (id_project) getProjectInfo();
    }, [id_project]);

    // === 1. Прелоадер ===
    if (loading) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты / Знания и навыки / Курсы для студентов</Header.Heading>
                    <Button icon>
                        <Notify />
                    </Button>
                </Header>

                <div className="flex flex-col items-center gap-10 p-6 w-1/2 mx-auto animate-fade-in">
                    {/* Заголовок и прогресс */}
                    <div className="flex flex-col items-start gap-5 w-full animate-pulse">
                        <div className="w-3/5 py-4 bg-[var(--color-gray-plus)] rounded-lg" />
                        <div className="w-full py-1.5 bg-[var(--color-gray-plus)] rounded-full" />
                    </div>

                    {/* Описание и индекс */}
                    <div className="flex items-start gap-5 w-full animate-pulse">
                        <div className="flex-1 py-12 bg-[var(--color-gray-plus)] rounded-lg" />
                        <div className="flex-1 py-16 bg-[var(--color-gray-plus)] rounded-lg" />
                    </div>

                    {/* Список задач */}
                    <div className="flex flex-col items-start gap-3 w-full animate-pulse">
                        <div className="w-full py-5 bg-[var(--color-gray-plus)] rounded-lg" />

                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-full py-10 bg-[var(--color-gray-plus)] rounded-2xl" />
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }

    // === 2. Ошибка / не найдено ===
    if (!data || data.success === false || !data.data) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты / Знания и навыки / Курсы для студентов</Header.Heading>
                    <Button icon>
                        <Notify />
                    </Button>
                </Header>

                <div className="flex flex-col items-center justify-center w-full min-h-screen gap-3">
                    <h2>Проект не найден</h2>
                    <Link href="/projects">
                        <Button>Вернуться</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const project = data.data;

    // === 3. Основная страница ===
    return (
        <Layout>
            <Header>
                <Header.Heading>
                    Проекты / Знания и навыки / Курсы для студентов
                </Header.Heading>
                <Button icon>
                    <Notify />
                </Button>
            </Header>

            <div className="flex flex-col items-center gap-10 p-6 w-1/2 mx-auto">
                {/* Title and Progress */}
                <div className="flex flex-col items-start gap-5 w-full">
                    <h4 className="w-full">{project.title}</h4>
                    <div className="flex items-start w-full bg-[var(--color-blue-noise)] rounded-full">
                        <div className="py-1.5 rounded-full transition-all duration-500 w-1/2 bg-[var(--color-blue)]" />
                    </div>
                </div>

                {/* Description and Index */}
                <div className="flex items-start gap-5 w-full">
                    {/* Description */}
                    <div className="flex flex-col justify-start items-start gap-5 w-1/2">
                        <div className="flex flex-col items-start gap-2 w-full">
                            <h6>Описание проекта</h6>
                            <p>{project.description}</p>
                        </div>
                    </div>

                    {/* Index */}
                    <div className="flex flex-col items-start p-4 gap-4 w-1/2 bg-[var(--color-white-gray)] rounded-2xl">
                        <h6>Индексы звезды</h6>
                        <div className="flex flex-col items-start gap-2 w-full">
                            <div className="flex justify-center items-center py-2 px-3 gap-3 w-full bg-[var(--color-blue-noise)] rounded-lg">
                                <p className="flex-grow text-[var(--color-blue-minus)]">{getCategoryName(project.star_category)}</p>
                                <p className="text-[var(--color-blue)]">{project.star_index}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="flex flex-col items-start gap-3 w-full">
                    <div className="flex justify-center items-center py-2 px-4 w-full bg-[var(--color-white-gray)] rounded-lg">
                        <p>Список дел проекта</p>
                    </div>

                    {project.tasks.map((task) => (
                        <div key={task.id} className="flex justify-between items-center p-5 gap-8 w-full border border-[var(--color-gray-plus)] rounded-2xl">
                            <h5>{task.title}</h5>

                            {task.status === "SUCCESS" ? (
                                <div className="flex justify-center items-center px-4 py-2 bg-[var(--color-green-noise)] rounded-full">
                                    <p className="text-[var(--color-green-peace)]">Выполнено</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-center items-center gap-3 px-4 py-2 bg-[var(--color-blue-noise)] rounded-full">
                                        <PointsIcon />
                                        <p className="text-[var(--color-blue)]">{task.prize_points}</p>
                                    </div>
                                    <Link href={`/projects/KNOWLEDGE/${id_project}/${task.id}`}>
                                        <Button className="inverted roundeful small">Открыть</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AICourses;
