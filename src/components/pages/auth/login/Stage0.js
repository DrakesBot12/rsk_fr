import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import Yandex from '@/assets/general/yandex.svg';
import VK from '@/assets/general/vk.svg';

export default function LoginStage0({ 
    onLogin, 
    onForgotPassword,
    pageVariants,
    custom = 1 
}) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // Обработка изменения инпутов
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(form);
    };

    return (
        <motion.div 
            key="login-stage0"
            custom={custom}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="auth_cntr col-span-4 absolute w-full"
        >
            <h3>С возвращением!</h3>
            <form 
                id="login" 
                className="w-full grid grid-cols-1 grid-rows-2 gap-[0.75rem]" 
                autoComplete='on'
                onSubmit={handleSubmit}
            >
                <Input 
                    type="text" 
                    name="login" 
                    placeholder="Логин" 
                    autoComplete='username'
                    required 
                    value={form.login}
                    onChange={handleChange} 
                />
                <Input 
                    type="password" 
                    name="password" 
                    autoComplete="current-password"
                    placeholder="Пароль" 
                    required 
                    value={form.password}
                    onChange={handleChange} 
                />
            </form>
            <div className='flex flex-col w-full gap-[0.75rem]'>
                <Button type="submit" form="login" className="w-full justify-center">Войти</Button>
                <div className="flex gap-[0.75rem] w-full">
                    <Button inverted>Яндекс ID <Yandex /></Button>
                    <Button inverted>ВК ID <VK /></Button>
                </div>
                <span 
                    onClick={onForgotPassword} 
                    className="link small w-full flex text-(--color-gray-black) cursor-pointer hover:text-(--color-gray-white) transition justify-center"
                >
                    Забыли пароль?
                </span>
            </div>
        </motion.div>
    );
} 