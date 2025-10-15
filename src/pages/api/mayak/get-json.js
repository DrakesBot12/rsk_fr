import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
    try {
        const { file = "teacher/im" } = req.query;

        const filePath = path.join(process.cwd(), "public", "tasks", file, "index.json");
        const fileContents = await fs.readFile(filePath, "utf8");
        const jsonData = JSON.parse(fileContents);

        res.status(200).json(jsonData);
    } catch (error) {
        console.error("Error reading file:", error);
        res.status(500).json({ error: "Error reading file" });
    }
}
