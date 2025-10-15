import React from "react";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Notify from "@/assets/general/notify.svg";
import SubmitTask from "@/assets/general/submittask.svg";
import StartWork from "@/assets/general/startwork.svg";
import LinkArrow from "@/assets/general/linkarrow.svg";

const TaskPage = () => {
  return (
    <Layout>
      <Header>
        <Header.Heading>Проекты / Знания и навыки / Курсы для студентов...</Header.Heading>
        <Button icon>
          <Notify />
        </Button>
      </Header>
      
      <div className="flex flex-col items-center p-[1.5rem] gap-[2.5rem] w-full">
        <div className="flex flex-col items-start gap-[1.25rem] w-[43.375rem]">
          <h4 className="text-[1.5rem] font-medium text-[#08090A] whitespace-nowrap">
            Сайт с обучающими материалами и тестами
          </h4>
          
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-[0.5rem]">
              <div 
                // className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[8rem] h-[2.5rem] bg-[#E0E8FF] rounded-[6.25rem]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 0.875rem',
                  gap: '0.375rem',
                  width: '8rem',
                  height: '2.5rem',
                  backgroundColor: '#E0E8FF',
                  borderRadius: '6.25rem'
                }}
              >
                <span 
                  // className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#3A6BFF]"
                  style={{
                    fontFamily: 'Manrope',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    lineHeight: '1.2rem',
                    color: '#3A6BFF'
                  }}
                >
                  150 баллов
                </span>
              </div>
              <div 
                // className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[8.5rem] h-[2.5rem] bg-[#F3F4F5] rounded-[6.25rem]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 0.875rem',
                  gap: '0.375rem',
                  width: '8.5rem',
                  height: '2.5rem',
                  backgroundColor: '#F3F4F5',
                  borderRadius: '6.25rem'
                }}
              >
                <span 
                  // className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#909399]"
                  style={{
                    fontFamily: 'Manrope',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    lineHeight: '1.2rem',
                    color: '#909399'
                  }}
                >
                  Знания и навыки
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-[0.5rem]">
              <button 
                // className="flex flex-row justify-center items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[10rem] h-[2.5rem] bg-[#3A6BFF] rounded-[6.25rem] border-none cursor-pointer"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0.5rem 0.875rem',
                  gap: '0.375rem',
                  width: '10rem',
                  height: '2.5rem',
                  backgroundColor: '#3A6BFF',
                  borderRadius: '6.25rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span 
                  // className="w-[6rem] h-[1.2rem] font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-center text-white"
                  style={{
                    width: '6rem',
                    height: '1.2rem',
                    fontFamily: 'Manrope',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    lineHeight: '1.2rem',
                    textAlign: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  Сдать задание
                </span>
                <SubmitTask />
              </button>
              <button 
                // className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] bg-[#F3F4F5] rounded-[6.25rem] border-none cursor-pointer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 0.875rem',
                  gap: '0.375rem',
                  backgroundColor: '#F3F4F5',
                  borderRadius: '6.25rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span 
                  // className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#08090A]"
                  style={{
                    fontFamily: 'Manrope',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    lineHeight: '1.2rem',
                    color: '#08090A'
                  }}
                >
                  Начать работу
                </span>
                <StartWork />
              </button>
            </div>
          </div>
          
          <div className="flex items-start gap-[1.25rem] w-full">
            <div className="flex flex-col p-[1rem] gap-[0.75rem] w-[21rem] bg-[#FAFBFC] rounded-[1rem]">
              <div className="flex flex-col gap-[0.5rem]">
                <h6 className="text-[1rem] font-medium text-[#909399]">Занятость</h6>
                <p className="text-[0.75rem] text-[#08090A]">Работают 2 команды, ограничений на команды нет</p>
              </div>
              <hr className="border-[#EBEDF0]" />
              <div className="flex flex-col gap-[0.5rem]">
                <h6 className="text-[1rem] font-medium text-[#909399]">Заказчик</h6>
                <div className="flex items-center py-[0.625rem] px-[0.75rem] bg-[#E0E8FF] rounded-[0.625rem]">
                  <span className="text-[0.75rem] font-semibold text-[#3A6BFF]">
                    Российское Содружество Колледжей
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-[1.25rem] w-[21rem]">
              <div className="flex flex-col gap-[0.5rem]">
                <h6 className="text-[1rem] font-medium text-[#08090A]">Описание задания</h6>
                <p className="text-[0.75rem] text-[#909399]">
                  Создать образовательный сайт для студентов, посвящённый основам искусственного интеллекта. На сайте будут размещены статьи, видеоролики и интерактивные тесты для проверки знаний. Это поможет студентам изучать ИИ в удобном формате и сразу закреплять материал на практике
                </p>
              </div>
              
              <div className="flex flex-col gap-[0.5rem]">
                <h6 className="text-[1rem] font-medium text-[#08090A]">Материалы</h6>
                <div className="flex flex-col gap-[0.25rem]">
                  <div className="flex gap-[0.25rem]">
                    <button 
                      // className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[14rem] h-[2.5rem] bg-[#F3F4F5] rounded-[6.25rem] border-none cursor-pointer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 0.875rem',
                        gap: '0.375rem',
                        width: '14rem',
                        height: '2.5rem',
                        backgroundColor: '#F3F4F5',
                        borderRadius: '6.25rem',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span 
                        // className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#08090A]"
                        style={{
                          fontFamily: 'Manrope',
                          fontWeight: '600',
                          fontSize: '0.8rem',
                          lineHeight: '1.2rem',
                          color: '#08090A'
                        }}
                      >
                        Полноценный вариант ТЗ
                      </span>
                      <LinkArrow />
                    </button>
                    <button 
                      // className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[7.5rem] h-[2.5rem] bg-[#F3F4F5] rounded-[6.25rem] border-none cursor-pointer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 0.875rem',
                        gap: '0.375rem',
                        width: '7.5rem',
                        height: '2.5rem',
                        backgroundColor: '#F3F4F5',
                        borderRadius: '6.25rem',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span 
                        // className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#08090A]"
                        style={{
                          fontFamily: 'Manrope',
                          fontWeight: '600',
                          fontSize: '0.8rem',
                          lineHeight: '1.2rem',
                          color: '#08090A'
                        }}
                      >
                        Примеры
                      </span>
                      <LinkArrow />
                    </button>
                  </div>
                  <button 
                    // className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[14.5rem] h-[2.5rem] bg-[#F3F4F5] rounded-[6.25rem] border-none cursor-pointer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem 0.875rem',
                      gap: '0.375rem',
                      width: '14.5rem',
                      height: '2.5rem',
                      backgroundColor: '#F3F4F5',
                      borderRadius: '6.25rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      // className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#08090A]"
                      style={{
                        fontFamily: 'Manrope',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        lineHeight: '1.2rem',
                        color: '#08090A'
                      }}
                    >
                      Требования безопасности
                    </span>
                    <LinkArrow />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskPage;