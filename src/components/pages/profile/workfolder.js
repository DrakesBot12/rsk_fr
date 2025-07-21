import { useEffect, useState } from 'react';
import { getUserData } from '@/utils/auth';

import { Header } from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Folder from '@/components/other/Folder';
import Case from '@/components/ui/Case';

import NotifyIcon from '@/assets/general/notify.svg';
import SettsIcon from '@/assets/general/setts.svg';

const cases = [
  {
    name: "Сделать презентацию",
    desc: "Слайды к выступлению на конференции",
    tags: [
      { name: "10 баллов", color: "blue", icon: "coin" },
      { name: "Проект", color: "green" }
    ]
  },
  {
    name: "Пропылесосить комнату",
    desc: "Уборка перед приходом гостей",
    tags: [
      { name: "2 балла", color: "blue", icon: "coin" },
      { name: "Дело", color: "green" }
    ]
  },
  {
    name: "Написать статью",
    desc: "Публикация в блог по фронтенду",
    tags: [
      { name: "7 баллов", color: "blue", icon: "coin" },
      { name: "Проект", color: "green" }
    ]
  },
  {
    name: "Купить продукты",
    desc: "Список: хлеб, молоко, сыр",
    tags: [
      { name: "1 балл", color: "blue", icon: "coin" },
      { name: "Дело", color: "green" }
    ]
  },
  {
    name: "Создать лендинг",
    desc: "Тестовый лендинг для портфолио",
    tags: [
      { name: "8 баллов", color: "blue", icon: "coin" },
      { name: "Проект", color: "green" }
    ]
  },
  {
    name: "Разобрать папку с бумагами",
    desc: "Систематизировать документы",
    tags: [
      { name: "3 балла", color: "blue", icon: "coin" },
      { name: "Дело", color: "green" }
    ]
  }
];

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
                <div className='flex flex-col gap-[1rem] col-start-7 col-end-13'>
                    <h4>Дела участника</h4>
                   <Case cases={cases} /> 
                </div>
            </div>
        </>
    )
}