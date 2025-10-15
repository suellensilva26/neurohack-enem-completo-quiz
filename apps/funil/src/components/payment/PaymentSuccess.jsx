import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function PaymentSuccess({ onAccessQuiz }) {
  useEffect(() => {
    // Simular envio de email de boas-vindas
    console.log('📧 Enviando email de boas-vindas...');
    
    // Simular liberação de acesso
    console.log('🔓 Liberando acesso ao produto...');
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto text-center space-y-8">
        
        {/* Ícone de Sucesso */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-white mb-4">
            🎉 Pagamento Aprovado!
          </h1>
          <p className="text-gray-400 text-lg">
            Bem-vindo ao <span className="text-yellow-400 font-bold">NeuroHack ENEM 2025</span>
          </p>
        </motion.div>

        {/* Detalhes do Acesso */}
        <motion.div
          className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/50 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-green-400 font-bold text-xl">
            🧠 Seu Acesso Foi Liberado!
          </h2>
          
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-green-400">✅</span>
              <span className="text-white text-sm">Quiz Diagnóstico Personalizado</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-400">✅</span>
              <span className="text-white text-sm">Sistema de Estudos Otimizado</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-400">✅</span>
              <span className="text-white text-sm">Técnicas de Memorização</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-400">✅</span>
              <span className="text-white text-sm">Acesso Vitalício</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-400">✅</span>
              <span className="text-white text-sm">Suporte Especializado</span>
            </div>
          </div>
        </motion.div>

        {/* Próximos Passos */}
        <motion.div
          className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-blue-400 font-bold text-lg mb-4">
            🚀 Próximos Passos:
          </h3>
          
          <div className="space-y-3 text-left text-gray-300 text-sm">
            <p>1. 📧 Verifique seu email com as instruções</p>
            <p>2. 🧠 Faça o quiz diagnóstico personalizado</p>
            <p>3. 📚 Receba seu plano de estudos otimizado</p>
            <p>4. 🎯 Comece sua jornada para a aprovação</p>
          </div>
        </motion.div>

        {/* Botão de Acesso */}
        <motion.button
          onClick={onAccessQuiz}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          🧬 ACESSAR MEU QUIZ PERSONALIZADO
        </motion.button>

        {/* Informações Adicionais */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-400 text-xs">
            💌 Um email de confirmação foi enviado para você
          </p>
          <p className="text-gray-400 text-xs">
            🆘 Precisa de ajuda? Entre em contato conosco
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
