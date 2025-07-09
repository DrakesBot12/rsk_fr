import { useEffect, useState } from 'react';
import { getUserData } from '@/utils/auth';

import { Header } from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Folder from '@/components/pages/public/Folder';

import NotifyIcon from '@/assets/general/notify.svg'
import SettsIcon from '@/assets/general/setts.svg'

export default function WorkFolderPage({ goTo }) {
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
                    <span className="text-(--color-gray-white)" style={{font: 'inherit'}}>/</span>
                    Рабочая папка
                </Header.Heading>
                <Button icon><SettsIcon /></Button>
                <Button icon><NotifyIcon /></Button>
            </Header>
            <div className='hero'>
                <div className='flex flex-col gap-[0.75rem] col-span-4'>
                    <Button inverted onClick={() => goTo('profile')}>Назад</Button>
                    <Folder min projects="2" works="12" exp="100" />
                </div>


            </div>
        </>
    )
}