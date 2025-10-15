import { motion } from 'framer-motion';
import { Clock, Target, Zap } from 'lucide-react';

interface SolutionChronobiologyProps {
  onContinue: () => void;
}

const SolutionChronobiology = ({ onContinue }: SolutionChronobiologyProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Revelação da Solução */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-full">
            <span className="text-green-400 text-sm font-bold">💡 SOLUÇÃO DESCOBERTA</span>
          </div>
          
          <h2 className="text-xl font-bold text-foreground">
            🧬 <span className="text-green-400">CRONOBIOLOGIA PERSONALIZADA:</span>
            <br />
            O hack neurológico que <span className="text-yellow-400">multiplica seu foco por 7x</span>
          </h2>
        </motion.div>
        
        {/* Vídeo Demonstração */}
        <div className="w-full h-48 rounded-3xl overflow-hidden shadow-[0_0_25px_hsl(var(--status-success))]">
          <video controls className="w-full h-full object-cover" poster="/videos/cronobiologia-demo.jpg">
            <source src="/videos/cronobiologia-personalizada-demo.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Explicação Científica */}
        <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-3xl p-6 border border-green-700/30">
          <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" />
            COMO FUNCIONA:
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 text-lg">🎯</span>
              <div>
                <strong className="text-foreground">Análise do seu Cronótipo:</strong>
                <div className="text-foreground/70">IA identifica seus picos naturais de cortisol e melatonina</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="text-yellow-400 w-5 h-5 mt-0.5" />
              <div>
                <strong className="text-foreground">Cronograma Neurológico:</strong>
                <div className="text-foreground/70">Matemática no pico de atenção, Humanas no vale criativo</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Zap className="text-yellow-400 w-5 h-5 mt-0.5" />
              <div>
                <strong className="text-foreground">Resultado Comprovado:</strong>
                <div className="text-foreground/70">+340% produtividade, -78% procrastinação em 7 dias</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview da Funcionalidade */}
        <div className="bg-black/50 rounded-3xl p-4 border border-yellow-600/30">
          <h4 className="text-yellow-400 font-bold mb-3 text-center">📱 PREVIEW: Seu Cronograma IA</h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-green-600/20 p-2 rounded-lg">
              <span className="text-green-400">6h-9h • PICO CORTISOL</span>
              <span className="text-foreground font-bold">Matemática • Foco MAX</span>
            </div>
            
            <div className="flex justify-between items-center bg-blue-600/20 p-2 rounded-lg">
              <span className="text-blue-400">14h-17h • CRIATIVIDADE</span>
              <span className="text-foreground font-bold">Redação • Flow State</span>
            </div>
            
            <div className="flex justify-between items-center bg-purple-600/20 p-2 rounded-lg">
              <span className="text-purple-400">20h-22h • CONSOLIDAÇÃO</span>
              <span className="text-foreground font-bold">Revisão • Memória</span>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-red-400 text-xs">🔒 Disponível apenas na versão Premium</span>
          </div>
        </div>
        
        {/* Caso de Sucesso */}
        <div className="bg-gradient-to-r from-yellow-900/20 to-green-900/20 rounded-2xl p-4 border border-yellow-700/30">
          <div className="text-center">
            <p className="text-sm text-yellow-200">
              <strong>"Descobri que sou matutino extremo. Aplicando cronobiologia, minha nota subiu 380 pontos em 28 dias."</strong>
              <br />
              <span className="text-xs text-muted-foreground">- Marina S., aprovada Medicina UFMG</span>
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

export default SolutionChronobiology;
