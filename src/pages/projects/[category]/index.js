import { useRouter } from "next/router";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import { categories } from "../_categories";

import Card from "@/components/ui/Card";
import Case from "@/components/ui/Case";
import Button from "@/components/ui/Button";

import Index from "@/assets/general/index.svg";
import Notify from '@/assets/general/notify.svg';

export default function CategoryPage() {
    const router = useRouter();
    const { category: url } = router.query;

    // Ждем, пока router будет готов
    if (!router.isReady || !url) return <Layout><div>Загрузка...</div></Layout>;

    const category = categories.find((t) => t.url === url);
    
    // Проверка на существование категории
    if (!category) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты</Header.Heading>
                </Header>
                <div className="hero" style={{ placeItems: 'center' }}>
                    <div className="flex flex-col gap-[1rem] col-start-4 col-end-10">
                        <h1>Категория "{url}" не найдена</h1>
                        <Button big onClick={() => router.push('/projects')}>Вернуться назад</Button>
                    </div>
                 </div>
            </Layout>
        );
    }
    
    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты <span className='text-(--color-gray-black)'>/</span> {category.name}</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content" }}>
                <div className="col-span-12 flex items-start justify-between">
                    <hgroup>
                        <h3>{category.name}</h3>
                        <p className="text-(--color-gray-black)">{category.desc}</p>
                    </hgroup>
                    <Card>
                        <Card.Heading>
                            <h5>Вы выполнили <span className="text-(--color-blue)">4</span> проекта из <span className="text-(--color-blue)">6</span></h5>
                            <div className="w-full rounded-[6.25rem] overflow-hidden bg-(--color-blue-noise) h-[.75rem]">
                                <div className="bg-(--color-blue) h-full" style={{
                                    width: `${4/6 *100}%`
                                }}></div>
                            </div>
                        </Card.Heading>
                        <Card.Footer className="text-(--color-white)">
                            <div className="z-10">Вы в тройке лучших по этой категории</div>
                        </Card.Footer>
                    </Card>
                </div>
                <Case>
                    
                </Case>
            </div>
        </Layout>
    )
}