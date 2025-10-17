import React, { useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Notify from "@/assets/general/notify.svg";
import Settings from "@/assets/general/setts.svg";

const SubmitTaskPage = () => {
    const router = useRouter();
    const { id_project, category } = router.query;
    const [textDescription, setTextDescription] = useState("");
    const [link, setLink] = useState("");
    const [focusText, setFocusText] = useState(false);
    const [focusLink, setFocusLink] = useState(false);

    const handleSubmit = () => {
        console.log("Text:", textDescription);
        console.log("Link:", link);

        if (!category || !id_project) return; // защита
        router.push(`/projects/${category}/${id_project}/submitted`);
    };

    const inputStyle = (focused) => ({
        background: focused ? "var(--color-gray-plus-50)" : "transparent",
        border: focused ? "none" : "1.5px solid var(--color-gray-plus-50)",
        color: "var(--color-gray-black)",
    });

    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты / Знания и навыки / Курсы для студентов...</Header.Heading>
                <div className="flex items-center gap-2">
                    <Button icon>
                        <Settings />
                    </Button>
                    <Button icon>
                        <Notify />
                    </Button>
                </div>
            </Header>

            <div className="flex flex-col justify-center items-center p-6 gap-3 w-full flex-1">
                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                    <div className="flex flex-col items-start gap-2 w-full">
                        <h4 className="font-manrope font-semibold text-2xl leading-9 text-center w-full" style={{color: 'var(--color-black)'}}>
                            Завершение дела
                        </h4>
                        <p className="font-manrope text-xs leading-4 text-center w-full" style={{color: 'var(--color-gray-black)'}}>
                            Загрузите результат работы. Это может быть ссылка или текстовое описание того, что изменилось и где это найти
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 w-full">
                        <div
                            className="flex flex-row items-center py-3 px-3.5 gap-3.5 w-full rounded-xl"
                            style={{ background: focusText ? "var(--color-gray-plus-50)" : "transparent", border: focusText ? "none" : "1.5px solid var(--color-gray-plus-50)" }}
                        >
                            <textarea
                                value={textDescription}
                                onChange={(e) => setTextDescription(e.target.value)}
                                onFocus={() => setFocusText(true)}
                                onBlur={() => setFocusText(false)}
                                className="font-manrope text-xs leading-4 w-full bg-transparent border-none outline-none resize-none"
                                rows={1}
                                placeholder="Текстовое описание"
                                style={{ color: "var(--color-gray-black)" }}
                            />
                        </div>

                        <div
                            className="flex flex-row items-center py-3 px-3.5 gap-3.5 w-full rounded-xl"
                            style={{ background: focusLink ? "var(--color-gray-plus-50)" : "transparent", border: focusLink ? "none" : "1.5px solid var(--color-gray-plus-50)" }}
                        >
                            <input
                                type="url"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                onFocus={() => setFocusLink(true)}
                                onBlur={() => setFocusLink(false)}
                                className="font-manrope text-xs leading-4 w-full bg-transparent border-none outline-none"
                                placeholder="Ссылка"
                                style={{ color: "var(--color-gray-black)" }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="flex flex-row justify-center items-center py-3 px-4 gap-3 w-full rounded-xl"
                        style={{ background: 'var(--color-black)' }}
                    >
                        <span className="font-manrope font-semibold text-xs leading-4 text-center" style={{ color: 'var(--color-white)' }}>
                            Завершить
                        </span>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default SubmitTaskPage;
