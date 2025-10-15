import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getENEMCountdown, getUrgencyColor, getUrgencyMessage } from '../utils/enemCountdown';

export default function SolutionReveal({ onNext, funnelData }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const [showCTA, setShowCTA] = useState(false);
  const { days, urgency, color } = getENEMCountdown();

  useEffect(() => {
    // Timing mobile: 0ms, 300ms, 600ms, 900ms
    const delays = [0, 300, 600, 900];
    
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, delay);
    });

    // Show CTA after all cards are visible
    setTimeout(() => setShowCTA(true), 2000);
  }, []);

  const results = [
    {
      title: "BLOQUEIOS IDENTIFICADOS",
      value: "Alto",
      subtitle: "Nível crítico detectado",
      color: "red",
      icon: "🚨"
    },
    {
      title: "CAPACIDADE DE FOCO",
      value: "23%",
      subtitle: "Abaixo do necessário",
      color: "orange", 
      icon: "🎯"
    },
    {
      title: "RETENÇÃO DE MEMÓRIA",
      value: "31%",
      subtitle: "Precisa intervenção",
      color: "yellow",
      icon: "🧠"
    },
    {
      title: "POTENCIAL REAL",
      value: "94%",
      subtitle: "Com NeuroHack ativo",
      color: "green",
      icon: "⚡"
    }
  ];

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
            🔬
          </motion.div>
          
          <h1 className="text-xl font-bold text-white leading-tight">
            Descobrimos o <span className="text-red-400">ÚNICO PROTOCOLO</span>
            <br />
            que pode <span className="text-green-400">REVERTER</span> seus bloqueios
          </h1>
          
          <p className="text-sm text-gray-300">
            Baseado em neuroplasticidade e 127 estudos científicos
          </p>
        </div>

        {/* Urgência dinâmica com contagem real */}
        <motion.div 
          className={`bg-gradient-to-r ${getUrgencyColor(days)} rounded-2xl p-4 border`}
          animate={{ 
            scale: days <= 15 ? [1, 1.02, 1] : 1,
            x: days <= 7 ? [0, -2, 2, -2, 2, 0] : 0
          }}
          transition={{ duration: 1.5, repeat: days <= 15 ? Infinity : 0 }}
        >
          <div className="text-center">
            <h3 className={`text-${color}-400 font-bold mb-2`}>
              ⚠️ ATENÇÃO: {days} DIAS PARA O ENEM
            </h3>
            <p className={`text-${color}-200 text-xs`}>
              Cada dia perdido é uma oportunidade de transformação que não volta.
              <br />
              <strong>Não deixe seu futuro para depois!</strong>
            </p>
          </div>
        </motion.div>

        {/* Results Grid - Timing acelerado */}
        <div className="grid grid-cols-2 gap-4">
          {results.map((result, index) => (
            <motion.div
              key={index}
              className={`bg-gray-800/50 rounded-2xl p-4 border border-gray-700 ${
                visibleCards.includes(index) ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: visibleCards.includes(index) ? 1 : 0,
                scale: visibleCards.includes(index) ? 1 : 0.8,
                y: visibleCards.includes(index) ? 0 : 20
              }}
              transition={{ 
                type: "spring",
                duration: 0.4
              }}
            >
              <div className="text-center space-y-2">
                <div className="text-2xl">{result.icon}</div>
                <div className={`text-2xl font-black text-${result.color}-400`}>
                  {result.value}
                </div>
                <div className="text-xs text-gray-400 font-bold">
                  {result.title}
                </div>
                <div className="text-xs text-gray-500">
                  {result.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personalized Message - Padrão original */}
        {visibleCards.length === 4 && (
          <motion.div
            className="bg-blue-900/30 rounded-2xl p-6 border border-blue-500/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-blue-400 font-bold text-center mb-4">
              🎯 ISSO É ESPECÍFICO PARA VOCÊ:
            </h3>
            
            <div className="space-y-3 text-sm text-white">
              <p>
                <strong>Baseado em suas respostas,</strong> identificamos que você tem 
                bloqueios neurológicos severos que estão sabotando seu potencial.
              </p>
              <p>
                <strong>A boa notícia:</strong> Existe um protocolo científico específico 
                que pode reverter esses padrões em apenas 28 dias.
              </p>
              <p>
                <strong>O NeuroHack ENEM</strong> foi desenvolvido exatamente para casos 
                como o seu - estudantes com alto potencial bloqueado por padrões neurológicos limitantes.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Button - Padrão original */}
        {showCTA && (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-center">
              <p className="text-yellow-400 text-sm font-bold mb-2">
                🧬 PROTOCOLO PERSONALIZADO DISPONÍVEL
              </p>
              <p className="text-white text-xs">
                Vou te mostrar <strong>exatamente como</strong> outros estudantes 
                com o mesmo perfil conseguiram <strong>transformar seus cérebros</strong>
              </p>
            </div>
            
            <button
              onClick={onNext}
              className="w-full h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-black rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.5)] relative overflow-hidden transform hover:scale-105 transition-all"
            >
              <motion.span 
                className="relative z-10"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🧬 VER COMO FUNCIONA NA PRÁTICA
              </motion.span>
            </button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                👆 <strong>EXCLUSIVO:</strong> Casos reais de transformação neurológica
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}