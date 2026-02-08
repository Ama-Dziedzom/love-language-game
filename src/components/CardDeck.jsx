import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import FlickIcon from '../assets/Flick-icon.png';

const CardDeck = ({ question, questionNumber, totalQuestions, onAnswer, onBack }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState(() =>
        [...question.options].sort(() => Math.random() - 0.5)
    );
    const [isTransitioning, setIsTransitioning] = useState(false);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 0], [-25, 0]);
    const opacity = useTransform(x, [0, -400], [1, 0]);
    const scale = useTransform(x, [0, -200], [1, 0.95]);

    // Dynamic background glow based on drag
    const glowOpacity = useTransform(x, [0, -100], [0, 0.3]);

    useEffect(() => {
        // This still handles internal resets if the component is reused,
        // though the parent key usually handles this.
        setShuffledOptions([...question.options].sort(() => Math.random() - 0.5));
        setSelectedOption(null);
        setIsTransitioning(false);
        x.set(0);
    }, [question.id, x]);

    const handleSelect = (option, e) => {
        if (isTransitioning) return;
        setSelectedOption(option.id);

        // Remove focus ring immediately
        if (e?.currentTarget) e.currentTarget.blur();

        // Micro-interaction: Subtle haptic thump
        animate(x, [0, -8, 2, 0], { duration: 0.4, ease: "easeOut" });
    };

    const handleDragEnd = (_, info) => {
        if (isTransitioning || !selectedOption) {
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
            return;
        }

        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -80 || velocity < -400) {
            setIsTransitioning(true);
            animate(x, -1200, {
                type: "spring",
                stiffness: 150,
                damping: 25
            }).then(() => {
                const selected = shuffledOptions.find(o => o.id === selectedOption);
                onAnswer(selected.language);
            });
        } else {
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
        }
    };

    return (
        <div className="card-container">
            <motion.div
                className="drag-glow"
                style={{
                    position: 'absolute',
                    inset: -50,
                    background: 'var(--stanbic-blue-light)',
                    filter: 'blur(60px)',
                    opacity: glowOpacity,
                    zIndex: 0,
                    borderRadius: '50%'
                }}
            />

            <div className="card-stack">
                <div className="stack-card s2" />
                <div className="stack-card s1" />
            </div>

            <motion.div
                className={`question-card ${selectedOption ? 'answered' : ''}`}
                style={{ x, rotate, opacity, scale, touchAction: 'pan-y', userSelect: 'none' }}
                drag="x"
                dragConstraints={{ left: -1200, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <div className="card-inner" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>

                    <h2 className="card-question">{question.question}</h2>

                    <div className="answers-list" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {shuffledOptions.map((option, index) => (
                            <motion.button
                                key={`btn-${question.id}-${option.id}`}
                                className={`answer-btn ${selectedOption === option.id ? 'selected' : ''} ${selectedOption && selectedOption !== option.id ? 'faded' : ''}`}
                                onClick={(e) => handleSelect(option, e)}
                                disabled={isTransitioning}
                                whileTap={{ scale: 0.98 }}
                                tabIndex={-1}
                                initial={false}
                            >
                                <div className="answer-prefix-wrapper">
                                    {selectedOption === option.id ? (
                                        <img
                                            src="/Container.png"
                                            alt="Selected"
                                            className="selected-prefix-icon"
                                        />
                                    ) : (
                                        <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                                    )}
                                </div>
                                <span className="answer-text">{option.text}</span>
                                {/* Checkmark removed to match design */}
                            </motion.button>
                        ))}
                    </div>

                    <div className="card-footer">
                        <AnimatePresence mode="wait">
                            {selectedOption ? (
                                <motion.div
                                    key="flick"
                                    className="flick-prompt"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <img src={FlickIcon} alt="" style={{ width: '20px', height: 'auto', marginRight: '8px' }} />
                                    <span>Flick left to continue</span>
                                    <motion.span
                                        animate={{ x: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="flick-arrow"
                                    >

                                    </motion.span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="select"
                                    className="flick-prompt-initial"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                >
                                    Select an option
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* {questionNumber > 1 && !isTransitioning && (
                <button
                    className="back-link"
                    onClick={onBack}
                    style={{ position: 'absolute', bottom: '-3.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 700 }}
                >
                    ← PREVIOUS
                </button>
            )} */}
        </div>
    );
};

export default CardDeck;
