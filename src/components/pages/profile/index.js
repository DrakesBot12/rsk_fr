import { useEffect, useState } from "react";

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
                console.log("Loaded user data:", data);
            } catch (err) {
                console.error("Request error:", err);
            }
        };

        fetchProfile();
    }, []);

    if (!hydrated || !userData) return null;

    console.log(userData);

    return (
        <>
            <Header>
                <Header.Heading>{userData.data.NameIRL && userData.data.Surname ? `${userData.data.NameIRL} ${userData.data.Surname}` : "Незаполнено"}</Header.Heading>
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
                        <a className="big relative z-[1]">Здраствуйте</a>
                    </Card.Footer>
                </Card>
                <div className="col-span-4 h-fit">
                    <div className="block-wrapper col-span-4">
                        <h6>Организация и команда</h6>
                        <div className="flex flex-col gap-[0.75rem]">
                            <div className="group cursor-pointer flex items-center justify-between w-full">
                                <a className="flex-1">Московский государственный университет имени М.В.Ломоносова</a>
                                <LinkIcon className="stroke-(--color-gray-white) group-hover:stroke-black" style={{ transition: "stroke .3s ease-in-out" }} />
                            </div>
                            <hr className="w-full border-solid border-[1.5px] border-(--color-gray-plus)" />
                            <div className="group flex items-center justify-between w-full">
                                <p className="flex-1" style={{ color: "var(--color-gray-black)" }}>
                                    Недоступны до окончания прохождения обучения
                                </p>
                                {/* <LinkIcon className="stroke-(--color-gray-white) group-hover:stroke-black" style={{ transition: "stroke .3s ease-in-out" }} /> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Folder projects="2" works="12" exp="100" onClick={() => goTo("workfolder")} /> */}
            </div>
        </>
    );
}
