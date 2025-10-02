import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";
import TransitionWrapper from "@/components/layout/TransitionWrapper";
import { isAuthorized } from "@/utils/auth";

import IndexPage from "@/components/pages/profile/index";
import SettingsPage from "@/components/pages/profile/settings";
import FolderPage from "@/components/pages/profile/workfolder";

export default function ProfilePage() {
    const [pageKey, setPageKey] = useState("profile");
    const router = useRouter();

    const goTo = (pageName) => {
        setPageKey(pageName);
    };

    useEffect(() => {
        if (!isAuthorized()) {
            router.push("/auth");
        }
    }, [router]);

    return (
        <Layout>
            <TransitionWrapper currentKey={pageKey}>
                {pageKey === "profile" && <IndexPage goTo={goTo} />}
                {pageKey === "settings" && <SettingsPage goTo={goTo} />}
                {pageKey === "workfolder" && <FolderPage goTo={goTo} />}
            </TransitionWrapper>
        </Layout>
    );
}
