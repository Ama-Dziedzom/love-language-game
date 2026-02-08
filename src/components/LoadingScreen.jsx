import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import shield from '../assets/stanbic-welcome-shield.png';

const LoadingScreen = ({ onComplete }) => {
    const [currentMessage, setCurrentMessage] = useState(0);

    const messages = [
        { text: "Securing your responses...", emoji: "🛡️" },
        { text: "Analyzing your heart's profile...", emoji: "💙" },
        { text: "Preparing your Stanbic Love Insights...", emoji: "✨" },
        { text: "Almost there...", emoji: "🎯" }
    ];

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setCurrentMessage((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 800);
        const completeTimer = setTimeout(() => onComplete(), 3500);
        return () => { clearInterval(messageInterval); clearTimeout(completeTimer); };
    }, [onComplete]);

    return (
        <motion.div className="screen loading-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <div className="loading-content" style={{ textAlign: 'center' }}>
                <div className="hearts-loader" style={{ marginBottom: '2rem' }}>
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7],
                            filter: [
                                'drop-shadow(0 0 8px rgba(0,102,255,0.2))',
                                'drop-shadow(0 0 20px rgba(0,102,255,0.5))',
                                'drop-shadow(0 0 8px rgba(0,102,255,0.2))'
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <img
                            src={shield}
                            alt="Stanbic Shield"
                            style={{
                                width: '120px',
                                height: 'auto',
                                display: 'block',
                                margin: '0 auto'
                            }}
                        />
                    </motion.div>
                </div>

                <div className="loading-bar-container" style={{ background: 'rgba(255,255,255,0.1)', height: '4px', overflow: 'hidden', borderRadius: '2px', width: '240px', margin: '0 auto' }}>
                    <motion.div
                        className="loading-bar"
                        style={{ height: '100%', background: 'var(--stanbic-blue-light)', boxShadow: '0 0 10px var(--stanbic-blue-light)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3.5, ease: 'easeInOut' }}
                    />
                </div>

                <div className="loading-messages" style={{ marginTop: '2rem', minHeight: '1.5em' }}>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentMessage}
                            className="loading-message"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '1.1rem' }}
                        >
                            {messages[currentMessage].text}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
