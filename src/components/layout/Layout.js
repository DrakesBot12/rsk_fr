import Aside from './Aside';

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