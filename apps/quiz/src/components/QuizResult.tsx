import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '@/store/quizStore';

interface QuizResultProps {
  profile: UserProfile;
  onRestart: () => void;
}

const QuizResult = ({ profile, onRestart }: QuizResultProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 32 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Result Header */}
        <div className="text-center space-y-4">
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-red-600/30 border border-red-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <span className="text-red-400 text-sm font-bold">🚨 ALERTA NEUROLÓGICO</span>
          </motion.div>
          
          <h3 className="text-xl font-bold text-foreground">
            Seu cérebro está <span className="text-red-400">DESPERDIÇANDO</span>
            <br />
            <span className="text-yellow-400">{profile.risk}% do potencial</span> de aprendizado
          </h3>
          
          <p className="text-sm text-foreground/70 leading-relaxed">
            Baseado em suas respostas, você está comprometendo gravemente suas chances de aprovação.
          </p>
        </div>
        
        {/* Diagnóstico Detalhado */}
        <div className="space-y-3">
          <h4 className="text-foreground font-bold text-center">📋 SEU DIAGNÓSTICO COMPLETO:</h4>
          
          <div className="bg-red-600/20 p-4 rounded-2xl border border-red-600/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 font-bold">Vício em Dopamina</span>
              <span className="text-red-400 font-bold">89% CRÍTICO</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div 
                className="bg-red-500 h-2 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: '89%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          <div className="bg-orange-600/20 p-4 rounded-2xl border border-orange-600/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-400 font-bold">Perda de Memória</span>
              <span className="text-orange-400 font-bold">76% ALTO</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div 
                className="bg-orange-500 h-2 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: '76%' }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
        
        {/* A Solução */}
        <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-3xl p-6 border border-green-600/50">
          <h3 className="text-lg font-bold text-green-400 mb-4 text-center">💡 SUA RECEITA NEUROLÓGICA:</h3>
          
          <div className="space-y-3 text-sm">
            {profile.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-yellow-400 text-lg">{feature.icon}</span>
                <div>
                  <strong className="text-foreground">{feature.text}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Urgência + Timer */}
        <div className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 rounded-3xl p-4 border border-red-600/50">
          <div className="text-center space-y-3">
            <h4 className="text-red-400 font-bold">⏰ TEMPO ESGOTANDO:</h4>
            <div className="flex justify-center space-x-2 text-foreground font-bold text-lg">
              <div className="bg-red-600 px-3 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</div>
              <span>:</span>
              <div className="bg-red-600 px-3 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <span>:</span>
              <div className="bg-red-600 px-3 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</div>
            </div>
          </div>
        </div>
        
        {/* Oferta Final */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-muted-foreground line-through text-lg">De R$ 497,00</div>
            <div className="text-yellow-400 text-4xl font-black">R$ 197,00</div>
            <div className="text-foreground/70">ou 12x de R$ 19,70</div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/vendas'}
            className="w-full h-16 bg-gradient-to-r from-green-500 to-green-600 text-black text-lg font-black rounded-2xl shadow-[0_0_30px_hsl(var(--status-success))] relative overflow-hidden"
          >
            <span className="relative z-10">
              🧠 HACKEAR MEU CÉREBRO AGORA!
            </span>
          </motion.button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🛡️ Garantia incondicional de 7 dias
              <br />
              ⚡ Acesso imediato • 🔒 Pagamento seguro
            </p>
          </div>
        </div>
        
        {/* Prova Social Final */}
        <div className="text-center space-y-2">
          <p className="text-sm text-green-400 font-bold">
            👥 +3.247 cérebros já foram hackeados hoje!
          </p>
          <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-yellow-400 text-lg">⭐</span>
            ))}
            <span className="text-xs text-muted-foreground ml-2">4.9/5 • +10.847 transformações</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default QuizResult;
