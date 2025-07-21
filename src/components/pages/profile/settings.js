import { useEffect, useState } from 'react';

import Tags from '@/components/ui/Tags';
import Button from '@/components/ui/Button';

import { getUserData } from '@/utils/auth';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';

import Setts from '@/assets/general/setts.svg'
import Notify from '@/assets/general/notify.svg'

export default function SettingsPage({ goTo }) {
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
                    / Настройки
                </Header.Heading>
                <Button icon active onClick={() => goTo('index')}><Setts /></Button>
                <Button icon><Notify /></Button>
            </Header>
            <div className='hero' style={{gridTemplateRows: "repeat(2, auto)"}}>
            </div>
        </>
    )
}