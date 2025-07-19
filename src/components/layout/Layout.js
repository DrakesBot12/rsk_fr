import dynamic from 'next/dynamic';
import AsideLoader from './Aside/Loader';
const Aside = dynamic(() => import('./Aside/Aside'), { ssr: false, loading: () => <AsideLoader /> });

export default function Layout({ children }) {
    return (
        <div className="root-layout overflow-x-clip">
            <Aside />
            <main>
                { children }
            </main>
        </div>
    )
}