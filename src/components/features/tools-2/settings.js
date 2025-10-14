import { useState, useEffect, useCallback } from "react";

import Header from "@/components/layout/Header";
import { addKeyToCookies, addUserToCookies, getKeyFromCookies } from "./actions";
import { v4 as uuidv4 } from "uuid";

import TimeIcon from "@/assets/general/time.svg";
import SettsIcon from "@/assets/general/setts.svg";
import InfoIcon from "@/assets/general/info.svg";
import CourseIcon from "@/assets/nav/course.svg";
import CloseIcon from "@/assets/general/close.svg";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input/Input";

const CORRECT_TOKENS = [
    "MA8YQ-OKO2V-P3XZM-LR9QD-K7N4E",
    "JX3FQ-7B2WK-9PL8D-M4R6T-VN5YH",
    "KL9ZD-4WX7M-P2Q8R-T6H3Y-F5V1E",
    "QZ4R7-M8N3K-L2P9D-X6Y1T-VB5WU",
    "D9F2K-5T7XJ-R3M8P-Y4N6Q-W1VHZ",
    "T3Y8H-P6K2M-9D4R7-Q1X5W-LN9VZ",
    "R7W4E-K2N5D-M8P3Q-Y1T6X-V9BZJ",
    "H5L9M-3X2P8-Q6R4T-K1Y7W-N9VZD",
    "F2K8J-4D7N3-P5Q9R-M1W6X-T3YVH",
    "B6N9Q-1M4K7-R3T8P-Y2X5W-Z7VHD",
    "W4P7Z-2K9N5-D3R8M-Q1Y6T-X5VHB",
];

export default function SettingsPage({ goTo }) {
    // Токен и его валидация
    const [token, setToken] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [tokenExists, setTokenExists] = useState(false); // Новое состояние
    const [showNotification, setShowNotification] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [adminLoginError, setAdminLoginError] = useState("");

    // Данные пользователя
    const [userData, setUserData] = useState({
        lastName: "",
        firstName: "",
        college: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Токен usage
    //const tokenUsageFromBackend = 70
    const max = 180;
    const [value, setValue] = useState(0);

    // Получаем токен из cookies при монтировании компонента

    async function getRecordsCount() {
        try {
            const response = await fetch("/api/mayak/count");
            if (!response.ok) {
                throw new Error("Не удалось получить количество записей");
            }
            const data = await response.json();
            console.log(data);
            return data.count; //|| 0
        } catch (error) {
            console.error("Ошибка при получении количества записей:", error);
            return 0;
        }
    }

    const getRangeClass = (val) => {
        if (val < 30) return "range-low";
        if (val < 80) return "range-mid";
        return "range-high";
    };

    const validateToken = useCallback(
        (tokenToValidate = token) => {
            const isValid = CORRECT_TOKENS.includes(tokenToValidate);
            setIsTokenValid(isValid);

            if (isValid) {
                setShowNotification(true);
            }
        },
        [token]
    );

    useEffect(() => {
        async function fetchTokenAndUsage() {
            const KeyInCookies = await getKeyFromCookies();
            if (KeyInCookies) {
                setToken(KeyInCookies.text);
                validateToken(KeyInCookies.text);
                setTokenExists(true);
            }

            const recordsCount = await getRecordsCount();
            // console.log(recordsCount)
            setValue(max - recordsCount);
        }
        fetchTokenAndUsage();
    }, [validateToken]);

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveData = async () => {
        if (!isTokenValid) {
            alert("Пожалуйста, введите корректный токен для активации тренажера");
            return;
        }

        if (!userData.lastName || !userData.firstName || !userData.college) {
            alert("Пожалуйста, заполните обязательные поля: Фамилия, Имя и Колледж");
            return;
        }

        setIsLoading(true);

        try {
            const userId = uuidv4();

            const userRecord = {
                id: userId,
                userData,
            };

            const dataToSave = {
                key: token,
                userId,
                data: userRecord,
            };

            const response = await fetch("/api/mayak/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSave),
            });

            if (response.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
                await addKeyToCookies(token);
                await addUserToCookies(userId, userData.lastName + " " + userData.firstName);

                // Обновляем количество использований
                const updatedRecordsCount = await getRecordsCount();

                setValue(max - updatedRecordsCount);

                setUserData({
                    lastName: "",
                    firstName: "",
                    college: "",
                });
            } else {
                throw new Error("Ошибка при сохранении данных");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при сохранении данных");
        } finally {
            setIsLoading(false);
            goTo("trainer");
        }
    };
    const handleAdminLogin = async (e) => {
        e.preventDefault();
        // !!! ВАЖНО: Замените 'mayak-power-2024' на свой надежный пароль !!!
        const CORRECT_ADMIN_PASSWORD = "a12345";

        if (adminPassword === CORRECT_ADMIN_PASSWORD) {
            // Устанавливаем "валидный" токен и пользователя в cookie,
            // чтобы тренажер вас пропустил
            const DUMMY_VALID_TOKEN = "MA8YQ-OKO2V-P3XZM-LR9QD-K7N4E"; // Любой из списка правильных

            await addKeyToCookies(DUMMY_VALID_TOKEN);
            await addUserToCookies("admin-id", "Администратор");

            goTo("trainer"); // Переходим в тренажер
        } else {
            setAdminLoginError("Неверный пароль");
            setAdminPassword("");
            setTimeout(() => setAdminLoginError(""), 3000);
        }
    };

    return (
        <>
            <Header>
                <Header.Heading>МАЯК ОКО</Header.Heading>
                <Button
                    icon
                    onClick={() => {
                        sessionStorage.setItem("currentPage", "mayakOko");
                        goTo("mayakOko");
                    }}>
                    <CloseIcon />
                </Button>
            </Header>
            <div className="hero" style={{ placeItems: "center" }}>
                <div className="flex flex-col gap-[1.6rem] items-center h-full col-span-4 col-start-5 col-end-9">
                    <h3>Настройки</h3>
                    <div className="flex flex-col gap-[0.75rem]">
                        <div className="flex flex-col gap-[0.5rem]">
                            <span className="big">Данные токена</span>
                            <p className="small text-(--color-gray-black)">Это ваш токен доступа. Он имеет ограниченное количество использований. На шкале под полем отображается, сколько запросов уже израсходовано</p>
                        </div>
                        <Input
                            placeholder="Введите ваш токен"
                            value={token}
                            onChange={(e) => {
                                const value = e.target.value;
                                setToken(value);
                                validateToken(value);

                                // Наша новая логика
                                if (value.trim().toLowerCase() === "fffff") {
                                    setShowAdminLogin(true);
                                } else {
                                    setShowAdminLogin(false);
                                }
                            }}
                        />

                        {showNotification && tokenExists && <span className="big p-3 bg-green-100 text-green-700 rounded-md">Тренажер активирован</span>}

                        {showNotification && !tokenExists && <span className="big p-3 bg-yellow-100 text-yellow-700 rounded-md">Токен подходит. Заполните форму ниже для активации тренажера.</span>}

                        <div className="flex flex-col gap-[0.25rem]">
                            <span className={getRangeClass(value)}>
                                {value}/{max}
                            </span>
                            <meter id="meter-my" min="0" max={max} low="30" high="80" optimum="100" value={value} className={getRangeClass(value)}></meter>
                        </div>
                    </div>

                    {showAdminLogin ? (
                        // --- СЕКРЕТНАЯ ФОРМА ДЛЯ ПАРОЛЯ ---
                        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4 w-full mt-4">
                            <span className="big">Вход для администратора</span>
                            <Input type="password" placeholder="Введите пароль" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} autoFocus />
                            {adminLoginError && <p className="text-red-500 text-sm text-center">{adminLoginError}</p>}
                            <Button type="submit" className="blue w-full">
                                Войти
                            </Button>
                        </form>
                    ) : (
                        // --- ОБЫЧНАЯ ФОРМА ДЛЯ ПОЛЬЗОВАТЕЛЯ ---
                        <>
                            {!tokenExists && showNotification && (
                                <>
                                    <div className="flex flex-col gap-[0.75rem] w-full">
                                        <span className="big">Личные данные</span>
                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Фамилия *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={userData.lastName}
                                                    onChange={handleUserDataChange}
                                                    className="input-wrapper w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Имя *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={userData.firstName}
                                                    onChange={handleUserDataChange}
                                                    className="input-wrapper w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Организация *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="college"
                                                    name="college"
                                                    value={userData.college}
                                                    onChange={handleUserDataChange}
                                                    className="input-wrapper w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={saveData}
                                            disabled={isLoading}
                                            className={`px-8 py-3 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                                            }`}>
                                            {isLoading ? "Сохранение..." : "Сохранить результаты"}
                                        </button>
                                    </div>

                                    {saveSuccess && <div className="mt-6 p-3 bg-green-100 text-green-700 text-center rounded-md">Данные успешно сохранены!</div>}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
