import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const DownIcon = dynamic(() => import("@/assets/general/down.svg"));

// Базовый массив навигационных ссылок
const BASE_NAV_LINKS = [
    { label: "Главная", disable: false, inactive: false, href: "/", icon: dynamic(() => import("@/assets/nav/home.svg")) },
    {
        label: "Команды",
        disable: false,
        inactive: true,
        href: "#",
        icon: dynamic(() => import("@/assets/nav/team.svg")),
        submenu: [
            // { label: "Создать команду", href: "/teams/create" },
            { label: "Список команд", href: "/teams" },
            { label: "Моя команда", href: "/teams/my" },
        ],
    },
    // { label: "Организации", disable: false, inactive: true, href: "/organizations", icon: dynamic(() => import("@/assets/nav/organ.svg")) },
    // {
    //     label: 'Мастерская',
    //     href: '#',
    //     icon: dynamic(() => import('@/assets/nav/pulse.svg')),
    //     submenu: [
    //         { label: 'Пульс', href: '/pulse' },
    //         { label: 'Статистика', href: '/pulse/stats' }
    //     ]
    // },
    // {
    //     label: 'Проекты',
    //     href: '#',
    //     icon: dynamic(() => import('@/assets/nav/projects.svg')),
    //     submenu: [
    //         { label: 'Категории', href: '/projects' },
    //         { label: 'Создать дело', href: '/projects/new-work' }
    //     ]
    //  },
    // { label: 'Новости', href: '/news', icon: dynamic(() => import('@/assets/nav/news.svg')) },
    // { label: "Обучение", disable: false, inactive: true, href: "/cours", icon: dynamic(() => import("@/assets/nav/cours.svg")) },
    {
        label: "Инструменты",
        disable: false,
        inactive: false,
        href: "#",
        icon: dynamic(() => import("@/assets/nav/inst.svg")),
        submenu: [
            { label: "Маяк Око", href: "/tools/mayak-oko" },
            // { label: "В будущем", href: "/tools/mvp" },
        ],
    },
    {
        label: "Админ панель",
        disable: true, // по умолчанию заблокирована
        inactive: false,
        href: "#",
        icon: dynamic(() => import("@/assets/nav/king.svg")),
        submenu: [
            // { label: 'Проекты', href: '/admin/projects' },
            // { label: 'Преподаватели', href: '/admin/teachers' },
            { label: "Обучение", href: "/admin/cours" },
        ],
    },
];

export function useNavLinks() {
    const [navLinks, setNavLinks] = useState(BASE_NAV_LINKS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthAndRole = async () => {
            // Функция для получения куки
            const getCookie = (name) => {
                if (typeof document === "undefined") return null;
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(";").shift();
                console.log(parts);
                return null;
            };

            const userData = getCookie("userData");
            const existingRole = getCookie("role");
            // Если токена нет
            if (!userData) {
                setNavLinks((prevLinks) =>
                    prevLinks.map((link) => ({
                        ...link,
                        inactive: link.inactive, // оставляем исходное значение inactive
                    }))
                );
                setIsLoading(false);
                return;
            }

            // Если токен есть, но роль уже в куках
            if (existingRole) {
                updateNavLinks(existingRole, true);
                setIsLoading(false);
                return;
            }

            // Если токен есть, но роли в куках нет - делаем запрос
            try {
                const response = await fetch("/api/profile/info", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Failed to fetch profile");

                const data = await response.json();
                const role = data.data.Type;

                // Сохраняем роль в куки на 1 день
                if (typeof document !== "undefined") {
                    document.cookie = `role=${role}; max-age=86400; path=/`;
                }

                updateNavLinks(role, true);
            } catch (err) {
                console.error("Request error:", err);
                // В случае ошибки оставляем навигацию как есть
                updateNavLinks(null, true);
            } finally {
                setIsLoading(false);
            }
        };

        const updateNavLinks = (role, hasToken) => {
            setNavLinks((prevLinks) =>
                prevLinks.map((link) => {
                    const updatedLink = { ...link };

                    // Если у пользователя есть токен, снимаем inactive для всех ссылок
                    if (hasToken) {
                        updatedLink.inactive = false;
                    }

                    // Для админ панели проверяем роль
                    if (link.label === "Админ панель") {
                        updatedLink.disable = role !== "moder";
                    }

                    return updatedLink;
                })
            );
        };

        checkAuthAndRole();
    }, []);

    return { navLinks, isLoading };
}

export function NavItem({ label, href, icon: Icon, submenu, isCollapsed, isHovered, onHover, disable, inactive }) {
    const router = useRouter();
    const isSubmenuActive = submenu?.some((item) => router.pathname === item.href);

    // Если элемент отключен, не рендерим его
    if (disable) return null;
    inactive ? (submenu = null) : null;

    return (
        <div key={label} className={`group flex flex-col gap-[0.75rem] cursor-pointer`} onMouseEnter={() => onHover(label)} onMouseLeave={() => onHover(null)}>
            <Link className={`${router.pathname === href ? "active" : ""} items-center ${inactive ? "inactive pointer-events-none" : isSubmenuActive ? "opacity-100" : "opacity-30 group-hover:opacity-100"}`} href={inactive ? "#" : href}>
                <Icon />
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="whitespace-nowrap">
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
                {submenu && (isHovered || isSubmenuActive) && !isCollapsed && <DownIcon className="ml-auto" />}
            </Link>
            <AnimatePresence mode="wait">
                {submenu && (isHovered || isSubmenuActive) && !isCollapsed && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ type: "spring", stiffness: 200, damping: 30 }} className="submenu overflow-hidden">
                        <div className="w-[1.5px] h-full bg-(--color-gray-plus)"></div>
                        <div className="submenu-items w-full">
                            {submenu.map((item) => (
                                <Link key={item.label} href={item.href} className={`${router.pathname === item.href ? "active" : ""} opacity-30 hover:opacity-100`}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Экспортируем базовый массив для обратной совместимости
export const NAV_LINKS = BASE_NAV_LINKS;
