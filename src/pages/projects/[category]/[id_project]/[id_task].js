import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Notify from "@/assets/general/notify.svg";
import SubmitTask from "@/assets/general/submittask.svg";
import StartWork from "@/assets/general/startwork.svg";
import LinkArrow from "@/assets/general/linkarrow.svg";
import PointsIcon from "@/assets/general/pointsicons.svg";
import { categories as staticCategories } from "@/pages/projects/_categories";

function getCategoryName(url) {
    const category = staticCategories.find((c) => c.url === url);
    return category ? category.name : url;
}

const TaskPage = () => {
    const router = useRouter();
    const { id_task, id_project, category } = router.query;

    const [data, setData] = useState(null);
    const [data_project, setDataProject] = useState(null);
    const [loading, setLoading] = useState([false, false]);

    useEffect(() => {
        if (!id_task || !id_project) return;

        const getTaskInfo = async () => {
            try {
                const res = await fetch(`/api/projects/task/${id_task}`);
                const json = await res.json();
                setData(json.data);
            } catch (err) {
                console.error("Ошибка:", err);
                setData({ success: false });
            } finally {
                setLoading((prev) => [true, prev[1]]);
            }
        };

        const getProjectInfo = async () => {
            try {
                const res = await fetch(`/api/projects/detail/${id_project}`);
                const json = await res.json();
                setDataProject(json.data);
            } catch (err) {
                console.error("Ошибка:", err);
                setDataProject({ success: false });
            } finally {
                setLoading((prev) => [prev[0], true]);
            }
        };

        getTaskInfo();
        getProjectInfo();
    }, [id_task, id_project]);

    const isLoaded = loading[0] && loading[1];

    if (!isLoaded) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты / Знания и навыки / Курсы для студентов...</Header.Heading>
                    <Button icon>
                        <Notify />
                    </Button>
                </Header>
                <div className="flex flex-col items-center p-6 gap-10 mx-auto">
                    <div className="flex flex-col items-start gap-5">
                        <div className="py-4 bg-[var(--color-gray-plus)] rounded-lg animate-pulse" />
                        <div className="py-1.5 bg-[var(--color-gray-plus)] rounded-full animate-pulse" />
                        <div className="flex flex-col gap-4 mt-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="py-10 bg-[var(--color-gray-plus)] rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!data || data.success === false) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты / Знания и навыки / Курсы для студентов...</Header.Heading>
                    <Button icon>
                        <Notify />
                    </Button>
                </Header>
                <div className="flex flex-col items-center justify-center gap-3 flex-1">
                    <h2>Задание не найдено</h2>
                    <Button onClick={() => router.push("/projects")}>Вернуться</Button>
                </div>
            </Layout>
        );
    }

    const goToSubmit = () => {
        if (!category || !id_project) return; // защита
        router.push(`/projects/${category}/${id_project}/submit`);
    };

    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты / Знания и навыки / Курсы для студентов...</Header.Heading>
                <Button icon>
                    <Notify />
                </Button>
            </Header>

            <div className="flex flex-col items-center p-6 gap-10 w-1/2 mx-auto">
                <div className="flex flex-col items-start gap-5 w-full">
                    <h4>{data.title}</h4>

                    <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center gap-3 px-4 py-2 bg-[var(--color-blue-noise)] rounded-full">
                                <PointsIcon />
                                <p className="text-[var(--color-blue)]">{data.prize_points} баллов</p>
                            </div>
                            <div className="flex items-center px-4 py-2 gap-2 bg-[var(--color-gray-plus)] rounded-full">
                                <p className="text-[var(--color-gray-black)]">{getCategoryName(data_project.star_category)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Кнопка с переходом на submit */}
                            {category && id_project && (
                                <Button className="blue roundeful small" onClick={goToSubmit}>
                                    <p className="whitespace-nowrap">Сдать задание</p>
                                    <SubmitTask />
                                </Button>
                            )}

                            <Button className="inverted roundeful small">
                                <p className="whitespace-nowrap">Начать работу</p>
                                <StartWork />
                            </Button>
                        </div>
                    </div>

                    {/* Остальной контент страницы */}
                    <div className="flex items-start gap-5 w-full">
                        <div className="flex flex-col p-4 gap-3 flex-1 bg-[var(--color-white-gray)] rounded-2xl">
                            <div className="flex flex-col gap-2">
                                <h6>Занятость</h6>
                                <p>Пока не подключено</p>
                            </div>
                            <hr className="border-[var(--color-gray-plus)]" />
                            <div className="flex flex-col gap-2">
                                <h6>Заказчик</h6>
                                <div className="flex items-center py-2 px-3 bg-[var(--color-blue-noise)] rounded-lg">
                                    <p>Российское Содружество Колледжей</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 flex-1">
                            <div className="flex flex-col gap-1">
                                <h6>Описание задания</h6>
                                <p>{data.description}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h6>Материалы</h6>
                                <div className="flex flex-wrap gap-1">
                                    {data.materials && data.materials.length > 0 ? (
                                        data.materials.map((material, idx) => (
                                            <a
                                                key={idx}
                                                href={material.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 px-4 py-2 bg-[var(--color-gray-plus)] rounded-full hover:bg-[var(--color-gray-plus-50)] transition"
                                            >
                                                <p>{material.name}</p>
                                                <LinkArrow />
                                            </a>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-1 px-4 py-2 bg-[var(--color-gray-plus)] rounded-lg">
                                            <p>Материалов нет</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TaskPage;
