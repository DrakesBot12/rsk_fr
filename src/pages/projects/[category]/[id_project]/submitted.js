import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Notify from "@/assets/general/notify.svg";
import Settings from "@/assets/general/setts.svg";

const SubmittedTaskPage = () => {
    const router = useRouter();
    const { id_project, category } = router.query;
    const [textDescription, setTextDescription] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = () => {
        // Логика отправки данных
        console.log("Text:", textDescription);
        console.log("Link:", link);
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
                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                    <div className="flex flex-col items-start gap-2 w-full">
                        <h4 className="font-manrope font-semibold text-2xl leading-9 text-center w-full" style={{color: 'var(--color-black)'}}>Завершение дела</h4>
                        <p className="font-manrope text-xs leading-4 text-center w-full" style={{color: 'var(--color-gray-black)'}}>
                            Загрузите результат работы. Это может быть ссылка или текстовое описание того, что изменилось и где это найти
                        </p>
                    </div>

                   
                    <button 
                        onClick={handleSubmit}
                        className="flex flex-row justify-center items-center py-3 px-4 gap-3 w-full rounded-xl"
                        style={{background: 'var(--color-black)'}}
                    >
                        <span className="font-manrope font-semibold text-xs leading-4 text-center" style={{color: 'var(--color-white)'}}>В Проекты</span>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default SubmittedTaskPage;