import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import TransitionWrapper from '@/components/layout/TransitionWrapper';

import IndexPage from '@/components/pages/profile/index';
import SettingsPage from '@/components/pages/profile/settings';
import FolderPage from '@/components/pages/profile/workfolder';

export default function ProfilePage() {
    const [pageKey, setPageKey] = useState("profile")

    const goTo = (pageName) => {
        setPageKey(pageName);
    };

    return (
        <Layout>
            <TransitionWrapper currentKey={pageKey}>
                {pageKey === 'profile' && <IndexPage goTo={goTo} />}
                {pageKey === 'settings' && <SettingsPage goTo={goTo} />}
                {pageKey === 'workfolder' && <FolderPage goTo={goTo} />}
            </TransitionWrapper>
        </Layout>
    )
}