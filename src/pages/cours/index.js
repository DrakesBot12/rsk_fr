import Image from 'next/image';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';

import Button from '@/components/ui/Button';

import Notify from '@/assets/general/notify.svg';
import Warning from '@/assets/general/warning.svg';
import Clock from '@/assets/general/clock.svg';
import Profile from '@/assets/general/profileinfo.svg'

const courses = [
    { state: true, content: "url" },
    { state: 'next', icon: Warning, h6: "Нет доступа", content: "Для начала пройдите задание с первого урока. Подробнее внутри", Button: "К заданию"},
    { state: false, icon: Clock, h6: "Будет доступно", content: "20 сентября" },
    { state: false, icon: Clock, h6: "Будет доступно", content: "21 сентября" },
    { state: false, icon: Clock, h6: "Будет доступно", content:  "22 сентября" },
    { state: false, icon: Clock, h6: "Будет доступно", content: "23 сентября" },
    { state: false, icon: Clock, h6: "Будет доступно", content: "24 сентября" },
    { state: false, icon: Clock, h6: "Будет доступно", content: "25 сентября" },
]
export default function Cours() {
    // const [cours, setCours] = useState(false);
    return (
        <Layout>
            <Header>
                <Header.Heading>Обучение</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero overflow-hidden" style={{ placeItems: "center" }}>
                <div className="h-full w-full col-span-12 grid grid-cols-3 gap-[1.5rem]">
                    {courses.map((cours, idx) => (
                    <div key={idx} className='flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem]  bg-(--color-white-gray) aspect-video'>
                        {cours.icon ? (
                                <span icon className='w-[2.25rem] h-[2.25rem]'><cours.icon /></span>
                            ): null}
                        <h6>{cours.h6}</h6>
                        <p className='w-[60%] text-center'>{cours.content}</p>
                        {cours.state === 'next' ? <Button>{cours.Button}</Button> : ""}
                    </div>
                    ))}
                </div> 
            </div>
        </Layout>
    )
}