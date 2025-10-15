export default async function getProjectTask(req, res) {
    try {
        const token = req.cookies.users_access_token;
        if (!token) {
            return res.status(401).json({ success: false, error: "No token provided" });
        }

        const response_info = await fetch(`https://api.rosdk.ru/projects/zvezda/tasks/${req.query.id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Cookie: req.headers.cookie || "",
            },
        });

        if (!response_info.ok) {
            return res.status(response_info.status).json({
                success: false,
                error: "Failed to fetch project",
            });
        }

        const data = await response_info.json();

        return res.json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
