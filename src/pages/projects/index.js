import Link from "next/link";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import Button from "@/components/ui/Button";

import Index from "@/assets/general/index.svg";
import Notify from "@/assets/general/notify.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useProfile } from "@/hooks/fetchProfile";
import { useProjects } from "@/hooks/fetchProjects";
import { categories as staticCategories } from "@/pages/projects/_categories";

export default function Projects() {
    // Выключено для теста
    // const { data, fetchProfile } = useProfile();
    const [dataProfile, fetchProfile] = useState({ Organization: 2 });
    const { loading, categories: projects, error, fetchProjects } = useProjects();

    // Выключено для теста
    // useEffect(() => {
    //     fetchProfile();
    // }, [fetchProfile]);

    const [processedCategories, setProcessedCategories] = useState([]);

    useEffect(() => {
        fetchProjects(dataProfile.Organization);
    }, [dataProfile.Organization, fetchProjects]);

    useEffect(() => {
        if (!loading && !error && projects) {
            const enhanced = staticCategories.map((cat) => {
                const catProjects = projects.filter((p) => p.star_category === cat.url);
                const star_index = catProjects.reduce((sum, p) => sum + p.star_index, 0);
                const completedProjects = catProjects.filter((p) => p.tasks.length > 0 && p.tasks.every((t) => t.status === "SUCCESS"));
                const level_number = completedProjects.length > 0 ? Math.max(...completedProjects.map((p) => p.level_number)) : 0;
                return { ...cat, star_index, level_number };
            });
            setProcessedCategories(enhanced);
        }
    }, [loading, error, projects]);

    if (loading) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты</Header.Heading>
                    <Button icon>
                        <Notify />
                    </Button>
                </Header>
                <div className="flex h-full items-center justify-center">
                    <p>Загрузка проектов...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты</Header.Heading>
                    <Button icon>
                        <Notify />
                    </Button>
                </Header>
                <div className="flex h-full items-center justify-center">
                    <p className="text-red-500">Ошибка: {error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты</Header.Heading>
                <Button icon>
                    <Notify />
                </Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content" }}>
                <hgroup className="flex flex-col col-span-4 gap-[.5rem]">
                    <h3>Проекты</h3>
                    <p className="text-(--color-gray-black)">Выберите категорию проектов, которую хотите выполнять. Каждая из них развивает одно из направлений звезды</p>
                </hgroup>
                <div className="col-span-12 grid grid-cols-3 gap-[1.25rem] h-fit">
                    {processedCategories.map((category, idx) => (
                        <Link
                            href={"/projects/" + category.url}
                            key={idx}
                            className="flex flex-col min-h-[200px] justify-between p-[1.25rem] rounded-[1rem] border-[1.5px] border-(--color-gray-plus-50) hover:bg-(--color-white-gray) hover:border-(--color-white-gray) transition">
                            <div className="flex flex-col gap-[.5rem]">
                                <div className="flex w-full justify-between">
                                    <h5>{category.name}</h5>
                                    <div className="flex items-center justify-center h-fit rounded-[6.25rem] text-(--color-blue) px-[.75rem] py-[.5rem] bg-(--color-blue-noise)">{category.level_number}&nbsp;уровень</div>
                                </div>
                                <p className="text-(--color-gray-black)">{category.desc}</p>
                            </div>

                            <div className="w-full flex flex-col text-(--color-blue) gap-[.25rem]">
                                <div className="flex gap-[.5rem] items-center">
                                    <Index /> {category.star_index} / 6
                                </div>
                                <div className="w-full h-[.25rem] rounded-[6.25rem] overflow-hidden bg-(--color-blue-noise)">
                                    <div
                                        className="bg-(--color-blue) h-full"
                                        style={{
                                            width: `${(category.star_index / 6) * 100}%`,
                                            transition: "width 0.3s",
                                        }}></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
