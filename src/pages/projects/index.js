import Link from "next/link";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import Button from "@/components/ui/Button";

import Index from "@/assets/general/index.svg";
import Notify from "@/assets/general/notify.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Локальные названия категорий для отображения
const CATEGORY_NAMES = {
    KNOWLEDGE: "Знания и навыки",
    INTERACTION: "Взаимодействие",
    ENVIRONMENT: "Окружающая среда",
    PROTECTION: "Защита",
    DATA: "Данные",
    AUTOMATION: "Автоматизация",
};

const CATEGORY_DESCRIPTIONS = {
    KNOWLEDGE: "Развитие цифровых и профессиональных умений студентов и преподавателей",
    INTERACTION: "Улучшение коммуникации и collaboration внутри колледжа",
    ENVIRONMENT: "Создание комфортной и технологичной образовательной среды",
    PROTECTION: "Обеспечение безопасности и защита данных",
    DATA: "Работа с данными и аналитика",
    AUTOMATION: "Автоматизация процессов и рутинных задач",
};

export default function Projects() {
    const [organization_name, setOrganizationName] = useState(2);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const clearCookies = () => {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/profile/info", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        clearCookies();
                        router.push("/auth");
                        return;
                    }
                    throw new Error("Failed to fetch profile");
                }
                const data = await response.json();
                setOrganizationName(data.data.Organization);
            } catch (err) {
                console.error("Request error:", err);
            }
        };

        // Выключено на время тестов и пока не обновится API и не будут все орги в ней
        // fetchProfile();
    }, [router]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects/all/${organization_name}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                console.log(organization_name);

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        router.push("/auth");
                        return;
                    }
                    throw new Error("Failed to fetch projects");
                }

                const result = await response.json();

                if (result.success) {
                    // Преобразуем данные из API в формат для отображения
                    const formattedCategories = formatCategoriesData(result.data);
                    setCategories(formattedCategories);
                } else {
                    throw new Error(result.error || "Failed to load projects");
                }
            } catch (err) {
                console.error("Projects fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const formatCategoriesData = (apiData) => {
            // Создаем базовую структуру для всех 6 категорий
            const allCategories = ["KNOWLEDGE", "INTERACTION", "ENVIRONMENT", "PROTECTION", "DATA", "AUTOMATION"].map((categoryKey) => ({
                url: categoryKey.toLowerCase(),
                name: CATEGORY_NAMES[categoryKey] || categoryKey,
                desc: CATEGORY_DESCRIPTIONS[categoryKey] || "Описание категории",
                index: 0,
                currentLvl: 0,
            }));

            // Если API вернуло данные, обновляем индексы и уровни
            if (apiData && Array.isArray(apiData)) {
                apiData.forEach((project) => {
                    const categoryKey = project.category?.toUpperCase();
                    if (categoryKey && allCategories.find((cat) => cat.url === categoryKey.toLowerCase())) {
                        // Здесь логика для обновления index и currentLvl на основе данных проекта
                        // Например: увеличиваем index для категории и вычисляем максимальный уровень
                        const category = allCategories.find((cat) => cat.url === categoryKey.toLowerCase());
                        if (category) {
                            category.index += 1; // или другая логика подсчета
                            category.currentLvl = Math.max(category.currentLvl, project.level || 0);
                        }
                    }
                });
            }

            return allCategories;
        };

        fetchProjects();
    }, [organization_name, router]);

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
                    {categories.map((category, idx) => (
                        <Link
                            href={"/projects/" + category.url}
                            key={idx}
                            className="flex flex-col min-h-[200px] justify-between p-[1.25rem] rounded-[1rem] border-[1.5px] border-(--color-gray-plus-50) hover:bg-(--color-white-gray) hover:border-(--color-white-gray) transition">
                            <div className="flex flex-col gap-[.5rem]">
                                <div className="flex w-full justify-between">
                                    <h5>{category.name}</h5>
                                    <div className="flex items-center justify-center h-fit rounded-[6.25rem] text-(--color-blue) px-[.75rem] py-[.5rem] bg-(--color-blue-noise)">{category.currentLvl}&nbsp;уровень</div>
                                </div>
                                <p className="text-(--color-gray-black)">{category.desc}</p>
                            </div>
                            <div className="w-full flex flex-col text-(--color-blue) gap-[.25rem]">
                                <div className="flex gap-[.5rem] items-center">
                                    <Index /> {category.index} / 6
                                </div>
                                <div className="w-full h-[.25rem] rounded-[6.25rem] overflow-hidden bg-(--color-blue-noise)">
                                    <div
                                        className="bg-(--color-blue) h-full"
                                        style={{
                                            width: `${(category.index / 6) * 100}%`,
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
