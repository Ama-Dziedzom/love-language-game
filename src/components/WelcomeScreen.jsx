import { motion } from 'framer-motion';
import { ArrowRight02Icon } from 'hugeicons-react';
import welcomeShield from '../assets/stanbic-welcome-shield.png';

const WelcomeScreen = ({ onStart }) => {
    return (
        <motion.div
            className="screen welcome-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            style={{ overflow: 'hidden' }}
        >
            {/* Decorative background elements */}
            <div className="bg-decor shields-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.1 }}>
                <img src={welcomeShield} style={{ position: 'absolute', top: '-10%', left: '-20%', width: '300px', transform: 'rotate(-15deg)' }} alt="" />
                <img src={welcomeShield} style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '250px', transform: 'rotate(10deg)' }} alt="" />
            </div>

            <div className="welcome-content" style={{ zIndex: 10, position: 'relative' }}>
                <motion.div
                    className="logo-shield-container"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    <div className="shield-glow" />
                    <img
                        src={welcomeShield}
                        alt="Stanbic Heart Shield"
                        className="welcome-shield-img"
                    />
                </motion.div>

                <div className="text-frame welcome-text-frame">
                    <motion.h1
                        className="hero-title welcome-hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        style={{ fontWeight: 900 }}
                    >
                        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Discover How You Actually</span>
                        <span className="accent-text">Want To Be Loved.</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle welcome-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                    >
                        Whether you crave <strong>“high-interest”</strong> or <strong>“tangible”</strong> gestures, knowing your style is the ultimate connection hack
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
                >
                    <button
                        className="cta-button welcome-cta"
                        onClick={onStart}
                    >
                        Begin Journey
                        <ArrowRight02Icon size={20} variant="stroke" />
                    </button>
                </motion.div>

                <motion.div
                    className="social-proof welcome-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 1.2 }}
                >
                    One Quick Game • Zero Guesswork • Let’s Play
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
