import { motion } from 'framer-motion';
import { ArrowRight02Icon } from 'hugeicons-react';
import welcomeShield from '../assets/stanbic-welcome-shield.png';
import CardProgress from './CardProgress';

const HypeScreen = ({ onContinue }) => {
    return (
        <motion.div
            className="screen hype-screen-crazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background Data Stream (Visual only) */}
            <div className="data-grid-overlay" />

            <div className="hype-container" style={{ gap: '1.5rem', paddingTop: '4rem' }}>
                {/* Central 3D Asset with pulsing rings */}
                <div className="core-visualization">
                    <motion.div
                        className="pulse-ring pr-1"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                        className="pulse-ring pr-2"
                        animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                    />

                    <motion.div
                        className="main-core"
                        animate={{
                            rotateY: [0, 10, -10, 0],
                            y: [0, -15, 0]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img src={welcomeShield} alt="Heart Core" className="core-image" />
                    </motion.div>

                    {/* Scanning Line */}
                    <motion.div
                        className="scanning-beam"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Text Content */}
                <div className="hype-text-box">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h1 className="hype-title-massive">
                            <span style={{ display: 'block' }}>Something Special</span>
                            <span style={{ color: 'var(--stanbic-blue-light)' }}>Loading,</span> 50%
                        </h1>
                        <p className="hype-desc">
                            We already see what makes you feel special. A few more heart-to-heart choices to unlock your results<br />
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ width: '100%', marginTop: '2rem' }}
                    >
                        <CardProgress current={5} total={10} hideLabels delay={1.2} />
                        <div style={{ textAlign: 'right', fontSize: '14px', fontWeight: '800', marginTop: '8px', color: 'white', opacity: 0.8 }}>
                            5/10
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <button className="cta-button" onClick={onContinue} style={{ background: 'white', color: 'var(--stanbic-blue)', borderRadius: '100px', padding: '1rem 2rem', margin: '0.5rem auto 5rem', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                            <span>Continue Journey</span>
                            <ArrowRight02Icon size={20} variant="stroke" />
                        </button>
                    </motion.div>
                </div>
            </div>


        </motion.div>
    );
};

export default HypeScreen;
