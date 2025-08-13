import { useEffect, useState } from 'react';

import Tags from '@/components/ui/Tags';
import Button from '@/components/ui/Button';

import { getUserData } from '@/utils/auth';

import Header from '@/components/layout/Header';

import Setts from '@/assets/general/setts.svg';
import Notify from '@/assets/general/notify.svg';

import Input from '@/components/ui/Input/Input';
import Textarea from '@/components/ui/Textarea';

export default function SettingsPage({ goTo }) {
    const [userData, setUserData] = useState(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setUserData(getUserData());
        setHydrated(true);
    }, []);

    if (!hydrated || !userData) return null;

    return (
        <>
            <Header>
                <Header.Heading>
                    {userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : 'Незаполнено'}
                    <span className='text-(--color-gray-black)'>/</span> Настройки
                </Header.Heading>
                <Button icon active onClick={() => goTo('profile')}><Setts /></Button>
                <Button icon><Notify /></Button>
            </Header>
            <div className='hero' style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
                <div className='flex flex-col gap-[.75rem]'>
                    <h6>Основные данные</h6>
                    <div className='flex gap-[.75rem]'>
                        <Input type="image" className='h-1/2 aspect-square'/>
                        <div className='flex flex-col gap-[.5rem] flex-1'>
                            <Input type="text" id="FamilyName" name="FamilyName" autoComplete="family-name" placeholder="Введите фамилию" required/>
                            <Input type="text" id="name" name="name" autoComplete="given-name" placeholder="Введите имя" required/>
                            <Input type="text" id="surname" name="surname" autoComplete="additional-name" placeholder="Введите отчество"/>  
                        </div>
                    </div>
                    <Textarea inverted id="about" name="about" autoComplete="off" rows={2} placeholder="Расскажите о себе кратко" />
                    <Input type="dropdown" id="region" name="region" autoComplete="address-level1" src="/data/regions.txt" placeholder="Москва" />
                </div>
                
                <div className='flex flex-col gap-[1.25rem]'>
                    <h6>Организация и команда</h6>
                    <div className='flex flex-col gap-[.75rem]'>
                        <Input id="univers" name="univers" placeholder="Московский государственный университет имени М.В.Ломоносова" autocomplete="off" readOnly />
                        <Input id="teames" name="teames" placeholder="Союз Самых Смелых Решений (СССР)" autocomplete="off" readOnly />
                    </div>
                </div>
                
                <div className='flex flex-col justify-between h-full '>    
                    <div className='flex flex-col gap-[1.25rem]'>
                        <h6>Для преподавателей</h6>
                        <Input type="image" className=''/>
                        <Button>Загрузить</Button>
                    </div>
                    <Button disabled>Сохранить изменения</Button>
                </div>
            </div>
        </>
    )
}