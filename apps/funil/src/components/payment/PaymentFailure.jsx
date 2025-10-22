import { motion } from 'framer-motion';

export default function PaymentFailure() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 text-center"
      >
        <div className="text-6xl mb-6">❌</div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Pagamento Não Aprovado
        </h1>
        <p className="text-gray-400 mb-6">
          Houve um problema com seu pagamento. Tente novamente.
        </p>
        
        <div className="bg-red-600/20 rounded-lg p-4 border border-red-500/50 mb-6">
          <h3 className="text-red-400 font-bold text-lg mb-2">
            ⚠️ O que fazer agora?
          </h3>
          <p className="text-red-200 text-sm">
            Verifique seus dados e tente novamente, ou entre em contato conosco.
          </p>
        </div>

        <div className="space-y-3">
          <a 
            href="/vendas" 
            className="block w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            🔄 Tentar Novamente
          </a>
          <a 
            href="/" 
            className="block w-full bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
          >
            🏠 Voltar ao Início
          </a>
        </div>
      </motion.div>
    </div>
  );
}



