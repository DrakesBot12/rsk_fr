import React from "react";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Notify from "@/assets/general/notify.svg";
import Settings from "@/assets/general/setts.svg";

const SubmittedTaskPage = () => {
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
                        <h3 className="text-center">Завершение дела</h3>
                        <p className="text-center w-full">Загрузите результат работы. Это может быть ссылка или текстовое описание того, что изменилось и где это найти</p>
                    </div>

                    <Link href="/projects" className="w-full">
                        <Button className="w-full">В проекты</Button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default SubmittedTaskPage;
