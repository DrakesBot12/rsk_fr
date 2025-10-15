import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { userId, ...formData } = req.body;

        // Валидация
        const validRoles = ["director", "department_head", "methodist", "teacher", "other"];
        if (!validRoles.includes(formData.roleCode)) {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        // Сохранение в файл
        const filePath = path.join(process.cwd(), "data", "testirovanie.json");
        let data = {};

        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        }

        if (!data[userId]) data[userId] = {};
        data[userId][new Date().toISOString()] = formData;

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error saving questionnaire:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
