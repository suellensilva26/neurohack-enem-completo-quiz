import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VSLScreen({ onNext }) {
  const [videoProgress, setVideoProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [absorptionLevel, setAbsorptionLevel] = useState(0);
  const [watchTime, setWatchTime] = useState(0); // Timer interno em segundos
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const absorptionMessages = [
    "🧠 Absorvendo neurociência...",
    "⚡ Conectando padrões de aprendizado...",
    "🎯 Processando protocolo de transformação...",
    "🚀 Cérebro pronto para implementação!"
  ];

  // Timer interno que só conta quando está "reproduzindo"
  useEffect(() => {
    let interval;
    if (isPlaying && watchTime < 180) { // 3 minutos = 180 segundos
      interval = setInterval(() => {
        setWatchTime(prev => {
          const newTime = prev + 1;
          const progressPercent = Math.min((newTime / 180) * 100, 100);
          setVideoProgress(progressPercent);
          
          // Absorção progressiva baseada no tempo assistido
          if (newTime >= 30 && absorptionLevel < 1) setAbsorptionLevel(1);
          if (newTime >= 60 && absorptionLevel < 2) setAbsorptionLevel(2);    
          if (newTime >= 120 && absorptionLevel < 3) setAbsorptionLevel(3);
          if (newTime >= 180 || progressPercent >= 90) {
            setShowButton(true);
            setIsPlaying(false);
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, watchTime, absorptionLevel]);

  // Progresso baseado no tempo assistido (0-100%)
  const displayProgress = Math.min((watchTime / 180) * 100, 100);

  // Formatação do tempo restante
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeRemaining = Math.max(180 - watchTime, 0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">

        {/* Header seguindo padrão original */}
        <div className="text-center space-y-4">
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-red-600/30 border border-red-500 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-red-400 text-sm font-bold">🎬 DEMONSTRAÇÃO EXCLUSIVA</span>
          </motion.div>
          
          <h1 className="text-xl font-bold text-white leading-tight">
            🧠 <span className="text-yellow-400">BASTIDORES:</span> Como hackear
            <br />
            seu cérebro em <span className="text-green-400">28 dias</span>
          </h1>
          
          <p className="text-sm text-gray-300">
            🔒 Primeira vez sendo mostrado publicamente
          </p>
        </div>
        
        {/* Video com timer visível */}
        <div className="relative">
          <div className="bg-black rounded-xl overflow-hidden border border-gray-700 shadow-lg">
            {/* Player visual com controles */}
            <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <motion.div
                className="text-center space-y-4"
                animate={{ opacity: isPlaying ? [0.7, 1, 0.7] : 1 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
              >
                <div className="text-6xl">🧠</div>
                <div className="text-white font-bold">NeuroHack Demo</div>
                <div className="text-gray-400 text-sm">
                  {isPlaying ? 'Absorvendo conhecimento...' : 'Clique para iniciar'}
                </div>
              </motion.div>
              
              {/* Controles de vídeo */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handlePlayPause}
                    className="text-white text-xl hover:scale-110 transition-transform"
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${displayProgress}%` }}
                    />
                  </div>
                  <span className="text-white text-xs">{`${formatTime(watchTime)} / 3:00 min`}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress com timer visível */}
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-xs text-gray-400">
              <span>🧠 Absorção Neurológica</span>
              <span>{Math.round(displayProgress)}% absorvido</span>
            </div>
            
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                style={{ width: `${displayProgress}%` }}
                animate={{ boxShadow: ["0 0 5px rgba(255,165,0,0.5)", "0 0 15px rgba(255,165,0,0.8)"] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>

            {/* Timer visível */}
            {!showButton && (
              <div className="text-center bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                <p className="text-yellow-400 text-sm font-bold">
                  ⏳ Faltam {formatTime(timeRemaining)} para liberar acesso
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {isPlaying ? 'Assistindo...' : 'Pausado - clique ▶️ para continuar'}
                </p>
              </div>
            )}
            
            {/* Feedback de absorção */}
            {absorptionLevel > 0 && (
              <motion.div 
                className="text-center bg-gray-800/50 rounded-xl p-3 border border-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={absorptionLevel}
              >
                <p className="text-yellow-400 text-sm font-bold">
                  {absorptionMessages[absorptionLevel - 1]}
                </p>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* CTA liberado após 3min */}
        {showButton ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center bg-green-600/20 rounded-xl p-4 border border-green-500/50">
              <h3 className="text-green-400 font-bold mb-2">🎉 ACESSO NEUROLÓGICO LIBERADO!</h3>
              <p className="text-white text-sm">
                Você assistiu tempo suficiente para entender o poder do NeuroHack.
                <br />
                <strong>Agora é hora de implementar!</strong>
              </p>
            </div>
            
            <motion.button
              onClick={onNext}
              className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-sm font-black rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.5)] relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            >
              🚀 QUERO ACESSO COMPLETO AGORA!
            </motion.button>
            
            <div className="text-center">
              <p className="text-xs text-green-400">
                ⚡ Acesso imediato • 🎯 Protocolo personalizado • 🛡️ Garantia total
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="text-4xl animate-pulse">🔒</div>
            <h3 className="text-white font-bold text-sm">Continue assistindo...</h3>
            <p className="text-gray-400 text-xs">
              Acesso liberado automaticamente após 3:00 de vídeo
            </p>
            <div className="bg-yellow-900/30 rounded-xl p-3 border border-yellow-500/50">
              <p className="text-yellow-400 text-xs">
                🧠 <strong>Neurociência aplicada:</strong> Você precisa absorver o conceito 
                antes de implementar a transformação
              </p>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}