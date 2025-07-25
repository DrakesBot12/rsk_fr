import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input/Input";
import Search from "@/assets/general/search.svg";
import Case from "@/components/ui/Case";
import { useState } from "react";


export default function Home() {
    const [caseType, setCaseType] = useState('all'); 
    return (
        <Layout>
            <Header>
                <Header.Heading>Команды <span className='text-(--color-gray-black)'>/</span> Список</Header.Heading>
            </Header>
            <div className="hero">
                <div>
                    <Input type="search" id="searchTeam" name="searchTeam" autoComplete="family-name" placeholder="Введите Название команды"/>
                    <Button><Search/></Button>
                    <Button>Создать команду</Button>
                    <Button>Параметры поиска</Button>
                </div>
                <Case value={caseType} onChange={setCaseType}></Case>
            </div>
        </Layout>
        )
    }