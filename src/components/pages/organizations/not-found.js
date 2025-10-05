import { useRouter } from "next/router";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Notify from "@/assets/general/notify.svg";

export default function OrganNotFound() {
    const router = useRouter();
    return (
        <>
            <Header>
                <Header.Heading>
                    Организации <span className="text-(--color-gray-black)">/</span> Организация не найдена
                </Header.Heading>
                {/* <Button icon><Notify /></Button> */}
            </Header>
            <div className="hero" style={{ placeItems: "center" }}>
                <div className="flex flex-col gap-[1rem] col-start-4 col-end-10">
                    <h1 className="text-center">Организация не найдена!</h1>
                    <p className="text-center">Мы уже работаем над этим. Возможно скоро она появится! Следите за социальными ресурсами РСК</p>
                    <div className="flex gap-[1rem]">
                        <Button onClick={() => router.push("/organizations")}>Вернуться назад</Button>
                        <Link className="button text-white bg-(--color-blue)" target="_blank" href="https://t.me/rskfed">
                            Наш телеграм
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
