import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getENEMCountdown } from '../utils/enemCountdown';

export default function SuperCheckout({ funnelData }) {
  const [urgencyLevel, setUrgencyLevel] = useState(1);
  const [couponTimer, setCouponTimer] = useState(900); // 15 minutes
  const [showNotification, setShowNotification] = useState(false);
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(397.00);
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const { days, urgency, color } = getENEMCountdown();

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj2m2/LGeCcFLYPO8tiJOQcZabrq559NEAxQp+PwtmMcBj2m2/LGeCcFLYPO8tiJOQcZabrq');
    audio.play().catch(console.error);
  };

  const startCouponTimer = () => {
    const interval = setInterval(() => {
      setCouponTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setUrgencyLevel(4); // Maximum urgency
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const applyCoupon = () => {
    if (couponCode === 'NEUROHACK50' && couponTimer > 0) {
      setCouponApplied(true);
      setFinalPrice(198.50);
    }
  };

  const handleUseCoupon = () => {
    // Apenas fechar popup e preencher input manualmente
    setCouponCode('NEUROHACK50');
    setShowCouponPopup(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getUrgencyMessage = () => {
    switch(urgencyLevel) {
      case 1: return "⚡ Transforme seu cérebro hoje mesmo";
      case 2: return "🔥 Últimas 73 vagas disponíveis";    
      case 3: return "🚨 ATENÇÃO: Timer de desconto ativo";
      case 4: return "💀 ÚLTIMA CHANCE: Desconto expirando";
      default: return "⚡ Garante sua aprovação no ENEM";
    }
  };

  useEffect(() => {
    // CORREÇÃO: Popup após 30 segundos (não 15)
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
      playNotificationSound();

      // Depois de 2 segundos, mostrar cupom
      setTimeout(() => {
        setShowNotification(false);
        setShowCouponPopup(true);
        startCouponTimer();
      }, 2000);
    }, 30000); // ← CORRIGIDO: 30 segundos

    // Escalate urgency over time
    const urgencyTimer1 = setTimeout(() => setUrgencyLevel(2), 30000); // 30s
    const urgencyTimer2 = setTimeout(() => setUrgencyLevel(3), 60000); // 1min
    const urgencyTimer3 = setTimeout(() => setUrgencyLevel(4), 120000); // 2min

    return () => {
      clearTimeout(notificationTimer);
      clearTimeout(urgencyTimer1);
      clearTimeout(urgencyTimer2);
      clearTimeout(urgencyTimer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6">
      <div className="max-w-sm mx-auto space-y-6">

        {/* Header with urgency dinâmica */}
        <div className="text-center space-y-4">
          <motion.div 
            className={`inline-flex items-center px-4 py-2 border rounded-full bg-${color}-600/30 border-${color}-500 ${days <= 15 ? 'animate-pulse' : ''}`}
            animate={{ scale: days <= 15 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: days <= 15 ? Infinity : 0 }}
          >
            <span className={`text-sm font-bold text-${color}-400`}>
              ⚠️ SITUAÇÃO {urgency}: {days} DIAS PARA O ENEM
            </span>
          </motion.div>
          
          <h1 className="text-xl font-bold text-white">
            🧠 <span className="text-yellow-400">NeuroHack ENEM 2025</span>
          </h1>
          <p className="text-sm text-gray-300">
            Sistema de reprogramação neurológica • Acesso vitalício
          </p>
        </div>
        
        {/* Social proof banner - Padrão original */}
        <motion.div 
          className="bg-blue-900/30 rounded-2xl p-4 border border-blue-500/50"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-center">
            <p className="text-blue-400 font-bold text-sm mb-2">
              🔴 AO VIVO: Comprando agora
            </p>
            <div className="text-white text-xs">
              <span className="text-green-400 font-bold">Sarah M.</span> - Medicina UFMG
              <br />
              <span className="text-green-400 font-bold">Carlos R.</span> - Engenharia USP
              <br />
              <span className="text-green-400 font-bold">Ana L.</span> - Direito PUC
            </div>
          </div>
        </motion.div>

        {/* Value Stack REALISTA - 11 itens */}
        <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
          <h3 className="text-center text-yellow-400 font-bold text-lg mb-4">
            🎁 TUDO QUE VOCÊ VAI RECEBER HOJE:
          </h3>
          
          <div className="space-y-3 text-sm">
            {[
              { 
                item: "🧠 NeuroHack ENEM Core - Plataforma Completa", 
                value: "R$ 197",
                desc: "Acesso vitalício ao sistema de aprendizado neurológico com IA personalizada"
              },
              { 
                item: "📚 8 E-books Premium Exclusivos", 
                value: "R$ 147",
                desc: "Padrões ENEM, Redação Nota 1000, Macetes, Revisão Express e mais"
              },
              { 
                item: "🎮 Abas Interativas Gamificadas", 
                value: "R$ 87",
                desc: "Sistema de recompensas que hackeia procrastinação usando dopamina"
              },
              { 
                item: "⚡ Sistema de Aprendizado Acelerado", 
                value: "R$ 127",
                desc: "Protocolo que multiplica velocidade de absorção por 7x"
              },
              { 
                item: "🧬 IA Cronobiologia Personalizada", 
                value: "R$ 97",
                desc: "Algoritmo identifica seus picos neurológicos únicos"
              },
              { 
                item: "🔄 Spaced Repetition Inteligente", 
                value: "R$ 87",
                desc: "Retenção de 94% vs 31% dos métodos tradicionais"
              },
              { 
                item: "🎯 Banco de Dados +47.000 Questões", 
                value: "R$ 157",
                desc: "Questões avaliadas e categorizadas por IA para máxima eficiência"
              },
              { 
                item: "📝 Fórmula Coringa Redação Nota 1000", 
                value: "R$ 67",
                desc: "Estrutura das únicas 12 redações nota 1000 de 2024"
              },
              { 
                item: "🔥 BÔNUS: Protocolo Anti-Procrastinação", 
                value: "R$ 127",
                desc: "Elimina 89% da procrastinação em 7 dias usando neuroplasticidade"
              },
              { 
                item: "💬 Suporte Especializado 24/7 por 1 ano", 
                value: "R$ 197",
                desc: "Time de neurologistas monitora seu progresso"
              },
              { 
                item: "🛡️ Garantia Incondicional 30 dias", 
                value: "Sem preço",
                desc: "Não funcionou? Devolvemos 100% sem perguntas"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="p-3 bg-gray-700/30 rounded-xl border border-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white font-semibold text-xs flex-1">{benefit.item}</span>
                  <span className="text-green-400 font-bold text-xs ml-2">{benefit.value}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="border-t border-gray-600 mt-4 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">VALOR TOTAL REAL:</span>
              <span className="text-gray-400 line-through text-lg">R$ 1.087,00</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">PREÇO SEM DESCONTO:</span>
              <span className="text-yellow-400 text-xl font-bold">R$ 397,00</span>
            </div>
            <div className="bg-green-600/20 rounded-xl p-3 border border-green-500/50">
              <div className="flex justify-between items-center">
                <span className="text-white font-black">HOJE COM NEUROHACK50:</span>
                <span className="text-green-400 text-2xl font-black">R$ 198,50</span>
              </div>
              <p className="text-green-200 text-xs mt-2 text-center">
                💰 Você economiza <strong>R$ 888,50</strong> (82% OFF) • Apenas nesta página!
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Form - Campo cupom sempre habilitado */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 space-y-4">
          <h3 className="text-center text-white font-bold text-lg">
            🚀 GARANTIR MINHA TRANSFORMAÇÃO
          </h3>
          
          {/* Name Field */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">👤 Nome completo:</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          {/* Coupon Field - SEMPRE habilitado para entrada manual */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">🎫 Cupom de desconto:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Digite: NEUROHACK50"
                disabled={couponApplied}
                className={`flex-1 px-4 py-3 bg-gray-800 border ${couponApplied ? 'opacity-60 cursor-not-allowed border-gray-700' : 'border-gray-600'} rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
              />
              <button
                onClick={applyCoupon}
                disabled={couponApplied}
                aria-disabled={couponApplied}
                className={`px-6 py-3 ${couponApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-yellow-600 hover:scale-105'} text-white font-bold rounded-xl transition-transform`}
              >
                {couponApplied ? 'APLICADO' : 'APLICAR'}
              </button>
            </div>
          </div>

          {/* Coupon Applied Success */}
          {couponApplied && (
            <motion.div
              className="bg-green-900/30 rounded-xl p-3 border border-green-500/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-center">
                <p className="text-green-400 font-bold">🎉 CUPOM APLICADO COM SUCESSO!</p>
                <p className="text-white text-sm">Você economizou R$ 198,50</p>
              </div>
            </motion.div>
          )}

          {/* Final CTA Button */}
          <motion.button
            className="w-full h-14 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-black text-sm font-black rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.8)] relative overflow-hidden"
            animate={{ 
              boxShadow: [
                "0 0 50px rgba(34,197,94,0.8)",
                "0 0 70px rgba(34,197,94,1)",
                "0 0 50px rgba(34,197,94,0.8)"
              ],
              transition: { boxShadow: { duration: 1.5, repeat: Infinity } }
            }}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.05, transition: { type: 'spring', stiffness: 250, damping: 18 } },
              tap: { scale: 0.98, transition: { type: 'spring', stiffness: 250, damping: 18 } }
            }}
            onClick={() => alert('Compra finalizada! Redirecionando para pagamento...')}
          >
            <span className="relative z-10">
              💳 FINALIZAR COMPRA - R$ {finalPrice.toFixed(2)}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer" />
          </motion.button>

          {/* Security badges */}
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
            <span>🔒 Pagamento Seguro</span>
            <span>🛡️ SSL Certificado</span>
            <span>✅ Garantia 30 dias</span>
          </div>
        </div>

      </div>

      {/* Notification Popup - 30 segundos */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 border border-blue-500 shadow-2xl"
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="text-2xl"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 0.6, repeat: 3 }}
              >
                🎁
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-sm">Cupom Especial!</h4>
                <p className="text-blue-200 text-xs">Você ganhou 50% OFF!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coupon Popup */}
      <AnimatePresence>
        {showCouponPopup && !couponApplied && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-3xl p-8 max-w-sm w-full border-4 border-yellow-400 shadow-[0_0_50px_rgba(255,193,7,0.8)]"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  className="text-6xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🎉
                </motion.div>
                
                <div>
                  <h2 className="text-2xl font-black text-black mb-2">
                    CUPOM EXPLOSIVO!
                  </h2>
                  <p className="text-black/80 text-sm">
                    Você foi <strong>selecionado</strong> para receber nosso cupom mais poderoso!
                  </p>
                </div>
                
                <div className="bg-black/20 rounded-2xl p-4 border-2 border-dashed border-black/40">
                  <div className="text-3xl font-black text-black">50% OFF</div>
                  <div className="text-black font-bold">NEUROHACK50</div>
                  <div className="text-xs text-black/70 mt-2">
                    ⏰ Válido por apenas {formatTime(couponTimer)}
                  </div>
                </div>
                
                <motion.button
                  onClick={handleUseCoupon}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-sm font-black rounded-2xl shadow-lg"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(34,197,94,0.5)",
                      "0 0 40px rgba(34,197,94,0.8)"
                    ],
                    transition: { boxShadow: { duration: 1.2, repeat: Infinity } }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                >
                  APLICAR
                </motion.button>
                
                <p className="text-black/80 text-xs">
                  ⚠️ <strong>ATENÇÃO:</strong> Digite o cupom manualmente no campo abaixo
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}