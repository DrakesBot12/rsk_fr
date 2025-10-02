import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";

import Button from "@/components/ui/Button";

import Folder from "@/components/other/Folder";

import LinkIcon from "@/assets/general/link.svg";
import Notify from "@/assets/general/notify.svg";
import SettsIcon from "@/assets/general/setts.svg";

export default function TeamIndexPage({ goTo, teamData }) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [idUserTeam, setIdUserTeam] = useState(null);

    const team = teamData;

    useEffect(() => {
        if (!team?.id) return;

        const TeamMembers = async () => {
            try {
                const response = await fetch(`/api/teams/members/${team.id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const data = await response.json();
                console.log(data.data);
                if (data.success) {
                    setTeamMembers(data.data);
                } else {
                    console.error("Invalid orgList data:", data);
                    setTeamMembers(null);
                }
            } catch (err) {
                console.error("Request error:", err);
                setTeamMembers(null);
            }
        };

        const ApiIdUserTeam = async () => {
            try {
                const response = await fetch("/api/teams/myteam", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const data = await response.json();
                console.log(data);
                if (data.success) {
                    setIdUserTeam(data.data[0].team.id);
                } else {
                    console.error("Invalid orgList data:", data);
                    setIdUserTeam(null);
                }
            } catch (err) {
                console.error("Request error:", err);
                setIdUserTeam(null);
            }
        };

        TeamMembers();
        ApiIdUserTeam();
    }, [team?.id]);

    if (!teamData) {
        return <p>Команда не найдена или загружается...</p>;
    }

    const JoinTeam = async () => {
        try {
            const response = await fetch(`/api/teams/join/${team.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();
            if (data.success) {
                alert("Вы вступили в команду");
                return true;
            } else {
                alert("Произошла ошибка: ", data);
                console.error("Join team error:", data);
                return false;
            }
        } catch (err) {
            alert("Произошла ошибка: ", data);
            console.error("Request error:", err);
            return false;
        }
    };

    const LeaveTeam = async () => {
        try {
            const response = await fetch(`/api/teams/leave/${team.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();
            if (data.success) {
                alert("Вы покинули команду");
                return true;
            } else {
                alert("Произошла ошибка: ", data);
                console.error("Join team error:", data);
                return false;
            }
        } catch (err) {
            alert("Произошла ошибка: ", data);
            console.error("Request error:", err);
            return false;
        }
    };

    const leader = teamMembers.find((member) => member.is_leader);
    const leaderName = leader ? `${(leader.name || "").trim()} ${(leader.surname || "").trim()}`.trim() || "Незаполнено" : "Незаполнено";

    return (
        <>
            <Header>
                <Header.Heading>
                    Команды <span className="text-(--color-gray-black)">/</span> {team.name}
                </Header.Heading>
                <Button icon onClick={() => goTo("settings")}>
                    <SettsIcon />
                </Button>
                <Button icon>
                    <Notify />
                </Button>
            </Header>

            <div className="hero" style={{ gap: "2.5rem", gridTemplateRows: "max-content" }}>
                <div className="grid col-span-12 grid-cols-12 gap-[1.25rem]">
                    <div className="gap-[1rem] bg-(--color-white-gray) col-span-12 h-fit flex items-center justify-center rounded-[1rem] px-[1rem] py-[.75rem]">
                        <div className="h-[2rem] aspect-square rounded-full bg-(--color-blue-noise)"></div>
                        <h6>{team.name}</h6>
                    </div>

                    <div className="block-wrapper col-span-4 h-fit">
                        <div className="flex flex-col gap-[.5rem]">
                            <h6>Описание</h6>
                            <p>{team.description ? team.description : "Незаполнено"}</p>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-[.5rem]">
                            <h6>Руководитель</h6>
                            <div className="flex items-center gap-[.5rem]">
                                <div className="h-[2rem] aspect-square rounded-full bg-(--color-orange-noise)"></div>
                                <span className="link">{leaderName}</span>
                            </div>
                            <div className="flex w-2/3 items-center gap-[.5rem]">
                                <Button
                                    onClick={JoinTeam}
                                    small
                                    disabled={idUserTeam || idUserTeam === team.id} // если уже в этой команде, кнопка неактивна
                                >
                                    Вступить
                                </Button>
                                <Button
                                    onClick={LeaveTeam}
                                    small
                                    disabled={!idUserTeam || idUserTeam !== team.id} // если нет команды или не в этой команде, кнопка неактивна
                                >
                                    Выйти
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="block-wrapper col-span-4 h-fit">
                        <div className="flex flex-col gap-[.5rem]">
                            <h6>Организация</h6>
                            <div className="group cursor-pointer flex items-center justify-between w-full">
                                <span className="flex-1 link">{team.organization_name ? team.organization_name : "Незаполнено"}</span>
                                <LinkIcon className="text-(--color-gray-white) group-hover:text-(--color-black)" style={{ transition: "all .3s ease-in-out" }} />
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-[.5rem]">
                            <h6>Регион</h6>
                            <p>{team.region ? team.region : "Незаполнено"}</p>
                        </div>
                    </div>

                    <Folder projects="хуйвам" cases="хуйвам" coins="хуйвам" onClick={() => goTo("workfolder")} />
                </div>

                <div className="block-wrapper gap-[1.25rem] col-span-12 h-fit">
                    <h5>Участники</h5>
                    <div className="grid grid-cols-2 gap-[.75rem]">
                        {teamMembers.map((member, idx) => (
                            <div
                                key={idx}
                                className="group flex items-center p-[1rem] rounded-[1rem] gap-[.75rem] cursor-pointer
          border-solid border-[1.5px] border-(--color-gray-plus-50) hover:bg-(--color-gray-plus-50) transition"
                                aria-label={member.name ? `${member.name} ${member.surname}` : "Незаполнено"}>
                                <div className="h-[2rem] aspect-square rounded-full bg-(--color-red-noise)"></div>
                                <span className="link big group-hover:text-(--color-blue)">{member.name ? `${member.name} ${member.surname}` : "Незаполнено"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
