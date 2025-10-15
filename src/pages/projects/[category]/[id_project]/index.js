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

                <div className="flex flex-col items-center gap-[2.5rem] p-[1.5rem] w-full animate-fade-in">
                    {/* Заголовок и прогресс */}
                    <div className="flex flex-col items-start gap-[1.25rem] w-[43.375rem] animate-pulse">
                        <div className="w-[60%] h-[1.875rem] bg-gray-200 rounded-lg" />
                        <div className="w-full h-[0.75rem] bg-gray-200 rounded-full" />
                    </div>

                    {/* Описание и индекс */}
                    <div className="flex items-start gap-[1.25rem] w-[43.375rem] animate-pulse">
                        <div className="w-[21.083rem] h-[6rem] bg-gray-200 rounded-lg" />
                        <div className="w-[21.063rem] h-[8rem] bg-gray-200 rounded-lg mt-[1rem]" />
                    </div>

                    {/* Список задач */}
                    <div className="flex flex-col items-start gap-[0.75rem] w-[43.375rem] animate-pulse">
                        <div className="w-full h-[2.5rem] bg-gray-200 rounded-lg" />

                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-full h-[5rem] bg-gray-200 rounded-[1rem]" />
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

                <div className="flex flex-col items-center justify-center w-full h-[80vh] gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">Проект не найден</h2>
                    <Link href="/projects" className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                        Вернуться
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
                    Проекты <span className="text-[var(--color-gray-black)]">/</span> Знания и навыки <span className="text-[var(--color-gray-black)]">/</span> Курсы для студентов
                </Header.Heading>
                <Button icon>
                    <Notify />
                </Button>
            </Header>

            <div className="flex flex-col items-center gap-[2.5rem] p-[1.5rem] w-full">
                {/* Title and Progress */}
                <div className="flex flex-col items-start gap-[1.25rem] w-[43.375rem]">
                    <h4 className="text-[1.5rem] leading-[2.0625rem] font-medium text-[var(--color-black)] w-full">{project.title}</h4>
                    <div className="flex flex-col items-start w-full h-[0.75rem] bg-[var(--color-blue-noise)] rounded-full">
                        <div className="h-[0.75rem] bg-[var(--color-blue)] rounded-full transition-all duration-500" style={{ width: `${calculateProgress(project.tasks)}%` }} />
                    </div>
                </div>

                {/* Description and Index */}
                <div className="flex items-start gap-[1.25rem] w-[43.375rem]">
                    {/* Description */}
                    <div className="flex flex-col justify-start items-start gap-[1.25rem] w-[21.083rem]">
                        <div className="flex flex-col items-start gap-[0.5rem] w-full">
                            <h6 className="text-[1rem] font-medium text-[var(--color-black)]">Описание проекта</h6>
                            <p className="text-[0.75rem] text-[var(--color-gray-black)]">{project.description}</p>
                        </div>
                    </div>

                    {/* Index */}
                    <div className="flex flex-col items-start p-[1rem] gap-[1rem] w-[21.063rem] bg-[var(--color-white-gray)] rounded-[1rem] mt-[1rem]">
                        <h6 className="text-[1rem] font-medium text-[var(--color-black)]">Индексы звезды</h6>
                        <div className="flex flex-col items-start gap-[0.5rem] w-full">
                            <div className="flex justify-center items-center py-[0.625rem] px-[0.75rem] gap-[0.75rem] w-full bg-[var(--color-blue-noise)] rounded-[0.625rem]">
                                <span className="text-[0.75rem] font-semibold text-[var(--color-blue-plus)] flex-grow">{getCategoryName(project.star_category)}</span>
                                <span className="text-[0.75rem] font-semibold text-[var(--color-blue)]">{project.star_index}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="flex flex-col items-start gap-[0.75rem] w-[43.375rem]">
                    <div className="flex justify-center items-center py-[0.5rem] px-[0.875rem] w-full bg-[var(--color-white-gray)] rounded-[0.625rem]">
                        <span className="text-[0.75rem] font-semibold text-[var(--color-black)]">Список дел проекта</span>
                    </div>

                    {project.tasks.map((task) => (
                        <div key={task.id} className="flex justify-between items-center p-[1.25rem] gap-[2rem] w-full border border-[var(--color-gray-plus-50)] rounded-[1rem]">
                            <h5 className="text-[1.25rem] font-medium text-[var(--color-black)] whitespace-nowrap">{task.title}</h5>

                            {task.status === "SUCCESS" ? (
                                <div className="flex justify-center items-center px-[1rem] py-[0.625rem] bg-[var(--color-green-noise)] rounded-[6.25rem]">
                                    <span className="text-[0.75rem] font-semibold text-[var(--color-green-peace)]">Выполнено</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-[0.5rem]">
                                    <div className="flex justify-center items-center gap-[0.75rem] px-[1rem] py-[0.625rem] bg-[#E0E8FF] rounded-[6.25rem]">
                                        <div className="w-[1rem] h-[1rem]">
                                            <PointsIcon />
                                        </div>
                                        <span className="text-[0.75rem] font-semibold text-[#3A6BFF]">{task.prize_points}</span>
                                    </div>
                                    <Link href={`/projects/KNOWLEDGE/${id_project}/${task.id}`}>
                                        <Button className="inverted roundeful small w-[5.1875rem] h-[2.5rem] font-manrope font-semibold text-[0.75rem]">Открыть</Button>
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
