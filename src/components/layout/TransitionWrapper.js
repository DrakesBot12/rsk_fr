import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function TransitionWrapper({ currentKey, children }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const variants = {
        initial: () => ({
            x: '100%',
            opacity: 1,
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'circOut' },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5, ease: 'circIn' },
        },
    };

    return (
            <AnimatePresence mode="sync">
                <motion.div
                    key={currentKey}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    onAnimationStart={() => setIsAnimating(true)}
                    onAnimationComplete={() => setIsAnimating(false)} 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        flex: '1',
                        ...(isAnimating && {
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }),
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
    );
}
