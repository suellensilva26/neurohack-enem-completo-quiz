import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SocialProofDemo({ onNext, funnelData }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [liveStats, setLiveStats] = useState({
    studying: 847,
    approved: 3247,
    online: 234
  });
  // Avatares 100% offline (data URI SVG) para evitar chamadas externas

  const testimonials = [
    {
      name: "Maria S.",
      course: "Medicina - UFMG",
      score: "890 pontos",
      text: "Estava desesperada com 2 meses pro ENEM. O NeuroHack me salvou! Passei em Medicina na primeira tentativa!",
      avatar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="80" fill="%23b6e3f4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="72" fill="%23262e33">M</text></svg>',
      verified: true
    },
    {
      name: "Carlos R.",
      course: "Engenharia - USP",
      score: "845 pontos",
      text: "Procrastinei o ano todo. Em 28 dias com NeuroHack meu cérebro virou uma máquina. Nota 900+ na redação!",
      avatar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="80" fill="%23c0aede"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="72" fill="%233c4f5c">C</text></svg>',
      verified: true
    },
    {
      name: "Ana L.",
      course: "Direito - PUC",
      score: "912 pontos",
      text: "Não conseguia focar nem 10 min. Hoje estudo 6h sem esforço. O protocolo neurológico REALMENTE funciona!",
      avatar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="80" fill="%23ffd5dc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="72" fill="%23ff488e">A</text></svg>',
      verified: true
    }
  ];

  useEffect(() => {
    // Rotação automática a cada 4s
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    const ctaTimer = setTimeout(() => setShowCTA(true), 8000);

    // Stats "ao vivo" com números aleatórios
    const statsTimer = setInterval(() => {
      setLiveStats(prev => ({
        studying: prev.studying + Math.floor(Math.random() * 3),
        approved: prev.approved + Math.floor(Math.random() * 2),
        online: prev.online + Math.floor(Math.random() * 5) - 2
      }));
    }, 3000);

    return () => {
      clearInterval(testimonialTimer);
      clearTimeout(ctaTimer);
      clearInterval(statsTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Header - Padrão original */}
        <div className="text-center space-y-3">
          <motion.div
            className="text-5xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🎯
          </motion.div>
          
          <h1 className="text-xl font-bold text-white leading-tight">
            👥 Eles também tinham <span className="text-red-400">BLOQUEIOS</span>
            <br />
            Hoje estão <span className="text-green-400">APROVADOS</span>
          </h1>
        </div>

        {/* Testemunho rotativo com avatares reais */}
        <div className="relative h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 transform-gpu"
              style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            >
              <div className="text-center space-y-4">
                {/* Avatar com verificação */}
                <div className="relative inline-block">
                  <img 
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full border-4 border-green-500 mx-auto"
                    loading="eager"
                    decoding="async"
                  />
                  {testimonials[currentTestimonial].verified && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="min-h-[80px]">
                  <div className="text-white font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-green-400 text-sm">{testimonials[currentTestimonial].course}</div>
                  <div className="text-yellow-400 font-black text-xl mt-1">
                    {testimonials[currentTestimonial].score}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm italic leading-relaxed min-h-[60px]">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                {/* Removidas as estrelas para liberar espaço */}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Indicadores */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full ${index === currentTestimonial ? 'bg-green-400 w-6' : 'bg-gray-600'} transition-all`}
              />
            ))}
          </div>
        </div>

        

        {/* Success Pattern - Padrão original */}
        <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
          <h3 className="text-center text-blue-400 font-bold mb-4">
            🧬 O QUE TODOS ELES FIZERAM:
          </h3>
          
          <div className="space-y-3 text-sm">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-green-400">✓</span>
              <span className="text-gray-300">Usaram a IA de cronobiologia personalizada</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-green-400">✓</span>
              <span className="text-gray-300">Aplicaram a fórmula coringa de redação</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-green-400">✓</span>
              <span className="text-gray-300">Reprogramaram o cérebro com spaced repetition</span>
            </motion.div>
          </div>
        </div>
        
        {/* Stats ao vivo (reposicionado abaixo para evitar conflito) */}
        <div className="bg-black/60 rounded-2xl p-4 border border-gray-600 mt-8">
          <h3 className="text-red-400 font-bold text-center mb-3">🔴 AO VIVO AGORA:</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-green-900/30 rounded-lg">
              <span className="text-white text-xs">✅ Aprovados hoje:</span>
              <span className="text-green-400 font-bold font-mono tabular-nums min-w-[4ch] text-right">+{liveStats.approved}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-900/30 rounded-lg">
              <span className="text-white text-xs">📊 Estudando agora:</span>
              <span className="text-blue-400 font-bold font-mono tabular-nums min-w-[4ch] text-right">{liveStats.studying}</span>
            </div>
          </div>
        </div>
        
        {/* Curiosity + FOMO CTA - Copywriting impactante */}
        {showCTA && (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center">
              <p className="text-yellow-400 text-sm font-bold mb-2">
                🎬 QUER VER EXATAMENTE COMO ELES FIZERAM?
              </p>
              <p className="text-white text-xs">
                Vou te mostrar os <strong>bastidores</strong> do método que está 
                <strong> transformando vidas</strong> em tempo recorde
              </p>
            </div>
            
            <motion.button
              onClick={onNext}
              className="w-full h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-sm font-black rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.5)] relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            >
              <motion.span 
                className="relative z-10"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎥 VER BASTIDORES DO MÉTODO
              </motion.span>
            </motion.button>
            
            <div className="text-center">
              <p className="text-xs text-red-400">
                ⚠️ <strong>ACESSO LIMITADO:</strong> Apenas mais 73 vagas hoje
              </p>
            </div>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}