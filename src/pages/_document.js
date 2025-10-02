// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document(props) {
    return (
        <Html lang="ru">
            <Head>
                <style>{`
                    .mobile {
                        display: none;
                    }
                    @media (max-width: 900px) {
                        body:not([data-pathname^="/tools"]) .desktop {
                            display: none;
                        }
                        body:not([data-pathname^="/tools"]) .mobile {
                            display: flex;
                            padding: 40px;
                        }
                    }
                `}</style>
            </Head>
            <body data-pathname={props.__NEXT_DATA__?.page || ""}>
                <div className="desktop">
                    <Main />
                    <NextScript />
                </div>
                <div className="mobile flex flex-col w-full h-screen justify-center items-center gap-[8px]">
                    <h3 className="w-full text-center">Упс...</h3>
                    <p className="w-full text-center">Мобильная версия пока недоступна. Используйте ПК для сайта, но инструменты МАЯК ОКО и тренажер доступны.</p>
                    <Link href="/tools/mayak-oko" className="button bg-black text-white">
                        Тренажер
                    </Link>
                </div>
            </body>
        </Html>
    );
}
