import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

import { useUserData } from "@/utils/auth";
import Button from "@/components/ui/Button";

import { NAV_LINKS, NavItem } from "./Nav";

const AuthIcon = dynamic(() => import("@/assets/nav/auth.svg"));
const Burger = dynamic(() => import("@/assets/nav/burger.svg"));

export default function Aside() {
    const router = useRouter();
    const initialCollapsed = Cookies.get("sidebarCollapsed") === "true";

    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
    const [hovered, setHovered] = useState(null);
    const links = useMemo(() => NAV_LINKS, []);
    const userData = useUserData();

    const toggleSidebar = () => {
        setIsCollapsed((c) => {
            const next = !c;
            Cookies.set("sidebarCollapsed", String(next), {
                path: "/",
                sameSite: "strict",
                expires: 7,
            });
            return next;
        });
    };

    return (
        <motion.aside
            initial={false}
            animate={isCollapsed ? "collapsed" : "expanded"}
            variants={{
                expanded: { width: "16rem", transition: { type: "spring", stiffness: 200, damping: 30 } },
                collapsed: { width: "6.5rem", transition: { type: "spring", stiffness: 200, damping: 30 } },
            }}
            className="overflow-hidden">
            <div className={`logo-container flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div key="logo" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                            <Image src="/images/logo.svg" alt="logo" width={76} height={40} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <Burger onClick={toggleSidebar} className="cursor-pointer" />
            </div>

            <nav>
                {links.map((item) => (
                    <NavItem key={item.label} {...item} isCollapsed={isCollapsed} isHovered={hovered === item.label} onHover={setHovered} />
                ))}
            </nav>

            {userData ? (
                <div className="flex gap-[0.75rem] justify-center h-[2rem] cursor-pointer" onClick={() => router.push("/profile")}>
                    <div className="h-full rounded-[0.5rem] aspect-square bg-(--color-black)"></div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col w-full">
                                <span className="link big">{userData.username ? `${userData.username}` : "Незаполнено"}</span>
                                <span className="link small text-bold text-(--color-gray-black)">{userData.email}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Button inverted roundeful className={`auth ${isCollapsed ? "!p-[1rem]" : ""}`} onClick={() => router.push("/auth")}>
                    <AnimatePresence mode="wait">
                        {!isCollapsed ? (
                            <motion.span key="full-text" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                                Авторизация
                            </motion.span>
                        ) : (
                            <motion.span key="icon" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                                <AuthIcon />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
            )}
        </motion.aside>
    );
}

// import { useState, useEffect } from 'react';
// import { useUserData } from '@/utils/auth';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import Cookies from 'js-cookie';
// import Button from '@/components/ui/Button';

// import DownIcon from '@/assets/general/down.svg';

// import Burger from '@/assets/nav/burger.svg';
// import KingIcon from '@/assets/nav/king.svg';
// import HomeIcon from '@/assets/nav/home.svg';
// import TeamIcon from '@/assets/nav/team.svg';
// import NewsIcon from '@/assets/nav/news.svg';
// import InstIcon from '@/assets/nav/inst.svg';
// import AuthIcon from '@/assets/nav/auth.svg';
// import OrganIcon from '@/assets/nav/organ.svg';
// import PulseIcon from '@/assets/nav/pulse.svg';
// import CourseIcon from '@/assets/nav/course.svg';
// import ProjectsIcon from '@/assets/nav/projects.svg'

// const NAV_LINKS = [
//     { label: 'Главная', href: '/', icon: HomeIcon },
//     {
//         label: 'Команды',
//         href: '#',
//         icon: TeamIcon,
//         submenu: [
//             { label: 'Создать команду', href: '/teams/create' },
//             { label: 'Список команд', href: '/teams' },
//             { label: 'Моя команда', href: '/teams/my' }
//         ]
//     },
//     { label: 'Организации', href: '/organizations', icon: OrganIcon },
//     {
//         label: 'Мастерская',
//         href: '#',
//         icon: PulseIcon,
//         submenu: [
//             { label: 'Пульс', href: '/pulse' },
//             { label: 'Статистика', href: '/pulse/stats' }
//         ]
//     },
//     {
//         label: 'Проекты',
//         href: '#',
//         icon: ProjectsIcon,
//         submenu: [
//             { label: 'Категории', href: '/projects' },
//             { label: 'Создать дело', href: '/projects/new-work' }
//         ]
//      },
//     { label: 'Новости', href: '/news', icon: NewsIcon },
//     { label: 'Курсы', href: '/courses', icon: CourseIcon },
//     {
//         label: 'Инструменты',
//         href: '#',
//         icon: InstIcon,
//         submenu: [
//             { label: 'Маяк Око', href: '/tools/mayak-oko' },
//             { label: 'В будущем', href: '/tools/mvp' }
//         ]
//     },
//     {
//         label: 'Админ панель',
//         href: '#',
//         icon: KingIcon,
//         submenu: [
//             { label: 'Проекты', href: '/admin/projects' },
//             { label: 'Преподаватели', href: '/admin/teachers' }
//         ]
//      },
// ];

// export default function Aside() {
//     const router = useRouter();
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [hydrated, setHydrated] = useState(false);
//     const [hoveredNav, setHoveredNav] = useState(null);

//     const userData = useUserData();

//     useEffect(() => {
//         const storedState = Cookies.get('sidebarCollapsed');
//         setIsCollapsed(storedState === 'true');
//         setHydrated(true);
//     }, []);

//     const toggleSidebar = () => {
//         const newState = !isCollapsed;
//         setIsCollapsed(newState);
//         Cookies.set('sidebarCollapsed', newState.toString(), {
//             path: '/',
//             sameSite: 'strict',
//             expires: 7
//         });
//     };

//     if (!hydrated) return null;

//     return (
//         <motion.aside
//             initial={false}
//             animate={isCollapsed ? 'collapsed' : 'expanded'}
//             variants={{
//                 expanded: {
//                     width: '16rem',
//                     transition: { duration: 0.3, ease: 'easeInOut' }
//                 },
//                 collapsed: {
//                     width: '6.5rem',
//                     transition: { duration: 0.3, ease: 'easeInOut' }
//                 }
//             }}
//             className="overflow-hidden"
//         >
//             <div className={`logo-container ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
//                 {!isCollapsed && (
//                     <Image src="/images/logo.svg" alt="logo" width={76} height={40} />
//                 )}
//                 <Burger onClick={toggleSidebar} className="cursor-pointer" />
//             </div>

//             <nav>
//                 {NAV_LINKS.map(({ label, href, icon: Icon, submenu }) => {
//                     const isSubmenuActive = submenu?.some(item => router.pathname === item.href);

//                     return (
//                         <div
//                             key={label}
//                             className="group flex flex-col gap-[0.75rem]"
//                             onMouseEnter={() => setHoveredNav(label)}
//                             onMouseLeave={() => setHoveredNav(null)}
//                         >
//                             <Link
//                                 className={`${router.pathname === href ? 'active' : ''} flex items-center ${isSubmenuActive ? 'opacity-100' : 'opacity-30'}  group-hover:opacity-100`}
//                                 href={href}
//                             >
//                                 <Icon />
//                                 <AnimatePresence>
//                                     {!isCollapsed && (
//                                         <motion.span
//                                             initial={{ opacity: 0, x: -20 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             exit={{ opacity: 0, x: -20 }}
//                                             className="whitespace-nowrap"
//                                         >
//                                             {label}
//                                         </motion.span>
//                                     )}
//                                 </AnimatePresence>
//                                 {submenu && (hoveredNav === label || isSubmenuActive) && !isCollapsed && (
//                                     <DownIcon className="ml-auto" />
//                                 )}
//                             </Link>
//                             {submenu && (hoveredNav === label || isSubmenuActive) && !isCollapsed && (
//                                 <AnimatePresence>
//                                     <motion.div
//                                         initial={{ opacity: 0, height: 0 }}
//                                         animate={{ opacity: 1, height: 'auto' }}
//                                         exit={{ opacity: 0, height: 0 }}
//                                         className="submenu"
//                                     >
//                                         <div className="w-[1.5px] h-full bg-(--color-gray-plus)"></div>
//                                         <div className='submenu-items w-full'>
//                                             {submenu.map((item) => (
//                                                 <Link
//                                                     key={item.label}
//                                                     href={item.href}
//                                                     className={`${router.pathname === item.href ? 'active' : ''} opacity-30 hover:opacity-100`}
//                                                 >
//                                                     {item.label}
//                                                 </Link>
//                                             ))}
//                                         </div>
//                                     </motion.div>
//                                 </AnimatePresence>
//                             )}
//                         </div>
//                     )
//                 })}
//             </nav>

//             {userData ? (
//                 <div className="flex gap-[0.75rem] justify-center h-[2rem] cursor-pointer" onClick={() => router.push('/profile')}>
//                     <div className="h-full rounded-[0.5rem] aspect-square bg-(--color-black)"></div>
//                     <AnimatePresence>
//                         {isCollapsed ? ('') : (
//                             <motion.div
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 className="flex flex-col w-full"
//                             >
//                                 <a className='big'>{userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : 'Незаполнено'}</a>
//                                 <a className="small text-bold text-(--color-gray-black)">{userData.email}</a>
//                             </motion.div>
//                         )}
//                         </AnimatePresence>
//                 </div>
//             ) : (
//                 <Button
//                     inverted
//                     roundeful
//                     className={`${isCollapsed ? '!p-[1rem]' : ''}`}
//                     onClick={() => router.push('/auth')}
//                 >
//                     <AnimatePresence mode="wait">
//                         {!isCollapsed ? (
//                             <motion.span
//                                 key="full-text"
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                             >
//                                 Авторизация
//                             </motion.span>
//                         ) : (
//                             <motion.span
//                                 key="icon"
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                             >
//                                 <AuthIcon />
//                             </motion.span>
//                         )}
//                     </AnimatePresence>
//                 </Button>
//             )}
//         </motion.aside>
//     )
// }
