import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getENEMCountdown, getUrgencyColor, getUrgencyMessage } from '../utils/enemCountdown';

export default function DiagnosticScreen({ onNext, funnelData }) {
  const [showResults, setShowResults] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState([]);
  const { days } = getENEMCountdown();

  useEffect(() => {
    // Simulate analysis
    const timer1 = setTimeout(() => setShowResults(true), 2000);
    const timer2 = setTimeout(() => setAnalysisComplete(true), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (showResults) {
      // Aparecer sequencialmente com delays 0ms, 300ms (mobile timing)
      const timings = [0, 300];
      
      timings.forEach((delay, index) => {
        setTimeout(() => {
          setVisibleMetrics(prev => [...prev, index]);
        }, delay);
      });
    }
  }, [showResults]);

  const metrics = [
    { 
      label: "Alto", 
      sublabel: "Nível de Bloqueio", 
      value: "23%", 
      sublabel2: "Capacidade de Foco", 
      color: "red",
      description: "Padrões neurológicos indicam bloqueios severos"
    },
    { 
      label: "31%", 
      sublabel: "Retenção de Memória", 
      value: "Elevado", 
      sublabel2: "Nível de Ansiedade", 
      color: "orange",
      description: "Circuitos de ansiedade interferindo no aprendizado"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            className="text-5xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🔬
          </motion.div>
          
          <h1 className="text-xl font-bold text-white leading-tight">
            <span className="text-red-400">Diagnóstico Neurológico</span>
            <br />
            Concluído
          </h1>
          
          <p className="text-sm text-gray-300">
            Analisamos seus padrões cerebrais e identificamos os bloqueios
          </p>
        </div>

        {/* Contagem dinâmica com urgência */}
        <motion.div 
          className={`bg-gradient-to-r ${getUrgencyColor(days)} rounded-2xl p-6 border ${days <= 15 ? 'animate-pulse' : ''}`}
          animate={{ 
            scale: days <= 15 ? [1, 1.02, 1] : 1,
            x: days <= 7 ? [0, -2, 2, -2, 2, 0] : 0
          }}
          transition={{ duration: 1.5, repeat: days <= 15 ? Infinity : 0 }}
        >
          <div className="text-center space-y-4">
            <h3 className="text-red-400 font-bold text-lg">
              {getUrgencyMessage(days)}
            </h3>
            <motion.div 
              className="text-white font-black text-4xl"
              animate={{ 
                scale: days <= 15 ? [1, 1.1, 1] : 1,
                color: days <= 15 ? ['#ffffff', '#ef4444', '#ffffff'] : '#ffffff'
              }}
              transition={{ duration: 1, repeat: days <= 15 ? Infinity : 0 }}
            >
              {days} DIAS PARA O ENEM
            </motion.div>
            <p className="text-red-200 text-sm">
              Cada dia perdido = <strong>{((days / 100) * 2).toFixed(1)}% menos</strong> chance de reverter bloqueios neurológicos
            </p>
          </div>
        </motion.div>

        {/* Analysis Loading */}
        {!showResults && (
          <div className="text-center py-8">
            <motion.div
              className="text-4xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🧠
            </motion.div>
            <p className="text-white font-bold">Analisando padrões neurológicos...</p>
            <p className="text-gray-400 text-sm mt-2">Processando 127 variáveis cerebrais</p>
          </div>
        )}

        {/* Results Cards - Animação acelerada */}
        {showResults && (
          <div className="space-y-4">
            <h3 className="text-center text-red-400 font-bold text-lg mb-4">
              📊 RESULTADOS CRÍTICOS:
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className={`bg-gray-800/50 rounded-2xl p-4 border border-gray-700 ${
                    visibleMetrics.includes(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: visibleMetrics.includes(index) ? 1 : 0,
                    scale: visibleMetrics.includes(index) ? 1 : 0.8,
                    y: visibleMetrics.includes(index) ? 0 : 20
                  }}
                  transition={{ 
                    type: "spring",
                    duration: 0.4
                  }}
                >
                  <div className="text-center space-y-2">
                    <div className={`text-2xl font-black ${
                      metric.color === 'red' ? 'text-red-400' : 'text-orange-400'
                    }`}>
                      {metric.label}
                    </div>
                    <div className="text-xs text-gray-400">{metric.sublabel}</div>
                    <div className={`text-lg font-bold ${
                      metric.color === 'red' ? 'text-red-400' : 'text-orange-400'
                    }`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-400">{metric.sublabel2}</div>
                    <p className="text-xs text-gray-300 mt-2">{metric.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Critical Analysis */}
        {analysisComplete && (
          <motion.div
            className="bg-red-900/30 rounded-2xl p-6 border border-red-500/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-red-400 font-bold text-center mb-4">
              ⚠️ DIAGNÓSTICO CRÍTICO
            </h4>
            
            <div className="space-y-3 text-sm text-white">
              <p>
                <strong>🧠 Bloqueios Neurológicos Severos:</strong> Seus padrões cerebrais mostram 
                interferência significativa nos circuitos de aprendizado.
              </p>
              <p>
                <strong>⏰ Situação Temporal Crítica:</strong> Com apenas {days} dias restantes, 
                você precisa de intervenção neurológica IMEDIATA.
              </p>
              <p>
                <strong>🎯 Protocolo Recomendado:</strong> NeuroHack ENEM - único sistema 
                capaz de reverter esses bloqueios em tempo hábil.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        {analysisComplete && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={onNext}
              className="w-full h-14 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white text-sm font-black rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.5)] relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            >
              <motion.span 
                className="relative z-10"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🧬 DESCOBRIR A SOLUÇÃO NEUROLÓGICA
              </motion.span>
            </motion.button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                👆 <strong>URGENTE:</strong> Solução personalizada baseada no seu diagnóstico
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}