import { motion } from 'framer-motion';
import { useMemo } from 'react';

const FloatingHearts = ({ count = 15 }) => {
    const hearts = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 10,
            size: 10 + Math.random() * 20,
            opacity: 0.1 + Math.random() * 0.3,
        }));
    }, [count]);

    return (
        <div className="floating-hearts-container">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: `${heart.x}%`,
                        fontSize: `${heart.size}px`,
                        opacity: heart.opacity,
                    }}
                    initial={{ y: '100vh', rotate: 0 }}
                    animate={{
                        y: '-100vh',
                        rotate: [0, 15, -15, 0],
                        x: [0, 30, -30, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    💕
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
