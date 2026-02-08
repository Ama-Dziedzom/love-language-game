import { motion } from 'framer-motion';
import progressPointer from '../assets/progress-pointer.png';

const CardProgress = ({ current, total, hideLabels = false, delay = 0 }) => {
    const progress = (current / total) * 100;

    return (
        <div className="card-progress-container">
            {!hideLabels && (
                <div className="progress-labels">
                    <span className="progress-entry-text">ENTRY #{current}</span>
                    <span className="progress-total-text">{total} TOTAL</span>
                </div>
            )}

            <div className="progress-track-wrapper">
                {/* Background track */}
                <div className="progress-bg-track" />

                {/* Filling track */}
                <motion.div
                    className="progress-fill-track"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "circOut", delay }}
                />

                {/* The Pointer (Shield) */}
                <motion.div
                    className="progress-pointer-wrapper"
                    initial={{ left: 0 }}
                    animate={{ left: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "circOut", delay }}
                >
                    <img src={progressPointer} alt="" className="progress-pointer-img" />
                </motion.div>
            </div>
        </div>
    );
};

export default CardProgress;
