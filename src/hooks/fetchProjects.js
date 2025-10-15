import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_NAMES = {
    KNOWLEDGE: "Знания и навыки",
    INTERACTION: "Взаимодействие",
    ENVIRONMENT: "Окружающая среда",
    PROTECTION: "Защита",
    DATA: "Данные",
    AUTOMATION: "Автоматизация",
};

const CATEGORY_DESCRIPTIONS = {
    KNOWLEDGE: "Развитие цифровых и профессиональных умений студентов и преподавателей",
    INTERACTION: "Улучшение коммуникации и collaboration внутри колледжа",
    ENVIRONMENT: "Создание комфортной и технологичной образовательной среды",
    PROTECTION: "Обеспечение безопасности и защита данных",
    DATA: "Работа с данными и аналитика",
    AUTOMATION: "Автоматизация процессов и рутинных задач",
};

export function useProjects(org_name = undefined) {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = useCallback(
        async (orgName) => {
            try {
                if (orgName !== null && orgName !== undefined) {
                    setLoading(true);
                    const response = await fetch(`/api/projects/all/${orgName}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                    });

                    if (!response.ok) {
                        if ([401, 403].includes(response.status)) {
                            router.push("/auth");
                            return;
                        }
                        throw new Error("Не удалось получить проекты");
                    }

                    const result = await response.json();
                    if (result.success) setCategories(result.data);
                    else throw new Error(result.error || "Ошибка загрузки проектов");
                } else {
                    throw new Error("Ошибка получения организации");
                }
            } catch (err) {
                console.error("Projects fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        [router]
    ); // 👈 теперь функция стабильна

    return { loading, categories, error, fetchProjects };
}
