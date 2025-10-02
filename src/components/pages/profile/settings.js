import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import Setts from "@/assets/general/setts.svg";
import Notify from "@/assets/general/notify.svg";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea";
import DropdownInput from "@/components/ui/Input/DropdownInput";

export default function SettingsPage({ goTo }) {
    const [userData, setUserData] = useState(null); // оригинальные данные
    const [orgList, setOrgList] = useState([]); // Изменено на массив по умолчанию
    const [formData, setFormData] = useState({}); // данные для формы
    const [hydrated, setHydrated] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const ProfileInfo = async () => {
            try {
                const response = await fetch("/api/profile/info", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const data = await response.json();
                setUserData(data);
                setFormData(data.data);
                setHydrated(true);
            } catch (err) {
                console.error("Request error:", err);
            }
        };

        const OrgList = async () => {
            try {
                const response = await fetch("/api/profile/getOrg", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const data = await response.json();
                if (data.success && Array.isArray(data.list)) {
                    setOrgList(data.list); // Устанавливаем только массив list
                } else {
                    console.error("Invalid orgList data:", data);
                    setOrgList([]);
                }
            } catch (err) {
                console.error("Request error:", err);
                setOrgList([]);
            }
        };

        ProfileInfo();
        OrgList();
    }, []);

    if (!hydrated || !userData) return null;

    // обработчик изменений полей
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newForm = { ...prev, [name]: value };
            const dirty = Object.keys(newForm).some((key) => newForm[key] !== userData.data[key]);
            setIsDirty(dirty);
            return newForm;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isDirty) return;

        // создаём объект только с изменёнными полями
        const changes = { id: userData.data.id };
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== userData.data[key]) {
                changes[key] = formData[key];
            }
        });

        try {
            const response = await fetch("/api/profile/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(changes),
                credentials: "include",
            });
            const data = await response.json();

            if (response.ok) {
                alert("Данные успешно обновлены");
                setUserData((prev) => ({ ...prev, data: formData })); // обновляем оригинальные данные
                setIsDirty(false);
                window.location.reload();
            } else {
                alert("Ошибка: " + JSON.stringify(data));
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <>
            <Header>
                <Header.Heading>
                    {userData.data.NameIRL && userData.data.Surname ? `${userData.data.NameIRL} ${userData.data.Surname}` : "Незаполнено"}
                    <span className="text-(--color-gray-black)">/</span> Настройки
                </Header.Heading>
                <Button icon active onClick={() => goTo("profile")}>
                    <Setts />
                </Button>
            </Header>
            <div className="hero" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div className="flex flex-col gap-[.75rem]">
                    <h6>Основные данные</h6>
                    <div className="flex gap-[.75rem]">
                        <div className="flex flex-col gap-[.5rem] flex-1">
                            <Input type="text" id="FamilyName" name="Surname" placeholder="Введите фамилию" value={formData.Surname || ""} onChange={handleChange} required />
                            <Input type="text" id="name" name="NameIRL" placeholder="Введите имя" value={formData.NameIRL || ""} onChange={handleChange} required />
                            <Input type="text" id="surname" name="Patronymic" placeholder="Введите отчество" value={formData.Patronymic || ""} onChange={handleChange} />
                        </div>
                    </div>
                    <Textarea inverted id="about" name="Description" placeholder="Расскажите о себе кратко" value={formData.Description || ""} onChange={handleChange} />
                    <DropdownInput id="region" name="Region" placeholder="Введите регион" value={formData.Region || ""} onChange={handleChange} />
                </div>

                <div className="flex flex-col gap-[1.25rem]">
                    <h6>Организация и команда</h6>
                    <div className="flex flex-col gap-[.75rem]">
                        <DropdownInput id="Organization" name="Organization" placeholder="Организация" value={formData.Organization || ""} onChange={handleChange} options={orgList} />
                        <Input disabled id="teames" name="teames" placeholder="Команда" autoComplete="off" readOnly />
                        <p style={{ color: "var(--color-gray-black)" }}>* &quot;Команды&quot; временно недоступны</p>
                    </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-[1.25rem]"></div>
                    <Button onClick={handleSubmit} disabled={!isDirty}>
                        Сохранить изменения
                    </Button>
                </div>
            </div>
        </>
    );
}
