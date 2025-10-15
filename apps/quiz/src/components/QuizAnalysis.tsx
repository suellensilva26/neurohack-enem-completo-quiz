import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

interface QuizAnalysisProps {
  onComplete: () => void;
}

const QuizAnalysis = ({ onComplete }: QuizAnalysisProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  
  const analysisSteps = [
    { icon: Brain, text: 'Analisando padrão comportamental...', duration: 2000 },
    { icon: TrendingUp, text: 'Calculando potencial de aprovação...', duration: 2000 },
    { icon: Target, text: 'Identificando estratégia personalizada...', duration: 2000 },
    { icon: Zap, text: 'Gerando plano de ação sob medida...', duration: 2000 }
  ];
  
  useEffect(() => {
    const countTimer = setInterval(() => {
      setDataCount(prev => prev < 127 ? prev + 3 : 127);
    }, 50);
    
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        setTimeout(onComplete, 1000);
        return prev;
      });
    }, 2000);
    
    return () => {
      clearInterval(countTimer);
      clearInterval(stepTimer);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-12 flex items-center justify-center">
      <div className="max-w-sm mx-auto text-center space-y-8">
        
        {/* Brain Animation */}
        <motion.div 
          className="relative w-32 h-32 mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary shadow-neon">
            <div className="absolute inset-2 rounded-full border-2 border-primary-glow/50 border-r-primary-glow">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                <span className="text-3xl">🧠</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Analysis Steps */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Analisando seu perfil neurológico...
          </h2>
          
          {analysisSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-500 ${
                  index <= currentStep 
                    ? 'bg-primary/20 border border-primary/50' 
                    : 'bg-secondary/50 border border-border/10'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0.4,
                  x: 0
                }}
                transition={{ delay: index * 0.2 }}
              >
                <Icon className={`w-5 h-5 ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm flex-1 text-left ${
                  index <= currentStep ? 'text-foreground font-semibold' : 'text-muted-foreground'
                }`}>
                  {step.text}
                </span>
                {index === currentStep && (
                  <motion.div
                    className="ml-auto w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Data Processing */}
        <motion.div 
          className="bg-card rounded-2xl p-6 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-foreground/80 text-sm">
            Processando dados de{' '}
            <span className="font-bold text-primary text-lg">{dataCount}</span>{' '}
            fontes científicas...
          </div>
          
          <div className="w-full h-2 bg-background rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-gold"
              animate={{ width: `${(dataCount / 127) * 100}%` }}
            />
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default QuizAnalysis;
