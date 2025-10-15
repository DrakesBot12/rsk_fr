import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";

import { useProjects } from "@/hooks/fetchProjects";
import Notify from "@/assets/general/notify.svg";
import PointsIcon from "@/assets/general/pointsicons.svg";
import Link from "next/link";

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
          <button icon>
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
      <Header>
        <Header.Heading>Проекты <span className="text-[var(--color-gray-black)]">/</span> Знания и навыки <span className="text-[var(--color-gray-black)]">/</span> Курсы для студентов</Header.Heading>
        <Button icon>
          <Notify />
        </Button>
      </Header>
      <div className="flex flex-col items-center gap-[2.5rem] p-[1.5rem] w-full">

        {/* Title and Progress */}
        <div className="flex flex-col items-start gap-[1.25rem] w-[43.375rem]">
          <h4 className="text-[1.5rem] leading-[2.0625rem] font-medium text-[var(--color-black)] w-full">
            Курсы для студентов по искусственному интеллекту
          </h4>
          <div className="flex flex-col items-start w-full h-[0.75rem] bg-[var(--color-blue-noise)] rounded-[6.25rem]">
            <div className="w-[15.75rem] h-[0.75rem] bg-[var(--color-blue)] rounded-r-[6.25rem]" />
          </div>
        </div>

        {/* Description and Index */}
        <div className="flex items-start gap-[1.25rem] w-[43.375rem]">
          {/* Description */}
          <div className="flex flex-col justify-start items-start gap-[1.25rem] w-[21.083rem]">
            <div className="flex flex-col items-start gap-[0.5rem] w-full">
              <h6 className="text-[1rem] leading-[1.375rem] font-medium text-[var(--color-black)] w-full">
                Описание проекта
              </h6>
              <p className="text-[0.75rem] leading-[1rem] font-normal text-[var(--color-gray-black)] w-full">
                В рамках развития цифровизации колледжа предлагается запустить курсы для студентов по искусственному интеллекту. Проект включает создание трёх цифровых продуктов:
                <br /><br />
                Сайт с обучающими материалами и тестами.
                <br /><br />
                Приложение с подборкой ИИ-инструментов для учёбы.
                <br /><br />
                Telegram-бот для помощи в освоении тем и поиска полезных ресурсов.
                <br /><br />
                Это поможет повысить цифровую грамотность студентов и вовлечь их в современные технологии.
              </p>
            </div>
          </div>

          {/* Index */}
          <div className="flex flex-col items-start p-[1rem] gap-[1rem] w-[21.063rem] h-[6.625rem] bg-[var(--color-white-gray)] rounded-[1rem] mt-[1rem]">
            <h6 className="text-[1rem] leading-[1.375rem] font-medium text-[var(--color-black)] w-full">
              Индексы звезды
            </h6>
            <div className="flex flex-col items-start gap-[0.5rem] w-full">
              <div className="flex justify-center items-center py-[0.625rem] px-[0.75rem] gap-[0.75rem] w-full h-[2.25rem] bg-[var(--color-blue-noise)] rounded-[0.625rem]">
                <span className="text-[0.75rem] leading-[1rem] font-semibold text-[var(--color-blue-plus)] flex-grow">
                  Знания и навыки
                </span>
                <span className="text-[0.75rem] leading-[1rem] font-semibold text-[var(--color-blue)] w-[1.125rem]">
                  0.7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="flex flex-col items-start gap-[0.75rem] w-[43.375rem]">
          {/* Header */}
          <div className="flex justify-center items-center py-[0.5rem] px-[0.875rem] gap-[0.625rem] w-full h-[2rem] bg-[var(--color-white-gray)] rounded-[0.625rem]">
            <span className="text-[0.75rem] leading-[1rem] font-semibold text-[var(--color-black)] w-[7.375rem]">
              Список дел проекта
            </span>
          </div>

          {/* Task 1 - Completed */}
          <div className="flex justify-between items-center p-[1.25rem] gap-[2rem] w-full border-[1.5px] border-[var(--color-gray-plus-50)] rounded-[1rem]">
            <h5 className="text-[1.25rem] leading-[1.6875rem] font-medium text-[var(--color-black)] whitespace-nowrap">
              Сайт с обучающими материалами и тестами
            </h5>
            <Link href="/projects/KNOWLEDGE/aicourses/task">
              <button style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '2.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                borderRadius: '6.25rem',
                backgroundColor: 'var(--color-green-noise)',
                color: '#364A07',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600',
                fontFamily: 'Manrope'
              }}>
                Выполнено
              </button>
            </Link>
          </div>

          {/* Task 2 */}
          <div className="flex justify-between items-center p-[1.25rem] gap-[2rem] w-full border-[1.5px] border-[var(--color-gray-plus-50)] rounded-[1rem]">
            <h5 className="text-[1.25rem] leading-[1.6875rem] font-medium text-[var(--color-black)] flex-grow">
              Приложение с подборкой ИИ инструментов<br />для учебы
            </h5>
            <div className="flex items-center gap-[0.5rem]">
              <button style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem',
                width: '5.1875rem',
                height: '2.5rem',
                backgroundColor: '#E0E8FF',
                borderRadius: '6.25rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                <div style={{ width: '1rem', height: '1rem' }}>
                  <PointsIcon />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  lineHeight: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope',
                  color: '#3A6BFF'
                }}>
                  300
                </span>
              </button>
              <Link href="/projects/KNOWLEDGE/aicourses/task">
                <button style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '5.1875rem',
                  height: '2.5rem',
                  backgroundColor: '#F3F4F5',
                  borderRadius: '6.25rem',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    fontWeight: '600',
                    fontFamily: 'Manrope',
                    color: '#08090A'
                  }}>
                    Открыть
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Task 3 */}
          <div className="flex justify-between items-center p-[1.25rem] gap-[2rem] w-full border-[1.5px] border-[var(--color-gray-plus-50)] rounded-[1rem]">
            <h5 className="text-[1.25rem] leading-[1.6875rem] font-medium text-[var(--color-black)] flex-grow">
              Телеграм бот для помози в освоении тем и<br />поиска полезных ресурсов
            </h5>
            <div className="flex items-center gap-[0.5rem]">
              <button style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem',
                width: '5rem',
                height: '2.5rem',
                backgroundColor: '#E0E8FF',
                borderRadius: '6.25rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                <div style={{ width: '1rem', height: '1rem' }}>
                  <PointsIcon />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  lineHeight: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Manrope',
                  color: '#3A6BFF'
                }}>
                  150
                </span>
              </button>
              <Link href="/projects/KNOWLEDGE/aicourses/task">
                <button style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '5.1875rem',
                  height: '2.5rem',
                  backgroundColor: '#F3F4F5',
                  borderRadius: '6.25rem',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                    fontWeight: '600',
                    fontFamily: 'Manrope',
                    color: '#08090A'
                  }}>
                    Открыть
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AICourses;