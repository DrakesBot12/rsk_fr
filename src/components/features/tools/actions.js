// app/actions.js
export async function getKeyFromCookies() {
    // В браузере мы работаем с document.cookie напрямую
    const cookieString = document.cookie;
    const cookies = cookieString.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split("=");
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});

    const keyCookie = cookies["activated_key"];

    if (!keyCookie) return null;

    try {
        return JSON.parse(keyCookie);
    } catch {
        return null;
    }
}

export async function addKeyToCookies(text) {
    const newItem = {
        id: Date.now().toString(),
        text,
    };

    // Устанавливаем cookie с максимальным возрастом 30 дней
    const expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);

    document.cookie = `activated_key=${encodeURIComponent(JSON.stringify(newItem))}; ` + `path=/; ` + `expires=${expires.toUTCString()}; ` + `SameSite=Lax`;
}

export async function addUserToCookies(userId, text) {
    const newItem = {
        id: userId,
    };

    // Устанавливаем cookie с максимальным возрастом 30 дней
    const expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);

    document.cookie = `active_user=${JSON.stringify(newItem)}; ` + `path=/; ` + `expires=${expires.toUTCString()}; ` + `SameSite=Lax`;
}
