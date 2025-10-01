import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Buffer from "./addons/popup";

import InfoIcon from "@/assets/general/info.svg";
import LinkIcon from "@/assets/general/link.svg";
import CopyIcon from "@/assets/general/copy.svg";
import TimeIcon from "@/assets/general/time.svg";
import Plusicon from "@/assets/general/plus.svg";
import SettsIcon from "@/assets/general/setts.svg";
import RandomIcon from "@/assets/general/random.svg";
import ResetIcon from "@/assets/general/ResetIcon.svg";

import { getKeyFromCookies } from "./actions";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // <-- ДОБАВИТЬ ЭТУ СТРОКУ
import TextareaAutosize from "react-textarea-autosize"; // <-- И ЭТУ СТРОКУ

import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button";
import Switcher from "@/components/ui/Switcher";
import Block from "@/components/features/public/Block";

export default function TrainerPage({ goTo }) {
    const isMobile = useMediaQuery("(max-width: 1023px)");
    // Состояния для работы с заданиями
    const [tasks, setTasks] = useState([]);

    const [hasCompletedSecondQuestionnaire, setHasCompletedSecondQuestionnaire] = useState(localStorage.getItem("hasCompletedSecondQuestionnaire") === "true");

    useEffect(() => {
        // Проверяем localStorage при загрузке
        const completed = localStorage.getItem("hasCompletedSecondQuestionnaire") === "true";
        setHasCompletedSecondQuestionnaire(completed);
    }, []);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationConfig, setConfirmationConfig] = useState({
        title: "",
        message: "",
        confirmText: "",
        onConfirm: () => {},
        onCancel: () => {},
    });

    const [showFirstQuestionnaire, setShowFirstQuestionnaire] = useState(false);
    const [showSecondQuestionnaire, setShowSecondQuestionnaire] = useState(false);
    const [showThirdQuestionnaire, setShowThirdQuestionnaire] = useState(false);
    const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [currentTask, setCurrentTask] = useState(null);
    const [taskFileUrl, setTaskFileUrl] = useState("");
    const [instructionFileUrl, setInstructionFileUrl] = useState("");
    const [isCheckingFile, setIsCheckingFile] = useState(false);

    const [showImagePopup, setShowImagePopup] = useState(false);
    const [currentImage, setCurrentImage] = useState("");

    const [levels, setLevels] = useState({
        level1: "",
        level2: "",
        level3: "",
        level4: "",
        level5: "",
    });

    const [showLevelsInput, setShowLevelsInput] = useState(false);
    const [showSessionCompletionPopup, setShowSessionCompletionPopup] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Состояния для таймера задания
    const [isTaskRunning, setIsTaskRunning] = useState(false);
    const [taskStartTime, setTaskStartTime] = useState(null);
    const [taskElapsedTime, setTaskElapsedTime] = useState(0);
    const [ReadyTaskElapsedTime, setReadyTaskElapsedTime] = useState(null);
    const [taskTimer, setTaskTimer] = useState(null);
    const [completedTasks, setCompletedTasks] = useState({});

    // Добавьте эти состояния в начало компонента TrainerPage
    const [showCompletionPopup, setShowCompletionPopup] = useState(false);
    const [currentTaskData, setCurrentTaskData] = useState(null);

    // Состояния для генерации промтов
    const [type, setType] = useState("text");
    const [userType, setUserType] = useState("teacher");
    const [who, setWho] = useState("im");
    const [isTokenValid, setIsTokenValid] = useState(false);
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
    const [fields, setFields] = useState({
        m: "",
        a: "",
        y: "",
        k: "",
        o1: "",
        k2: "",
        o2: "",
    });
    const [prompt, setPrompt] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [buffer, setBuffer] = useState({});
    const [history, setHistory] = useState([]);
    const [showBuffer, setShowBuffer] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    // const [timer, setTimer] = useState(48 * 60 * 60) // 48 часов в секундах

    // Получение имени пользователя из куки
    const activeUser =
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("active_user="))
            ?.split("=")[1] || "anonymous";

    // Запуск/остановка таймера задания
    const toggleTaskTimer = async () => {
        if (isTaskRunning) {
            // Остановка таймера
            clearInterval(taskTimer);
            setIsTaskRunning(false);

            try {
                // Загрузка данных задания из TaskText.json
                const basePath = `/tasks/${userType}/${who}`;
                const response = await fetch(`${basePath}/TaskText.json`);

                if (!response.ok) throw new Error("Не удалось загрузить текст задания");

                const tasksText = await response.json();

                // Находим задание по номеру (учтите, что в JSON номера могут быть строками)
                const taskTextData = tasksText.find((t) => t.number === currentTask?.number?.toString() || t.number === (currentTaskIndex + 1).toString());

                if (taskTextData) {
                    setCurrentTaskData(taskTextData);
                } else {
                    // Если не нашли по номеру, используем базовую информацию
                    setCurrentTaskData({
                        number: currentTask?.number || currentTaskIndex + 1,
                        description: currentTask?.description || "Описание задания недоступно",
                        task: currentTask?.name || "Текст задания недоступен",
                    });
                }

                setShowCompletionPopup(true);
            } catch (err) {
                console.error("Ошибка загрузки текста задания:", err);
                // Fallback на базовую информацию
                setCurrentTaskData({
                    number: currentTask?.number || currentTaskIndex + 1,
                    description: currentTask?.description || "Описание задания недоступно",
                    task: currentTask?.name || "Текст задания недоступен",
                });
                setShowCompletionPopup(true);
            }

            // Сохранение результата
            const minutes = Math.round(taskElapsedTime / 60);
            const taskName = currentTask?.name || `Задание ${currentTaskIndex + 1}`;

            try {
                const result = await saveToJson({
                    taskName,
                    minutes,
                    currentTaskIndex,
                    type,
                    userType,
                    who,
                    taskElapsedTime,
                });

                if (!result.success) {
                    console.warn("Failed to save to server, using localStorage fallback");
                    // Fallback на localStorage
                    const newTasks = {
                        ...completedTasks,
                        [activeUser]: {
                            ...(completedTasks[activeUser] || {}),
                            [taskName]: {
                                attempts: [
                                    ...(completedTasks[activeUser]?.[taskName]?.attempts || []),
                                    {
                                        timestamp: new Date().toISOString(),
                                        timeSpent: minutes,
                                        taskDetails: { type, userType, who },
                                    },
                                ],
                            },
                        },
                    };
                    setCompletedTasks(newTasks);
                    localStorage.setItem("completedTasks", JSON.stringify(newTasks));
                }
            } catch (err) {
                console.error("Error saving task data:", err);
            }

            setReadyTaskElapsedTime(taskElapsedTime);
            setTaskElapsedTime(0);
        } else {
            // Запуск таймера
            setTaskStartTime(Date.now());
            setIsTaskRunning(true);
            setTaskTimer(
                setInterval(() => {
                    setTaskElapsedTime((prev) => prev + 1);
                }, 1000)
            );
        }
    };

    // Форматирование времени для таймера задания
    const formatTaskTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const handleResetFields = () => {
        setFields({
            m: "",
            a: "",
            y: "",
            k: "",
            o1: "",
            k2: "",
            o2: "",
        });
        setPrompt("");
    };

    useEffect(() => {
        const savedTasks = localStorage.getItem("completedTasks");
        if (savedTasks) {
            setCompletedTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Очистка таймера при размонтировании
    useEffect(() => {
        return () => {
            if (taskTimer) clearInterval(taskTimer);
        };
    }, [taskTimer]);

    // Константы для генерации промтов
    const fieldsList = [
        { code: "m", label: "М - Миссия. Что сделать?" },
        { code: "a", label: "А - Аудитория. Для кого?" },
        { code: "y", label: "Я - Роль. Какой эксперт лучше всего это сделает?" },
        { code: "k", label: "К - Критерии. Какие прилагательные успеха?" },
        { code: "o1", label: "О - Ограничения. Количество и что важно отметить?" },
        { code: "k2", label: "К - Контекст. Как и где будет использоваться?" },
        { code: "o2", label: "О - Оформление. Как оформить результат?" },
    ];

    const defaultTypes = [
        { key: "text", label: "Текст" },
        { key: "audio", label: "Аудио" },
        { key: "visual-static", label: "Статика" },
        { key: "visual-dynamic", label: "Динамика" },
        { key: "interactive", label: "Интерактив" },
        { key: "data", label: "Данные" },
    ];

    const defaultLinks = {
        text: [
            { name: "GigaChat", url: "https://t.me/gigachat_bot" },
            { name: "Perplexity", url: "https://perplexity.ai" },
            { name: "DeepSeek", url: "https://chat.deepseek.com" },
            { name: "AiStudio", url: "https://aistudio.google.com" },
        ],
        audio: [
            { name: "Perplexity", url: "https://perplexity.ai" },
            { name: "Udio", url: "https://www.udio.com" },
            { name: "Suno", url: "https://suno.com/invite/@3321616" },
            { name: "CharacterAI", url: "https://character.ai" },
            { name: "AiStudio(Speech)", url: "https://aistudio.google.com/generate-speech" },
        ],
        "visual-static": [
            { name: "Kandinsky", url: "https://t.me/kandinsky21_bot" },
            { name: "Qwen", url: "https://chat.qwen.ai/" },
            { name: "Recraft", url: "https://www.recraft.ai/" },
            { name: "AiStudio(Image)", url: "https://aistudio.google.com/gen-media" },
        ],
        "visual-dynamic": [
            { name: "GigaChat", url: "https://t.me/gigachat_bot" },
            { name: "PixVerse", url: "https://app.pixverse.ai/" },
            { name: "Piсtory", url: "https://pictory.ai/" },
            { name: "AiStudio(Veo)", url: "https://aistudio.google.com/gen-media" },
        ],
        interactive: [
            { name: "Prezapro", url: "https://t.me/prezaprobot" },
            { name: "DeepSeek", url: "https://chat.deepseek.com" },
            { name: "Gamma", url: "https://gamma.app/signup?r=4va8xcqw91qowwp" },
            {
                name: "Genspark",
                url: "https://www.genspark.ai/agents?type=slides_agent",
            },
            { name: "Lovable", url: "https://lovable.dev" },
        ],
        data: [
            { name: "Perplexity", url: "https://perplexity.ai" },
            { name: "WebSim", url: "https://websim.ai" },
            { name: "Lovable", url: "https://lovable.dev" },
            { name: "AiStudio", url: "https://aistudio.google.com" },
            { name: "Napkin", url: "https://www.napkin.ai" },
        ],
    };

    const synonyms = {
        imagine: ["Представь, что ты", "Вообрази себя в роли", "Допустим, что ты сейчас —", "Поставь себя на место"],
        isKnown: ["и ты известен тем, что отлично справляешься с", "который славится мастерством в", "известный своими умениями в области", "чьим главным преимуществом является"],
        needTo: ["Теперь тебе необходимо", "Твоя задача —", "Требуется", "Следует"],
        forAudience: ["для аудитории", "с учётом интересов целевой группы", "чтобы охватить сегмент", "желая донести идею до"],
        withLimit: ["учитывая следующие ограничения:", "при этом помня о таких условиях:", "не забывая о правилах:", "соблюдая важные требования:"],
        inContext: ["и использовать это в контексте", "для дальнейшего применения в", "чтобы внедрить это в", "с прицелом на"],
        finalFormat: ["оформи всё в виде", "представь окончательный результат как", "заверши работу форматом", "приведи к формату"],
    };

    const contentTypeOptions = {
        text: {
            mission: [
                "Подготовить развернутую статью о ключевых тенденциях в AI-сфере",
                "Создать детальную техническую документацию к новому API сервиса",
                "Разработать комплексный контент-план для блога маркетинговой компании",
                "Подготовить аналитический обзор современного рынка электромобилей",
                "Написать увлекательный сценарий для короткометражного видео",
                "Сформировать убедительный рекламный текст для продвижения фитнес-приложения",
            ],
            audience: [
                "разнообразная читательская аудитория технологического блога",
                "группа начинающих разработчиков, изучающих язык Python",
                "маркетологи, ориентированные на молодую онлайн-аудиторию",
                "потенциальные инвесторы, наблюдающие за рынком электромобилей",
                "киноманы, увлечённые короткометражными проектами",
                "будущие клиенты, подбирающие удобное фитнес-приложение",
            ],
            role: [
                "опытный контент-мейкер со стажем в IT",
                "технический писатель, специализирующийся на API",
                "креативный блогер, хорошо понимающий инструменты Telegram",
                "аналитик рынка электромобилей с глубоким бэкграундом",
                "сценарист короткометражных лент",
                "копирайтер, создающий продающие тексты для digital-сфер",
            ],
            criteria: [
                "максимальная доступность и лёгкость восприятия",
                "точная структура с наглядными примерами",
                "высокая вовлечённость и удержание внимания",
                "глубокая аналитика, подтверждённая авторитетными источниками",
                "оригинальность и эмоциональный окрас повествования",
                "убедительность, способная мотивировать к действию",
            ],
            limitations: [
                "объём не более 1800 слов и минимум три примера из практики",
                "подробные пошаговые инструкции с поддержкой последних версий API",
                "30 разнообразных постов с яркими визуальными эффектами",
                "учёт свежих данных за последний квартал, графики и диаграммы",
                "хронометраж до 5 минут с высококачественным саунддизайном",
                "длина текста до 500 символов и уникальный призыв к действию",
            ],
            context: [
                "публикация в корпоративном блоге IT-компании",
                "размещение во внутренней базе знаний для разработчиков",
                "официальный Telegram-канал, нуждающийся в регулярном контенте",
                "ежеквартальный отчёт, предоставляемый топ-менеджменту",
                "участие в фестивале короткого метра",
                "рекламная кампания нового мобильного приложения",
            ],
            format: [
                "лонгрид с инфографикой и чёткой структурой",
                "wiki-инструкция с примерами кода и разделами справки",
                "серию постов с акцентом на storytelling",
                "аналитический отчет в формате PDF",
                "литературный сценарий для короткометражного фильма",
                "продающий лендинг с конкретными УТП",
            ],
        },
        audio: {
            mission: [
                "подготовить увлекательный текст песни для путешественников в подкасте",
                "создать лирические фрагменты к аудиокниге в жанре фэнтези",
                "разработать запоминающийся джингл для рекламы кофеен",
                "сформировать контент голосового ассистента",
                "написать фразы и реплики для диктора",
                "продумать звучащий логотип бренда, отражающий инновации",
            ],
            audience: [
                "слушатели подкастов, интересующиеся путешествиями и приключениями",
                "любители фэнтези-аудиокниг, ценящие атмосферность",
                "посетители сети кофеен, нацеленые на уют и комфорт",
                "геймеры, нуждающиеся в голосовом взаимодействии в играх",
                "активные пользователи мобильных приложений",
                "ценители передовых технологий, предпочитающие новизну",
            ],
            role: [
                "звукорежиссёр, работающий с живыми записями",
                "аудиопродюсер крупных фэнтези-проектов",
                "ведущий подкаста с яркой подачей",
                "саунд-дизайнер, создающий запоминающуюся атмосферу",
                "диктор, способный работать на двух языках",
                "специалист по брендовому аудиостилю",
            ],
            criteria: [
                "высокое качество звуковой записи и живое звучание",
                "чёткость речи с лёгким атмосферным фоновым сопровождением",
                "яркий и динамичный джингл, западающий в память",
                "аутентичные звуковые эффекты, отражающие жанр киберпанк",
                "интуитивно понятная и дружелюбная голосовая навигация",
                "ассоциация с технологичностью и инновациями",
            ],
            limitations: [
                "длительность до 45 минут, стереозапись в высоком битрейте",
                "голос женский (альт) с фолк-интонациями",
                "15-20 секунд, формат mp3 320kbps",
                "до 2 часов звуковых эффектов, лицензия Creative Commons",
                "русско-английские голосовые команды с быстрым переключением",
                "от 5 до 10 секунд, синтетические инструменты",
            ],
            context: [
                "публикация на ведущих подкаст-платформах",
                "расширение ассортимента аудиостоков",
                "радио- и онлайн-реклама в утренних эфирах",
                "игровой движок с продвинутой системой озвучки",
                "мобильное приложение, ориентированное на многозадачность",
                "рекламные ролики технологичного бренда",
            ],
            format: [
                "структурированный текст для подкаста о путешествиях",
                "лирика для аудиокниги с главами и персонажами",
                "джингл со слоганом и фоновой мелодией",
                "набор фраз для звукового оформления видеоигр",
                "полный скрипт голосового ассистента",
                "брендовый аудиологотип в коротком формате",
            ],
        },
        "visual-static": {
            mission: [
                "разработать серию иллюстраций для статьи о технологиях будущего",
                "подготовить брендбук с логотипом и фирменным стилем для нового стартапа",
                "создать фотореалистичное изображение продукта для рекламной кампании",
                "сгенерировать инфографику, наглядно показывающую этапы проекта",
                "продумать яркий концепт-арт для персонажа видеоигры",
                "сформировать цепляющую обложку для поста в социальной сети",
            ],
            audience: [
                "читатели технологического блога",
                "инвесторы и партнеры, оценивающие бренд",
                "потенциальные покупатели в интернет-магазине",
                "команда проекта и стейкхолдеры",
                "поклонники фэнтези-игр и концепт-арта",
                "подписчики корпоративного аккаунта",
            ],
            role: [
                "цифровой художник, работающий с AI",
                "графический дизайнер, создающий айдентику",
                "рекламный креатор, специалист по визуализации",
                "аналитик-визуализатор данных",
                "концепт-художник для игровой индустрии",
                "SMM-специалист, отвечающий за визуал",
            ],
            criteria: [
                "высокая детализация и соответствие стилю статьи",
                "уникальность и запоминаемость логотипа",
                "максимальный реализм и привлекательность",
                "понятность и четкая структура инфографики",
                "креативность и передача характера персонажа",
                "высокая вовлеченность и кликабельность",
            ],
            limitations: [
                "разрешение не менее 4K, формат PNG",
                "векторный формат для логотипа, 3-4 варианта",
                "изображение на белом фоне, несколько ракурсов",
                "использование фирменных цветов и шрифтов компании",
                "высокое разрешение, вид спереди и сбоку",
                "соотношение сторон 1:1, яркая цветовая палитра",
            ],
            context: [
                "иллюстрация к лонгриду на сайте",
                "презентация нового бренда инвесторам",
                "карточка товара на маркетплейсе",
                "внутренняя документация проекта",
                "портфолио художника и презентация для геймдев студии",
                "продвижение в социальных сетях",
            ],
            format: [
                "набор из 5-7 изображений в едином стиле",
                "полный брендбук в формате PDF",
                "серия рендеров продукта в высоком разрешении",
                "финальная инфографика в форматах JPG и SVG",
                "лист с концепт-артом персонажа",
                "готовое изображение для публикации",
            ],
        },
        "visual-dynamic": {
            mission: [
                "разработать сценарий видеоурока по Python с демонстрацией примеров",
                "подготовить промо-ролик, рассказывающий об эко-стартапе и его ценностях",
                "создать видеопрезентацию, раскрывающую суть инновационного AI-проекта",
                "сделать скринкаст, наглядно показывающий функционал нового веб-инструмента",
                "продумать яркий концепт музыкального клипа в стиле ретро-футуризм",
                "сформировать цепляющее видео-обращение, которое вдохновит потенциальных клиентов",
            ],
            audience: [
                "студенты, проходящие онлайн-курс по программированию",
                "защитники природы и эко-активисты в соцсетях",
                "инвесторы и партнёры, оценивающие AI-проекты",
                "веб-дизайнеры и UI/UX-специалисты, изучающие новые инструменты",
                "поклонники инди-рока и любители необычной эстетики",
                "люди, выбирающие бренд по ярким видео-историям",
            ],
            role: [
                "видеорежиссёр, умеющий работать с обучающим контентом",
                "оператор, специализирующийся на вирусных эко-роликах",
                "монтажёр, ориентированный на деловые презентации",
                "специалист по скринкастам, прорабатывающий мелкие детали интерфейса",
                "клипмейкер с акцентом на неоновые эффекты и оригинальную стилистику",
                "маркетолог, владеющий визуальным сторителлингом",
            ],
            criteria: [
                "высокое качество изображения, логичная структура урока",
                "динамичность, которая способна быстро привлечь внимание",
                "профессиональная графика и понятные слайды",
                "ясное и последовательное раскрытие функционала",
                "креативный визуальный ряд, вызывающий эмоции",
                "убедительность и лаконичный посыл",
            ],
            limitations: [
                "хронометраж не более 15 минут, наличие субтитров",
                "вертикальный формат для TikTok/Reels, до 60 секунд",
                "регламент 5-7 минут в фирменном стиле компании",
                "Full HD-качество со скринкастом интерфейса",
                "3-4 минуты с использованием неоновых ретроэлементов",
                "1 минутное видеообращение, передающее ключевые преимущества",
            ],
            context: [
                "образовательная платформа, где важно удобство восприятия",
                "социальные сети и RuTube, нуждающиеся в коротких роликах",
                "онлайн-конференция для потенциальных инвесторов",
                'раздел "Помощь" на официальном сайте приложения',
                "музыкальные и арт-площадки, ориентированные на творчество",
                "главная страница сайта компании, привлекающая посетителей",
            ],
            format: [
                "полноценный видеоурок с примерами кода и комментариями",
                "короткий промо-ролик, вдохновляющий на эко-поведение",
                "деловая видеопрезентация в формате конференции",
                "технический скринкаст с пояснениями и выделениями",
                "экспериментальный клип в неоновом ретростиле",
                "вдохновляющее видеообращение, призывающее к действиям",
            ],
        },
        interactive: {
            mission: [
                "создать концепцию текста для веб-приложения финансового анализа",
                "подготовить вопросы и логику онлайн-квиза по истории искусства",
                "разработать интерактивную презентацию для фотокурса",
                "придумать сценарий веб-квеста, обучающего экологии",
                "сформировать геймифицированный тест по английскому языку",
                "прототипировать калькулятор ремонта с понятным интерфейсом",
            ],
            audience: [
                "пользователи сервиса по контролю расходов",
                "любители художественных викторин",
                "студенты фотокурсов",
                "школьники, изучающие основы экологии",
                "ученики онлайн-школы английского языка",
                "клиенты строительных и отделочных компаний",
            ],
            role: [
                "UX-дизайнер веб-приложений",
                "гейм-дизайнер квизов и викторин",
                "разработчик презентаций с анимацией",
                "педагог и автор образовательных квестов",
                "автор тестов с автоматической проверкой",
                "программист, создающий формулы подсчёта",
            ],
            criteria: [
                "удобство и интуитивность для широкой аудитории",
                "вовлечённость и соревновательный дух",
                "яркий визуал и плавные переходы между слайдами",
                "познавательность и побуждение к экологическому поведению",
                "геймификация, позволяющая получать баллы и достижения",
                "точность расчётов и возможность скачивания результатов",
            ],
            limitations: [
                "кроссбраузерность, адаптивная вёрстка под мобайл",
                "не более 10 вопросов с иллюстрациями или аудио",
                "до 20 слайдов, поддержка встраиваемого видео",
                "браузерный формат, интерактивные элементы на каждом шаге",
                "выбор и открытые вопросы, автопроверка ответов",
                "вывод итоговых расчётов с возможностью печати",
            ],
            context: [
                "онлайн-сервис, доступный из любого браузера",
                "вебинарная площадка, где проходят художественные викторины",
                "онлайн-школа фотографии, где важна интерактивность",
                "образовательный портал, продвигающий экологию",
                "платформа для языковых тестов",
                "сайт строительных услуг, желающий упростить расчёты",
            ],
            format: [
                "текстовое описание веб-приложения с формами ввода",
                "вопросы и варианты ответов онлайн-квиза",
                "презентация со слайдами и анимацией",
                "веб-квест с сюжетными ветками",
                "геймифицированный тест с системой очков",
                "онлайн-калькулятор с подробным описанием формул",
            ],
        },
        data: {
            mission: [
                "сформировать детальный запрос на анализ годовых продаж в разных регионах",
                "подготовить запрос на дашборд ключевых маркетинговых метрик",
                "сделать аналитический отчёт о поведении клиентов онлайн-магазина",
                "определить прогноз спроса на электромобили в ближайшие 2 года",
                "визуализировать большие данные о веб-трафике за месяц",
                "выявить основные тренды и закономерности в клиентской базе",
            ],
            audience: [
                "команда дата-аналитиков, работающих над показателями продаж",
                "топ-менеджмент компании, ведущий маркетинговое планирование",
                "инвесторы и ключевые стейкхолдеры, отслеживающие динамику роста",
                "руководители департамента продаж, планирующие объёмы",
                "маркетологи, анализирующие трафик и конверсию",
                "CRM-специалисты, заинтересованные в сегментации клиентов",
            ],
            role: [
                "дата-аналитик, умеющий работать с крупными массивами данных",
                "исследователь данных, специализирующийся на BI-инструментах",
                "бизнес-аналитик, упрощающий принятие решений",
                "прогнозист, опирающийся на исторические паттерны спроса",
                "эксперт в области Big Data, способный обрабатывать потоки",
                "статистик, владеющий методами множественной регрессии",
            ],
            criteria: [
                "максимальная точность и достоверность обрабатываемых данных",
                "наглядность визуализации и удобство понимания",
                "актуальность выводов, охватывающих последние тренды",
                "прогнозы, учитывающие сезонность и рыночные колебания",
                "интерактивный дашборд с фильтрами и обновлением данных",
                "глубокий анализ, позволяющий сегментировать клиентов",
            ],
            limitations: [
                "использование проверенных источников и регулярное обновление",
                "интеграция с GA/CRM, возможности автообновления метрик",
                "формат PDF/HTML, наличие графиков и таблиц",
                "применение ML-моделей, учёт сезонных эффектов",
                "возможность экспорта и глубокой фильтрации",
                "анализ данных за 3 года и выделение уникальных сегментов",
            ],
            context: [
                "стратегическое планирование продаж и бизнеса",
                "мониторинг KPI маркетинга и рекламных кампаний",
                "оценка эффективности текущей маркетинговой стратегии",
                "планирование производства и логистики компании",
                "изучение веб-трафика для оптимизации SEO и SEM",
                "сегментация клиентской базы и повышение LTV",
            ],
            format: [
                "полноценный дашборд для аналитики в реальном времени",
                "интерактивный дашборд с подборкой KPI",
                "подробный аналитический отчёт для презентации",
                "прогнозная модель спроса с учётом региональных факторов",
                "визуализация данных через диаграммы и графики",
                "презентационный документ с основными выводами и рекомендациями",
            ],
        },
    };

    // Загрузка списка заданий при изменении userType или who
    useEffect(() => {
        const loadTasks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const basePath = `/tasks/${userType}/${who}`;
                const response = await fetch(`${basePath}/index.json`);

                if (!response.ok) {
                    throw new Error(`Не удалось загрузить задания: ${response.status}`);
                }

                const tasksData = await response.json();
                setTasks(tasksData);

                if (tasksData.length > 0) {
                    setCurrentTaskIndex(0);
                    loadTaskDetails(tasksData[0]);

                    // Проверяем, является ли текущее задание третьим
                } else {
                    setCurrentTask(null);
                    setError("Нет доступных заданий");
                }
            } catch (err) {
                setError(err.message);
                setTasks([]);
                setCurrentTask(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (isTokenValid) {
            loadTasks();
        }
    }, [userType, who, isTokenValid]);

    const handleSaveSessionCompletion = async (levels) => {
        try {
            const activeUser =
                document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("active_user="))
                    ?.split("=")[1] || "anonymous";

            const decodedUser = decodeURIComponent(activeUser);
            const timestamp = new Date().toISOString();

            const measurementData = {
                taskNumber: "session-completion", // Или другой идентификатор
                elapsedTime: taskElapsedTime,
                levels: {
                    level1: parseInt(levels.level1) || 0,
                    level2: parseInt(levels.level2) || 0,
                    level3: parseInt(levels.level3) || 0,
                    level4: parseInt(levels.level4) || 0,
                    level5: parseInt(levels.level5) || 0,
                },
            };

            const payload = {
                [decodedUser]: {
                    [timestamp]: measurementData,
                },
            };

            const response = await fetch("/api/saveDeltaTest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setShowSessionCompletionPopup(false);
            window.location.href = "https://forms.yandex.ru/u/6891bb8002848f2a56f5e978/";
        } catch (error) {
            console.error("Ошибка при сохранении измерений:", error);
            alert("Произошла ошибка при сохранении измерений");
        }
    };

    const checkFileExists = async (url) => {
        try {
            const response = await fetch(url, { method: "HEAD" });
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    // Загрузка деталей конкретного задания
    const loadTaskDetails = async (task) => {
        try {
            const basePath = `/tasks/${userType}/${who}`;
            setCurrentTask(task);

            // Проверяем, является ли задание третьим
            setShowLevelsInput(task.toolName1 === "Пройти Тестирование");

            if (task.instruction) {
                setIsCheckingFile(true); // Включаем анимацию загрузки
                const potentialUrl = `${basePath}/Instructions/${task.instruction}`;
                const fileExists = await checkFileExists(potentialUrl);
                setIsCheckingFile(false); // Включаем анимацию загрузки
                if (fileExists) {
                    setInstructionFileUrl(potentialUrl);
                } else {
                    setInstructionFileUrl("");
                }
            } else {
                setInstructionFileUrl("");
            }

            if (task.file) {
                setIsCheckingFile(true);
                const potentialUrl = `${basePath}/Files/${task.file}`;
                const fileExists = await checkFileExists(potentialUrl);
                setIsCheckingFile(false);
                if (fileExists) {
                    setTaskFileUrl(potentialUrl);
                } else {
                    setTaskFileUrl("");
                }
            } else {
                setTaskFileUrl("");
            }

            if (task.photo) {
                setCurrentImage(`${basePath}/${task.photo}`);
            } else {
                setCurrentImage("");
            }
        } catch (err) {
            setError(`Ошибка загрузки задания: ${err.message}`);
        }
    };

    function ConfirmationPopup({ title, message, confirmText, onConfirm, onCancel }) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{title || "Подтверждение"}</h3>
                        <button onClick={onCancel} className="square text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="big mb-6">{message}</div>

                    <div className="flex justify-end gap-2">
                        <Button onClick={onCancel} className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200">
                            Отмена
                        </Button>
                        <Button onClick={onConfirm} className="!bg-blue-500 !text-white hover:!bg-blue-600">
                            {confirmText || "Подтвердить"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const showSwitchToWeConfirmation = () => {
        setConfirmationConfig({
            title: 'Переход к разделу "Мы"',
            message: "Вы уверены, что хотите перейти к командной части тренажера?",
            confirmText: "Да, перейти",
            onConfirm: () => {
                setShowConfirmation(false);
                setShowSecondQuestionnaire(true);
                setHasCompletedQuestionnaire(true);
            },
            onCancel: () => {
                setShowConfirmation(false);
                setWho("im");
            },
        });
        setShowConfirmation(true);
    };

    const showCompleteSessionConfirmation = () => {
        setConfirmationConfig({
            title: "Завершение сессии",
            message: 'Подтвердите, что вы завершили прохождение тренажера "МАЯК"',
            confirmText: "Да, завершил(а)",
            onConfirm: () => {
                setShowConfirmation(false);
                setShowSessionCompletionPopup(true);
                //setShowThirdQuestionnaire(true);
            },
            onCancel: () => setShowConfirmation(false),
        });
        setShowConfirmation(true);
    };

    function FirstQuestionnairePopup({ onClose, onSubmit }) {
        const [aiLevel, setAiLevel] = useState(5);
        const [aiUsage, setAiUsage] = useState("");
        const [aiTasks, setAiTasks] = useState("");
        const [selectedTools, setSelectedTools] = useState([]);
        const [desiredSkills, setDesiredSkills] = useState("");
        const [personalGoal, setPersonalGoal] = useState("");

        const toolsList = [
            { category: "Текст", tools: ["ChatGPT", "YandexGPT", "AiStudio", "GigaChat", "Claude", "DeepSeek"] },
            { category: "Аудио", tools: ["Suno", "ElevenLabs", "AiStudio (speech generation)"] },
            { category: "Визуал Статика", tools: ["Midjourney", "Kandinsky", "Recraft", "Leonardo.Ai", "AiStudio (Imagen 4)"] },
            { category: "Визуал Динамика", tools: ["PixelVerse", "Pictory AI", "KlingAi", "AiStudio (Veo)"] },
            { category: "Данные", tools: ["Napkin"] },
            { category: "Интерактив", tools: ["Websim", "Genspark", "Lovable"] },
        ];

        const handleToolToggle = (tool) => {
            setSelectedTools((prev) => (prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]));
        };

        const handleSubmit = () => {
            if (!aiUsage || !desiredSkills) {
                alert("Пожалуйста, заполните обязательные поля");
                return;
            }

            onSubmit({
                aiLevel,
                aiUsage,
                aiTasks: aiUsage.includes("Да") ? aiTasks : "",
                selectedTools,
                desiredSkills,
                personalGoal,
            });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">Анкета №1: Входная диагностика («Точка А»)</h3>
                        <button onClick={onClose} className="square text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Вопрос 1 */}
                        <div>
                            <label className="block mb-2 font-medium">
                                1. Оцените ваш текущий практический уровень владения инструментами ИИ:
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <span className="text-sm w-16">0 (Новичок)</span>
                                <input type="range" min="0" max="10" value={aiLevel} onChange={(e) => setAiLevel(parseInt(e.target.value))} className="w-full" />
                                <span className="text-sm w-24">10 (Эксперт)</span>
                            </div>
                            <div className="text-center mt-2 font-medium">{aiLevel}</div>
                            <p className="text-sm text-gray-500 mt-1">
                                0 = Никогда не пользовался(ась), не знаю, с чего начать.
                                <br />
                                5 = Иногда использую знакомые инструменты для простых задач.
                                <br />
                                10 = Свободно и регулярно применяю разные ИИ-инструменты.
                            </p>
                        </div>

                        {/* Вопрос 2 */}
                        <div>
                            <label className="block mb-2 font-medium">
                                2. Применяете ли вы ИИ в своей текущей работе или учебе?
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                                {["Да, применяю регулярно", "Да, применяю время от времени", "Пробовал(а) несколько раз, но системно не использую", "Нет, не применяю"].map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input type="radio" name="aiUsage" checked={aiUsage === option} onChange={() => setAiUsage(option)} />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Вопрос 3 (условный) */}
                        {aiUsage.includes("Да") && (
                            <div>
                                <label className="block mb-2 font-medium">3. Если применяете, то для решения каких задач?</label>
                                <textarea value={aiTasks} onChange={(e) => setAiTasks(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md h-24" placeholder="Опишите своими словами..." />
                                <p className="text-sm text-gray-500 mt-1">Пример: для написания постов в соцсети, для анализа данных, для создания картинок к презентациям.</p>
                            </div>
                        )}

                        {/* Вопрос 4 */}
                        <div>
                            <label className="block mb-2 font-medium">4. Какими из перечисленных ИИ-инструментов вы уже пользовались хотя бы раз?</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {toolsList.map((category) => (
                                    <div key={category.category} className="border p-3 rounded-lg">
                                        <h4 className="font-medium mb-2">{category.category}:</h4>
                                        <div className="space-y-2">
                                            {category.tools.map((tool) => (
                                                <label key={tool} className="flex items-center gap-2">
                                                    <input type="checkbox" checked={selectedTools.includes(tool)} onChange={() => handleToolToggle(tool)} />
                                                    {tool}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Вопрос 5 */}
                        <div>
                            <label className="block mb-2 font-medium">
                                5. Какие конкретные знания или навыки в области ИИ вы больше всего надеетесь получить на тренажере?
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea value={desiredSkills} onChange={(e) => setDesiredSkills(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md h-24" placeholder="Опишите, что хотите изучить..." required />
                        </div>

                        {/* Вопрос 6 */}
                        <div>
                            <label className="block mb-2 font-medium">6. Что для вас будет наилучшим личным результатом участия в этом тренажере?</label>
                            <textarea value={personalGoal} onChange={(e) => setPersonalGoal(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md h-24" placeholder="Закончите фразу: 'В конце тренинга я хочу...'" />
                            <p className="text-sm text-gray-500 mt-1">Пример: "...побороть страх перед нейросетями", "...найти 2-3 инструмента для своей работы"</p>
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <Button onClick={onClose} className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200">
                                Пропустить
                            </Button>
                            <Button onClick={handleSubmit} className="!bg-blue-500 !text-white hover:!bg-blue-600">
                                Сохранить ответы
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function SecondQuestionnairePopup({ onClose, onSubmit }) {
        const [confidence, setConfidence] = useState(5);
        const [understanding, setUnderstanding] = useState(5);
        const [insight, setInsight] = useState("");

        const handleSubmit = () => {
            if (!insight.trim()) {
                alert('Пожалуйста, заполните поле "Главный вывод"');
                return;
            }
            onSubmit({
                confidence,
                understanding,
                insight,
            });
            onClose();
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">Короткий привал: рефлексия после этапа «Я»</h3>
                        <button onClick={onClose} className="square text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6">
                        <label className="block mb-2 font-medium">Вы отлично поработали индивидуально! Давайте зафиксируем ваши ощущения.</label>

                        {/* Вопрос 1 */}
                        <div>
                            <label className="block mb-2 font-medium">1. Оцените вашу УВЕРЕННОСТЬ в работе с ИИ прямо сейчас, после этапа «Я – Цифровой Эксперт»:</label>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">1 (не уверен)</span>
                                <input type="range" min="1" max="10" value={confidence} onChange={(e) => setConfidence(parseInt(e.target.value))} className="w-full" />
                                <span className="text-sm">10 (очень уверен)</span>
                            </div>
                            <div className="text-center mt-2 font-medium">{confidence}</div>
                        </div>

                        {/* Вопрос 2 */}
                        <div>
                            <label className="block mb-2 font-medium">2. Насколько вы поняли и готовы применять на практике фреймворк «МАЯК ОКО»?</label>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">1 (ничего не понял)</span>
                                <input type="range" min="1" max="10" value={understanding} onChange={(e) => setUnderstanding(parseInt(e.target.value))} className="w-full" />
                                <span className="text-sm">10 (всё ясно)</span>
                            </div>
                            <div className="text-center mt-2 font-medium">{understanding}</div>
                        </div>

                        {/* Вопрос 3 */}
                        <div>
                            <label className="block mb-2 font-medium">3. Ваш главный вывод или «инсайт» о себе на данный момент?</label>
                            <textarea value={insight} onChange={(e) => setInsight(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md h-24" placeholder="Опишите ваш главный вывод..." />
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <Button onClick={onClose} className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200">
                                Пропустить
                            </Button>
                            <Button onClick={handleSubmit} className="!bg-blue-500 !text-white hover:!bg-blue-600">
                                Сохранить ответы
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function ThirdQuestionnairePopup({ onClose, onSubmit }) {
        const [aiLevelNow, setAiLevelNow] = useState(5);
        const [selectedToolsNow, setSelectedToolsNow] = useState([]);
        const [attitudeChange, setAttitudeChange] = useState("");
        const [teamworkConclusion, setTeamworkConclusion] = useState("");
        const [plannedActions, setPlannedActions] = useState("");

        const toolsList = [
            { category: "Текст", tools: ["ChatGPT", "YandexGPT", "AiStudio", "GigaChat", "Claude", "DeepSeek"] },
            { category: "Аудио", tools: ["Suno", "ElevenLabs", "AiStudio (speech generation)"] },
            { category: "Визуал Статика", tools: ["Midjourney", "Kandinsky", "Recraft", "Leonardo.Ai", "AiStudio (Imagen 4)"] },
            { category: "Визуал Динамика", tools: ["PixelVerse", "Pictory AI", "KlingAi", "AiStudio (Veo)"] },
            { category: "Данные", tools: ["Napkin"] },
            { category: "Интерактив", tools: ["Websim", "Genspark", "Lovable"] },
        ];

        const handleToolToggle = (tool) => {
            setSelectedToolsNow((prev) => (prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]));
        };

        const handleSubmit = () => {
            if (!aiLevelNow || !attitudeChange || !plannedActions) {
                alert("Пожалуйста, заполните обязательные поля");
                return;
            }

            onSubmit({
                aiLevelNow,
                selectedToolsNow,
                attitudeChange,
                teamworkConclusion,
                plannedActions,
            });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">Анкета №3: Выходная диагностика («Точка Б»)</h3>
                        <button onClick={onClose} className="square text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Вопрос 1 */}
                        <div>
                            <label className="block mb-2 font-medium">
                                1. Оцените ваш практический уровень владения инструментами ИИ ТЕПЕРЬ:
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <span className="text-sm w-16">0 (Новичок)</span>
                                <input type="range" min="0" max="10" value={aiLevelNow} onChange={(e) => setAiLevelNow(parseInt(e.target.value))} className="w-full" />
                                <span className="text-sm w-24">10 (Эксперт)</span>
                            </div>
                            <div className="text-center mt-2 font-medium">{aiLevelNow}</div>
                            <p className="text-sm text-gray-500 mt-1">
                                0 = Все равно ничего не понятно.
                                <br />
                                5 = Теперь я понимаю, как решать простые рабочие задачи с помощью 2-3 инструментов.
                                <br />
                                10 = Я чувствую себя уверенным пользователем, готовым(ой) применять разные ИИ-инструменты для сложных задач и помогать коллегам.
                            </p>
                        </div>

                        {/* Вопрос 2 */}
                        <div>
                            <label className="block mb-2 font-medium">2. Какими из перечисленных ИИ-инструментов вы ТЕПЕРЬ умеете пользоваться?</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {toolsList.map((category) => (
                                    <div key={category.category} className="border p-3 rounded-lg">
                                        <h4 className="font-medium mb-2">{category.category}:</h4>
                                        <div className="space-y-2">
                                            {category.tools.map((tool) => (
                                                <label key={tool} className="flex items-center gap-2">
                                                    <input type="checkbox" checked={selectedToolsNow.includes(tool)} onChange={() => handleToolToggle(tool)} />
                                                    {tool}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Вопрос 3 */}
                        <div>
                            <label className="block mb-2 font-medium">
                                3. Как изменилось ваше отношение к применению ИИ в вашей работе?
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                                {[
                                    "Кардинально изменилось: я увидел(а) огромный потенциал",
                                    "Дополнилось: я увидел(а) несколько новых полезных сценариев",
                                    "Осталось прежним, но теперь я чувствую себя увереннее",
                                    "Практически не изменилось",
                                ].map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input type="radio" name="attitudeChange" checked={attitudeChange === option} onChange={() => setAttitudeChange(option)} />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Вопрос 4 */}
                        <div>
                            <label className="block mb-2 font-medium">4. Какой главный вывод о командной работе вы сделали за время тренажера?</label>
                            <textarea value={teamworkConclusion} onChange={(e) => setTeamworkConclusion(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md h-24" placeholder="Опишите ваш вывод..." />
                        </div>

                        {/* Вопрос 5 */}
                        <div>
                            <label className="block mb-2 font-medium">
                                5. Какие 1-2 КОНКРЕТНЫХ действия или шага, основанных на опыте «МАЯКа», вы планируете предпринять в своей работе в ближайший месяц?
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={plannedActions}
                                onChange={(e) => setPlannedActions(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md h-24"
                                placeholder="Например: 1. Автоматизирую еженедельный отчет с помощью AiStudio 2. Предложу команде использовать Gamma.app для следующей презентации"
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <p className="text-center italic">Спасибо за вашу работу и рефлексию! Свет вашего «МАЯКа» зажегся. Теперь ваша задача — не дать ему погаснуть. Удачи</p>
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <Button onClick={onClose} className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200">
                                Пропустить
                            </Button>
                            <Button onClick={handleSubmit} className="!bg-blue-500 !text-white hover:!bg-blue-600">
                                Завершить тренажер
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const saveQuestionnaire = async (questionnaireType, data) => {
        try {
            const activeUser =
                document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("active_user="))
                    ?.split("=")[1] || "anonymous";

            const response = await fetch("/api/saveQuestionnaire", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: decodeURIComponent(activeUser),
                    questionnaireType,
                    data,
                }),
            });

            if (!response.ok) throw new Error("Ошибка сохранения");

            if (questionnaireType === "Second") {
                localStorage.setItem("hasCompletedSecondQuestionnaire", "true");
                setHasCompletedSecondQuestionnaire(true);
            }

            return await response.json();
        } catch (error) {
            console.error("Ошибка:", error);
            throw error;
        }
    };

    const saveMeasurements = async () => {
        try {
            // Получаем данные пользователя из cookie
            const activeUser =
                document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("active_user="))
                    ?.split("=")[1] || "anonymous";

            // Декодируем URL-encoded строку
            const decodedUser = decodeURIComponent(activeUser);

            // Текущая временная метка
            const timestamp = new Date().toISOString();

            // Данные для сохранения
            const measurementData = {
                taskNumber: 3,
                elapsedTime: ReadyTaskElapsedTime || taskElapsedTime,
                levels: {
                    level1: parseInt(levels.level1) || 0,
                    level2: parseInt(levels.level2) || 0,
                    level3: parseInt(levels.level3) || 0,
                    level4: parseInt(levels.level4) || 0,
                    level5: parseInt(levels.level5) || 0,
                },
            };

            // Формируем payload в нужном формате
            const payload = {
                [decodedUser]: {
                    [timestamp]: measurementData,
                },
            };

            // Отправляем на сервер
            const response = await fetch("/api/saveDeltaTest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert("Измерения успешно сохранены!");

            return result;
        } catch (error) {
            console.error("Ошибка при сохранении измерений:", error);
            alert("Произошла ошибка при сохранении измерений");
            return { success: false, error: error.message };
        }
    };

    function SessionCompletionPopup({ onClose, onSave }) {
        const [levels, setLevels] = useState({
            level1: "",
            level2: "",
            level3: "",
            level4: "",
            level5: "",
        });

        const handleLevelChange = (level, value) => {
            setLevels((prev) => ({
                ...prev,
                [level]: value,
            }));
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">Завершение сессии</h3>
                        <button onClick={onClose} className="square text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        <p>Пожалуйста, заполните измерения Delta для завершения сессии:</p>

                        <div className="grid grid-cols-2 gap-2">
                            <Input type="number" placeholder="Уровень 1" value={levels.level1} onChange={(e) => handleLevelChange("level1", e.target.value)} />
                            <Input type="number" placeholder="Уровень 2" value={levels.level2} onChange={(e) => handleLevelChange("level2", e.target.value)} />
                            <Input type="number" placeholder="Уровень 3" value={levels.level3} onChange={(e) => handleLevelChange("level3", e.target.value)} />
                            <Input type="number" placeholder="Уровень 4" value={levels.level4} onChange={(e) => handleLevelChange("level4", e.target.value)} />
                            <Input type="number" placeholder="Уровень 5" value={levels.level5} onChange={(e) => handleLevelChange("level5", e.target.value)} />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <Button
                            as="a"
                            href={"https://prompt-mastery-trainer-spo.lovable.app/"}
                            target="_blank"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open("https://prompt-mastery-trainer-spo.lovable.app/", "_blank");
                            }}
                            className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200">
                            Пройти Тестирование
                        </Button>
                        <Button onClick={() => onSave(levels)} className="!bg-blue-500 !text-white hover:!bg-blue-600">
                            Сохранить и завершить
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const handleLevelChange = (level, value) => {
        setLevels((prev) => ({
            ...prev,
            [level]: value,
        }));
    };

    // Переключение на следующее задание
    const nextTask = () => {
        if (currentTaskIndex < tasks.length - 1) {
            const newIndex = currentTaskIndex + 1;
            setCurrentTaskIndex(newIndex);
            loadTaskDetails(tasks[newIndex]);
        }
    };

    // Переключение на предыдущее задание
    const prevTask = () => {
        if (currentTaskIndex > 0) {
            const newIndex = currentTaskIndex - 1;
            setCurrentTaskIndex(newIndex);
            loadTaskDetails(tasks[newIndex]);
        }
    };

    // Обработчики для генерации промтов
    const handleChange = (code, value) => {
        setFields((prev) => ({ ...prev, [code]: value }));
    };

    const handleCopy = (value) => {
        if (!value) return; // Не копировать, если промпт пустой

        navigator.clipboard
            .writeText(value)
            .then(() => {
                setIsCopied(true); // Меняем состояние на "скопировано"
                setTimeout(() => {
                    setIsCopied(false); // Через 2 секунды возвращаем обратно
                }, 2000);
            })
            .catch((err) => {
                console.error("Ошибка при копировании: ", err);
            });
    };

    const handleCloseBuffer = () => {
        setShowBuffer(false);
        setCurrentField(null);
    };

    const handleAddToBuffer = (code) => {
        const fieldValue = fields[code];
        if (!fieldValue || fieldValue.trim() === "") return;

        const newBuffer = { ...buffer };
        if (!newBuffer[code]) {
            newBuffer[code] = [];
        }

        const trimmedValue = fieldValue.trim();
        if (!newBuffer[code].includes(trimmedValue)) {
            const currentBuffer = newBuffer[code];
            const updatedBuffer = [trimmedValue, ...currentBuffer].slice(0, 6);
            newBuffer[code] = updatedBuffer;
            setBuffer(newBuffer);
            setCookie("buffer", JSON.stringify(newBuffer));
        }
    };

    const handleInsertFromBuffer = (text) => {
        if (currentField) {
            handleChange(currentField, text);
        }
        handleCloseBuffer();
    };

    const handleShowBufferForField = (code) => {
        setCurrentField(code);

        if (!buffer[code] || buffer[code].length === 0) {
            const fieldMapping = {
                m: "mission",
                a: "audience",
                y: "role",
                k: "criteria",
                o1: "limitations",
                k2: "context",
                o2: "format",
            };

            const mappedKey = fieldMapping[code];
            if (mappedKey) {
                const typeOptions = contentTypeOptions[type];
                if (typeOptions && typeOptions[mappedKey]) {
                    const options = typeOptions[mappedKey];
                    if (Array.isArray(options) && options.length > 0) {
                        const randomValues = [];
                        const shuffled = [...options].sort(() => 0.5 - Math.random());

                        for (let i = 0; i < Math.min(6, shuffled.length); i++) {
                            randomValues.push(shuffled[i]);
                        }

                        const newBuffer = { ...buffer };
                        newBuffer[code] = randomValues;
                        setBuffer(newBuffer);
                        setCookie("buffer", JSON.stringify(newBuffer));
                    }
                }
            }
        } else {
            const fieldMapping = {
                m: "mission",
                a: "audience",
                y: "role",
                k: "criteria",
                o1: "limitations",
                k2: "context",
                o2: "format",
            };

            const mappedKey = fieldMapping[code];
            if (mappedKey) {
                const typeOptions = contentTypeOptions[type];
                if (typeOptions && typeOptions[mappedKey]) {
                    const options = typeOptions[mappedKey];
                    if (Array.isArray(options) && options.length > 0) {
                        const currentBuffer = buffer[code] || [];
                        const userItemsCount = currentBuffer.length;
                        const remainingSlots = 6 - userItemsCount;

                        if (remainingSlots > 0) {
                            const shuffled = [...options].sort(() => 0.5 - Math.random());
                            const additionalValues = [];

                            for (let i = 0; i < Math.min(remainingSlots, shuffled.length); i++) {
                                if (!currentBuffer.includes(shuffled[i])) {
                                    additionalValues.push(shuffled[i]);
                                }
                            }

                            const combinedBuffer = [...currentBuffer, ...additionalValues];
                            const newBuffer = { ...buffer };
                            newBuffer[code] = combinedBuffer;
                            setBuffer(newBuffer);
                            setCookie("buffer", JSON.stringify(newBuffer));
                        }
                    }
                }
            }
        }

        setShowBuffer(true);
    };

    const handleRandom = (code) => {
        const fieldMapping = {
            m: "mission",
            a: "audience",
            y: "role",
            k: "criteria",
            o1: "limitations",
            k2: "context",
            o2: "format",
        };

        const mappedKey = fieldMapping[code];
        if (!mappedKey) return;

        const typeOptions = contentTypeOptions[type];
        if (!typeOptions || !typeOptions[mappedKey]) return;

        const options = typeOptions[mappedKey];
        if (Array.isArray(options) && options.length > 0) {
            const randomValue = options[Math.floor(Math.random() * options.length)];
            handleChange(code, randomValue);
        }
    };

    const pickOne = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    const cleanupPrompt = (str) => {
        return str
            .replace(/\s{2,}/g, " ")
            .replace(/,\s*,/g, ", ")
            .replace(/\.\s*\./g, ".")
            .trim();
    };

    const createPrompt = () => {
        const values = fields;
        if (!Object.values(values).every((v) => v)) {
            setPrompt('Пожалуйста, заполните все поля (или используйте "кубики").');
            return;
        }

        let draftPrompt = `Представь, что ты ${
            values.y
        }. Твоя миссия — ${values.m.toLowerCase()}. Ты создаешь контент для следующей аудитории: ${values.a.toLowerCase()}. При работе ты должен учитывать такие ограничения: ${values.o1.toLowerCase()}. Готовый результат должен соответствовать следующим критериям: ${values.k.toLowerCase()}. Этот материал будет использоваться в следующем контексте: ${values.k2.toLowerCase()}. Финальное оформление должно быть таким: ${values.o2.toLowerCase()}.`;

        // Чистим итог от лишних пробелов и обновляем состояние
        let finalPrompt = cleanupPrompt(draftPrompt);
        setPrompt(finalPrompt);

        const entry = { date: new Date().toISOString(), type, prompt: finalPrompt };
        const newHist = [entry, ...JSON.parse(localStorage.getItem("history") || "[]")].slice(0, 50);
        localStorage.setItem("history", JSON.stringify(newHist));
        setHistory(newHist);
    };

    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : null;
    };

    const setCookie = (name, value, days = 365) => {
        try {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            const stringValue = value;
            document.cookie = `${name}=${encodeURIComponent(stringValue)}; expires=${expires}; path=/`;
        } catch (error) {
            console.error("Error setting cookie:", error);
        }
    };

    // Проверка токена

    useEffect(() => {
        const completed = localStorage.getItem("hasCompletedQuestionnaire") === "true";
        setHasCompletedQuestionnaire(completed);
    }, []);

    const handleSwitchToWe = () => {
        if (hasCompletedSecondQuestionnaire) {
            setWho("we");
        } else {
            showSwitchToWeConfirmation();
        }
    };

    useEffect(() => {
        async function checkToken() {
            const KeyInCookies = await getKeyFromCookies();
            if (KeyInCookies && CORRECT_TOKENS.includes(KeyInCookies.text)) {
                setIsTokenValid(true);
            } else {
                goTo("settings");
            }
        }
        checkToken();
    }, [goTo]);
    const isCreateDisabled = !Object.values(fields).every((field) => field.trim() !== "");
    if (!isTokenValid) {
        return <div className="hidden"></div>;
    }

    return (
        <>
            <Header>
                <Header.Heading>МАЯК ОКО</Header.Heading>
                <Button icon onClick={() => goTo("history")}>
                    <TimeIcon />
                </Button>
                <Button icon onClick={() => goTo("settings")}>
                    <SettsIcon />
                </Button>
            </Header>

            {showSecondQuestionnaire && (
                <SecondQuestionnairePopup
                    onClose={() => {
                        setShowSecondQuestionnaire(false);
                        setWho("we"); // Переключаем на "Мы" после завершения анкеты
                    }}
                    onSubmit={async (data) => {
                        try {
                            await saveQuestionnaire("Second", data);
                            setWho("we"); // Переключаем на "Мы" после сохранения
                        } catch (error) {
                            console.error("Ошибка сохранения:", error);
                            alert("Произошла ошибка при сохранении. Попробуйте еще раз.");
                        }
                    }}
                />
            )}

            {showThirdQuestionnaire && (
                <ThirdQuestionnairePopup
                    onClose={() => {
                        setShowThirdQuestionnaire(false);
                    }}
                    onSubmit={async (data) => {
                        try {
                            await saveQuestionnaire("Third", data);
                            alert("Данные успешно сохранены");
                            //setShowSessionCompletionPopup(true);
                            goTo("mayakOko");
                        } catch (error) {
                            console.error("Ошибка сохранения:", error);
                            alert("Произошла ошибка при сохранении. Попробуйте еще раз.");
                        }
                    }}
                />
            )}

            {showConfirmation && (
                <ConfirmationPopup title={confirmationConfig.title} message={confirmationConfig.message} confirmText={confirmationConfig.confirmText} onConfirm={confirmationConfig.onConfirm} onCancel={confirmationConfig.onCancel} />
            )}
            {/*
			{showFirstQuestionnaire && (
  <FirstQuestionnairePopup
    onClose={() => setShowFirstQuestionnaire(false)}
    onSubmit={async (data) => {
      try {
        await saveQuestionnaire('First', data);
        alert('Ваши ответы сохранены!');
        setShowFirstQuestionnaire(false);
      } catch (error) {
        alert('Ошибка при сохранении анкеты');
      }
    }}
  />
  
			)}
  */}

            <div className="hero relative">
                {isMobile && (
                    <div className="col-span-12 mb-4">
                        <div className="flex flex-col gap-[1.6rem]">
                            <div className="flex gap-[1.6rem]">
                                <h3 className="w-full">Тренажёр</h3>
                                <div className="flex gap-[0.5rem]">
                                    <Button inverted className="!bg-(--color-red-noise) !text-(--color-red)" onClick={showCompleteSessionConfirmation}>
                                        Завершить&nbsp;сессию
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-[0.5rem]">
                                <Switcher value={userType} onChange={setUserType} className="!w-full">
                                    <span value="student">Студент</span>
                                    <span value="teacher">Преподаватель</span>
                                </Switcher>
                                <Switcher
                                    value={who}
                                    onChange={(value) => {
                                        setWho(value);
                                        if (value === "we") {
                                            handleSwitchToWe();
                                        }
                                    }}
                                    className="!w-full">
                                    <span value="im">Я</span>
                                    <span value="we">Мы</span>
                                </Switcher>
                            </div>
                            <div className="flex flex-col gap-[0.75rem]">
                                <div className="flex flex-col gap-[0.75rem]">
                                    <div className="flex items-center gap-[0.5rem]">
                                        <span className="text-sm text-gray-500">
                                            Задание {currentTaskIndex + 1} из {tasks.length}
                                        </span>
                                    </div>
                                    <div className="flex gap-[0.5rem] square">
                                        <Button className={"square"} onClick={prevTask} disabled={currentTaskIndex === 0}>
                                            ←
                                        </Button>
                                        <Input
                                            type="number"
                                            min="1"
                                            max={tasks.length}
                                            value={currentTaskIndex + 1}
                                            onChange={(e) => {
                                                const newIndex = parseInt(e.target.value) - 1;
                                                if (!isNaN(newIndex) && newIndex >= 0 && newIndex < tasks.length) {
                                                    setCurrentTaskIndex(newIndex);
                                                    loadTaskDetails(tasks[newIndex]);
                                                }
                                            }}
                                            className="text-center"
                                        />
                                        <Button className={"square"} onClick={nextTask} disabled={currentTaskIndex === tasks.length - 1}>
                                            →
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap lg:flex-nowrap gap-[0.5rem] items-center">
                                    <Button className={isTaskRunning ? "!bg-(--color-red-noise) !text-(--color-red)" : "!bg-(--color-green-noise) !text-(--color-green-peace)"} onClick={toggleTaskTimer}>
                                        {isTaskRunning ? `Завершить задание (${formatTaskTime(taskElapsedTime)})` : "Начать задание"}
                                    </Button>

                                    {taskFileUrl && (
                                        <Button
                                            as="a"
                                            href={taskFileUrl}
                                            download
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(taskFileUrl, "_blank");
                                            }}
                                            d>
                                            Доп.материал
                                        </Button>
                                    )}
                                    {instructionFileUrl && (
                                        <Button
                                            as="a"
                                            href={instructionFileUrl}
                                            download
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(instructionFileUrl, "_blank");
                                            }}
                                            d>
                                            Инструкция
                                        </Button>
                                    )}
                                    {currentTask?.toolLink1 && (
                                        <Button
                                            inverted
                                            as="a"
                                            href={currentTask.toolLink1}
                                            target="_blank"
                                            onClick={(e) => {
                                                if (currentTaskIndex + 1 === 1) {
                                                    e.preventDefault();
                                                    setShowFirstQuestionnaire(true);
                                                } else if (currentTaskIndex + 1 === 2) {
                                                    e.preventDefault();
                                                    window.open("https://forms.yandex.ru/u/689197c9eb6146293aca92fa/", "_blank");
                                                } else {
                                                    e.preventDefault();
                                                    window.open(currentTask.toolLink1, "_blank");
                                                }
                                            }}>
                                            {currentTask.toolName1 || "Инструмент"}
                                        </Button>
                                    )}
                                    {currentTask?.toolLink2 && (
                                        <Button
                                            inverted
                                            as="a"
                                            href={currentTask.toolLink2}
                                            target="_blank"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(currentTask.toolLink2, "_blank");
                                            }}>
                                            {currentTask.toolName2 || "Инструмент"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {showLevelsInput && (
                            <div className="flex flex-col gap-[1rem] mt-4">
                                <h4 className="text-lg font-semibold">Измерения Delta</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input type="number" placeholder="Уровень 1" value={levels.level1} onChange={(e) => handleLevelChange("level1", e.target.value)} />
                                    <Input type="number" placeholder="Уровень 2" value={levels.level2} onChange={(e) => handleLevelChange("level2", e.target.value)} />
                                    <Input type="number" placeholder="Уровень 3" value={levels.level3} onChange={(e) => handleLevelChange("level3", e.target.value)} />
                                    <Input type="number" placeholder="Уровень 4" value={levels.level4} onChange={(e) => handleLevelChange("level4", e.target.value)} />
                                    <Input type="number" placeholder="Уровень 5" value={levels.level5} onChange={(e) => handleLevelChange("level5", e.target.value)} />
                                </div>
                                <Button onClick={saveMeasurements} className="!bg-blue-500 !text-white hover:!bg-blue-600">
                                    Сохранить измерения
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                <Block className="col-span-12 lg:col-span-6 !h-full">
                    <form className="flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-[1.25rem]">
                            <div className="flex flex-col gap-[1rem]">
                                <Switcher value={type} onChange={setType} className="!w-full !flex-wrap">
                                    {defaultTypes.map((t) => (
                                        <Switcher.Option key={t.key} value={t.key}>
                                            {t.label}
                                        </Switcher.Option>
                                    ))}
                                </Switcher>
                            </div>
                            <div className="flex flex-col gap-[0.5rem]">
                                <div className="flex justify-between items-center">
                                    <span className="big">Цели и целевая направленность</span>
                                    <Button
                                        icon
                                        type="button"
                                        onClick={handleResetFields}
                                        className="!w-auto !h-auto !p-1 !bg-transparent" // Прозрачный фон
                                        title="Сбросить все поля">
                                        <ResetIcon className="!text-black" /> {/* Черная иконка */}
                                    </Button>
                                </div>
                                {fieldsList.slice(0, 4).map((f) => (
                                    <div key={f.code} className="group flex w-full items-start gap-2">
                                        {isMobile ? (
                                            <>
                                                <div className="flex-1 min-w-0">
                                                    <TextareaAutosize
                                                        minRows={1}
                                                        className="w-full resize-none rounded-lg border border-gray-300 bg-white p-2 text-base text-left" // Добавлено text-left
                                                        placeholder={f.label} // Убедитесь что placeholder передается
                                                        value={fields[f.code]}
                                                        onChange={(e) => handleChange(f.code, e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex flex-shrink-0 items-center gap-2">
                                                    <Button icon type="button" onClick={() => handleShowBufferForField(f.code)}>
                                                        <CopyIcon />
                                                    </Button>
                                                    <Button icon type="button" onClick={() => handleAddToBuffer(f.code)}>
                                                        <Plusicon />
                                                    </Button>
                                                    <Button icon type="button" onClick={() => handleRandom(f.code)}>
                                                        <RandomIcon />
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Input
                                                    className="w-full text-left" // Добавлено text-left
                                                    placeholder={f.label}
                                                    value={fields[f.code]}
                                                    onChange={(e) => handleChange(f.code, e.target.value)}
                                                />
                                                <Button icon className="!hidden group-hover:!flex" onClick={() => handleShowBufferForField(f.code)} type="button">
                                                    <CopyIcon />
                                                </Button>
                                                <Button icon className="!hidden group-hover:!flex" onClick={() => handleAddToBuffer(f.code)} type="button">
                                                    <Plusicon />
                                                </Button>
                                                <Button icon className="!hidden group-hover:!flex" onClick={() => handleRandom(f.code)} type="button">
                                                    <RandomIcon />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-[0.5rem]">
                                <span className="big">Условия реализации и параметры оформления</span>
                                {fieldsList.slice(4).map((f) => (
                                    <div key={f.code} className="group flex w-full items-start gap-2">
                                        {isMobile ? (
                                            <>
                                                <div className="flex-1 min-w-0">
                                                    <TextareaAutosize
                                                        minRows={1}
                                                        className="w-full resize-none rounded-lg border border-gray-300 bg-white p-2 text-base text-left" // Добавлено text-left
                                                        placeholder={f.label}
                                                        value={fields[f.code]}
                                                        onChange={(e) => handleChange(f.code, e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex flex-shrink-0 items-center gap-2">
                                                    <Button icon type="button" onClick={() => handleShowBufferForField(f.code)}>
                                                        <CopyIcon />
                                                    </Button>
                                                    <Button icon type="button" onClick={() => handleAddToBuffer(f.code)}>
                                                        <Plusicon />
                                                    </Button>
                                                    <Button icon type="button" onClick={() => handleRandom(f.code)}>
                                                        <RandomIcon />
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Input
                                                    className="w-full text-left" // Добавлено text-left
                                                    placeholder={f.label}
                                                    value={fields[f.code]}
                                                    onChange={(e) => handleChange(f.code, e.target.value)}
                                                />
                                                <Button icon className="!hidden group-hover:!flex" onClick={() => handleShowBufferForField(f.code)} type="button">
                                                    <CopyIcon />
                                                </Button>
                                                <Button icon className="!hidden group-hover:!flex" onClick={() => handleAddToBuffer(f.code)} type="button">
                                                    <Plusicon />
                                                </Button>
                                                <Button icon className="!hidden group-hover:!flex" onClick={() => handleRandom(f.code)} type="button">
                                                    <RandomIcon />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <span className="block w-full mt-4" title={isCreateDisabled ? "Сначала заполните все поля" : ""}>
                            <Button className="blue w-full" type="button" onClick={createPrompt} disabled={isCreateDisabled}>
                                Создать&nbsp;запрос
                            </Button>
                        </span>
                    </form>
                </Block>

                <div className="flex flex-col justify-between col-span-12 lg:col-span-6 h-full">
                    {!isMobile && (
                        <>
                            <div className="flex flex-col gap-[1.6rem]">
                                <div className="flex gap-[1.6rem]">
                                    <h3 className="w-full">Тренажёр</h3>
                                    <div className="flex gap-[0.5rem]">
                                        <Button inverted className="!bg-(--color-red-noise) !text-(--color-red)" onClick={showCompleteSessionConfirmation}>
                                            Завершить&nbsp;сессию
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex gap-[0.5rem]">
                                    <Switcher value={userType} onChange={setUserType} className="!w-full">
                                        <Switcher.Option value="student">Студент</Switcher.Option>
                                        <Switcher.Option value="teacher">Преподаватель</Switcher.Option>
                                    </Switcher>
                                    <Switcher
                                        value={who}
                                        onChange={(value) => {
                                            setWho(value);
                                            if (value === "we") {
                                                handleSwitchToWe();
                                            }
                                        }}
                                        className="!w-full">
                                        <Switcher.Option value="im">Я</Switcher.Option>
                                        <Switcher.Option value="we">Мы</Switcher.Option>
                                    </Switcher>
                                </div>
                                <div className="flex flex-col gap-[0.75rem]">
                                    <div className="flex flex-col gap-[0.75rem]">
                                        <div className="flex items-center gap-[0.5rem]">
                                            <span className="text-sm text-gray-500">
                                                Задание {currentTaskIndex + 1} из {tasks.length}
                                            </span>
                                        </div>
                                        <div className="flex gap-[0.5rem] square">
                                            <Button className={"square"} onClick={prevTask} disabled={currentTaskIndex === 0}>
                                                ←
                                            </Button>
                                            <Input
                                                type="number"
                                                min="1"
                                                max={tasks.length}
                                                value={currentTaskIndex + 1}
                                                onChange={(e) => {
                                                    const newIndex = parseInt(e.target.value) - 1;
                                                    if (!isNaN(newIndex) && newIndex >= 0 && newIndex < tasks.length) {
                                                        setCurrentTaskIndex(newIndex);
                                                        loadTaskDetails(tasks[newIndex]);
                                                    }
                                                }}
                                                className="text-center"
                                            />
                                            <Button className={"square"} onClick={nextTask} disabled={currentTaskIndex === tasks.length - 1}>
                                                →
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap lg:flex-nowrap gap-[0.5rem] items-center">
                                        <Button className={isTaskRunning ? "!bg-(--color-red-noise) !text-(--color-red)" : "!bg-(--color-green-noise) !text-(--color-green-peace)"} onClick={toggleTaskTimer}>
                                            {isTaskRunning ? `Завершить задание (${formatTaskTime(taskElapsedTime)})` : "Начать задание"}
                                        </Button>

                                        {taskFileUrl && (
                                            <Button
                                                as="a"
                                                href={taskFileUrl}
                                                download
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(taskFileUrl, "_blank");
                                                }}
                                                d>
                                                Доп.материал
                                            </Button>
                                        )}
                                        {instructionFileUrl && (
                                            <Button
                                                as="a"
                                                href={instructionFileUrl}
                                                download
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(instructionFileUrl, "_blank");
                                                }}
                                                d>
                                                Инструкция
                                            </Button>
                                        )}
                                        {currentTask?.toolLink1 && (
                                            <Button
                                                inverted
                                                as="a"
                                                href={currentTask.toolLink1}
                                                target="_blank"
                                                onClick={(e) => {
                                                    // Случай 1: Если это второе задание, показываем анкету.
                                                    if (currentTaskIndex + 1 === 1) {
                                                        e.preventDefault();
                                                        setShowFirstQuestionnaire(true);
                                                    }
                                                    // Случай 2: Если это ТРЕТЬЕ задание, открываем Яндекс.Форму.
                                                    else if (currentTaskIndex + 1 === 2) {
                                                        e.preventDefault();
                                                        window.open("https://forms.yandex.ru/u/689197c9eb6146293aca92fa/", "_blank");
                                                    }
                                                    // Случай 3: Для всех остальных заданий открываем их собственную ссылку в новой вкладке.
                                                    else {
                                                        e.preventDefault();
                                                        window.open(currentTask.toolLink1, "_blank");
                                                    }
                                                }}>
                                                {currentTask.toolName1 || "Инструмент"}
                                            </Button>
                                        )}
                                        {currentTask?.toolLink2 && (
                                            <Button
                                                inverted
                                                as="a"
                                                href={currentTask.toolLink2}
                                                target="_blank"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(currentTask.toolLink2, "_blank");
                                                }}>
                                                {currentTask.toolName2 || "Инструмент"}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                {showLevelsInput && (
                                    <div className="flex flex-col gap-[1rem] mt-4">
                                        <h4 className="text-lg font-semibold">Измерения Delta</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input type="number" placeholder="Уровень 1" value={levels.level1} onChange={(e) => handleLevelChange("level1", e.target.value)} />
                                            <Input type="number" placeholder="Уровень 2" value={levels.level2} onChange={(e) => handleLevelChange("level2", e.target.value)} />
                                            <Input type="number" placeholder="Уровень 3" value={levels.level3} onChange={(e) => handleLevelChange("level3", e.target.value)} />
                                            <Input type="number" placeholder="Уровень 4" value={levels.level4} onChange={(e) => handleLevelChange("level4", e.target.value)} />
                                            <Input type="number" placeholder="Уровень 5" value={levels.level5} onChange={(e) => handleLevelChange("level5", e.target.value)} />
                                        </div>
                                        <Button onClick={saveMeasurements} className="!bg-blue-500 !text-white hover:!bg-blue-600">
                                            Сохранить измерения
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </> // <-- Вставляем это
                    )}

                    <div className="flex flex-col gap-[1rem]">
                        <Block>
                            <h6 className="text-(--color-gray-black)">Ваш промт</h6>
                            <p>{prompt || 'Заполните поля и нажмите "Создать запрос"'}</p>
                        </Block>
                        <div className="flex flex-col gap-[0.5rem]">
                            {isMobile ? (
                                <>
                                    {/* --- Мобильная версия: сначала кнопка, потом ссылки --- */}
                                    <Button onClick={() => handleCopy(prompt)} disabled={!prompt || isCopied || prompt.includes("Пожалуйста, заполните")}>
                                        {isCopied ? "Скопировано!" : "Скопировать"}
                                    </Button>
                                    <div className="flex flex-wrap lg:flex-nowrap gap-[0.5rem]">
                                        {defaultLinks[type] &&
                                            defaultLinks[type].map((service, index) => (
                                                <Button key={index} inverted className="stroke-(--color-gray-black)" onClick={() => window.open(service.url, "_blank")}>
                                                    {service.name} <LinkIcon />
                                                </Button>
                                            ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* --- Десктопная версия: сначала ссылки, потом кнопка (как было) --- */}
                                    <div className="flex flex-col gap-[0.5rem]">
                                        {/* Контейнер со ссылками. На мобильных он будет вторым (order-2), на десктопе - первым (lg:order-1) */}
                                        <div className="flex flex-wrap lg:flex-nowrap gap-[0.5rem] order-2 lg:order-1">
                                            {defaultLinks[type] &&
                                                defaultLinks[type].map((service, index) => (
                                                    <Button key={index} inverted className="stroke-(--color-gray-black)" onClick={() => window.open(service.url, "_blank")}>
                                                        {service.name} <LinkIcon />
                                                    </Button>
                                                ))}
                                        </div>

                                        {/* Кнопка "Скопировать". На мобильных будет первой (order-1), на десктопе - второй (lg:order-2) */}
                                        <Button onClick={() => handleCopy(prompt)} className="order-1 lg:order-2" disabled={!prompt || isCopied}>
                                            {isCopied ? "Скопировано!" : "Скопировать"}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {showBuffer && <Buffer onClose={handleCloseBuffer} onInsert={handleInsertFromBuffer} buffer={buffer} currentField={currentField} />}
            </div>
            {showCompletionPopup && (
                <TaskCompletionPopup
                    taskData={currentTaskData}
                    elapsedTime={ReadyTaskElapsedTime}
                    onClose={() => {
                        setShowCompletionPopup(false);
                        // setIsCopied(false) // <-- Это тоже больше не нужно, т.к. isCopied теперь живет в popup
                    }}
                />
            )}
            {showSessionCompletionPopup && <SessionCompletionPopup onClose={() => setShowSessionCompletionPopup(false)} onSave={handleSaveSessionCompletion} />}
        </>
    );
}

function TaskCompletionPopup({ taskData, onClose, elapsedTime }) {
    const [isCopied, setIsCopied] = useState(false); // Состояние для кнопки

    if (!taskData) return null;

    const formatTaskTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const handleCopyClick = () => {
        const textToCopy = `Задание №${taskData.number}\n\nОписание:\n${taskData.description}\n\nЗадача:\n${taskData.task}\n\nРезультат:\n\n`;

        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch((err) => {
                    console.error("Ошибка копирования:", err);
                    alert("Не удалось скопировать текст.");
                });
        } else {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.top = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error("Ошибка копирования (legacy):", err);
                alert("Не удалось скопировать текст.");
            }
        }
    };
    // Функция с проверкой, которая не вызывает ошибок
    const handleCopy = (value) => {
        if (!value) return;

        // Сначала пробуем современный метод с проверкой
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(value)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch((err) => {
                    console.error("Ошибка при копировании через Clipboard API: ", err);
                    alert("Не удалось скопировать текст. Пожалуйста, сделайте это вручную.");
                });
        } else {
            // Если современный метод недоступен, используем старый надёжный
            try {
                const textArea = document.createElement("textarea");
                textArea.value = value;
                textArea.style.position = "fixed";
                textArea.style.top = "-9999px";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                if (document.execCommand("copy")) {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                }

                document.body.removeChild(textArea);
            } catch (err) {
                console.error("Ошибка при вызове execCommand: ", err);
                alert("Не удалось скопировать текст. Пожалуйста, сделайте это вручную.");
            }
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Задание завершено за {formatTaskTime(elapsedTime)}</h3>
                    <button onClick={onClose} className="square text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <Button onClick={handleCopyClick} className="!py-2 !px-4" disabled={isCopied}>
                        {isCopied ? "Скопировано!" : "Скопировать задание"}
                    </Button>
                    <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-yellow-800">Задание №{taskData.number}</h4>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Описание ситуации:</h4>
                        <p className="whitespace-pre-line">{taskData.description}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Вашей задачей было:</h4>
                        <p className="whitespace-pre-line">{taskData.task}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <Button onClick={onClose} className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200">
                        Закрыть
                    </Button>
                </div>
            </div>
        </div>
    );
}

async function saveToJson({ taskName, minutes, currentTaskIndex, type, userType, who, taskElapsedTime }) {
    try {
        const activeUser =
            document.cookie
                .split("; ")
                .find((row) => row.startsWith("active_user="))
                ?.split("=")[1] || "anonymous";

        const payload = {
            user: decodeURIComponent(activeUser),
            taskName: taskName,
            taskIndex: currentTaskIndex,
            timestamp: new Date().toISOString(),
            timeSpent: minutes,
            secondsSpent: taskElapsedTime,
            completed: true,
            taskDetails: {
                type: type,
                userType: userType,
                who: who,
            },
        };

        const response = await fetch("/api/saveTaskAttempt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error saving task attempt:", error);
        return { success: false, error: error.message };
    }
}
