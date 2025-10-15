import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { key, userId, data } = req.body;

    // Путь к файлу данных (сохраняем в корень проекта)
    const filePath = path.join(process.cwd(), "data", "results.json");

    try {
        // Создаем папку data, если её нет
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        // Читаем или создаем файл
        let allData = {};
        if (fs.existsSync(filePath)) {
            allData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }

        // Добавляем данные
        if (!allData[key]) allData[key] = {};
        allData[key][userId] = data;

        // Сохраняем
        fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Ошибка сохранения:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
}
