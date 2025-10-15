import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizOption } from '@/store/quizStore';

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  subtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
  options: QuizOption[];
  onOptionSelect: (option: QuizOption) => void;
}

const QuizQuestion = ({ 
  questionNumber, 
  totalQuestions, 
  title, 
  subtitle,
  videoSrc,
  videoPoster,
  options, 
  onOptionSelect 
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const progress = (questionNumber / totalQuestions) * 100;
  
  const handleSelect = (option: QuizOption) => {
    setSelectedOption(option.id);
    setTimeout(() => onOptionSelect(option), 800);
  };
  
  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Progress Header */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Pergunta {questionNumber} de {totalQuestions}
            </span>
            <span className="text-sm text-primary font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
        
        {/* 1. TÍTULO - em cima */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white leading-tight px-2">
            {title}
          </h2>
        </motion.div>
        
        {/* 2. VÍDEO - no meio */}
        {videoSrc && (
          <motion.div 
            className="w-full mb-4 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <video 
              controls 
              className="w-full"
              poster={videoPoster}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </motion.div>
        )}
        
        {/* 3. SUBTÍTULO - abaixo do vídeo */}
        {subtitle && (
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-300 text-sm leading-relaxed px-4">
              {subtitle}
            </p>
          </motion.div>
        )}
        
        {/* 4. OPÇÕES - por último, com cores douradas */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option)}
              whileHover={{ scale: 1.02, x: 8 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`w-full p-4 rounded-xl text-white transition-all duration-300 ${
                selectedOption === option.id
                  ? 'bg-yellow-500/20 border-2 border-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                  : 'bg-gray-800/50 border border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-500/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{option.icon}</span>
                <div className="text-left flex-1">
                  <div className="font-semibold text-white">{option.text}</div>
                  {option.subtext && (
                    <div className="text-xs text-gray-400 mt-1">{option.subtext}</div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
};

export default QuizQuestion;
