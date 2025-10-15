import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
    try {
        const filePath = path.join(process.cwd(), "data", "results.json");
        const fileData = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(fileData);

        //console.log('File content:', fileData)

        // Подсчет всех записей для всех токенов
        let totalCount = 0;
        for (const token in data) {
            totalCount += Object.keys(data[token]).length;
        }

        // Или для конкретного токена (если нужно)
        // const token = req.query.token // если хотите передавать токен
        // const tokenCount = data[token] ? Object.keys(data[token]).length : 0
        //console.log('allgood')
        res.status(200).json({ count: totalCount + 2 });
    } catch (error) {
        if (error.code === "ENOENT") {
            // Файл не существует, возвращаем 0
            //console.log('mmaamamamamam200')
            return res.status(200).json({ count: 0 + 2 });
        }
        //console.log('mmaamamamamam500')
        console.error("Error reading result.json:", error);
        res.status(500).json({ error: "Failed to read results" });
    }
}
