import { useState } from "react";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea";
import Switcher from "@/components/ui/Switcher";

import Notify from '@/assets/general/notify.svg';

export default function Createteam() {
    const [teamType, setTeamType] = useState('teacher') // student

    return (
        <Layout>
            <Header>
                <Header.Heading>Команды <span className='text-(--color-gray-black)'>/</span> Создание команды</Header.Heading>
            </Header>
            <div className="hero">
                <div className="col-span-4 flex flex-col">
                    <div className="flex flex-col gap-[1.25rem]">
                        <h6>Основные данные</h6>
                        <Input type="image" className="w-1/2 aspect-square"/>
                        <Input type="text" id="nameTeam" name="nameTeam" autoComplete="nameTeam" placeholder="Название" required/>
                        <Textarea  id="nameTeam" name="nameTeam" autoComplete="nameTeam" placeholder="Описание команды"/>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col">
                    <div className=" flex flex-col gap-[1.25rem]">
                        <h6>Организация и регион</h6>
                        <div className="flex flex-col gap-[.75rem]">
                        <Textarea id="org" name="org" autoComplete="org" placeholder="Организация" required/>
                        <Input type="text" id="region" name="region" autoComplete="region" placeholder="Регион" required/>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-[1.25rem]">
                    <div>
                        <h6>Параметры</h6>
                    </div>
                    <div className="flex flex-col items-center h-full gap-[1.25rem]">
                        <Switcher value={teamType} onChange={setTeamType} className="!w-full">
                            <Switcher.Option value="teacher">преподавательская</Switcher.Option>
                            <Switcher.Option value="student">Студентеческая</Switcher.Option>
                        </Switcher>
                        <p>Тип команды, для студентов или для Преподавателей</p>
                    </div>
                    <Button disabled>Создать команду</Button>
                </div>
            </div>
        </Layout>
    )
}