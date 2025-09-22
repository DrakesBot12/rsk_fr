import { useState } from "react";
import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Warning from "@/assets/general/warning.svg";
import TimeBefore from "@/assets/general/timeBefore.svg";
import File from "@/assets/general/file.svg";
import Button from "@/components/ui/Button";

export default function Task() {
    const [fileSelected, setFileSelected] = useState(false);
    const [fileName, setFileName] = useState("Прикрепите файл");

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileSelected(true);
            setFileName(e.target.files[0].name);
        } else {
            setFileSelected(false);
            setFileName("Прикрепите файл");
        }
    };

    return (
        <Layout>
            <Header>
                <Header.Heading>Обучение</Header.Heading>
            </Header>
            <div className="hero overflow-hidden" style={{ placeItems: "center" }}>
                <div className="h-full w-full col-span-12 grid grid-cols-2 gap-[1.5rem]">
                    <div className="flex flex-col justify-center items-center gap-[0.75rem] p-[1rem] rounded-[1rem] bg-(--color-white-gray)" style={{ aspectRatio: "16/9", width: "100%" }}>
                        <span className="w-[2.25rem] h-[2.25rem]">
                            <Warning />
                        </span>
                        <h6>Нет доступа</h6>
                        <p className="w-[60%] text-center">Для начала пройдите задание с предыдущего урока</p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-[1rem]">
                        <h3>Задание 1-го урока</h3>
                        <p>
                            Требуется полностью заполнить профиль пользователя. Для этого:
                            <br />
                            1. Перейдите в свой профиль
                            <br />
                            2. Нажмите на кнопку настроек
                            <br />
                            3. Заполните все поля кроме “Команды”
                            <br />
                            После этого возвращайтесь на эту страницу
                        </p>
                        <a className="bg-(--color-gray-plus-50) gap-[0.75rem] p-[0.75rem] rounded-[0.75rem] text-(--color-gray-black) flex flex-row align-center">
                            <TimeBefore />
                            Ожидание выполнения
                        </a>
                        <div className="flex flex-row gap-[0.75rem] max-w-full">
                            <Button inverted className="relative flex items-center gap-2">
                                <File />
                                <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                                <a className="w-max">{fileName}</a>
                            </Button>
                            <Button inverted disabled={!fileSelected}>
                                Отправить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
