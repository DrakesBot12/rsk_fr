export default async function getOrg(req, res) {
    try {
        const token = req.cookies.users_access_token;
        if (!token) {
            return res.status(401).json({ success: false, error: "No token provided" });
        }

        let list = [];
        let offset = 0;
        const limit = 50;
        const maxItems = 600;
        let more = true;

        while (more && list.length < maxItems) {
            const response_info = await fetch(`https://api.rosdk.ru/users/profile_interaction/get_orgs/?skip=${offset}&limit=${limit}`, {
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

            const data = await response_info.json();

            if (!data.organizations || data.organizations.length === 0) {
                break;
            }

            const orgNames = data.organizations.map((org) => org.name);
            list = [...list, ...orgNames]; // Используем spread-оператор для добавления элементов в плоский массив

            // если пришло меньше лимита — значит это последняя страница
            if (data.organizations.length < limit) {
                more = false;
            } else {
                offset += limit; // сдвиг для следующей страницы
            }
        }
        return res.json({ success: true, list });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
