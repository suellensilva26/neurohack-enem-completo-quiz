import { useState } from 'react';
import { motion } from 'framer-motion';
import { getENEMCountdown, getTimeOptions } from '../utils/enemCountdown';

export default function QuizScreen({ onComplete, onDataUpdate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const { days } = getENEMCountdown();

  const questions = [
    {
      id: 1,
      question: "Qual é sua maior dificuldade nos estudos?",
      options: [
        "Procrastinação e falta de foco",
        "Não conseguir memorizar o conteúdo",
        "Ansiedade e bloqueios mentais",
        "Falta de organização e método"
      ]
    },
    {
      id: 2,
      question: `⏰ Quanto tempo você tem até o ENEM 2025?`,
      urgencyMessage: `🚨 APENAS ${days} DIAS RESTANTES!`,
      options: getTimeOptions(days)
    },
    {
      id: 3,
      question: "Qual é seu objetivo principal?",
      options: [
        "Medicina ou curso concorrido",
        "Engenharia ou exatas",
        "Humanas ou direito",
        "Qualquer curso superior"
      ]
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer
    };
    setAnswers(newAnswers);
    
    if (onDataUpdate) {
      onDataUpdate(newAnswers);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed
      if (onComplete) {
        onComplete(newAnswers);
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Header - Padrão original */}
        <div className="text-center space-y-4">
          <motion.div
            className="text-5xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🧠
          </motion.div>
          
          <h1 className="text-xl font-bold text-white leading-tight">
            <span className="text-yellow-400">Diagnóstico Neurológico</span>
            <br />
            Personalizado para o ENEM
          </h1>
          
          <p className="text-sm text-gray-300">
            Responda com sinceridade para receber seu protocolo personalizado
          </p>
        </div>

        {/* Progress Bar - Padrão original */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progresso do diagnóstico</span>
            <span>{Math.round(progress)}% completo</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card - Padrão original */}
        <motion.div
          key={currentQuestion}
          className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-yellow-400 text-sm font-bold mb-2">
                Pergunta {currentQuestion + 1} de {questions.length}
              </div>
              <h2 className="text-white text-lg font-bold leading-tight">
                {questions[currentQuestion].question}
              </h2>
              
              {/* Urgency message for time question */}
              {questions[currentQuestion].urgencyMessage && (
                <motion.div 
                  className="bg-red-900/30 rounded-xl p-3 border border-red-500/50 mt-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <p className="text-red-400 text-sm font-bold">
                    {questions[currentQuestion].urgencyMessage}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white text-left hover:bg-gray-700/50 hover:border-yellow-500 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-gray-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info Footer - Padrão original */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            🔒 <strong>Seus dados são 100% seguros</strong> • Usado apenas para personalização
          </p>
        </div>

      </div>
    </div>
  );
}