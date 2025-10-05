import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { saveUserData } from "@/utils/auth";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input/Input";

export default function LoginStage0({ onForgotPassword, pageVariants, custom = 1 }) {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Получение данных профиля после логина
    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/profile/info", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to fetch profile");
            const data = await response.json();

            // Сохраняем email и name в localStorage
            const userInfo = {
                email: data.data.email,
                username: data.data.username,
            };
            await saveUserData(userInfo);

            console.log("Profile loaded:", userInfo);

            router.push("/profile"); // Переходим на страницу профиля
        } catch (err) {
            console.error("Profile fetch error:", err);
            alert("Не удалось получить данные профиля");
        }
    };

    const onLogin = async (formData) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });
            const data = await response.json();

            if (!response.ok) {
                switch (response.status) {
                    case 422:
                        return alert("Неверные данные: " + JSON.stringify(data));
                    case 401:
                        return alert("Неверный логин или пароль");
                    case 403:
                        return alert("Вы не подтвердили email");
                    default:
                        return alert("Произошла ошибка: " + response.status);
                }
            } else {
                // После успешного логина получаем профиль
                await fetchProfile();
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Ошибка при входе");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            alert("Пароль должен содержать минимум 8 символов");
            return;
        }
        onLogin(formData);
    };

    return (
        <motion.div key="login-stage0" custom={custom} initial="initial" animate="in" exit="out" variants={pageVariants} className="auth_cntr col-span-4 absolute w-full">
            <h3>С возвращением!</h3>
            <form id="login" className="w-full grid grid-cols-1 gap-[0.75rem]" autoComplete="on" onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="Логин" autoComplete="username" required value={formData.name} onChange={handleChange} />
                <Input type="password" name="password" autoComplete="current-password" placeholder="Пароль" required value={formData.password} onChange={handleChange} />
            </form>
            <div className="flex flex-col w-full gap-[0.75rem]">
                <Button type="submit" form="login" className="w-full justify-center">
                    Войти
                </Button>
            </div>
        </motion.div>
    );
}
