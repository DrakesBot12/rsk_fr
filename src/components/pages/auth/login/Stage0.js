import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { saveUserData } from '@/utils/auth';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input/Input';

import Yandex from '@/assets/general/yandex.svg';
import VK from '@/assets/general/vk.svg';

export default function LoginStage0({
    onForgotPassword,
    pageVariants,
    custom = 1 
}) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onLogin = async (formData) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData
                }),
                credentials: "include"
            });

            const data = await response.json();
            console.log(formData.name)

            if (!response.ok) {
                switch (response.status) {
                    case 422:
                        return alert("Неверные данные: " + JSON.stringify(data));
                    case 400:
                        return alert("Пользователь с таким именем уже существует")
                    case 401:
                        return alert("Пользователь не найден");
                    case 403:
                        return alert("Вы не подтвердили email");
                    case 404:
                        return alert("Ресурс не найден");
                    default:
                        return alert("Незвестная какая-то ошибка, я хз ващ");
                }
            } else {
                await saveUserData({ name: formData.name});

                router.push('/profile');
            }

        } catch (err) {
            // setError(err.message || 'Произошла ошибка при регистрации');
            console.error('Registration error:', err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            alert('Пароль должен содержать минимум 8 символов');
            return;
        }

        try {
            const response = await fetch('/api/auth/reg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                switch (response.status) {
                    case 422:
                        return alert("Неверные данные: " + JSON.stringify(data));
                    case 401:
                        return alert("Неавторизованный запрос");
                    case 403:
                        return alert("Доступ запрещён");
                    case 404:
                        return alert("Ресурс не найден");
                    default:
                        return alert("Незвестная какая-то ошибка, я хз ващ");
                }
            } else onLogin({...formData});

        } catch (err) {
            setError(err.message || 'Произошла ошибка при регистрации');
            console.error('Registration error:', err);
        }
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
                    name="name" 
                    placeholder="Логин" 
                    autoComplete='username'
                    required 
                    value={formData.name}
                    onChange={handleChange} 
                />
                <Input 
                    type="password" 
                    name="password" 
                    autoComplete="current-password"
                    placeholder="Пароль" 
                    required 
                    value={formData.password}
                    onChange={handleChange} 
                />
            </form>
            <div className='flex flex-col w-full gap-[0.75rem]'>
                <Button type="submit" form="login" className="w-full justify-center">Войти</Button>
                {/* <div className="flex gap-[0.75rem] w-full">
                    <Button inverted>Яндекс ID <Yandex /></Button>
                    <Button inverted>ВК ID <VK /></Button>
                </div> */}
                {/* <span 
                    onClick={onForgotPassword} 
                    className="link small w-full flex text-(--color-gray-black) cursor-pointer hover:text-(--color-gray-white) transition justify-center"
                >
                    Забыли пароль?
                </span> */}
            </div>
        </motion.div>
    );
} 