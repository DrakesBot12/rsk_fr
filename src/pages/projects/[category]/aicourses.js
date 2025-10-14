import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";

import { useProjects } from "@/hooks/fetchProjects";
import Notify from "@/assets/general/notify.svg";

const AICourses = () => {
  const router = useRouter();
  const [dataProfile, setDataProfile] = useState({ Organization: 2 });
  const { loading, categories: projects, error, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects(dataProfile.Organization);
  }, [dataProfile.Organization]);

  if (loading) {
    return (
      <Layout>
        <Header>
          <Header.Heading>Проекты / Знания и навыки / Курсы для студентов</Header.Heading>
          <button>
            <Notify />
          </button>
        </Header>
        <div className="flex h-full items-center justify-center">
          <p>Загрузка данных...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Header>
          <Header.Heading>Проекты / Знания и навыки / Курсы для студентов</Header.Heading>
          <button>
            <Notify />
          </button>
        </Header>
        <div className="flex h-full items-center justify-center">
          <p className="text-red-500">Ошибка: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-10 p-6 w-full">
        {/* Навигация сверху слева */}
        <div className="w-full flex justify-start text-[1rem] font-medium text-gray-800 mb-4">
          Проекты <span className="text-gray-400">/</span> Знания и навыки <span className="text-gray-400">/</span> Курсы для студентов
        </div>

        {/* Заголовок и полоска */}
        <div className="flex flex-col items-center w-full">
          <p className="text-[1.5rem] font-bold text-black mb-2 text-center">
            Курсы для студентов по искусственному интеллекту
          </p>
          {/* Статичный прогресс-бар */}
          <div className="w-full h-3 bg-blue-100 rounded-full">
            <div className="bg-blue-500 h-full rounded-r-full w-[300px]"></div>
          </div>
        </div>

        {/* Description + Indices */}
        <div className="flex w-full justify-between gap-6 mt-6">
          {/* Description */}
          <div className="flex-1 flex flex-col gap-2 text-[0.75rem] text-gray-600">
            <p>
              В рамках развития цифровизации колледжа предлагается запустить курсы для студентов по искусственному интеллекту. Проект включает создание трёх цифровых продуктов:
            </p>
            <p>Сайт с обучающими материалами и тестами.</p>
            <p>Приложение с подборкой ИИ-инструментов для учёбы.</p>
            <p>Telegram-бот для помощи в освоении тем и поиска полезных ресурсов.</p>
            <p>Это поможет повысить цифровую грамотность студентов и вовлечь их в современные технологии.</p>
          </div>

          {/* Индексы */}
          <div className="flex flex-col gap-4 w-[21rem] bg-gray-50 p-4 rounded-lg">
            <h6 className="text-[1rem] font-medium text-black">Индексы звезды</h6>
            <div className="flex justify-between items-center bg-gray-200 rounded-lg p-2">
              <span className="text-[0.75rem] font-semibold text-black">Знания и навыки</span>
              <span className="text-[0.75rem] font-semibold text-black">0.7</span>
            </div>
          </div>
        </div>

        {/* Project To-Do */}
        <div className="flex flex-col items-center gap-4 w-full max-w-[43.375rem] mt-6">
          <h6 className="text-[0.75rem] font-medium text-black mb-2 text-center">Список дел проекта</h6>

          <div className="flex justify-between items-center bg-gray-100 w-full p-4 rounded-lg">
            <p className="text-[1rem] font-medium text-black truncate">
              Сайт с обучающими материалами и тестами
            </p>
            <button  style={{
    width: '6.1875rem',       
    height: '2.5rem',         
    backgroundColor: '#E6FAC8',
    color: '#364A07',
    borderRadius: '100px',
    fontSize: '0.75rem',      
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
  }}>
                Выполнено
            </button>

          </div>

          <div className="flex justify-between items-center bg-gray-100 w-full p-4 rounded-lg">
            <p className="text-[1rem] font-medium text-black truncate">
              Приложение с подборкой ИИ-инструментов для учёбы
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-200 text-blue-700 font-semibold rounded-lg text-[0.75rem]">300</button>
              <button className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg text-[0.75rem]">Открыть</button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-100 w-full p-4 rounded-lg">
            <p className="text-[1rem] font-medium text-black truncate">
              Telegram-бот для помощи в освоении тем и поиска полезных ресурсов
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-200 text-blue-700 font-semibold rounded-lg text-[0.75rem]">150</button>
              <button className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg text-[0.75rem]">Открыть</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AICourses;
