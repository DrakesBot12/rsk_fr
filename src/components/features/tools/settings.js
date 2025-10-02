import { useState, useEffect, useCallback } from "react";

import Header from "@/components/layout/Header";
import { addKeyToCookies, addUserToCookies, getKeyFromCookies } from "./actions";
import { v4 as uuidv4 } from "uuid";

import TimeIcon from "@/assets/general/time.svg";
import SettsIcon from "@/assets/general/setts.svg";
import InfoIcon from "@/assets/general/info.svg";

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

    // Данные пользователя
    const [userData, setUserData] = useState({
        lastName: "",
        firstName: "",
        college: "",
    });

    // Результаты тестов
    /* 	const [testResults, setTestResults] = useState({
		level1: '',
		level2: '',
		level3: '',
		level4: '',
		level5: '',
	}) */

    // Состояние загрузки и успешного сохранения
    const [isLoading, setIsLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Токен usage
    //const tokenUsageFromBackend = 70
    const max = 180;
    const [value, setValue] = useState(0);

    // Валидация токена
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

    // Получаем токен из cookies при монтировании компонента
    useEffect(() => {
        async function fetchTokenAndUsage() {
            const KeyInCookies = await getKeyFromCookies();
            if (KeyInCookies) {
                setToken(KeyInCookies.text);
                validateToken(KeyInCookies.text);
                setTokenExists(true);
            }

            // Получаем количество записей и вычисляем usage
            const recordsCount = await getRecordsCount();
            // console.log(recordsCount)
            setValue(max - recordsCount);
        }
        fetchTokenAndUsage();
    }, [validateToken]);

    async function getRecordsCount() {
        try {
            const response = await fetch("/api/count");
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

    // Определяем диапазон для смены фон

    const getRangeClass = (val) => {
        if (val < 30) return "range-low";
        if (val < 80) return "range-mid";
        return "range-high";
    };

    // Обработчики изменений данных
    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* 	const handleTestResultsChange = e => {
		const { name, value } = e.target
		setTestResults(prev => ({
			...prev,
			[name]: value,
		}))
	} */

    // Сохранение данных
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

            const response = await fetch("/api/save", {
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

    return (
        <>
            <Header>
                <Header.Heading>МАЯК ОКО</Header.Heading>
                <Button icon onClick={() => goTo("history")}>
                    <TimeIcon />
                </Button>
                <Button icon onClick={() => goTo("admin")}>
                    <InfoIcon />
                </Button>
                <Button icon active onClick={() => goTo("mayakOko")}>
                    <SettsIcon />
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
                                setToken(e.target.value);
                                validateToken(e.target.value);
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
                </div>
            </div>
        </>
    );
}
