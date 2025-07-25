import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Notify from '@/assets/general/notify.svg';
import Zapret from  "@/assets/general/zapret.svg";
import NeZapret from  "@/assets/general/neZapret.svg";


export default function Home() {
    return (
        <Layout>
            <Header>
                <Header.Heading>Преподаватели</Header.Heading>
            </Header>
            <div className="hero">
                <div>
                    <div className="h-full aspect-square rounded-full bg-(--color-gray-plus-50)"></div>
                    <span className="link">Ожидают подтверждения</span>
                </div>
                <div>
                    <div className="кратинка"></div>
                    <div>
                        <div className="h-full aspect-square rounded-full"></div>
                        <span className="link small"></span>
                    </div>
                    <div>
                        <Button className="inverted">Отклонить <Zapret/></Button>
                        <Button className="inverted">Подтвердить <NeZapret/></Button>
                        <Button className="inverted">Открыть</Button>
                    </div>

                </div>

            </div>
        </Layout>)}