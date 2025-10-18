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
    const handleSubmit = () => {
        console.log("Text:", textDescription);
        console.log("Link:", link);

        if (!category || !id_project) return; // защита
        router.push(`/projects/${category}/${id_project}/submitted`);
    };

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
                <div className="flex flex-col items-center gap-6 w-1/4">
                    <div className="flex flex-col items-stretch gap-2 w-full">
                        <h3 className="text-center text-(--color-black)">Завершение дела</h3>
                        <p className="text-center text text-(--color-gray-black)">Загрузите результат работы. Это может быть ссылка или текстовое описание того, что изменилось и где это найти</p>
                    </div>

                    <div className="flex flex-col items-start gap-3 w-full">
                        <div className="input-wrapper rounded-xl w-full">
                            <textarea value={textDescription} onChange={(e) => setTextDescription(e.target.value)} className="w-full bg-transparent border-none outline-none resize-none" rows={1} placeholder="Текстовое описание" />
                        </div>

                        <div className="input-wrapper rounded-xl w-full">
                            <input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="w-full bg-transparent border-none outline-none" placeholder="Ссылка" />
                        </div>
                    </div>

                    <Button onClick={handleSubmit} className="w-full">
                        Завершить
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SubmitTaskPage;
