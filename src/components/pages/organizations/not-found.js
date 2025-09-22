import { useRouter } from "next/router";

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
                    <h1>Организация не найдена!</h1>
                    <Button big onClick={() => router.push("/organizations")}>
                        Вернуться назад
                    </Button>
                </div>
            </div>
        </>
    );
}
