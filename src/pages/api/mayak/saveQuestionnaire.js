// pages/api/saveQuestionnaire.js

import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { userId, questionnaireType, data } = req.body;

        if (!userId || !questionnaireType || !data) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Путь к файлу с данными
        const dataFilePath = path.join(process.cwd(), "data", "questionnaires.json");

        // Читаем существующие данные или создаем пустой объект
        let allData = {};
        if (fs.existsSync(dataFilePath)) {
            const fileContent = fs.readFileSync(dataFilePath, "utf8");
            allData = JSON.parse(fileContent);
        }

        // Создаем или обновляем запись пользователя
        if (!allData[userId]) {
            allData[userId] = {};
        }

        // Для ThirdQuestionnaire добавляем дополнительную метку завершения
        if (questionnaireType === "ThirdQuestionnaire") {
            allData[userId]["isTrainingCompleted"] = true;
        }

        // Добавляем/обновляем данные анкеты
        allData[userId][questionnaireType] = {
            Time: new Date().toISOString(),
            ...data,
        };

        // Сохраняем обновленные данные
        fs.writeFileSync(dataFilePath, JSON.stringify(allData, null, 2));

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error saving questionnaire:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
