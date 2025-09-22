import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <style>{`
                    .mobile {
                        display: none;
                    }
                    @media (max-width: 900px) {
                        .desktop {
                            display: none;
                        }
                        .mobile {
                            display: flex;
                        }
                    }
                `}</style>
            </Head>
            <body>
                <div className="desktop">
                    <Main />
                    <NextScript />
                </div>
                <div className="mobile flex flex-col w-full h-screen justify-center items-center gap-[8px]">
                    <h3 className="w-full text-center">Упс...</h3>
                    <p className="w-full text-center">Версия для телефонов пока отсутствует. Для доступа к сайту используйте ПК</p>
                </div>
            </body>
        </Html>
    );
}
