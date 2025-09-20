import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import TransitionWrapper from '@/components/layout/TransitionWrapper';

import OrganIndexPage from '@/components/pages/organizations';
import OrganMembersPage from '@/components/pages/organizations/members';

export default function ProfilePage() {
    const [pageKey, setPageKey] = useState("organ")

    const goTo = (pageName) => {
        setPageKey(pageName);
    };

    return (
        <Layout>
            <TransitionWrapper currentKey={pageKey}>
                {pageKey === 'organ' && <OrganIndexPage goTo={goTo} />}
                {pageKey === 'members' && <OrganMembersPage goTo={goTo} />}
            </TransitionWrapper>
        </Layout>
    )
}