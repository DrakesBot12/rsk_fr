"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Warning from "@/assets/general/warning.svg";
import TimeBefore from "@/assets/general/timeBefore.svg";
import File from "@/assets/general/file.svg";
import Button from "@/components/ui/Button";

export default function Task() {
    const router = useRouter();
    const { task } = router.query;
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    const [fileSelected, setFileSelected] = useState(false);
    const [fileName, setFileName] = useState("Прикрепите файл");
    const [submitted, setSubmitted] = useState(false);

    // Проверка куки при загрузке
    useEffect(() => {
        const submittedCookie = Cookies.get(`task_${task}_submitted`);
        if (submittedCookie) {
            setSubmitted(true);
        }
    }, [task]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/cours", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Ошибка загрузки");

                const json = await res.json();
                if (!json.success) throw new Error("API вернуло ошибку");
                console.log(json.data);

                const found = json.data.find((l) => Number(l.lesson_number) === Number(task));
                setLesson(found || null);

                // проверяем куку
                const cookie = document.cookie.split("; ").find((row) => row.startsWith(`lesson_${task}_uploaded=`));
                if (cookie) {
                    setStatus("waiting");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (task) fetchData();
    }, [task]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileSelected(true);
            setFileName(e.target.files[0].name);
        } else {
            setFileSelected(false);
            setFileName("Прикрепите файл");
        }
    };

    const handleSubmit = () => {
        // условно "отправляем" файл
        Cookies.set(`task_${task}_submitted`, "true", { expires: 1 }); // живёт 1 день
        setSubmitted(true);
    };

    if (loading) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Обучение</Header.Heading>
                </Header>
                <div className="flex h-full flex items-center justify-center">
                    <p>Загрузка...</p>
                </div>
            </Layout>
        );
    }

    if (!lesson) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Обучение</Header.Heading>
                </Header>
                <div className="flex h-full items-center justify-center">
                    <h1>Задание не найдено</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Header>
                <Header.Heading>Обучение</Header.Heading>
            </Header>
            <div className="hero overflow-hidden" style={{ placeItems: "center" }}>
                <div className="h-full w-full col-span-12 grid grid-cols-2 gap-[1.5rem]">
                    {/* Блок доступа */}
                    {!lesson.is_completed ? (
                        <div className="flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                            <span className="w-[2.25rem] h-[2.25rem]">
                                <Warning />
                            </span>
                            <h6>Нет доступа</h6>
                            <p className="w-[60%] text-center">Для начала пройдите задание</p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                            <h6>Задание доступно</h6>
                            <p className="w-[70%] text-center">Выполните задание и прикрепите файл</p>
                        </div>
                    )}

                    {/* Блок описания */}
                    <div className="flex flex-col justify-start items-start gap-[1rem]">
                        <h3>{lesson.lesson_name}</h3>
                        <p>{lesson.description}</p>

                        {submitted ? (
                            <a className="bg-(--color-gray-plus-50) gap-[0.75rem] p-[0.75rem] rounded-[0.75rem] text-(--color-gray-black) flex flex-row align-center">
                                <TimeBefore />
                                Ожидание проверки
                            </a>
                        ) : (
                            <>
                                <div className="flex flex-row gap-[0.75rem] max-w-full">
                                    <Button inverted className="relative flex items-center gap-2">
                                        <File />
                                        <input type="file" accept={lesson.file_type || "*/*"} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                                        <a className="w-max">{fileName}</a>
                                    </Button>
                                    <Button inverted disabled={!fileSelected} onClick={handleSubmit}>
                                        Отправить
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
