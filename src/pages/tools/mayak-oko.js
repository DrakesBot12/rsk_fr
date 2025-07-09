import { useState } from 'react';

import TransitionWrapper from '@/components/layout/TransitionWrapper';

import Layout from '@/components/layout/Layout';
import IndexPage from '@/components/pages/tools';
import TrainerPage from '@/components/pages/tools/trainer';
import HistoryPage from '@/components/pages/tools/history';
import SettingsPage from '@/components/pages/tools/settings';

export default function MayakOkoPage() {
    const [ pageKey, setPageKey ] = useState("mayakOko")

    const goTo = (pageName) => {
        setPageKey(pageName);
    };

    return (
        <Layout>
            <TransitionWrapper currentKey={pageKey}>
                {pageKey === 'mayakOko' && <IndexPage goTo={goTo} />}
                {pageKey === 'trainer' && <TrainerPage goTo={goTo} />}
                {pageKey === 'settings' && <SettingsPage goTo={goTo} />}
                {pageKey === 'history' && <HistoryPage goTo={goTo} />}
            </TransitionWrapper>
        </Layout>

    )
}