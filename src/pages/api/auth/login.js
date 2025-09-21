export default async function RegHandler(req, res) {
    try {
        const response = await fetch("https://api.rosdk.ru/auth/users_interaction/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json", "accept": "application/json" },
            body: JSON.stringify({
                password: req.body.password,
                name: req.body.name,
            }),
            cache: "no-store",
            credentials: "include"
        });

        const setCookie = response.headers.get("set-cookie");

        if (setCookie) {
          res.setHeader("Set-Cookie", setCookie);
        }

        const data = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 422:
                    return res.status(422).json({ success: false, error: JSON.stringify(data) });
                case 400:
                    return res.status(400).json({ success: false, error: "Пользователь с таким именем уже существует"})
                case 401:
                    return res.status(401).json({ success: false, error: "Пользователь не найден" });
                case 403:
                    return res.status(403).json({ success: false, error: "Доступ запрещён" });
                case 404:
                    return res.status(404).json({ success: false, error: "Ресурс не найден" });
                default:
                    return res.status(response.status).json({ success: false, error: data });
            }
        } else console.log(response)

        return res.json({ success: true, data });
    } catch (err) {
        return res.json({ success: false, error: err.message }, { status: 500 });
    }
};