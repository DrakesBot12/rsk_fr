import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
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
                <div className="flex flex-col items-center p-6 gap-10 w-full">
                    <div className="flex flex-col items-start gap-5 w-full max-w-4xl">
                        <div className="w-3/5 py-4 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="w-full py-1.5 bg-gray-200 rounded-full animate-pulse" />
                        <div className="flex flex-col gap-4 mt-4 w-full">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="py-10 bg-gray-200 rounded-lg animate-pulse" />
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
                    <h2 className="text-xl font-semibold text-black">Задание не найдено</h2>
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

            <div className="flex flex-col items-center p-6 gap-10 w-full">
                <div className="flex flex-col items-start gap-5 w-full max-w-4xl">
                    <h4 className="text-2xl font-medium text-black">{data.title}</h4>

                    <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center px-4 py-2 bg-blue-100 rounded-full">
                                <span className="font-manrope font-semibold text-sm text-blue-600">{data.prize_points} баллов</span>
                            </div>
                            <div className="flex items-center px-4 py-2 gap-2 bg-gray-100 rounded-full">
                                <span className="font-manrope font-semibold text-sm text-gray-600">{getCategoryName(data_project.star_category)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Кнопка с переходом на submit */}
                            {category && id_project && (
                                <Button className="blue roundeful small px-4 py-2" onClick={goToSubmit}>
                                    <span className="font-manrope font-semibold text-xs whitespace-nowrap">Сдать задание</span>
                                    <SubmitTask />
                                </Button>
                            )}

                            <Button className="inverted roundeful small px-6 py-2 whitespace-nowrap min-w-fit">
                                <span className="font-manrope font-medium text-sm">Начать работу</span>
                                <StartWork />
                            </Button>
                        </div>
                    </div>

                    {/* Остальной контент страницы */}
                    <div className="flex items-start gap-5 w-full">
                        <div className="flex flex-col p-4 gap-3 flex-1 bg-gray-50 rounded-2xl">
                            <div className="flex flex-col gap-2">
                                <h6 className="text-base font-medium text-gray-600">Занятость</h6>
                                <p className="text-sm text-black">Пока не подключено</p>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex flex-col gap-2">
                                <h6 className="text-base font-medium text-gray-600">Заказчик</h6>
                                <div className="flex items-center py-2 px-3 bg-blue-100 rounded-lg">
                                    <span className="text-sm font-semibold text-blue-600">Российское Содружество Колледжей</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 flex-1">
                            <div className="flex flex-col gap-1">
                                <h6 className="text-base font-medium text-black">Описание задания</h6>
                                <p className="text-sm text-gray-600">{data.description}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h6 className="text-base font-medium text-black">Материалы</h6>
                                <div className="flex flex-wrap gap-1">
                                    {data.materials && data.materials.length > 0 ? (
                                        data.materials.map((material, idx) => (
                                            <a
                                                key={idx}
                                                href={material.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-full text-xs font-manrope font-semibold text-black whitespace-nowrap hover:bg-gray-200 transition"
                                            >
                                                <span>{material.name}</span>
                                                <LinkArrow />
                                            </a>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg text-xs font-manrope font-semibold text-gray-600">
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
