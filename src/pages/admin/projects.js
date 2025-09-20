import { useState } from 'react';

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import Button from "@/components/ui/Button";
import Textarea from '@/components/ui/Textarea';

import Zapret from  "@/assets/general/zapret.svg";
import NeZapret from  "@/assets/general/neZapret.svg";
import Cases from "@/assets/general/cases.svg";
import Projectsss from "@/assets/general/projectsss.svg";
import Notify from "@/assets/general/notify.svg";
import Coin from "@/assets/general/coin.svg";

const projects = [
    { id: 1, name: "Создание мобильного приложения для доступа к учебным материалам", case: "Знания и навыки" },
    { id: 2, name: "Разработка онлайн-платформы для поиска стажировок", case: "Взаимодействие с работодателями" },
    { id: 3, name: "Внедрение системы единого входа в образовательные сервисы", case: "Единая цифровая образовательная среда" },
    { id: 4, name: "Создание системы шифрования данных студентов", case: "Защита данных" },
    { id: 5, name: "Разработка дашборда для анализа учебной успеваемости", case: "Данные и аналитика" },
    { id: 1, name: "Автоматизация проверки домашних заданий", case: "Автоматизация" },
    { id: 1, name: "Создание базы знаний для преподавателей", case: "Знания и навыки" },
    { id: 3, name: "Организация цифровых ярмарок вакансий", case: "Взаимодействие с работодателями" },
    { id: 3, name: "Интеграция библиотек в единую образовательную платформу", case: "Единая цифровая образовательная среда" },
    { id: 4, name: "Разработка системы обнаружения утечек данных", case: "Защита данных" },
    { id: 5, name: "Сбор и анализ данных о посещаемости студентов", case: "Данные и аналитика" },
    { id: 3, name: "Автоматизация формирования расписания занятий", case: "Автоматизация" },
    { id: 1, name: "Разработка обучающих модулей по цифровой грамотности", case: "Знания и навыки" },
    { id: 2, name: "Создание сервиса для обратной связи с работодателями", case: "Взаимодействие с работодателями" },
    { id: 3, name: "Внедрение системы электронных зачетных книжек", case: "Единая цифровая образовательная среда" },
    { id: 4, name: "Разработка модуля для защиты персональных данных", case: "Защита данных" },
    { id: 5, name: "Мониторинг и прогнозирование успеваемости студентов", case: "Данные и аналитика" },
    { id: 2, name: "Автоматизация процесса подачи заявок на курсы", case: "Автоматизация" },
    { id: 1, name: "Создание мультимедийных учебных курсов", case: "Знания и навыки" },
    { id: 2, name: "Платформа для совместных проектов студентов и компаний", case: "Взаимодействие с работодателями" }
]

export default function AdminProjects() {

    const [proj, setProj] = useState(false);

    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero items-center justify-center">
                <div className="flex flex-col col-start-4 col-end-10 h-full gap-[.75rem]">
                    <div className="gap-[0.625rem] bg-(--color-white-gray) flex items-center justify-center rounded-[.625rem] px-[.875rem] py-[.5rem]">
                        <div className="h-[1.25rem] aspect-square rounded-full bg-(--color-gray-plus-50)"></div>
                        <span className="link">Ожидают подтверждения</span>
                    </div>
                    {projects.map((project, idx) => (
                        <div key={idx} className="flex flex-col border-[1.5px] border-(--color-gray-plus-50) rounded-[1rem] gap-[1rem] p-[1.25rem]">
                            <h5>{project.name}</h5>
                            <div className="flex items-center justify-start gap-[1.5rem] ">
                                <div className="flex gap-[0.5rem]">
                                    <Cases/>
                                    <span className="link small">{project.case}</span>
                                </div>
                                <div className="flex gap-[0.5rem]">
                                    <Projectsss/>
                                    <span className="link small">{project.id} проект</span>
                                </div>
                            </div>
                            <div className="flex justify-end gap-[0.5rem]">
                                <Button inverted roundeful className="!w-fit reject-button">Отклонить <Zapret/></Button>
                                <Button inverted roundeful className="!w-fit approve-button">Подтвердить <NeZapret/></Button>
                                <Button inverted roundeful className="!w-fit" onClick={() => setProj(true)}>Открыть</Button>
                            </div>
                        </div>
                    ))}  
                </div>
                <div className={`flex col-span-6`}>
                    {/* {projects.map((project, idx) => (
                        <div key={idx}>
                            <div className=''>
                                <h6>{project.name}</h6>
                            </div>
                            <div>
                                <Coin/>
                                <span>100 баллов</span>
                                <span>{project.case}</span>
                            </div>
                            <div>
                                <h6>Описание проблемы</h6>
                                <Textarea inverted id="problem" name="problem" autoComplete="off" rows={2} placeholder="В колледже студенты часто не знают актуальное расписание или его изменения. Из-за этого возникают опоздания и путаница. Предлагается установить QR-коды на стендах в коридорах и возле кабинетов, ведущие на актуальную онлайн-страницу с расписанием."/>
                                <Button/>
                                <Button/>
                            </div>
                            <div>
                                <h6>Решение проблемы</h6>
                                <Textarea inverted id="solution" name="solution" autoComplete="off" rows={2} placeholder="Для устранения проблемы с актуальностью расписания в колледже была внедрена система QR-кодов. Эти коды, размещенные в коридорах и у кабинетов, обеспечивают студентам быстрый доступ к обновленной информации о занятиях"/>
                                <h6>Ссылка на результат</h6>
                                <Button/>
                            </div>
                            <div>
                                <Button inverted roundeful className="!w-fit reject-button">Отклонить <Zapret/></Button>
                                <Button inverted roundeful className="!w-fit approve-button">Подтвердить <NeZapret/></Button>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </Layout>
    )
}