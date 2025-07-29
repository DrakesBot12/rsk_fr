import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";

import Button from "@/components/ui/Button";

import Zapret from  "@/assets/general/zapret.svg";
import NeZapret from  "@/assets/general/neZapret.svg";

import Imagimagi from "@/assets/general/image.svg";

const teachers = [
    { name: 'Лебедев Андрей Андреевич' },
    { name: 'Иванова Мария Сергеевна' },
    { name: 'Петров Дмитрий Викторович' },
    { name: 'Смирнова Елена Александровна' },
    { name: 'Кузнецов Артем Игоревич' },
    { name: 'Васильева Ольга Дмитриевна' },
    { name: 'Соколов Павел Николаевич' },
    { name: 'Попова Анна Владимировна' },
    { name: 'Федоров Иван Олегович' },
    { name: 'Морозова Татьяна Петровна' },
    { name: 'Новиков Алексей Борисович' },
    { name: 'Волкова Юлия Евгеньевна' },
    { name: 'Белов Сергей Михайлович' },
    { name: 'Козлова Надежда Анатольевна' },
    { name: 'Громов Александр Денисович' }
];

export default function AdminTeachers() {
    return (
        <Layout>
            <Header>
                <Header.Heading>Преподаватели</Header.Heading>
            </Header>
            <div className="hero items-center justify-center">
                <div className="flex flex-col col-start-5 col-end-9 h-full gap-[.75rem]">
                    <div className="gap-[0.625rem] bg-(--color-white-gray) flex items-center justify-center rounded-[.625rem] px-[.875rem] py-[.5rem]">
                        <div className="h-[1.25rem] aspect-square rounded-full bg-(--color-gray-plus-50)"></div>
                        <span className="link">Ожидают подтверждения</span>
                    </div>
                    {teachers.map((teacher, idx) => (
                        <div key={idx} className="flex flex-col border-[1.5px] border-(--color-gray-plus-50) rounded-[1rem] gap-[1rem] p-[1.25rem]">
                            <div className="w-full aspect-video flex items-center justify-center rounded-[.75rem] bg-(--color-gray-plus-50)"><Imagimagi /></div>
                                <div className="flex items-center justify-start gap-[0.5rem]">
                                    <div className="h-[1.25rem] aspect-square rounded-full bg-(--color-gray-plus-50)"></div>
                                    <span className="flex items-center link small gap-[.5rem]">{teacher.name}</span>
                                </div>
                            <div className="flex justify-end gap-[0.5rem]">
                                <Button inverted roundeful small className="!w-fit !hover:bg-(--color-red-noise) !hover:text-(--color-red)">Отклонить <Zapret/></Button>
                                <Button inverted roundeful small className="!w-fit !hover:bg-(--color-green-noise) !hover:text-(--color-green)">Подтвердить <NeZapret/></Button>
                                <Button inverted roundeful small className="!w-fit">Открыть</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}