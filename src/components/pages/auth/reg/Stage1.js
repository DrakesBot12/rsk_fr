import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import React from 'react';
import Button from '@/components/ui/Button';

export default function RegStage1({ 
    pageVariants,
    custom = 1 // значение по умолчанию
}) {
    const router = useRouter();

    return (
        <motion.div 
            key="register-stage1"
            custom={custom}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="auth_cntr col-span-4 absolute w-full"
        >
            <div className='flex flex-col items-center gap-[0.5rem] w-full'>
                <h3>Регистрация завершена</h3>
                <p className='text-(--color-gray-black) text-center'>Вы можете закончить настройку своего аккаунта в настройках профиля. Не забудьте подтвердить почту в отправленном вам письме. Удачи в цифровизации!</p>                
            </div>

            <Button onClick={() => router.push('/profile')}>Войти в аккаунт</Button>
        </motion.div>
    );
} 