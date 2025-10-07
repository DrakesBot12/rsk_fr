"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from "docx";

export default function AdminPanel() {
    const [selectedUser, setSelectedUser] = useState("");
    const [userOptions, setUserOptions] = useState([]);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [newItem, setNewItem] = useState({
        file: "",
        instruction: "",
        toolLink1: "",
        toolName1: "",
        photo: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [currentFile, setCurrentFile] = useState("teacher/im");
    const router = useRouter();

    const ADMIN_PASSWORD = "eto_mambl_mambastic_da_mambl_fantastic_yee";

    useEffect(() => {
        if (isAuthenticated) {
            loadUserOptions();
        }
    }, [isAuthenticated]);

    const loadUserOptions = async () => {
        try {
            const res = await fetch("/api/mayak/get-results");
            const data = await res.json();

            const options = [];
            for (const group in data) {
                for (const userId in data[group]) {
                    const user = data[group][userId];
                    options.push({
                        id: userId,
                        label: `${user.userData.lastName} ${user.userData.firstName}`,
                        group: group,
                    });
                }
            }

            setUserOptions(options);
        } catch (error) {
            console.error("Error loading user options:", error);
            alert("Ошибка загрузки списка пользователей");
        }
    };

    const generateReport = async () => {
        if (!selectedUser) {
            alert("Пожалуйста, выберите пользователя");
            return;
        }

        setIsGeneratingReport(true);

        try {
            // Находим полные данные пользователя (включая searchKey)
            const userData = userOptions.find((u) => u.id === selectedUser);
            if (!userData) {
                throw new Error("Данные пользователя не найдены");
            }

            // Загружаем все данные пользователя
            const [results, questionnaires, tasksData, deltaTests] = await Promise.all([
                fetch(`/api/get-results?userId=${selectedUser}`).then((res) => res.json()),
                fetch(`/api/get-questionnaires?userId=${encodeURIComponent(selectedUser)}`).then((res) => res.json()),
                fetch(`/api/get-attempts?userId=${encodeURIComponent(selectedUser)}`).then((res) => res.json()),
                fetch(`/api/get-delta-tests?userId=${encodeURIComponent(selectedUser)}`).then((res) => res.json()),
            ]);

            // Находим данные анкет для выбранного пользователя
            const userQuestionnaires = questionnaires;
            if (!userQuestionnaires) {
                throw new Error("Анкетные данные не найдены");
            }

            // Обработка дельта-тестов
            console.log(deltaTests);
            const processDeltaTests = (deltaData) => {
                if (!deltaData || typeof deltaData !== "object") return null;

                // Получаем все записи дельта-тестов (теперь deltaData уже для конкретного пользователя)
                const allEntries = [];

                // Перебираем все временные метки
                for (const timestamp in deltaData) {
                    if (deltaData.hasOwnProperty(timestamp)) {
                        const testData = deltaData[timestamp];

                        // Пропускаем записи о завершении сессии
                        if (testData.levels) {
                            allEntries.push({
                                timestamp: new Date(timestamp),
                                data: testData,
                            });
                        }
                    }
                }

                // Если нет подходящих записей
                if (allEntries.length === 0) return null;

                // Сортируем по дате (новые сначала)

                // Берем последние 2 измерения
                const lastTwo = allEntries.slice(-2);

                // Формируем результаты
                const deltaResults = {};
                const levels = ["level1", "level2", "level3", "level4", "level5"];

                if (lastTwo.length === 2) {
                    // Есть два измерения - считаем разницу
                    const first = lastTwo[1].data.levels || {};
                    const second = lastTwo[0].data.levels || {};

                    levels.forEach((level) => {
                        deltaResults[level] = {
                            first: first[level] !== undefined ? first[level] : null,
                            second: second[level] !== undefined ? second[level] : null,
                            delta: second[level] !== undefined && first[level] !== undefined ? second[level] - first[level] : null,
                        };
                    });
                } else {
                    // Только одно измерение
                    const single = lastTwo[0].data.levels || {};
                    levels.forEach((level) => {
                        deltaResults[level] = {
                            first: null,
                            second: single[level] !== undefined ? single[level] : null,
                            delta: null,
                        };
                    });
                }

                return {
                    dates: lastTwo.map((entry) => entry.timestamp.toLocaleDateString()),
                    results: deltaResults,
                };
            };

            const deltaTestResults = processDeltaTests(deltaTests[selectedUser] || deltaTests);

            const processTasksData = (tasksData) => {
                if (!tasksData || typeof tasksData !== "object") return [];

                const userTasks = tasksData[selectedUser] || tasksData;
                if (!userTasks.tasks) return [];

                const tasksList = [];

                for (const taskName in userTasks.tasks) {
                    const task = userTasks.tasks[taskName];
                    if (task.attempts && task.attempts.length > 0) {
                        const lastAttempt = task.attempts[task.attempts.length - 1];
                        tasksList.push({
                            name: taskName,
                            completed: lastAttempt.completed,
                            timestamp: new Date(lastAttempt.timestamp).toLocaleString(),
                            timeSpent: lastAttempt.secondsSpent,
                            type: lastAttempt.taskDetails?.type || "Не указан",
                            userType: lastAttempt.taskDetails?.userType || "Не указан",
                            stage: lastAttempt.taskDetails?.who === "im" ? "Я" : lastAttempt.taskDetails?.who === "we" ? "Мы" : "Не указан",
                        });
                    }
                }

                return tasksList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            };

            const userTasks = processTasksData(tasksData);

            // Формируем документ
            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            // Заголовок
                            new Paragraph({
                                text: "ПРОФАЙЛ УЧАСТНИКА ТРЕНАЖЕРА «МАЯК»",
                                heading: HeadingLevel.HEADING_1,
                                spacing: { after: 200 },
                            }),

                            // Основная информация
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `ФИО участника: ${results.userData.lastName} ${results.userData.firstName}`,
                                        bold: true,
                                    }),
                                ],
                            }),
                            new Paragraph({
                                text: `Организация: ${results.userData.college || "Не указана"}`,
                            }),
                            new Paragraph({
                                text: `Дата прохождения: ${new Date().toLocaleDateString()}`,
                            }),

                            // Анкеты
                            new Paragraph({
                                text: "Анкета №1: Входная диагностика («Точка А»)",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 400, after: 200 },
                            }),
                            new Paragraph({
                                text: `1. Текущий уровень владения ИИ: ${userQuestionnaires.First.aiLevel}/10`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `2. Применение ИИ в работе/учебе: ${userQuestionnaires.First.aiUsage}`,
                                spacing: { after: 100 },
                            }),
                            userQuestionnaires.First.aiTasks &&
                                new Paragraph({
                                    text: `3. Задачи, решаемые с помощью ИИ: ${userQuestionnaires.First.aiTasks}`,
                                    spacing: { after: 100 },
                                }),
                            new Paragraph({
                                text: `4. Используемые инструменты: ${userQuestionnaires.First.selectedTools.join(", ")}`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `5. Желаемые навыки: ${userQuestionnaires.First.desiredSkills}`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `6. Личные цели: ${userQuestionnaires.First.personalGoal}`,
                                spacing: { after: 200 },
                            }),

                            // Вторая анкета
                            new Paragraph({
                                text: "Анкета №2: Промежуточная (между этапами «Я» и «Мы»)",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 400, after: 200 },
                            }),
                            new Paragraph({
                                text: `1. Уверенность в работе с ИИ: ${userQuestionnaires.Second.confidence}/10`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `2. Понимание фреймворка «МАЯК ОКО»: ${userQuestionnaires.Second.understanding}/10`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `3. Главный инсайт: ${userQuestionnaires.Second.insight}`,
                                spacing: { after: 200 },
                            }),

                            // Третья анкета
                            new Paragraph({
                                text: "Анкета №3: Выходная диагностика («Точка Б»)",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 400, after: 200 },
                            }),
                            new Paragraph({
                                text: `1. Текущий уровень владения ИИ: ${userQuestionnaires.Third.aiLevelNow}/10`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `2. Освоенные инструменты: ${userQuestionnaires.Third.selectedToolsNow.join(", ")}`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `3. Изменение отношения к ИИ: ${userQuestionnaires.Third.attitudeChange}`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `4. Вывод о командной работе: ${userQuestionnaires.Third.teamworkConclusion}`,
                                spacing: { after: 100 },
                            }),
                            new Paragraph({
                                text: `5. Планируемые действия: ${userQuestionnaires.Third.plannedActions}`,
                                spacing: { after: 200 },
                            }),

                            // Дельта-тесты
                            new Paragraph({
                                text: "ЭТАП I: «Я – ЦИФРОВОЙ ЭКСПЕРТ»",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 400, after: 200 },
                            }),
                            new Paragraph({
                                text: "Дельта",
                                bold: true,
                            }),

                            // Таблица с результатами дельта-тестов
                            deltaTestResults
                                ? new Table({
                                      rows: [
                                          // Заголовок таблицы
                                          new TableRow({
                                              children: [
                                                  new TableCell({ children: [new Paragraph("Уровень")] }),
                                                  new TableCell({ children: [new Paragraph("Первое измерение")] }),
                                                  new TableCell({ children: [new Paragraph("Второе измерение")] }),
                                                  new TableCell({ children: [new Paragraph("Дельта")] }),
                                              ],
                                          }),
                                          // Строки с данными
                                          ...Object.entries(deltaTestResults.results).map(
                                              ([level, data]) =>
                                                  new TableRow({
                                                      children: [
                                                          new TableCell({ children: [new Paragraph(level.replace("level", "Уровень "))] }),
                                                          new TableCell({ children: [new Paragraph(data.first !== null ? data.first.toString() : "-")] }),
                                                          new TableCell({ children: [new Paragraph(data.second !== null ? data.second.toString() : "-")] }),
                                                          new TableCell({
                                                              children: [
                                                                  new Paragraph({
                                                                      text: data.delta !== null ? data.delta.toString() : "-",
                                                                      color: data.delta > 0 ? "00FF00" : data.delta < 0 ? "FF0000" : undefined,
                                                                  }),
                                                              ],
                                                          }),
                                                      ],
                                                  })
                                          ),
                                      ],
                                  })
                                : new Paragraph({
                                      text: "Данные дельта-тестов отсутствуют",
                                      italics: true,
                                  }),

                            // Задания
                            new Paragraph({
                                text: "Выполненные задания",
                                heading: HeadingLevel.HEADING_2,
                                spacing: { before: 400, after: 200 },
                            }),
                            userTasks.length > 0
                                ? new Table({
                                      rows: [
                                          // Заголовок таблицы
                                          new TableRow({
                                              children: [
                                                  new TableCell({ children: [new Paragraph("Название")] }),
                                                  new TableCell({ children: [new Paragraph("Тип")] }),
                                                  new TableCell({ children: [new Paragraph("Этап")] }),
                                                  new TableCell({ children: [new Paragraph("Роль")] }),
                                                  new TableCell({ children: [new Paragraph("Статус")] }),
                                                  new TableCell({ children: [new Paragraph("Время")] }),
                                                  new TableCell({ children: [new Paragraph("Дата")] }),
                                              ],
                                          }),
                                          // Строки с заданиями
                                          ...userTasks.map(
                                              (task) =>
                                                  new TableRow({
                                                      children: [
                                                          new TableCell({ children: [new Paragraph(task.name)] }),
                                                          new TableCell({ children: [new Paragraph(task.type)] }),
                                                          new TableCell({ children: [new Paragraph(task.stage)] }),
                                                          new TableCell({ children: [new Paragraph(task.userType === "teacher" ? "Преподаватель" : "Студент")] }),
                                                          new TableCell({
                                                              children: [
                                                                  new Paragraph({
                                                                      text: task.completed ? "Выполнено" : "Не выполнено",
                                                                      color: task.completed ? "00FF00" : "FF0000",
                                                                  }),
                                                              ],
                                                          }),
                                                          new TableCell({ children: [new Paragraph(`${task.timeSpent} сек.`)] }),
                                                          new TableCell({ children: [new Paragraph(task.timestamp)] }),
                                                      ],
                                                  })
                                          ),
                                      ],
                                      width: {
                                          size: 100,
                                          type: WidthType.PERCENTAGE,
                                      },
                                      columnWidths: [20, 10, 10, 15, 10, 10, 25],
                                  })
                                : new Paragraph({
                                      text: "Нет данных о выполненных заданиях",
                                      italics: true,
                                  }),

                            // ... остальные разделы отчета ...
                        ],
                    },
                ],
            });

            // Генерируем и скачиваем файл
            Packer.toBlob(doc).then((blob) => {
                saveAs(blob, `report_${selectedUser}.docx`);
            });
        } catch (error) {
            console.error("Error generating report:", error);
            alert("Ошибка генерации отчета");
        } finally {
            setIsGeneratingReport(false);
        }
    };

    const fileOptions = [
        { value: "teacher/im", label: "Преподаватель - Я" },
        { value: "teacher/we", label: "Преподаватель - Мы" },
        { value: "student/im", label: "Студент - Я" },
        { value: "student/we", label: "Студент - Мы" },
    ];

    useEffect(() => {
        const savedAuth = localStorage.getItem("admin-authenticated");
        if (savedAuth === "true") {
            setIsAuthenticated(true);
            fetchData();
        }
    }, [fetchData]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`/api/mayak/get-json?file=${currentFile}`);
            const jsonData = await res.json();
            setData(jsonData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Ошибка загрузки данных");
            setIsLoading(false);
        }
    }, [currentFile]); // тут зависимости: только currentFile

    const handleFileChange = (e) => {
        setCurrentFile(e.target.value);
        setIsLoading(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem("admin-authenticated", "true");
            fetchData();
        } else {
            alert("Неверный пароль");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("admin-authenticated");
        router.push("/");
    };

    const handleEdit = (index) => {
        setCurrentEditIndex(index);
        setIsEditing(true);
        setNewItem(data[index]);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentEditIndex(null);
        setNewItem({
            file: "",
            instruction: "",
            toolLink1: "",
            toolName1: "",
            photo: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            let updatedData;
            if (currentEditIndex !== null) {
                updatedData = [...data];
                updatedData[currentEditIndex] = newItem;
            } else {
                updatedData = [...data, newItem];
            }

            const res = await fetch("/api/mayak/update-json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: updatedData,
                    file: currentFile,
                }),
            });

            if (res.ok) {
                setData(updatedData);
                alert("Данные успешно сохранены!");
                handleCancel();
            } else {
                throw new Error("Ошибка сохранения");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Ошибка при сохранении данных");
        }
    };

    const handleDeleteClick = (index) => {
        setItemToDelete(index);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const updatedData = data.filter((_, i) => i !== itemToDelete);

            const res = await fetch("/api/mayak/update-json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: updatedData,
                    file: currentFile,
                }),
            });

            if (res.ok) {
                setData(updatedData);
                alert("Элемент успешно удален!");
            } else {
                throw new Error("Ошибка удаления");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Ошибка при удалении элемента");
        } finally {
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h3 className="text-2xl font-bold text-center mb-6">Вход в админ-панель</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Пароль
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-wrapper  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-2xl font-semibold">Загрузка данных...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            {/* Модальное окно подтверждения удаления */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Подтверждение удаления</h3>
                        <p className="mb-6">Вы уверены, что хотите удалить это задание? Это действие нельзя отменить.</p>
                        <div className="flex justify-end space-x-3">
                            <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">
                                Отмена
                            </button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800">Панель администратора</h3>
                    <button onClick={handleLogout} className="square !bg-blue-500 !text-white hover:!bg-blue-600">
                        Выйти
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Генерация отчетов</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Выберите пользователя:</label>
                            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Выберите пользователя --</option>
                                {userOptions.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.label} ({user.group})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button onClick={generateReport} disabled={isGeneratingReport || !selectedUser} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:bg-gray-400">
                                {isGeneratingReport ? "Генерация..." : "Скачать отчет"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="file-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Выберите файл для редактирования:
                    </label>
                    <select id="file-select" value={currentFile} onChange={handleFileChange} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        {fileOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-700">{isEditing ? (currentEditIndex !== null ? "Редактирование элемента" : "Добавление нового элемента") : "Список заданий"}</h3>
                        {!isEditing && (
                            <button onClick={() => setIsEditing(true)} className="square px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                Добавить новый
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Файл</label>
                                    <input
                                        type="text"
                                        name="file"
                                        value={newItem.file}
                                        onChange={handleChange}
                                        className="input-wrapper w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Например: 1.pdf"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Инструкция</label>
                                    <input
                                        type="text"
                                        name="instruction"
                                        value={newItem.instruction}
                                        onChange={handleChange}
                                        className="input-wrapper w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Например: 1.pdf"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ссылка на инструмент</label>
                                    <input
                                        type="text"
                                        name="toolLink1"
                                        value={newItem.toolLink1}
                                        onChange={handleChange}
                                        className="input-wrapper w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Например: https://example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Название инструмента</label>
                                    <input
                                        type="text"
                                        name="toolName1"
                                        value={newItem.toolName1}
                                        onChange={handleChange}
                                        className="input-wrapper w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Например: DeepSeek"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
                                <input
                                    type="text"
                                    name="photo"
                                    value={newItem.photo}
                                    onChange={handleChange}
                                    className="input-wrapper w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Например: 1.png"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">
                                    Отмена
                                </button>
                                <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Файл</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Инструкция</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Инструмент</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Фото</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.file || "-"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.instruction || "-"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.toolName1 ? (
                                                    <a href={item.toolLink1} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                        {item.toolName1}
                                                    </a>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.photo || "-"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => handleEdit(index)} className="square !bg-blue-500 !text-white hover:!bg-blue-900 mr-3 mb-4">
                                                    Изменить
                                                </button>
                                                <button onClick={() => handleDeleteClick(index)} className="square !bg-red-500 !text-white hover:!bg-red-900">
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
