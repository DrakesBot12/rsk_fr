export default async function RegHandler(req, res) {
    try {
        console.log("Require: ", req.body);
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

        if (!response.ok) {
            return res.json({ success: false, data });
        }

        // возвращаем клиенту
        return res.json({ success: true, data });
    } catch (err) {
        return res.json({ success: false, error: err.message }, { status: 500 });
    }
}
