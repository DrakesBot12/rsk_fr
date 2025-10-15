import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
    try {
        const { userId } = req.query;
        const filePath = path.join(process.cwd(), "data", "results.json");
        const fileContents = await fs.readFile(filePath, "utf8");
        const jsonData = JSON.parse(fileContents);

        if (userId) {
            // Находим пользователя по ID
            for (const group in jsonData) {
                if (jsonData[group][userId]) {
                    return res.status(200).json({
                        ...jsonData[group][userId],
                        group: group,
                    });
                }
            }
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(jsonData);
    } catch (error) {
        console.error("Error reading results:", error);
        res.status(500).json({ error: "Error reading results" });
    }
}
