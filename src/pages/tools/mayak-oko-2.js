import { useState } from "react";

import TransitionWrapper from "@/components/layout/TransitionWrapper";

import Layout from "@/components/layout/Layout";
import IndexPage from "@/components/features/tools-2";
import TrainerPage from "@/components/features/tools-2/trainer";
import HistoryPage from "@/components/features/tools-2/history";
import SettingsPage from "@/components/features/tools-2/settings";
import AdminPage from "@/components/features/tools-2/admin";

export default function Home() {
    const [pageKey, setPageKey] = useState("mayakOko");

    const goTo = (pageName) => {
        setPageKey(pageName);
    };

    return (
        <Layout>
            <TransitionWrapper currentKey={pageKey}>
                {pageKey === "mayakOko" && <IndexPage goTo={goTo} />}
                {pageKey === "trainer" && <TrainerPage goTo={goTo} />}
                {pageKey === "settings" && <SettingsPage goTo={goTo} />}
                {pageKey === "history" && <HistoryPage goTo={goTo} />}
                {pageKey === "admin" && <AdminPage goTo={goTo} />}
            </TransitionWrapper>
        </Layout>
    );
}
