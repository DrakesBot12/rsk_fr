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

    async function startTask() {
        let json;
        try {
            const res = await fetch(`/api/projects/task/start/${id_task}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            json = await res.json();
        } catch (err) {
            console.error("Ошибка начала задания:", err);
            alert("Ошибка: " + err);
        } finally {
            if (json?.success) {
                router.reload();
                alert("Вы начали задание!")
            }
        }
    }

    async function endTask() {
        let json;
        const end_data = {
            "text_description": "Супер задание тест",
            "result_url": "https://youtube.com",
            "id": 0,
            "task_id": 0,
            "team_id": 0,
            "submitted_at": "2025-10-16T10:27:51.045Z",
            "status": "NOT_STARTED",
            "moderator_id": 0,
            "reviewed_at": "2025-10-16T10:27:51.045Z"
        }
        try {
            const res = await fetch(`/api/projects/task/end/${id_task}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(end_data),
                credentials: "include",
            });
            json = await res.json();
        } catch (err) {
            console.error("Ошибка завершения задания:", err);
            alert("Ошибка: " + err);
        } finally {
            if (json?.success) {
                router.reload();
                alert("Вы завершили задание!")
            }
        }
    }

    useEffect(() => {
        if (!id_task || !id_project) return;

        const getTaskInfo = async () => {
            try {
                const res = await fetch(`/api/projects/task/${id_task}`);
                const json = await res.json();
                setData(json.data);
            } catch (err) {
                console.error("Ошибка получения задания:", err);
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
                console.error("Ошибка получения проектов:", err);
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
                <div className="flex flex-col items-center p-6 gap-10 w-1/2 mx-auto">
                    <div className="flex flex-col items-start gap-5 w-full">
                        <div className="w-3/5 py-4 bg-(--color-gray-plus) rounded-lg animate-pulse" />
                        <div className="w-full py-1.5 bg-(--color-gray-plus) rounded-full animate-pulse" />
                        <div className="flex flex-col gap-4 mt-4 w-full">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="py-10 bg-(--color-gray-plus) rounded-lg animate-pulse" />
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
                <div className="flex flex-col items-center justify-center w-full min-h-screen gap-3">
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
                            <div className="flex items-center justify-center gap-3 px-4 py-2 bg-(--color-blue-noise) rounded-full">
                                <PointsIcon />
                                <p className="text-(--color-blue)">{data.prize_points} баллов</p>
                            </div>
                            <div className="flex items-center px-4 py-2 gap-2 bg-(--color-gray-plus) rounded-full">
                                <p className="text-(--color-gray-black)">{getCategoryName(data_project.star_category)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {data.status == "NOT_STARTED" ? (
                                <Button onClick={startTask} className="inverted roundeful small">
                                    <p className="whitespace-nowrap">Начать работу</p>
                                    <StartWork />
                                </Button>
                            ) : data.status == "IN_PROGRESS" ? (
                                <>
                                    <Button className="blue roundeful small" onClick={goToSubmit}>
                                        <p className="whitespace-nowrap">Сдать задание</p>
                                        <SubmitTask />
                                    </Button>
                                    <Button onClick={endTask} className="inverted roundeful small">
                                        <p className="whitespace-nowrap">Завершить</p>
                                        <StartWork />
                                    </Button>
                                </>
                            ) : data.status == "SUCCESS" ? (
                                <div className="flex items-center px-4 py-2 bg-(--color-green-noise) rounded-full">
                                    <p className="text-(--color-green-peace)">Выполнено</p>
                                </div>
                            ) : (
                                <Button className="inverted roundeful small" disabled>
                                    <p className="whitespace-nowrap">Недоступно</p>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Остальной контент страницы */}
                    <div className="flex items-start gap-5 w-full">
                        <div className="flex flex-col p-4 gap-3 flex-1 bg-(--color-white-gray) rounded-2xl">
                            <div className="flex flex-col gap-2">
                                <h6>Занятость</h6>
                                <p>Пока не подключено</p>
                            </div>
                            <hr className="border-(--color-gray-plus)" />
                            <div className="flex flex-col gap-2">
                                <h6>Заказчик</h6>
                                <div className="flex items-center py-2 px-3 bg-(--color-blue-noise) rounded-lg">
                                    <p className="text-(--color-blue)">Российское Содружество Колледжей</p>
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
                                                className="flex items-center gap-1 px-4 py-2 bg-(--color-gray-plus) rounded-full hover:bg-(--color-gray-plus-50) transition"
                                            >
                                                <p>{material.name}</p>
                                                <LinkArrow />
                                            </a>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-1 px-4 py-2 bg-(--color-gray-plus) rounded-lg">
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