import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const newData = req.body;
        const filePath = path.join(process.cwd(), "data", "DeltaTest.json");

        // Ensure data directory exists
        const dirPath = path.join(process.cwd(), "data");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        // Initialize existing data
        let existingData = {};

        // Read existing data if file exists and is not empty
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8").trim();
            if (fileContent) {
                try {
                    existingData = JSON.parse(fileContent);
                    // Ensure existingData is an object
                    if (typeof existingData !== "object" || existingData === null) {
                        existingData = {};
                    }
                } catch (parseError) {
                    console.error("Error parsing existing data, initializing new object:", parseError);
                    existingData = {};
                }
            }
        }

        // Merge new data
        const userKey = Object.keys(newData)[0];
        const timestampKey = Object.keys(newData[userKey])[0];

        if (!existingData[userKey]) {
            existingData[userKey] = {};
        }

        existingData[userKey][timestampKey] = newData[userKey][timestampKey];

        // Save updated data
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error saving Delta test:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}
