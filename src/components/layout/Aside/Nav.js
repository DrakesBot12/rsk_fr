import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const DownIcon = dynamic(() => import("@/assets/general/down.svg"));

export const NAV_LINKS = [
    { label: "Главная", href: "/", icon: dynamic(() => import("@/assets/nav/home.svg")) },
    // {
    //     label: 'Команды',
    //     href: '#',
    //     icon: dynamic(() => import('@/assets/nav/team.svg')),
    //     submenu: [
    //         { label: 'Создать команду', href: '/teams/create' },
    //         { label: 'Список команд', href: '/teams' },
    //         { label: 'Моя команда', href: '/teams/my' }
    //     ]
    // },
    { label: "Организации", href: "/organizations", icon: dynamic(() => import("@/assets/nav/organ.svg")) },
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
    { label: "Обучение", href: "/cours", icon: dynamic(() => import("@/assets/nav/cours.svg")) },
    {
        label: "Инструменты",
        href: "#",
        icon: dynamic(() => import("@/assets/nav/inst.svg")),
        submenu: [
            { label: "Маяк Око", href: "/tools/mayak-oko" },
            { label: "В будущем", href: "/tools/mvp" },
        ],
    },
    {
        label: "Админ панель",
        href: "#",
        icon: dynamic(() => import("@/assets/nav/king.svg")),
        submenu: [
            // { label: 'Проекты', href: '/admin/projects' },
            // { label: 'Преподаватели', href: '/admin/teachers' },
            { label: "Обучение", href: "/admin/cours" },
        ],
    },
];

export function NavItem({ label, href, icon: Icon, submenu, isCollapsed, isHovered, onHover }) {
    const router = useRouter();
    const isSubmenuActive = submenu?.some((item) => router.pathname === item.href);

    return (
        <div key={label} className="group flex flex-col gap-[0.75rem]" onMouseEnter={() => onHover(label)} onMouseLeave={() => onHover(null)}>
            <Link className={`${router.pathname === href ? "active" : ""} flex items-center ${isSubmenuActive ? "opacity-100" : "opacity-30"} group-hover:opacity-100`} href={href}>
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
