import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight02Icon, Cancel01Icon, Copy01Icon, Share08Icon } from 'hugeicons-react';
import { loveLanguages } from '../data/questions';
import welcomeShield from '../assets/stanbic-welcome-shield.png';
import syncedIcon from '../assets/synced.png';
import appBg from '../assets/app-bg.png';

const ResultsScreen = ({ results, onRetake }) => {
    const primaryLanguage = loveLanguages[results.primary];
    const [showShareModal, setShowShareModal] = useState(false);
    const [showCopiedToast, setShowCopiedToast] = useState(false);

    // Filter out the primary result and show the next 2 love languages
    const sortedScores = Object.keys(loveLanguages)
        .filter(key => key !== results.primary)
        .map(key => ({
            key,
            value: results.scores[key] || 0,
            ...loveLanguages[key]
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 2);

    const shareText = `I just discovered my Love Language is "${primaryLanguage.name}"! Find yours with Stanbic Bank Ghana`;
    const shareUrl = window.location.href;

    const handleShare = () => {
        setShowShareModal(true);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Love Language Results',
                    text: shareText,
                    url: shareUrl
                });
                setShowShareModal(false);
            } catch (err) { }
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
            setShowCopiedToast(true);
            setTimeout(() => setShowCopiedToast(false), 2000);
            setTimeout(() => setShowShareModal(false), 500);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = `${shareText}\n${shareUrl}`;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setShowCopiedToast(true);
            setTimeout(() => setShowCopiedToast(false), 2000);
            setTimeout(() => setShowShareModal(false), 500);
        }
    };

    const shareOptions = [
        {
            name: 'WhatsApp',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            color: '#25D366',
            onClick: () => {
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`, '_blank');
                setShowShareModal(false);
            }
        },
        {
            name: 'Twitter',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            color: '#000000',
            onClick: () => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
                setShowShareModal(false);
            }
        },
        {
            name: 'Facebook',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            color: '#1877F2',
            onClick: () => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
                setShowShareModal(false);
            }
        }
    ];

    return (
        <motion.div
            className="absolute inset-0 w-full overflow-y-auto overflow-x-hidden flex flex-col items-center"
            style={{
                background: 'transparent',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingTop: '16px',
                paddingBottom: '48px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="w-[94%] max-w-[460px] mx-auto" style={{ marginTop: '16px' }}>
                <div className="flex flex-col" style={{ gap: '16px' }}>
                    {/* Primary Result Card */}
                    <motion.div
                        className="bg-white/5 backdrop-blur-[40px] border border-white/20 rounded-[44px] sm:rounded-[64px] text-center w-full relative overflow-hidden flex flex-col items-center shadow-4xl"
                        style={{
                            paddingTop: '36px',
                            paddingBottom: '32px',
                            paddingLeft: '36px',
                            paddingRight: '36px'
                        }}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", damping: 20 }}
                    >
                        {/* The Shield & Heart Header */}
                        <div className="relative w-full flex justify-center items-center" style={{ maxWidth: '120px', aspectRatio: '1', marginBottom: '24px' }}>
                            {/* The Shield Background */}
                            <img
                                src={welcomeShield}
                                alt="Shield"
                                className="absolute w-[115%] h-auto opacity-20 pointer-events-none"
                            />

                            {/* The 3D Heart */}
                            <motion.div
                                className="z-[2] drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                                style={{ width: '65px', height: '65px' }}
                                animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img src={syncedIcon} alt="Heart" className="w-full h-full object-contain filter brightness-110 contrast-125" />
                            </motion.div>
                        </div>

                        {/* Result Content */}
                        <div className="text-center z-10 w-full" style={{ marginBottom: '24px' }}>
                            <span className="block font-black text-[#7eb3ff] uppercase" style={{ fontSize: '10px', letterSpacing: '3px', marginBottom: '10px' }}>YOUR LOVE LANGUAGE IS</span>
                            <h1 className="font-black text-white tracking-tight" style={{ fontSize: '32px', lineHeight: '1.1', marginBottom: '14px' }}>
                                {primaryLanguage.name}
                            </h1>
                            <p className="text-white/70 font-medium" style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '8px', paddingRight: '8px' }}>
                                {primaryLanguage.description}
                            </p>
                        </div>

                        {/* Tips Section */}
                        <div className="w-full z-10 text-center border-t border-white/10" style={{ paddingTop: '22px' }}>
                            <h3 className="font-black text-[#7eb3ff] text-center uppercase" style={{ fontSize: '9px', letterSpacing: '2px', marginBottom: '16px' }}>WAY TO EXPRESS THIS</h3>
                            <div className="flex flex-col max-w-[300px] mx-auto" style={{ gap: '14px' }}>
                                {primaryLanguage.tips.map((tip, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-start group"
                                        style={{ gap: '10px' }}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + (index * 0.1) }}
                                    >
                                        <div className="w-4 h-4 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7eb3ff]/20 transition-colors" style={{ marginTop: '2px' }}>
                                            <div className="w-1 h-1 rounded-full bg-[#7eb3ff]" />
                                        </div>
                                        <p className="text-white/80 font-medium text-left" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                                            {tip}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Detailed Profile Section */}
                    <motion.div
                        className="bg-white/5 backdrop-blur-[40px] border border-white/20 rounded-[32px] sm:rounded-[40px] relative overflow-hidden w-full"
                        style={{
                            paddingTop: '36px',
                            paddingBottom: '36px',
                            paddingLeft: '32px',
                            paddingRight: '32px'
                        }}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", damping: 20 }}
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
                            <img
                                src="/blue%20love%201.png"
                                alt=""
                                className="w-[70%] h-auto rotate-[-15deg]"
                            />
                        </div>

                        <h2 className="text-center font-black text-white z-10 relative" style={{ fontSize: '17px', marginBottom: '28px' }}>Detailed Heart Profile</h2>

                        <div className="flex flex-col z-10 relative" style={{ gap: '20px' }}>
                            {sortedScores.map((score, idx) => (
                                <div key={score.key} className="flex flex-col">
                                    <div className="flex justify-between items-end" style={{ marginBottom: '8px' }}>
                                        <span className="text-white/90 font-bold tracking-tight" style={{ fontSize: '13px' }}>{score.name}</span>
                                        <span className="text-white/30 font-black tracking-widest" style={{ fontSize: '10px' }}>{score.value} / 10</span>
                                    </div>
                                    <div className="h-[5px] sm:h-[6px] bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.max((score.value / 10) * 100, 5)}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 + (0.1 * idx) }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex flex-col" style={{ gap: '20px', marginTop: '18px', marginBottom: '24px' }}>
                        <motion.button
                            className="w-full rounded-full flex items-center justify-center relative font-black tracking-tight transition-all duration-300 bg-white text-[#0033a1] hover:-translate-y-1 active:scale-95 shadow-2xl border-none cursor-pointer"
                            style={{ height: '56px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px' }}
                            onClick={handleShare}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, type: "spring", damping: 20 }}
                        >
                            <span>Share Discovery</span>
                            <div className="absolute" style={{ right: '28px' }}>
                                <ArrowRight02Icon size={20} variant="stroke" />
                            </div>
                        </motion.button>

                        <motion.button
                            className="w-full rounded-full flex items-center justify-center relative font-black tracking-tight transition-all duration-300 bg-transparent border-2 border-white/20 text-white hover:bg-white/10 active:scale-95 cursor-pointer"
                            style={{ height: '56px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px' }}
                            onClick={onRetake}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, type: "spring", damping: 20 }}
                        >
                            <span>Try Discovery Again</span>
                            <div className="absolute" style={{ right: '28px' }}>
                                <ArrowRight02Icon size={20} variant="stroke" />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowShareModal(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[36px] border-t border-white/20"
                            style={{
                                paddingBottom: 'max(env(safe-area-inset-bottom), 32px)',
                                backgroundImage: `url(${appBg})`,
                                backgroundColor: '#001a47',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center bottom'
                            }}
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            {/* Handle bar */}
                            <div className="flex justify-center" style={{ paddingTop: '20px', paddingBottom: '16px' }}>
                                <div className="w-12 h-1.5 bg-white/30 rounded-full" />
                            </div>

                            {/* Header */}
                            <div className="flex items-center justify-between" style={{ paddingLeft: '32px', paddingRight: '32px', paddingBottom: '24px' }}>
                                <h3 className="text-white font-bold" style={{ fontSize: '20px' }}>Share Your Discovery</h3>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
                                >
                                    <Cancel01Icon size={20} />
                                </button>
                            </div>

                            {/* Share preview */}
                            <div className="bg-white/5 rounded-3xl border border-white/10" style={{ marginLeft: '32px', marginRight: '32px', padding: '24px', marginBottom: '32px' }}>
                                <p className="text-white/80 leading-relaxed" style={{ fontSize: '15px' }}>
                                    {shareText}
                                </p>
                            </div>

                            {/* Social share buttons */}
                            <div style={{ paddingLeft: '32px', paddingRight: '32px', paddingBottom: '24px' }}>
                                <p className="text-white/50 font-medium uppercase tracking-wider" style={{ fontSize: '11px', marginBottom: '24px' }}>Share via</p>
                                <div className="flex justify-center" style={{ gap: '32px' }}>
                                    {shareOptions.map((option) => (
                                        <motion.button
                                            key={option.name}
                                            className="flex flex-col items-center"
                                            style={{ gap: '12px' }}
                                            onClick={option.onClick}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                                                style={{ backgroundColor: option.color }}
                                            >
                                                {option.icon}
                                            </div>
                                            <span className="text-white/70 font-medium" style={{ fontSize: '13px' }}>{option.name}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/10" style={{ marginLeft: '32px', marginRight: '32px', marginTop: '24px', marginBottom: '24px' }} />

                            {/* Copy & Native share */}
                            <div className="flex flex-col" style={{ paddingLeft: '32px', paddingRight: '32px', paddingBottom: '32px', gap: '16px' }}>
                                <motion.button
                                    className="w-full rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-semibold"
                                    style={{ height: '64px', gap: '12px', fontSize: '15px' }}
                                    onClick={handleCopyLink}
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Copy01Icon size={22} />
                                    <span>Copy Link</span>
                                </motion.button>

                                {navigator.share && (
                                    <motion.button
                                        className="w-full rounded-full bg-white text-[#0033a1] flex items-center justify-center font-bold shadow-lg"
                                        style={{ height: '64px', gap: '12px', fontSize: '15px' }}
                                        onClick={handleNativeShare}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Share08Icon size={22} />
                                        <span>More Options</span>
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Copied Toast */}
            <AnimatePresence>
                {showCopiedToast && (
                    <motion.div
                        className="fixed left-1/2 z-[60] bg-white text-[#0033a1] rounded-full font-bold shadow-2xl flex items-center"
                        style={{ top: '32px', paddingLeft: '24px', paddingRight: '24px', paddingTop: '12px', paddingBottom: '12px', gap: '8px' }}
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                    >
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied to clipboard!
                    </motion.div>
                )}
            </AnimatePresence>        </motion.div>
    );
};

export default ResultsScreen;