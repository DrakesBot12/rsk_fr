import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginStage1({ 
    onRecover, 
    onBack,
    pageVariants,
    custom = 1 
}) {
    const [email, setEmail] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else {
            setIsDisabled(false);
            clearTimeout(timerRef.current);
        }
        return () => clearTimeout(timerRef.current);
    }, [timer]);

    // Обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isDisabled) return;
        setIsDisabled(true);

        onRecover(email);
        setTimer(300);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div 
            key="login-stage1"
            custom={custom}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="auth_cntr col-span-4 absolute w-full"
        >
            <div className="flex flex-col items-center gap-[0.5rem]">
                <h3>Восстановление пароля</h3>
                <p className='text-(--color-gray-black) text-center'>
                    Мы направим вам письмо с ссылкой для восстановление доступа к аккаунту. Письмо можно отправить раз в 5 минут
                </p>
            </div>
            <form id="recovery" onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-[0.75rem]">
                <Input 
                    type="email" 
                    placeholder="Почта" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <Button 
                    type="submit" 
                    className="w-full justify-center"
                    disabled={isDisabled}
                >
                    Восстановить пароль{isDisabled && ` (${formatTime(timer)})`}
                </Button>
            </form>
        </motion.div>
    );
} 