import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Warning from "@/assets/general/warning.svg";
import Clock from "@/assets/general/clock.svg";

export default function Cours() {
    const router = useRouter();
    const [lessons, setLessons] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLessons = async () => {
            try {
                const res = await fetch("/api/cours", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                const data = await res.json();
                if (data.success) {
                    setLessons(data.data);
                } else {
                    console.error("Ошибка API:", data);
                }
            } catch (err) {
                console.error("Ошибка запроса:", err);
            } finally {
                setLoading(false);
            }
        };

        loadLessons();
    }, []);

    return (
        <Layout>
            <Header>
                <Header.Heading>Обучение</Header.Heading>
            </Header>
            <div className="hero overflow-hidden" style={{ placeItems: "center" }}>
                <div className="h-full w-full col-span-12 grid grid-cols-3 gap-[1.5rem]">
                    {loading &&
                        [...Array(6)].map((_, idx) => (
                            <div key={idx} className="animate-pulse flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                                <div className="w-12 h-12 bg-gray-300 rounded-full" />
                                <div className="h-4 w-1/2 bg-gray-300 rounded" />
                                <div className="h-3 w-2/3 bg-gray-200 rounded" />
                            </div>
                        ))}

                    {!loading &&
                        lessons &&
                        (() => {
                            let lockFound = false;

                            return lessons.map((lesson, idx) => {
                                // Первый урок всегда доступен
                                if (idx === 0) {
                                    return (
                                        <iframe
                                            key={lesson.id}
                                            src={lesson.download_url}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: "none",
                                                borderRadius: "1rem",
                                            }}
                                            allow="autoplay; fullscreen"
                                            allowFullScreen
                                        />
                                    );
                                }

                                if (lesson.is_completed) {
                                    // доступен → видео
                                    return (
                                        <iframe
                                            key={lesson.id}
                                            src={lesson.download_url}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: "none",
                                                borderRadius: "1rem",
                                            }}
                                            allow="autoplay; fullscreen"
                                            allowFullScreen
                                        />
                                    );
                                }

                                if (!lockFound) {
                                    // первый закрытый → нет доступа
                                    lockFound = true;
                                    return (
                                        <div key={lesson.id} className="flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                                            <span className="w-[2.25rem] h-[2.25rem] text-red-500">
                                                <Warning />
                                            </span>
                                            <h6>Нет доступа</h6>
                                            <p className="w-[60%] text-center">Для начала пройдите предыдущее задание</p>
                                            <Button onClick={() => router.push(`/cours/${lesson.lesson_number}`)}>К заданию</Button>
                                        </div>
                                    );
                                }

                                // все остальные после закрытого → в будущем
                                return (
                                    <div key={lesson.id} className="flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                                        <span className="w-[2.25rem] h-[2.25rem] text-blue-500">
                                            <Clock />
                                        </span>
                                        <h6>В будущем</h6>
                                        <p className="w-[60%] text-center">Закончите предыдущие задания и уроки</p>
                                    </div>
                                );
                            });
                        })()}

                    {!loading && (!lessons || lessons.length === 0) && <div className="col-span-3 text-center py-10 text-gray-500">Уроки не найдены</div>}
                </div>
            </div>
        </Layout>
    );
}
