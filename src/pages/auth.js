import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthorized, saveUserData } from '@/utils/auth';

import Notify from '@/assets/general/notify.svg';

import Button from '@/components/ui/Button';
import Switcher from '@/components/ui/Switcher';
import Layout from '@/components/layout/Layout';

import RegStage0 from '@/components/features/auth/reg/Stage0';
import RegStage1 from '@/components/features/auth/reg/Stage1';
import LoginStage0 from '@/components/features/auth/login/Stage0';
import LoginStage1 from '@/components/features/auth/login/Stage1';

import { Header } from '@/components/layout/Header';

const pageVariants = {
    initial: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
    }),
    in: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'circOut' }
    },
    out: (direction) => ({
        x: direction > 0 ? '-100%' : '100%',
        opacity: 0,
        transition: { duration: 0.5, ease: 'circIn' }
    })
};

const headerTitleVariants = {
    initial: { opacity: 0, x: -20, y: -20 },
    animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
};

export default function AuthPage() {
    const [authType, setAuthType] = useState('register');
    const [step, setStep] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (isAuthorized()) router.push('/profile');
      }, []);      

    const getDirection = () => (authType === 'register' ? 1 : -1);

    const handleSaveUserData = (data) => {
        saveUserData(data);
        setStep(1);
    };
      

    const handleNext = (data) => {
        handleSaveUserData(data);
    };
      
    const handleSave = (extraData) => {
        saveUserData(extraData);
    };

    const handleForgotPassword = () => setStep(1);

    const stages = {
        register: [
            <RegStage0 key="reg-0" onContinue={handleNext} pageVariants={pageVariants} custom={getDirection()} />,
            <RegStage1 key="reg-1" pageVariants={pageVariants} custom={getDirection()} />
        ],
        login: [
            <LoginStage0
                key="login-0"
                onLogin={handleNext}
                pageVariants={pageVariants}
                custom={getDirection()}
                onForgotPassword={handleForgotPassword}
            />,
            <LoginStage1
                key="login-1"
                onRecover={handleSave}
                onBack={() => setStep(0)}
                pageVariants={pageVariants}
                custom={getDirection()}
            />
        ]
    };

    return (
        <Layout>
            <Header>
                <Header.Heading className="relative overflow-hidden">
                    Авторизация
                    <span className="text-(--color-gray-white)" style={{font: 'inherit'}}>/</span>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={authType}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={headerTitleVariants}
                        >
                            {authType === 'register' ? 'Регистрация' : 'Вход'}
                        </motion.div>
                    </AnimatePresence>
                </Header.Heading>

                <Switcher
                    value={authType}
                    onChange={(val) => {
                        setAuthType(val);
                        setStep(0);
                    }}
                >
                    <span tabIndex={0} role="button" value="login">Вход</span>
                    <span tabIndex={1} role="button" value="register">Регистрация</span>
                </Switcher>

                <Button icon><Notify /></Button>
            </Header>

            <div className="hero relative overflow-hidden" style={{ placeItems: 'center' }}>
                <AnimatePresence mode="wait" custom={getDirection()}>
                    {stages[authType][step]}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
