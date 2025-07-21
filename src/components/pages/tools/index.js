import { useState, useEffect } from 'react';

import { Header } from "@/components/layout/Header";

import Buffer from './addons/popup';

import LinkIcon from '@/assets/general/link.svg';
import CopyIcon from '@/assets/general/copy.svg';
import TimeIcon from '@/assets/general/time.svg';
import Plusicon from '@/assets/general/plus.svg';
import SettsIcon from '@/assets/general/setts.svg';
import RandomIcon from '@/assets/general/random.svg';

import Input from '@/components/ui/Input/Input';
import Button from "@/components/ui/Button";
import { Switcher, Option } from '@/components/ui/Switcher';

export default function IndexPage({ goTo }) {
    const fieldsList = [
        { code: 'm', label: 'М - Миссия' },
        { code: 'a', label: 'А - Аудитория' },
        { code: 'y', label: 'Я - Роль' },
        { code: 'k', label: 'К - Критерии' },
        { code: 'o1', label: 'О - Ограничения' },
        { code: 'k2', label: 'К - Контекст' },
        { code: 'o2', label: 'О - Оформление' }
    ];

    const defaultTypes = [
        { key: 'text', label: 'Текст' },
        { key: 'audio', label: 'Аудио' },
        { key: 'visual', label: 'Визуал' },
        { key: 'interactive', label: 'Интерактив' },
        { key: 'data', label: 'Данные' }
    ];
    const defaultLinks = {
        text: [
            { name: 'WebSim', url: 'https://websim.ai' },
            { name: 'DeepSeek', url: 'https://chat.deepseek.com' },
            { name: 'PerplexityAI', url: 'https://perplexity.ai' }
        ],
        audio: [
            { name: 'WebSim', url: 'https://websim.ai' },
            { name: 'DeepSeek', url: 'https://chat.deepseek.com' },
            { name: 'Suno', url: 'https://suno.com/invite/@3321616' },
            { name: 'CharacterAI', url: 'https://character.ai' },
            { name: 'Yescribe', url: 'https://yescribe.ai' }
        ],
        visual: [
            { name: 'WebSim', url: 'https://websim.ai' },
            { name: 'DeepSeek', url: 'https://chat.deepseek.com' },
            { name: 'Pixverse', url: 'https://pixverse.ai' },
            { name: 'Renderforest', url: 'https://www.renderforest.com/' },
            { name: 'Hedra', url: 'https://www.hedra.com/' }
        ],
        interactive: [
            { name: 'WebSim', url: 'https://websim.ai' },
            { name: 'DeepSeek', url: 'https://chat.deepseek.com' },
            { name: 'Gamma', url: 'https://gamma.app/signup?r=4va8xcqw91qowwp' }
        ],
        data: [
            { name: 'Qwen', url: 'https://chat.qwen.ai/' },
            { name: 'WebSim', url: 'https://websim.ai' },
            { name: 'DeepSeek', url: 'https://chat.deepseek.com' }
        ]
    };

    // Синонимы для более живой генерации
    const synonyms = {
        imagine: ["Представь, что ты", "Вообрази себя в роли", "Допустим, что ты сейчас —", "Поставь себя на место"],
        isKnown: ["и ты известен тем, что отлично справляешься с", "который славится мастерством в", "известный своими умениями в области", "чьим главным преимуществом является"],
        needTo: ["Теперь тебе необходимо", "Твоя задача —", "Требуется", "Следует"],
        forAudience: ["для аудитории", "с учётом интересов целевой группы", "чтобы охватить сегмент", "желая донести идею до"],
        withLimit: ["учитывая следующие ограничения:", "при этом помня о таких условиях:", "не забывая о правилах:", "соблюдая важные требования:"],
        inContext: ["и использовать это в контексте", "для дальнейшего применения в", "чтобы внедрить это в", "с прицелом на"],
        finalFormat: ["оформи всё в виде", "представь окончательный результат как", "заверши работу форматом", "приведи к формату"],
    };

    // Базовые наборы для каждого типа контента
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
        visual: {
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

    const [type, setType] = useState('text');
    const [visualType, setVisualType] = useState('visual-static');
    const [fields, setFields] = useState({
        m: '', a: '', y: '', k: '', o1: '', k2: '', o2: ''
    });
    const [prompt, setPrompt] = useState('');
    const [buffer, setBuffer] = useState({});
    const [history, setHistory] = useState([]);
    const [showBuffer, setShowBuffer] = useState(false);
    const [currentField, setCurrentField] = useState(null);

    useEffect(() => {
        // Читаем буфер из cookie
        const buf = getCookie('buffer');
        if (buf) {
            try {
                setBuffer(JSON.parse(buf));
            } catch { setBuffer({}); }
        }
        // Читаем историю из cookie
        const hist = getCookie('history');
        if (hist) {
            try {
                setHistory(JSON.parse(hist));
            } catch { setHistory([]); }
        }
    }, []);

    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    function setCookie(name, value, days = 365) {
        const expires = new Date(Date.now() + days*864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

    function handleChange(code, value) {
        setFields(prev => ({ ...prev, [code]: value }));
    }

    function handleCopy(value) {
        navigator.clipboard.writeText(value).catch(() => {});
    }

    function handleCloseBuffer() {
        setShowBuffer(false);
        setCurrentField(null);
    }

    function handleAddToBuffer(code) {
        const fieldValue = fields[code];
        if (!fieldValue || fieldValue.trim() === '') return;
        
        const newBuffer = { ...buffer };
        if (!newBuffer[code]) {
            newBuffer[code] = [];
        }
        
        const trimmedValue = fieldValue.trim();
        
        // Проверяем, есть ли уже такое значение
        if (!newBuffer[code].includes(trimmedValue)) {
            // Добавляем пользовательский элемент в начало
            const currentBuffer = newBuffer[code];
            const updatedBuffer = [trimmedValue, ...currentBuffer].slice(0, 6);
            newBuffer[code] = updatedBuffer;
            setBuffer(newBuffer);
            setCookie('buffer', JSON.stringify(newBuffer));
        }
    }

    function handleInsertFromBuffer(text) {
        if (currentField) {
            handleChange(currentField, text);
        }
        handleCloseBuffer();
    }

    function handleShowBufferForField(code) {
        setCurrentField(code);
        
        // Если буфер для этого поля пустой, генерируем случайные значения
        if (!buffer[code] || buffer[code].length === 0) {
            const fieldMapping = {
                'm': 'mission',
                'a': 'audience', 
                'y': 'role',
                'k': 'criteria',
                'o1': 'limitations',
                'k2': 'context',
                'o2': 'format'
            };
            
            const mappedKey = fieldMapping[code];
            if (mappedKey) {
                const typeOptions = contentTypeOptions[type];
                if (typeOptions && typeOptions[mappedKey]) {
                    const options = typeOptions[mappedKey];
                    if (Array.isArray(options) && options.length > 0) {
                        // Генерируем 6 случайных значений
                        const randomValues = [];
                        const shuffled = [...options].sort(() => 0.5 - Math.random());
                        
                        for (let i = 0; i < Math.min(6, shuffled.length); i++) {
                            randomValues.push(shuffled[i]);
                        }
                        
                        // Сохраняем в буфер
                        const newBuffer = { ...buffer };
                        newBuffer[code] = randomValues;
                        setBuffer(newBuffer);
                        setCookie('buffer', JSON.stringify(newBuffer));
                    }
                }
            }
        } else {
            // Если в буфере есть пользовательские элементы, дополняем стандартными
            const fieldMapping = {
                'm': 'mission',
                'a': 'audience', 
                'y': 'role',
                'k': 'criteria',
                'o1': 'limitations',
                'k2': 'context',
                'o2': 'format'
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
                            // Генерируем дополнительные стандартные значения
                            const shuffled = [...options].sort(() => 0.5 - Math.random());
                            const additionalValues = [];
                            
                            for (let i = 0; i < Math.min(remainingSlots, shuffled.length); i++) {
                                // Проверяем, что значение не дублируется с пользовательскими
                                if (!currentBuffer.includes(shuffled[i])) {
                                    additionalValues.push(shuffled[i]);
                                }
                            }
                            
                            // Пользовательские элементы остаются в начале, стандартные дополняют
                            const combinedBuffer = [...currentBuffer, ...additionalValues];
                            
                            // Сохраняем обновленный буфер
                            const newBuffer = { ...buffer };
                            newBuffer[code] = combinedBuffer;
                            setBuffer(newBuffer);
                            setCookie('buffer', JSON.stringify(newBuffer));
                        }
                    }
                }
            }
        }
        
        setShowBuffer(true);
    }

    function handleRandom(code) {
        // Маппинг кодов полей на ключи в contentTypeOptions
        const fieldMapping = {
            'm': 'mission',
            'a': 'audience', 
            'y': 'role',
            'k': 'criteria',
            'o1': 'limitations',
            'k2': 'context',
            'o2': 'format'
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
    }

    // Утилита для выбора случайного элемента
    function pickOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Убирает двойные пробелы, повторные запятые и т. д.
    function cleanupPrompt(str) {
        return str
            .replace(/\s{2,}/g, " ")
            .replace(/,\s*,/g, ", ")
            .replace(/\.\s*\./g, ".")
            .trim();
    }

    function createPrompt() {
        const values = fields;
        if (!Object.values(values).every((v) => v)) {
            setPrompt('Пожалуйста, заполните все поля (или используйте "кубики").');
            return;
        }

        // Случайные фрагменты
        let phraseImagine = pickOne(synonyms.imagine);
        let phraseIsKnown = pickOne(synonyms.isKnown);
        let phraseNeedTo = pickOne(synonyms.needTo);
        let phraseForAudience = pickOne(synonyms.forAudience);
        let phraseWithLimit = pickOne(synonyms.withLimit);
        let phraseInContext = pickOne(synonyms.inContext);
        let phraseFinalFormat = pickOne(synonyms.finalFormat);

        // Черновая сборка
        let draftPrompt = `
          ${phraseImagine} ${values.y.toLowerCase()} ${phraseIsKnown} ${values.k.toLowerCase()}. 
          ${phraseNeedTo} ${values.m.toLowerCase()} 
          ${phraseForAudience} ${values.a.toLowerCase()}, 
          ${phraseWithLimit} ${values.o1.toLowerCase()}, 
          ${phraseInContext} ${values.k2.toLowerCase()}, 
          ${phraseFinalFormat} ${values.o2.toLowerCase()}.
        `;

        // Чистим итог
        let finalPrompt = cleanupPrompt(draftPrompt);
        setPrompt(finalPrompt);
        
        // Запись в историю
        const entry = { date: new Date().toISOString(), type, prompt: finalPrompt };
        const newHist = [entry, ...history];
        setHistory(newHist);
        setCookie('history', JSON.stringify(newHist));
    }

    return (
        <>
            <Header>
                <Header.Heading>МАЯК ОКО</Header.Heading>
                <Button icon onClick={() => goTo('history')}><TimeIcon /></Button>
                <Button icon onClick={() => goTo('settings')}><SettsIcon /></Button>
            </Header>

            <div className='hero relative'>
                <div className="block-wrapper col-span-6 !h-full">
                    <form className="flex flex-col h-full justify-between" onSubmit={e => e.preventDefault()}>
                        <div className="flex flex-col gap-[1.25rem]">
                            <div className="flex flex-col gap-[0.5rem]">
                                <span className="link big">Цели и целевая направленность</span>
                                {fieldsList.slice(0, 4).map(f => (
                                    <div key={f.code} className="group flex w-full gap-[0.5rem]">
                                        <Input className="w-full" placeholder={f.label}
                                            value={fields[f.code]} onChange={e => handleChange(f.code, e.target.value)} />
                                        <Button icon className="!hidden group-hover:!flex" onClick={() => handleShowBufferForField(f.code)}><CopyIcon /></Button>
                                        <Button icon className="!hidden group-hover:!flex" onClick={() => handleAddToBuffer(f.code)}><Plusicon /></Button>
                                        <Button icon className="!hidden group-hover:!flex" onClick={() => handleRandom(f.code)}><RandomIcon /></Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-[0.5rem]">
                                <span className="link big">Условия реализации и параметры оформления</span>
                                {fieldsList.slice(4).map(f => (
                                    <div key={f.code} className="group flex w-full gap-[0.5rem]">
                                        <Input className="w-full" placeholder={f.label}
                                            value={fields[f.code]} onChange={e => handleChange(f.code, e.target.value)} />
                                        <Button icon className="!hidden group-hover:!flex" onClick={() => handleShowBufferForField(f.code)}><CopyIcon /></Button>
                                        <Button icon className="!hidden group-hover:!flex" onClick={() => handleAddToBuffer(f.code)}><Plusicon /></Button>
                                        <Button icon className="!hidden group-hover:!flex" onClick={() => handleRandom(f.code)}><RandomIcon /></Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button className="blue" type="button" onClick={createPrompt}>Создать&nbsp;запрос</Button>
                    </form>
                </div>

                <div className="flex flex-col justify-between col-span-6 h-full">
                    <div className="flex flex-col gap-[1rem]">
                        <Button inverted onClick={() => goTo('trainer')}>Открыть тренажер</Button>
                        <div className="flex flex-col gap-[0.5rem]">
                            <Switcher value={type} onChange={setType} className='!w-full'>
                                {defaultTypes.map(t => {
                                    const label = t.label || t.key;
                                    return (
                                        <Option key={t.key} value={t.key}>
                                            {label.charAt(0).toUpperCase() + label.slice(1)}
                                        </Option>
                                    );
                                })}
                            </Switcher>
                            <Switcher value={visualType} onChange={setVisualType} className={`!w-full ${type === 'visual' ? 'flex' : '!hidden'}`}>
                                <Option value="visual-static">Статика</Option>
                                <Option value="visual-dynamic">Динамика</Option>
                            </Switcher>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[1rem]'>
                        <div className='block-wrapper col-span-4'>
                            <h6 className='text-(--color-gray-black)'>Ваш промт</h6>
                            <p>{prompt || 'Заполните поля и нажмите "Создать запрос"'}</p>
                        </div>

                        <div className='flex flex-col gap-[0.5rem]'>
                            <div className='flex gap-[0.5rem]'>
                                {defaultLinks[type] && defaultLinks[type].map((service, index) => (
                                    <Button 
                                        key={index}
                                        inverted 
                                        className="stroke-(--color-gray-black)" 
                                        onClick={() => window.open(service.url, '_blank')}
                                    >
                                        {service.name} <LinkIcon />
                                    </Button>
                                ))}
                            </div>
                            <Button onClick={() => handleCopy(prompt)}>Скопировать</Button>
                        </div>
                    </div>
                </div>

                {showBuffer && <Buffer 
                    onClose={handleCloseBuffer}
                    onInsert={handleInsertFromBuffer}
                    buffer={buffer}
                    currentField={currentField}
                />}
            </div>
        </>
    )
}
