import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import HypeScreen from './components/HypeScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import { questions } from './data/questions';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({ words: 0, time: 0, gifts: 0, service: 0, touch: 0, emotional: 0, shared: 0 });
  const [showHype, setShowHype] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('loveLanguageProgress');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.answers?.length > 0) {
        setAnswers(data.answers);
        setScores(data.scores);
        setCurrentQuestion(data.currentQuestion);
        if (data.currentQuestion > 0) setScreen('game');
      }
    }
  }, []);

  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem('loveLanguageProgress', JSON.stringify({ answers, scores, currentQuestion }));
    }
  }, [answers, scores, currentQuestion]);

  const handleStart = () => {
    localStorage.removeItem('loveLanguageProgress');
    setAnswers([]);
    setScores({ words: 0, time: 0, gifts: 0, service: 0, touch: 0, emotional: 0, shared: 0 });
    setCurrentQuestion(0);
    setScreen('game');
  };

  const handleAnswer = (language) => {
    const newScores = { ...scores, [language]: scores[language] + 1 };
    setScores(newScores);
    setAnswers([...answers, language]);
    const next = currentQuestion + 1;

    // Show hype screen at midpoint (after question 5, which is index 4 -> next = 5)
    if (next === 5 && !showHype) {
      setShowHype(true);
      setCurrentQuestion(next);
      setScreen('hype');
    } else if (next >= questions.length) {
      setScreen('loading');
    } else {
      setCurrentQuestion(next);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prev = answers[currentQuestion - 1];
      setAnswers(answers.slice(0, -1));
      setScores({ ...scores, [prev]: scores[prev] - 1 });
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleHypeContinue = () => {
    setScreen('game');
  };

  const handleLoadingComplete = () => {
    const primary = Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    setResults({ primary, scores });
    localStorage.removeItem('loveLanguageProgress');
    setScreen('results');
  };

  const handleRetake = () => {
    setAnswers([]);
    setScores({ words: 0, time: 0, gifts: 0, service: 0, touch: 0 });
    setCurrentQuestion(0);
    setShowHype(false);
    setResults(null);
    setScreen('welcome');
  };

  return (
    <div className="app">

      <AnimatePresence mode="wait">
        {screen === 'welcome' && <WelcomeScreen key="welcome" onStart={handleStart} />}
        {screen === 'game' && (
          <GameScreen
            key={`game-${currentQuestion}`}
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}
        {screen === 'hype' && <HypeScreen key="hype" onContinue={handleHypeContinue} />}
        {screen === 'loading' && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}
        {screen === 'results' && results && <ResultsScreen key="results" results={results} onRetake={handleRetake} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
