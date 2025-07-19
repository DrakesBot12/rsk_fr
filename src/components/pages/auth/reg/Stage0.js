import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Switcher, Option } from '@/components/ui/Switcher';

import Yandex from '@/assets/general/yandex.svg';
import VK from '@/assets/general/vk.svg';

export default function RegStage0({ 
    onContinue, 
    pageVariants,
    custom = 1
}) {
    const [userType, setUserType] = useState('student');
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        
        onContinue({ ...formData, userType });
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
                <Option value="student">Студент</Option>
                <Option value="teacher">Преподаватель</Option>
            </Switcher>
            <form
                id="registration"
                className="w-full grid grid-cols-2 grid-rows-2 gap-[0.75rem]"
                onSubmit={handleSubmit}
            >
                {[
                    { name: 'login', placeholder: 'Логин', type: 'text', tabIndex: 1 },
                    { name: 'password', placeholder: 'Пароль', type: 'password', tabIndex: 3 },
                    { name: 'email', placeholder: 'Почта', type: 'email', tabIndex: 2 },
                    { name: 'confirmPassword', placeholder: 'Подтвердите пароль', type: 'password', tabIndex: 4 },
                ].map(({ name, placeholder, type, tabIndex }) => (
                    <Input 
                        key={name} name={name} type={type} placeholder={placeholder} value={formData[name] || ''}
                        onChange={handleInputChange} tabIndex={tabIndex} required
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
                <div className="flex gap-[0.75rem] w-full">
                    <Button inverted>Яндекс ID <Yandex /></Button>
                    <Button inverted>ВК ID <VK /></Button>
                </div>
            </div>
        </motion.div>
    );
} 