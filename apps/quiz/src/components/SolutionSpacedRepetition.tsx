import { motion } from 'framer-motion';
import { Brain, TrendingUp, Zap } from 'lucide-react';

interface SolutionSpacedRepetitionProps {
  onContinue: () => void;
}

const SolutionSpacedRepetition = ({ onContinue }: SolutionSpacedRepetitionProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Revelação */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-foreground">
            🧬 <span className="text-green-400">SPACED REPETITION IA:</span>
            <br />
            A fórmula que <span className="text-yellow-400">ANULA</span> o esquecimento
          </h2>
        </motion.div>
        
        {/* Vídeo Demo */}
        <div className="w-full h-48 rounded-3xl overflow-hidden shadow-[0_0_25px_hsl(var(--status-info))]">
          <video controls className="w-full h-full object-cover" poster="/videos/spaced-repetition-demo.jpg">
            <source src="/videos/spaced-repetition-ia-funcionando.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Fórmula Científica */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl p-6 border border-blue-700/30">
          <h3 className="text-lg font-bold text-blue-400 mb-4 text-center flex items-center justify-center gap-2">
            <Brain className="w-5 h-5" />
            FÓRMULA NEUROLÓGICA:
          </h3>
          
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-3 border border-yellow-600/30">
              <div className="text-center text-yellow-400 font-mono">
                <strong>Revisar = 1° dia → 3° dia → 7° dia → 21° dia</strong>
              </div>
              <p className="text-xs text-center text-foreground/70 mt-2">
                Intervalos matemáticos que interceptam exatamente o ponto de esquecimento
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto text-green-400 mb-1" />
                <div className="text-green-400 font-bold">+847%</div>
                <div className="text-foreground/70">retenção</div>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 mx-auto text-blue-400 mb-1" />
                <div className="text-blue-400 font-bold">-76%</div>
                <div className="text-foreground/70">tempo revisão</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interface Demo */}
        <div className="bg-black/50 rounded-3xl p-4 border border-cyan-600/30">
          <h4 className="text-cyan-400 font-bold mb-3 text-center">📱 COMO FUNCIONA NA PRÁTICA:</h4>
          
          <div className="space-y-3 text-xs">
            <div className="bg-green-600/20 p-3 rounded-lg border-l-4 border-green-500">
              <div className="font-bold text-green-400">HOJE • Lei de Ohm</div>
              <div className="text-foreground/70">IA detectou: você esqueceu 23% do conceito</div>
              <div className="text-yellow-400">→ Revisar AGORA (5 min)</div>
            </div>
            
            <div className="bg-blue-600/20 p-3 rounded-lg border-l-4 border-blue-500">
              <div className="font-bold text-blue-400">AMANHÃ • Revolução Francesa</div>
              <div className="text-foreground/70">IA prevê: você esquecerá 34% em 18h</div>
              <div className="text-yellow-400">→ Revisar às 14:30 (3 min)</div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-red-400 text-xs">🔒 IA Premium exclusiva</span>
          </div>
        </div>
        
        {/* Case de Sucesso */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-4 border border-purple-700/30">
          <div className="text-center">
            <p className="text-sm text-purple-200">
              <strong>"Aplicando Spaced Repetition, nunca mais esqueci o que estudei. Retenção de 94% vs 11% antes."</strong>
              <br />
              <span className="text-xs text-muted-foreground">- Carlos M., Engenharia UFMG • +267 pontos</span>
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-gradient-gold text-primary-foreground text-lg font-bold rounded-2xl shadow-gold-neon"
        >
          Continuar →
        </motion.button>
        
      </div>
    </div>
  );
};

export default SolutionSpacedRepetition;
