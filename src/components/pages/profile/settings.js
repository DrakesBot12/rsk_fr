import { useEffect, useState } from 'react';

import Tags from '@/components/ui/Tags';
import Button from '@/components/ui/Button';

import { getUserData } from '@/utils/auth';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';

import Setts from '@/assets/general/setts.svg';
import Notify from '@/assets/general/notify.svg';

import Input from '@/components/ui/Input/Input';

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
                    / Настройки
                </Header.Heading>
                <Button icon active onClick={() => goTo('index')}><Setts /></Button>
                <Button icon><Notify /></Button>
            </Header>
            <div className='hero' style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
                <div className='flex flex-col gap-[.75rem]'>
                    <h6>Основные данные</h6>
                    <div className='flex gap-[.75rem]'>
                        <Input type="image" className='w-[50%] aspect-square'/>
                        <div>
                            <Input type="text" id="LastName" name="LastName" placeholder="Введите фамилию" required/>
                            <Input type="text" id="name" name="name" placeholder="Введите имя" required/>
                            <Input type="text" id="surname" name="surname" placeholder="Введите отчество"/>  
                        </div>
                    </div>
                    <textarea name="about" id="about" maxlength="100" minlength="0" placeholder="расскажите о себе"></textarea>
                    <input type="text" name="skill" id="skill"  list="skilll" placeholder='город' multiple/>
                    <datalist id="skilll">
                        <option value="Белгород"></option>
                        <option value="Москва"></option>
                        <option value="Воронеж"></option>
                        <option value="Курск"></option>
                    </datalist>
                </div>
                
                <div className='flex flex-col gap-[1.25rem]'>
                    <h6>Организация и команда</h6>
                    <div className='flex flex-col gap-[.75rem]'>
                        <Input id="univers" name="univers" placeholder="Московский государственный университет имени М.В.Ломоносова" autocomplete="off" disabled/>
                        <Input id="teames" name="teames" placeholder="Союз Самых Смелых Решений (СССР)" autocomplete="off" disabled/>
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