import { motion } from 'framer-motion';
import { FileText, Award, BookOpen } from 'lucide-react';

interface SolutionRedacaoProps {
  onContinue: () => void;
}

const SolutionRedacao = ({ onContinue }: SolutionRedacaoProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-foreground">
            📐 <span className="text-green-400">FÓRMULA CORINGA:</span>
            <br />
            Matemática da <span className="text-yellow-400">redação nota 1000</span>
          </h2>
        </motion.div>
        
        {/* Vídeo Demo Fórmula */}
        <div className="w-full h-48 rounded-3xl overflow-hidden shadow-[0_0_25px_hsl(var(--status-success))]">
          <video controls className="w-full h-full object-cover" poster="/videos/formula-coringa-demo.jpg">
            <source src="/videos/formula-coringa-funcionando.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* A Fórmula Revelada */}
        <div className="bg-gradient-to-br from-yellow-900/30 to-green-900/30 rounded-3xl p-6 border border-yellow-700/30">
          <h3 className="text-lg font-bold text-yellow-400 mb-4 text-center flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" />
            ESTRUTURA MATEMÁTICA:
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="bg-black/40 rounded-lg p-3 border-l-4 border-yellow-500">
              <div className="font-bold text-yellow-400">Introdução: 7-8 linhas (25%)</div>
              <div className="text-foreground/70">Contexto + Problema + Tese</div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-3 border-l-4 border-green-500">
              <div className="font-bold text-green-400">Desenvolvimento 1: 7-8 linhas (25%)</div>
              <div className="text-foreground/70">Argumento + Repertório + Conclusão</div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-3 border-l-4 border-blue-500">
              <div className="font-bold text-blue-400">Desenvolvimento 2: 7-8 linhas (25%)</div>
              <div className="text-foreground/70">Argumento + Repertório + Conclusão</div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-3 border-l-4 border-purple-500">
              <div className="font-bold text-purple-400">Conclusão: 7-8 linhas (25%)</div>
              <div className="text-foreground/70">Retomada + Proposta com 5 elementos</div>
            </div>
          </div>
          
          <div className="text-center mt-4 p-3 bg-green-600/20 rounded-lg">
            <div className="text-green-400 font-bold">= 30 LINHAS EXATAS</div>
            <div className="text-xs text-foreground/70">Proporção áurea que hipnotiza corretor</div>
          </div>
        </div>
        
        {/* Repertórios Universais */}
        <div className="bg-black/50 rounded-3xl p-4 border border-orange-600/30">
          <h4 className="text-orange-400 font-bold mb-3 text-center flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            12 REPERTÓRIOS UNIVERSAIS:
          </h4>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-800/50 p-2 rounded-lg">
              <div className="text-yellow-400 font-bold">Zygmunt Bauman</div>
              <div className="text-muted-foreground">Modernidade Líquida</div>
            </div>
            <div className="bg-gray-800/50 p-2 rounded-lg">
              <div className="text-yellow-400 font-bold">Constituição 88</div>
              <div className="text-muted-foreground">Direitos fundamentais</div>
            </div>
            <div className="bg-gray-800/50 p-2 rounded-lg">
              <div className="text-yellow-400 font-bold">Hannah Arendt</div>
              <div className="text-muted-foreground">Banalidade do mal</div>
            </div>
            <div className="bg-gray-800/50 p-2 rounded-lg">
              <div className="text-yellow-400 font-bold">Dados IBGE</div>
              <div className="text-muted-foreground">Estatísticas oficiais</div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <span className="text-red-400 text-xs">🔒 Fórmula completa no Premium</span>
          </div>
        </div>
        
        {/* Resultado Final */}
        <div className="bg-gradient-to-r from-green-900/20 to-yellow-900/20 rounded-2xl p-4 border border-green-700/30">
          <div className="text-center">
            <p className="text-sm text-green-200">
              <strong>"Aplicando a Fórmula Coringa, tirei 980 na redação. Nunca mais fiquei em branco."</strong>
              <br />
              <span className="text-xs text-muted-foreground">- Beatriz L., Direito USP • Era a nota que faltava</span>
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
          Ver Meu Resultado →
        </motion.button>
        
      </div>
    </div>
  );
};

export default SolutionRedacao;
