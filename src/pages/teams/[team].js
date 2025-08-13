import { useState } from "react";

import Layout from "@/components/layout/Layout";

import TeamIndexPage from "@/components/pages/teams";
import TeamWorkfolderPage from "@/components/pages/teams/folder";
import TeamSettsPage from "@/components/pages/teams/settings";

import TransitionWrapper from "@/components/layout/TransitionWrapper";

export default function TeamPage() {
    const [pageKey, setPageKey] = useState('index');

    const goTo = (pageName) => {
        setPageKey(pageName);
    };

    return (
        <Layout>
            <TransitionWrapper currentKey={pageKey}>
                {pageKey === 'index' && <TeamIndexPage goTo={goTo} />}
                {pageKey === 'workfolder' && <TeamWorkfolderPage goTo={goTo} />}
                {pageKey === 'settings' && <TeamSettsPage goTo={goTo} />}
            </TransitionWrapper>
        </Layout>
    );
}