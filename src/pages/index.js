import Image from 'next/image';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';

import Button from '@/components/ui/Button';

import Notify from '@/assets/general/notify.svg';

export default function Home() {
    return (
        <Layout>
            <Header>
                <Header.Heading>Российское Содружество Колледжей</Header.Heading>
                <Button icon><Notify /></Button>
            </Header>
            <div className="hero overflow-hidden" style={{ placeItems: "center" }}>
                <div className="flex flex-col h-full col-span-6">
                    <div className="flex flex-col w-full gap-[1rem] h-full">
                        <h2 className="w-[80%]">Начните цифровую трансформацию своего колледжа</h2>
                        <p className="w-[60%] text-(--color-gray-white)">Произведите цифровую трансформацию своего колледжа на уровень 4.0 уже сегодня вместе с РСК и нашей платформой</p>
                    </div>
                    <div className="flex w-full gap-[0.75rem]">
                        <Button className="justify-center flex-1 !rounded-[6.25rem]"> Начать трансформацию</Button>
                        <Button inverted roundeful className="justify-center flex-1"> Подробнее</Button>
                    </div>
                </div>
                <div className="col-span-6">
                    <Image priority={true} src="/images/main.svg" alt="main img" className="w-full" width={520} height={320} />
                </div>
            </div>
        </Layout>
    )
}