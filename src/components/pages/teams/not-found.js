import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Notify from '@/assets/general/notify.svg';

export default function TeamNotFound({ goTo }) {
    return (
        <>
            <Header>
                <Header.Heading>Команды <span className='text-(--color-gray-black)'>/</span> Команда не найдена</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero" style={{ placeItems: 'center' }}>
                <div className="flex flex-col gap-[1rem] col-start-4 col-end-10">
                    <h1>Команда не найдена!</h1>
                    <Button big onClick={() => router.push('/teams')}>Вернуться назад</Button>
                </div>
            </div>
        </>
    );
}