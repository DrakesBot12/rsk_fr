import Cookies from "js-cookie";
import { useState, useEffect } from "react";

// Получение userData из cookies
export function getUserData() {
    const cookie = Cookies.get("userData");
    if (!cookie) return null;
    try {
        return JSON.parse(cookie);
    } catch {
        return null;
    }
}

// Проверка, авторизован ли пользователь
export function isAuthorized() {
    const user = getUserData();
    return !!user?.token;
}

// Сохраняем userData в cookies (включая токен)
export function saveUserData(data) {
    const current = getUserData() || {};
    const updated = { ...current, ...data, token: true }; // добавляем "токен"
    Cookies.set("userData", JSON.stringify(updated), {
        path: "/",
        sameSite: "strict",
        expires: 7,
    });
    return updated;
}

// Удаление данных (выход)
export function clearUserData() {
    Cookies.remove("userData");
}

// React-хук для получения userData внутри компонентов
export function useUserData() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const data = getUserData();
        setUserData(data);
    }, []);

    return userData;
}
