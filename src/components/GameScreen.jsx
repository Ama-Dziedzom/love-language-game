import { motion } from 'framer-motion';
import CardDeck from './CardDeck';
import CardProgress from './CardProgress';

const GameScreen = ({ question, questionNumber, totalQuestions, onAnswer, onBack }) => {
    return (
        <motion.div
            className="screen game-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Top bar with progress - Sticky and Clean */}
            <div className="game-header">
                <CardProgress current={questionNumber} total={totalQuestions} />
            </div>

            {/* Main content area */}
            <div className="game-content">
                <CardDeck
                    question={question}
                    questionNumber={questionNumber}
                    totalQuestions={totalQuestions}
                    onAnswer={onAnswer}
                    onBack={onBack}
                />
            </div>

            {/* Subtle encouragement footer */}
            <div className="game-footer">
                <motion.span
                    key={questionNumber}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    className="encouragement-text"
                >
                    {questionNumber <= 3 && "Take your time 💭"}
                    {questionNumber > 3 && questionNumber < 10 && "You're doing great ✨"}
                    {questionNumber === 10 && "Last one! 🌟"}
                </motion.span>
            </div>
        </motion.div>
    );
};

export default GameScreen;
