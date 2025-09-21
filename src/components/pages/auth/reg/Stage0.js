import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input/Input';
import Switcher from '@/components/ui/Switcher';

import Yandex from '@/assets/general/yandex.svg';
import VK from '@/assets/general/vk.svg';

export default function RegStage0({ 
    onContinue, 
    pageVariants,
    custom = 1
}) {
    const [userType, setUserType] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: userType
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            alert('Пароль должен содержать минимум 8 символов');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        delete formData.confirmPassword;

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
                    case 400:
                        return alert("Пользователь с таким именем уже существует")
                    case 401:
                        return alert("Неавторизованный запрос");
                    case 403:
                        return alert("Доступ запрещён");
                    case 404:
                        return alert("Ресурс не найден");
                    default:
                        return alert("Незвестная какая-то ошибка, я хз ващ");
                }
            } else { delete formData.password; delete formData.role; onContinue({...formData});}

        } catch (err) {
            setError(err.message || 'Произошла ошибка при регистрации');
            console.error('Registration error:', err);
        }
    };

    return (
        <motion.div 
            key="register-stage0"
            custom={custom}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="auth_cntr col-span-4 absolute w-full"
        >
            <h3>Добро пожаловать</h3>
            <Switcher 
                className="!w-full" 
                value={userType} 
                onChange={setUserType}
            >
                <Switcher.Option value="student">Студент</Switcher.Option>
                <Switcher.Option value="teacher">Преподаватель</Switcher.Option>
            </Switcher>
            <form
                id="registration"
                className="w-full grid grid-cols-2 grid-rows-2 gap-[0.75rem]"
                onSubmit={handleSubmit}
            >
                {[
                    { name: 'name', placeholder: 'Логин', type: 'text', tabIndex: 1 },
                    { name: 'password', placeholder: 'Пароль', type: 'password', autocomplete: 'new-password' , tabIndex: 3 },
                    { name: 'email', placeholder: 'Почта', type: 'email', autocomplete: 'email', tabIndex: 2 },
                    { name: 'confirmPassword', placeholder: 'Подтвердите пароль', autocomplete: 'new-password', type: 'password', tabIndex: 4 },
                ].map(({ name, placeholder, type, tabIndex, autocomplete }) => (
                    <Input 
                        key={name} name={name} type={type} placeholder={placeholder} value={formData[name] || ''}
                        autoComplete={autocomplete} onChange={handleInputChange} tabIndex={tabIndex} required
                    />
                ))}
            </form>
            <div className='flex flex-col w-full gap-[0.75rem]'>
                <Button 
                    type="submit" 
                    className="w-full justify-center"
                    form="registration"
                >
                    Зарегистрироваться
                </Button>
                {/* <div className="flex gap-[0.75rem] w-full">
                    <Button inverted>Яндекс ID <Yandex /></Button>
                    <Button inverted>ВК ID <VK /></Button>
                </div> */}
            </div>
            <div className='flex flex-col gap-[.5rem]'>
                <Input type="checkbox" form="registration" small required autoComplete='off' name="POPD" id="POPD"><span className='text'>Я даю согласие на <span className='link'>обработку персональных данных</span></span></Input>
                <Input type="checkbox" form="registration" small required autoComplete='off' name="TOTUA" id="TOTUA"><span className='text'>Я принимаю <span className='link'>условия пользовательского соглашения</span></span></Input>
            </div>
        </motion.div>
    );
} 