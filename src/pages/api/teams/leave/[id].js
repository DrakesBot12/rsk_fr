export default async function LeaveTeam(req, res) {
    try {
        const token = req.cookies.users_access_token;
        if (!token) {
            return res.status(401).json({ success: false, error: "No token provided" });
        }

        const response_info = await fetch(`https://api.rosdk.ru/teams/teams/leave_team/${req.query.id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Cookie: req.headers.cookie || "",
            },
        });

        if (!response_info.ok) {
            return res.status(response_info.status).json({
                success: false,
                error: "Failed to fetch profile",
            });
        }

        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
