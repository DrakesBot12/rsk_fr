import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useProfile() {
    const [data, setData] = useState("");
    const router = useRouter();

    const clearCookies = useCallback(() => {
        document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
    }, []);

    const fetchProfile = useCallback(async () => {
        try {
            const response = await fetch("/api/profile/info", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    clearCookies();
                    router.push("/auth");
                    return;
                }
                throw new Error("Failed to fetch profile");
            }

            const dataRes = await response.json();
            setData(dataRes.data);
            console.log("dataRes", dataRes);
        } catch (err) {
            console.error("Request error:", err);
        }
    }, [router, clearCookies]); // зависимости

    return { data, fetchProfile };
}
