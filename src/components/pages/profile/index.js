import { useEffect, useState } from 'react';

import Tags from '@/components/ui/Tags';
import Button from '@/components/ui/Button';

import { getUserData } from '@/utils/auth';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';

import Setts from '@/assets/general/setts.svg'
import Notify from '@/assets/general/notify.svg'
import LinkIcon from '@/assets/general/link.svg'

import Block from '@/components/other/Block';
import Folder from '@/components/other/Folder';
import Calendar from '@/components/ui/Calendar';

export default function ProfileIndexPage({ goTo }) {
    const [userData, setUserData] = useState(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setUserData(getUserData());
        setHydrated(true);
    }, []);

    if (!hydrated || !userData) return null; // Не рендерим до полной инициализации

    return (
        <>
            <Header>
                <Header.Heading>
                    {userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : 'Незаполнено'}
                </Header.Heading>
                <Button icon onClick={() => goTo('settings')}><Setts /></Button>
                <Button icon><Notify /></Button>
            </Header>
            <div className='hero' style={{gridTemplateRows: "repeat(2, auto)"}}>
                <Card>
                    <Card.Heading>
                        <div className="flex gap-[1rem] w-full">
                            <div className="w-[4.75rem] aspect-square rounded-full bg-(--color-black)" ></div>
                            <div className="flex flex-col gap-[0.25rem] flex-1 ">
                                <h4>{userData.firstName && userData.lastName && userData.middleName ? `${userData.firstName} ${userData.lastName} ${userData.middleName}` : 'Незаполнено'}</h4>
                                <p className="line-clamp-3">Тут описание максимум длиной 3 строчки, лоооо оооо оооол</p>
                            </div>
                        </div>
                        <div className="flex gap-[0.5rem] flex-wrap">
                            <Tags tags={[
                                { name: `${userData.userType === "teacher" ? 'Преподаватель' : 'Студент'}`, color: "blue", icon: 'coin' },
                                { name: "Москва", color: "blue" },
                                { name: "Стаж: 100 дней", color: "blue" }
                            ]} />
                        </div>
                    </Card.Heading>
                    <Card.Footer>
                        <a className='big relative z-[1]'>На 40% эффективнее других участников</a>
                    </Card.Footer>
                </Card>
                <div className='col-span-4 h-fit'>
                    <Block>
                        <>
                            <h6 className='text-(--color-gray-black)'>Организация и команда</h6>
                            <div className='flex flex-col gap-[0.75rem]'>
                                <div className='group cursor-pointer flex items-center justify-between w-full'>
                                    <a className='flex-1'>Московский государственный университет имени М.В.Ломоносова</a>
                                    <LinkIcon className="stroke-(--color-gray-white) group-hover:stroke-black" style={{ transition: "stroke .3s ease-in-out" }} />    
                                </div>
                                <hr className='w-full border-solid border-[1.5px] border-(--color-gray-plus)' />
                                <div className='group cursor-pointer flex items-center justify-between w-full'>
                                    <a className='flex-1'>Союз Самых Смелых Решений (СССР)</a>
                                    <LinkIcon className="stroke-(--color-gray-white) group-hover:stroke-black" style={{ transition: "stroke .3s ease-in-out" }} />    
                                </div>
                            </div>
                        </>
                    </Block>
                </div>
                <Folder projects="2" works="12" exp="100" onClick={() => goTo('workfolder')} />
                <Calendar />
            </div>
        </>
    )
}