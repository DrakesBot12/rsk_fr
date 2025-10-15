import { useRouter } from "next/router";
import { teams } from "./_teams";
import TeamNotFound from "./not-found";

import Header from "@/components/layout/Header";

import Button from "@/components/ui/Button";

import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea";

import Notify from "@/assets/general/notify.svg";
import SettsIcon from "@/assets/general/setts.svg";

export default function TeamSettsPage({ goTo }) {
    const router = useRouter();
    const { team: url } = router.query;

    const team = teams.find((t) => t.url === url);

    if (!team) return <TeamNotFound activeButton goTo={goTo} />;

    return (
        <>
            <Header>
                <Header.Heading>
                    Команды <span className="text-(--color-gray-black)">/</span> {team.name} <span className="text-(--color-gray-black)">/</span> Редактирование
                </Header.Heading>
                <Button icon active onClick={() => goTo("index")}>
                    <SettsIcon />
                </Button>
                <Button icon>
                    <Notify />
                </Button>
            </Header>
            <div className="hero">
                <div className="col-span-4 flex flex-col h-full gap-[1.25rem]">
                    <h6>Основные данные</h6>
                    <Input type="image" className="w-1/2 aspect-square" />
                    <Input id="teamName" name="teamName" autoComplete="off" type="text" placeholder="Альянс Инновационных Идей (АИИ)" />
                    <Textarea
                        id="teamDesc"
                        name="teamDesc"
                        autoComplete="off"
                        inverted
                        placeholder="Наша команда создает будущее в нашем супер колледже, мы двигаем не только прогресс организации но и сами развиваемся делая проекты и дела на Платформе"
                    />
                </div>
                <div className="col-span-4 flex flex-col gap-[1.25rem]">
                    <h6>Организация и регион</h6>
                    <Textarea name="organization" id="organization" autoComplete="off" value={team.organization} readOnly />
                    <Input name="region" id="region" autoComplete="off" className="h-fit" value={team.region} readOnly />
                </div>
                <div className="col-span-4 flex flex-col justify-end">
                    <Button disabled>Сохранить изменения</Button>
                </div>
            </div>
        </>
    );
}
