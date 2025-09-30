import { useRouter } from "next/router";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import { categories } from "../../_categories";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import Index from "@/assets/general/index.svg";
import Notify from '@/assets/general/notify.svg';
import Link from "next/link";

export default function ProjectPage() {
    const router = useRouter();
    const { category: url, project: projectUrl } = router.query;

    // Ждем, пока router будет готов
    if (!router.isReady || !url) return <Layout><div>Загрузка...</div></Layout>;

    const category = categories.find((t) => t.url === url);
    const project = category.levels[0].find((t) => t.url === projectUrl);

    if (!project) {
        return (
            <Layout>
                <Header>
                    <Header.Heading>Проекты</Header.Heading>
                </Header>
                <div className="hero" style={{ placeItems: 'center' }}>
                    <div className="flex flex-col gap-[1rem] col-start-4 col-end-10">
                        <h1>Проект &quot{projectUrl}&quot не найдена</h1>
                        <Button big onClick={() => router.push(`/projects/${url}`)}>Вернуться назад</Button>
                    </div>
                 </div>
            </Layout>
        );
    }
    
    return (
        <Layout>
            <Header>
                <Header.Heading>Проекты <span className='text-(--color-gray-black)'>/</span> {category.name} <span className='text-(--color-gray-black)'>/</span> {project.name}</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ gridTemplateRows: "max-content" }}>
                
            </div>
        </Layout>
    )
}