import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Проверяем, что код выполняется в браузере
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    // Используем новый безопасный метод
    media.addEventListener('change', listener);

    // Функция очистки для удаления слушателя
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}