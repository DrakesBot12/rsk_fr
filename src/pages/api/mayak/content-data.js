import fs from "fs/promises";
import path from "path";

// Определяем путь к нашему файлу с данными
const dataFilePath = path.join(process.cwd(), "data", "mayakData.json");

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            // Читаем данные из файла и отправляем клиенту
            const fileContents = await fs.readFile(dataFilePath, "utf8");
            const data = JSON.parse(fileContents);
            res.status(200).json(data);
        } else if (req.method === "POST") {
            // Получаем новые данные от админ-панели
            const newData = req.body;

            // Преобразуем в красивый JSON-формат и записываем обратно в файл
            const jsonData = JSON.stringify(newData, null, 2); // null, 2 для красивого форматирования
            await fs.writeFile(dataFilePath, jsonData, "utf8");

            res.status(200).json({ message: "Данные успешно сохранены" });
        } else {
            // Обрабатываем другие методы
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера", error: error.message });
    }
}
