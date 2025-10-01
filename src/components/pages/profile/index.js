import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Tags from "@/components/ui/Tags";
import Button from "@/components/ui/Button";

import { getUserData } from "@/utils/auth";

import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

import Setts from "@/assets/general/setts.svg";
import Notify from "@/assets/general/notify.svg";
import LinkIcon from "@/assets/general/link.svg";

import Folder from "@/components/other/Folder";
import { color } from "framer-motion";

export default function ProfileIndexPage({ goTo }) {
    const [userData, setUserData] = useState(null); // данные профиля
    const [hydrated, setHydrated] = useState(false); // флаг готовности данных
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/profile/info", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch profile");
                const data = await response.json();
                setUserData(data);
                setHydrated(true);
            } catch (err) {
                console.error("Request error:", err);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        const confirmed = window.confirm("Вы уверены, что хотите выйти?");
        if (!confirmed) return;

        // Удаляем все cookie
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }

        // Редирект
        router.push("/auth");
    };

    if (!hydrated || !userData) return null;

    return (
        <>
            <Header>
                <Header.Heading>{userData.data.NameIRL && userData.data.Surname ? `${userData.data.NameIRL} ${userData.data.Surname}` : "Незаполнено"}</Header.Heading>
                <Button red className={"w-fit!"} onClick={handleLogout}>
                    Выйти
                </Button>
                <Button icon onClick={() => goTo("settings")}>
                    <Setts />
                </Button>
                {/* <Button icon>
                    <Notify />
                </Button> */}
            </Header>
            <div className="hero" style={{ gridTemplateRows: "repeat(2, auto)" }}>
                <Card>
                    <Card.Heading>
                        <div className="flex gap-[1rem] w-full">
                            <div className="w-[4.75rem] aspect-square rounded-full bg-(--color-black)"></div>
                            <div className="flex flex-col gap-[0.25rem] flex-1 ">
                                <h4>{userData.data.NameIRL && userData.data.Surname && userData.data.Patronymic ? `${userData.data.NameIRL} ${userData.data.Surname} ${userData.data.Patronymic}` : "Незаполнено"}</h4>
                                <p className="line-clamp-3">{userData.data?.Description ? userData.data.Description : "Незаполнено"}</p>
                            </div>
                        </div>
                        <div className="flex gap-[0.5rem] flex-wrap">
                            <Tags
                                tags={[
                                    { name: `${userData.data.Type === "teacher" ? "Преподаватель" : "Студент"}`, color: "blue", icon: "coin" },
                                    { name: `${userData.data?.Region ? `${userData.data.Region}` : "Незаполнено"}`, color: "blue" },
                                ]}
                            />
                        </div>
                    </Card.Heading>
                    <Card.Footer>
                        <a className="big relative z-[1]">Теперь вы с нами!</a>
                    </Card.Footer>
                </Card>
                <div className="col-span-4 h-fit">
                    <div className="block-wrapper col-span-4">
                        <h6>Организация и команда</h6>
                        <div className="flex flex-col gap-[0.75rem]">
                            <div className="group cursor-pointer flex items-center justify-between w-full">
                                <a className="flex-1">{userData.data.Organization ? userData.data.Organization : "Отсутсвует"}</a>
                                <LinkIcon className="stroke-(--color-gray-white) group-hover:stroke-black" style={{ transition: "stroke .3s ease-in-out" }} />
                            </div>
                            <hr className="w-full border-solid border-[1.5px] border-(--color-gray-plus)" />
                            <div className="group flex items-center justify-between w-full">
                                <a className="flex-1">{userData.data.Team ? userData.data.Team : "Отсутсвует"}</a>
                                <LinkIcon className="stroke-(--color-gray-white) group-hover:stroke-black" style={{ transition: "stroke .3s ease-in-out" }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Folder projects="2" works="12" exp="100" onClick={() => goTo("workfolder")} /> */}
            </div>
        </>
    );
}
