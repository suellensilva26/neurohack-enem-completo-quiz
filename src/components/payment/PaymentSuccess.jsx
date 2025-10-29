import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setIsLoading(false);
      return;
    }

    // ═════════════════════════════════════════════════════════
    // OPCIONAL: Fazer verificação do pagamento no backend
    // ═════════════════════════════════════════════════════════

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log('[Success] Payment verified:', data);
        }
      } catch (error) {
        console.error('[Success] Verification error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <motion.div 
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-white">Processando seu pagamento...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 text-center"
      >
        <motion.div 
          className="text-6xl mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          ✅
        </motion.div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Pagamento Confirmado!
        </h1>
        <p className="text-gray-400 mb-6">
          Obrigado por sua compra. Seu acesso premium foi ativado.
        </p>
        
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/50 mb-6">
          <h3 className="text-blue-400 font-bold text-sm mb-2">
            🎉 Próximos passos:
          </h3>
          <ul className="text-gray-300 text-xs text-left space-y-1">
            <li>✓ Acesso total ao app NeuroHack desbloqueado</li>
            <li>✓ Todos os simulados disponíveis</li>
            <li>✓ Conteúdo premium liberado</li>
            <li>✓ Suporte prioritário ativado</li>
          </ul>
        </div>

        <div className="space-y-3">
          <a 
            href="/quiz" 
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            🚀 Acessar Quiz
          </a>
          <a 
            href="/" 
            className="block w-full bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
          >
            🏠 Voltar ao Início
          </a>
        </div>

        {sessionId && (
          <div className="mt-4 text-xs text-gray-500">
            ID da Sessão: {sessionId.substring(0, 20)}...
          </div>
        )}
      </motion.div>
    </div>
  );
}