import Image from "next/image";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Link from "@/assets/general/link.svg";

export default function Home() {
    return (
        <Layout>
            <Header>
                <Header.Heading>Российское Содружество Колледжей</Header.Heading>
                {/* <Button icon><Notify /></Button> */}
            </Header>
            <div className="hero overflow-hidden" style={{ placeItems: "center" }}>
                <div className="h-screen w-full col-span-12 grid grid-cols-6 gap-[1.5rem]">
                    <div className="col-span-1"></div>
                    <div className="col-span-4 h-full flex align-center justify-center gap-[8rem] flex-col w-full">
                        <div className="flex w-full flex-col align-center justify-center gap-[1.25rem] items-center">
                            <a className="text-[0.875rem] px-[1rem] py-[0.5rem] rounded-full bg-(--color-blue) border-[3px] border-(--color-blue-plus-50) text-[var(--color-blue-noise)] w-fit">Новый уровень развития</a>
                            <div className="flex flex-col gap-[0.75rem] items-center jusify-center">
                                <h1 className="text-center">Цифровизация вашего учебного заведения вместе с РСК</h1>
                                <p className="text-[0.875rem] text-[var(--color-gray-black)] w-1/2 text-center">Начните цифровую трансформацию колледжа с нашей платформой и удобными инструментами</p>
                            </div>
                        </div>
                        <div className="flex w-full bg-(--color-blue-plus-50) p-[1.875rem] rounded-[1.5rem] gap-[0.75rem]">
                            <a href="/auth" className="bg-(--color-blue) text-[var(--color-white)] flex align-center justify-center px-[1.25rem] py-[0.75rem] rounded-[0.85rem] text-[0.875rem] w-full">
                                Регистрация
                            </a>
                            <a href="/#mainInfo" className="bg-(--color-blue) text-[var(--color-white)] flex align-center justify-center px-[1.25rem] py-[0.75rem] rounded-[0.85rem] text-[0.875rem] w-3/12">
                                Контакты
                            </a>
                            <a href="/#mainInfo" className="bg-(--color-blue) text-[var(--color-white)] flex align-center justify-center px-[1.25rem] py-[0.75rem] rounded-[0.85rem] text-[0.875rem] w-3/12">
                                Сведения
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                </div>

                <div id="mainInfo" className="w-full col-span-12 grid grid-cols-2 gap-[1.5rem] pb-[3.75rem]">
                    <div className="flex flex-col gap-[0.75rem] p-[1.25rem] rounded-[1.25rem] bg-(--color-white-gray)">
                        <h3>Контакты</h3>
                        <div className="flex flex-col gap-[0.5rem]">
                            <h6 className="text-[var(--color-gray-black)]">Почта поддержки</h6>
                            <a href="mailto:help@rosdk.ru">help@rosdk.ru</a>
                        </div>
                        <div className="flex flex-col gap-[0.5rem]">
                            <h6 className="text-[var(--color-gray-black)]">Почта сотрудничества</h6>
                            <a href="mailto:co@rosdk.ru">co@rosdk.ru</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[0.75rem] p-[1.25rem] rounded-[1.25rem] bg-(--color-white-gray)">
                        <h3>Сведения</h3>
                        <div className="flex gap-[0.5rem] group cursor-pointer">
                            <Link className="w-[1.25rem]"></Link>
                            <a target="_blank" href="https://i.pinimg.com/736x/51/b7/e7/51b7e7cb176cc85bc6bf77c21378b6ca.jpg">
                                <h6>Положение о конкурсе</h6>
                            </a>
                        </div>
                        <div className="flex gap-[0.5rem] group cursor-pointer">
                            <Link className="w-[1.25rem]"></Link>
                            <a
                                target="_blank"
                                href="https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2F4Y9bFhoQd%2BEh8Vk6aVciLCjpoC35hPNd1UYmIkGxmnsrxw5CImAYaS%2BTxOkTJkVEq%2FJ6bpmRyOJonT3VoXnDag%3D%3D%3A%2F152fz.pdf&name=152fz.pdf">
                                <h6>Согласие на обработку персональных данных</h6>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
