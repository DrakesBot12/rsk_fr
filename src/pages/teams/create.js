import { useState } from "react";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea";
import Switcher from "@/components/ui/Switcher";

import Notify from '@/assets/general/notify.svg';

export default function Createteam() {
    const [teamType, setTeamType] = useState('teacher') // student

    return (
        <Layout>
            <Header></Header>
            <div className="hero"></div>
        </Layout>
    )
}