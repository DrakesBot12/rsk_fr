export default async function RegHandler(req, res) {
    try {
        const response = await fetch("https://api.rosdk.ru/teams/teams/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.cookie || "",
            },
            body: JSON.stringify({
                name: req.body.name.toString(),
                direction: "Другое",
                city: "city",
                region: req.body.region.toString(),
                organization_name: req.body.organization_name.toString(),
            }),
            cache: "no-store",
        });

        const data = await response.json();

        console.log("data", data);

        if (!response.ok) {
            return res.json({ success: false, data });
        }

        // возвращаем клиенту
        return res.json({ success: true, data });
    } catch (err) {
        console.log("error", err.message);
        return res.json({ success: false, error: err.message }, { status: 500 });
    }
}
