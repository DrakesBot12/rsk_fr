import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
    try {
        const { userId } = req.query;
        const filePath = path.join(process.cwd(), "data", "DeltaTest.json");
        const fileContents = await fs.readFile(filePath, "utf8");
        const jsonData = JSON.parse(fileContents);

        if (userId) {
            // Находим тесты пользователя
            for (const userKey in jsonData) {
                if (userKey.includes(userId)) {
                    return res.status(200).json(jsonData[userKey]);
                }
            }
            return res.status(404).json({ error: "Delta tests not found" });
        }

        res.status(200).json(jsonData);
    } catch (error) {
        console.error("Error reading delta tests:", error);
        res.status(500).json({ error: "Error reading delta tests" });
    }
}
