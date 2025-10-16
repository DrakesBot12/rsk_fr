import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Notify from "@/assets/general/notify.svg";
import SubmitTask from "@/assets/general/submittask.svg";
import StartWork from "@/assets/general/startwork.svg";
import LinkArrow from "@/assets/general/linkarrow.svg";
import { categories as staticCategories } from "@/pages/projects/_categories";

function getCategoryName(url) {
    const category = staticCategories.find((c) => c.url === url);
    return category ? category.name : url;
}

const TaskPage = () => {
    const router = useRouter();
    const { id_task, id_project } = router.query;
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

        if (id_task) getTaskInfo();

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

        if (id_project) getProjectInfo();
    }, [id_project, id_task]);

    // === 1. Прелоадер ===
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

                <div className="flex flex-col items-center p-[1.5rem] gap-[2.5rem] w-full">
                    <div className="flex flex-col items-start gap-[1.25rem] w-[43.375rem]">
                        {/* Заголовок */}
                        <div className="w-[60%] h-[2rem] bg-gray-200 rounded-lg animate-pulse">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </div>

                        {/* Прогресс-бар */}
                        <div className="w-full h-[0.75rem] bg-gray-200 rounded-full animate-pulse">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </div>

                        {/* Карточки */}
                        <div className="flex flex-col gap-[1rem] mt-[1rem] w-full">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-[5rem] bg-gray-200 rounded-lg animate-pulse">
                                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // === 2. Ошибка / не найдено ===
    if (!data || data.success === false) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты / Знания и навыки / Курсы для студентов...</Header.Heading>
                    <Button icon>
                        <Notify />
                    </Button>
                </Header>

                <div className="flex flex-col items-center justify-center w-full h-[80vh] gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">Задание не найдено</h2>
                    <Link href="/projects" className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                        Вернуться
                    </Link>
                </div>
            </Layout>
        );
    }

    // === 3. Основная страница ===
    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты / Знания и навыки / Курсы для студентов...</Header.Heading>
                <Button icon>
                    <Notify />
                </Button>
            </Header>

            <div className="flex flex-col items-center p-[1.5rem] gap-[2.5rem] w-full">
                <div className="flex flex-col items-start gap-[1.25rem] w-[43.375rem]">
                    <h4 className="text-[1.5rem] font-medium text-[#08090A] whitespace-nowrap">{data.title}</h4>

                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-[0.5rem]">
                            <div className="flex items-center justify-center px-[0.875rem] py-[0.5rem] w-[8rem] h-[2.5rem] bg-[#E0E8FF] rounded-[6.25rem]">
                                <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#3A6BFF]">{data.prize_points} баллов</span>
                            </div>
                            <div className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[8.5rem] h-[2.5rem] bg-[#F3F4F5] rounded-[6.25rem]">
                                <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#909399]">{getCategoryName(data_project.star_category)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-[0.5rem]">
                            {data.status == "NOT_STARTED" ? (
                                <Button onClick={startTask} className="inverted roundeful small btn-start gap-[0.375rem] px-[0.875rem] py-[0.5rem] transition-all duration-300 hover:shadow-lg">
                                    <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] whitespace-nowrap">Начать работу</span>
                                    <div className="w-[0.875rem] h-[0.875rem]">
                                        <StartWork />
                                    </div>
                                </Button>
                            ) : data.status == "IN_PROGRESS" ? (
                                <Button onClick={endTask} className="blue roundeful small btn-submit gap-[0.375rem] px-[0.875rem] py-[0.5rem] transition-all duration-300 hover:shadow-lg">
                                    <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-center whitespace-nowrap">Сдать задание</span>
                                    <div className="w-[0.875rem] h-[0.875rem]">
                                        <SubmitTask />
                                    </div>
                                </Button>
                            ) : data.status == "IN_PROGRESS" ? (
                                <div className="flex items-center gap-[4px] px-[0.875rem] py-[0.5rem] bg-(--color-green-noise) rounded-[0.625rem] text-[0.625rem] font-manrope font-semibold text-(--color-green-black) whitespace-nowrap">
                                    <span>Выполнено</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-[4px] px-[0.875rem] py-[0.5rem] bg-[#F3F4F5] rounded-[0.625rem] text-[0.625rem] font-manrope font-semibold text-(--color-gray-black) whitespace-nowrap">
                                    <span>Неизвестная ошибка</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start gap-[1.25rem] w-full">
                        <div className="flex flex-col p-[1rem] gap-[0.75rem] w-1/2 bg-[#FAFBFC] rounded-[1rem]">
                            <div className="flex flex-col gap-[0.5rem]">
                                <h6 className="text-[1rem] font-medium text-[#909399]">Занятость</h6>
                                <p className="text-[0.75rem] text-[#08090A]">Пока не подключено</p>
                            </div>
                            <hr className="border-[#EBEDF0]" />
                            <div className="flex flex-col gap-[0.5rem]">
                                <h6 className="text-[1rem] font-medium text-[#909399]">Заказчик</h6>
                                <div className="flex items-center py-[0.625rem] px-[0.75rem] bg-[#E0E8FF] rounded-[0.625rem]">
                                    <span className="text-[0.75rem] font-semibold text-[#3A6BFF]">Российское Содружество Колледжей</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[1.25rem] w-1/2">
                            <div className="flex flex-col gap-[0.25rem]">
                                <h6 className="text-[1rem] font-medium text-[#08090A]">Описание задания</h6>
                                <p className="text-[0.75rem] text-[#909399]">{data.description}</p>
                            </div>

                            <div className="flex flex-col gap-[0.5rem]">
                                <h6 className="text-[1rem] font-medium text-[#08090A]">Материалы</h6>
                                <div className="flex flex-wrap gap-[4px]">
                                    {data.materials && data.materials.length > 0 ? (
                                        data.materials.map((material, idx) => (
                                            <a
                                                key={idx}
                                                href={material.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-[4px] px-[0.875rem] py-[0.5rem] bg-[#F3F4F5] rounded-full text-[0.625rem] font-manrope font-semibold text-[#08090A] whitespace-nowrap hover:bg-gray-200 transition">
                                                <span>{material.name}</span>
                                                <LinkArrow />
                                            </a>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-[4px] px-[0.875rem] py-[0.5rem] bg-[#F3F4F5] rounded-[0.625rem] text-[0.625rem] font-manrope font-semibold text-(--color-gray-black) whitespace-nowrap">
                                            <span>Материалов нет</span>
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
