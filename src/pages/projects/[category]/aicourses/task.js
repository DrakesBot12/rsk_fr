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
                    <h4 className="text-[1.5rem] font-medium text-[#08090A] whitespace-nowrap">Сайт с обучающими материалами и тестами</h4>

                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-[0.5rem]">
                            <div className="flex items-center justify-center px-[0.875rem] py-[0.5rem] w-[8rem] h-[2.5rem] bg-[#E0E8FF] rounded-[6.25rem]">
                                <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#3A6BFF]">150 баллов</span>
                            </div>
                            <div className="flex items-center px-[0.875rem] py-[0.5rem] gap-[0.375rem] w-[8.5rem] h-[2.5rem] bg-[#F3F4F5] rounded-[6.25rem]">
                                <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-[#909399]">Знания и навыки</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-[0.5rem]">
                            <Button className="blue roundeful small btn-submit gap-[0.375rem] px-[0.875rem] py-[0.5rem] transition-all duration-300 hover:shadow-lg">
                                <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] text-center whitespace-nowrap">Сдать задание</span>
                                <div className="w-[0.875rem] h-[0.875rem]">
                                    <SubmitTask />
                                </div>
                            </Button>
                            <Button className="inverted roundeful small btn-start gap-[0.375rem] px-[0.875rem] py-[0.5rem] transition-all duration-300 hover:shadow-lg">
                                <span className="font-manrope font-semibold text-[0.8rem] leading-[1.2rem] whitespace-nowrap">Начать работу</span>
                                <div className="w-[0.875rem] h-[0.875rem]">
                                    <StartWork />
                                </div>
                            </Button>
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
                                    <span className="text-[0.75rem] font-semibold text-[#3A6BFF]">Российское Содружество Колледжей</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[1.25rem] w-[21rem]">
                            <div className="flex flex-col gap-[0.5rem]">
                                <h6 className="text-[1rem] font-medium text-[#08090A]">Описание задания</h6>
                                <p className="text-[0.75rem] text-[#909399]">
                                    Создать образовательный сайт для студентов, посвящённый основам искусственного интеллекта. На сайте будут размещены статьи, видеоролики и интерактивные тесты для проверки знаний. Это поможет студентам
                                    изучать ИИ в удобном формате и сразу закреплять материал на практике
                                </p>
                            </div>

                            <div className="flex flex-col gap-[0.5rem]">
                                <h6 className="text-[1rem] font-medium text-[#08090A]">Материалы</h6>
                                <div className="flex flex-col gap-[0.5rem]">
                                    <div className="flex gap-[0.5rem]">
                                        <Button className="inverted roundeful small btn-material-tz gap-[0.375rem] px-[0.875rem] py-[0.5rem]">
                                            <span className="font-manrope font-semibold text-[0.625rem] leading-[1rem] whitespace-nowrap">Полноценный вариант ТЗ</span>
                                            <LinkArrow />
                                        </Button>
                                        <Button className="inverted roundeful small btn-material-examples gap-[0.375rem] px-[0.875rem] py-[0.5rem]">
                                            <span className="font-manrope font-semibold text-[0.625rem] leading-[1rem] whitespace-nowrap">Примеры</span>
                                            <LinkArrow />
                                        </Button>
                                    </div>
                                    <Button className="inverted roundeful small btn-material-security gap-[0.375rem] px-[0.875rem] py-[0.5rem] mt-[0.25rem]">
                                        <span className="font-manrope font-semibold text-[0.625rem] leading-[1rem] whitespace-nowrap">Требования безопасности</span>
                                        <LinkArrow />
                                    </Button>
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
