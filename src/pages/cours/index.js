import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Notify from "@/assets/general/notify.svg";
import Warning from "@/assets/general/warning.svg";
import Clock from "@/assets/general/clock.svg";
import { useRouter } from "next/navigation";

const lessons = [
    { type: "video", url: "https://rutube.ru/play/embed/da2ce5366a1352032c1d432a26c80841/" },
    { type: "task", title: "Нет доступа", description: "Для начала пройдите задание с первого урока", buttonText: "К заданию" },
    { type: "locked", date: "20 сентября" },
    { type: "locked", date: "21 сентября" },
    { type: "locked", date: "22 сентября" },
    { type: "locked", date: "23 сентября" },
    { type: "locked", date: "24 сентября" },
    { type: "locked", date: "25 сентября" },
];

export default function Cours() {
    const router = useRouter();
    return (
        <Layout>
            <Header>
                <Header.Heading>Обучение</Header.Heading>
                {/* <Button icon>
                    <Notify />
                </Button> */}
            </Header>
            <div className="hero overflow-hidden" style={{ placeItems: "center" }}>
                <div className="h-full w-full col-span-12 grid grid-cols-3 gap-[1.5rem]">
                    {lessons.map((lesson, idx) => {
                        if (lesson.type === "video") {
                            return <iframe key={idx} src={lesson.url} width="100%" height="100%" style={{ border: "none", borderRadius: "1rem" }} allow="autoplay; fullscreen" allowFullScreen />;
                        }

                        if (lesson.type === "task") {
                            return (
                                <div key={idx} className="flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                                    <span className="w-[2.25rem] h-[2.25rem]">
                                        <Warning />
                                    </span>
                                    <h6>{lesson.title}</h6>
                                    <p className="w-[60%] text-center">{lesson.description}</p>
                                    {lesson.buttonText && <Button onClick={() => router.push("/cours/task")}>{lesson.buttonText}</Button>}
                                </div>
                            );
                        }

                        return (
                            <div key={idx} className="flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                                <span className="w-[2.25rem] h-[2.25rem]">
                                    <Clock />
                                </span>
                                <h6>Будет доступно</h6>
                                <p className="w-[60%] text-center">{lesson.date}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
