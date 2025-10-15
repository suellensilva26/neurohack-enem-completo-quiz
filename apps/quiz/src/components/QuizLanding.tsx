import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface QuizLandingProps {
  onStart: () => void;
}

const QuizLanding = ({ onStart }: QuizLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Hero Video */}
        <motion.div 
          className="relative w-full h-52 rounded-3xl overflow-hidden shadow-gold-neon"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <video 
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            poster="/videos/cerebro-neuroplasticidade.jpg"
          >
            <source src="/videos/cerebro-neuroplasticidade-15s.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
          <div className="absolute top-4 left-4">
            <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              🔴 DESCOBERTA CHOCANTE
            </span>
          </div>
        </motion.div>
        
        {/* Headlines */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-2xl font-black leading-tight text-foreground">
            <span className="text-yellow-400 drop-shadow-neon animate-pulse">
              97% dos estudantes ENEM
            </span>
            <br />
            <span className="text-red-400">DESPERDIÇAM</span> seus cérebros por não conhecer
            <br />
            <span className="text-yellow-400">a NEUROCIÊNCIA da aprovação</span>
          </h1>
          
          <p className="text-base text-foreground/80 leading-relaxed px-2">
            Descubra em <span className="text-yellow-400 font-bold">2 minutos</span> se você faz parte dos{' '}
            <span className="text-green-400 font-bold">3% que dominam</span> as técnicas neurológicas de{' '}
            <span className="text-yellow-400 font-bold">aprendizado acelerado</span> ou se ainda está{' '}
            <span className="text-red-400">PERDENDO TEMPO</span> com métodos primitivos
          </p>
        </motion.div>
        
        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-gradient-gold text-primary-foreground text-lg font-bold rounded-2xl shadow-neon relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            🧠 DESCOBRIR MEU POTENCIAL NEUROLÓGICO
          </span>
          <motion.div 
            className="absolute inset-0 bg-foreground/20"
            animate={{ x: [-100, 400] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
        
        {/* Stats Impactantes */}
        <motion.div 
          className="grid grid-cols-3 gap-3 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 rounded-2xl p-4 border border-yellow-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">280+</div>
            <div className="text-xs text-muted-foreground">pontos aumento</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">28</div>
            <div className="text-xs text-muted-foreground">dias resultado</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">15</div>
            <div className="text-xs text-muted-foreground">min/dia técnica</div>
          </div>
        </motion.div>
        
        {/* Prova Social */}
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-semibold">
              +1.247 cérebros já foram "hackeados" hoje
            </span>
          </div>
          <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-yellow-400 text-lg">⭐</span>
            ))}
            <span className="text-xs text-muted-foreground ml-2">4.9/5 • 3.847 avaliações</span>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default QuizLanding;
