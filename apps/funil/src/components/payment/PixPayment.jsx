import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/formatters';

export default function PixPayment({ pixData, onPaymentConfirmed }) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const [checking, setChecking] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Verificar pagamento a cada 5 segundos
    const paymentChecker = setInterval(async () => {
      await checkPaymentStatus();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(paymentChecker);
    };
  }, []);

  const checkPaymentStatus = async () => {
    if (checking || paymentStatus === 'approved') return;
    
    setChecking(true);
    try {
      // Verificar se está em desenvolvimento
      const isDev = window.location.hostname === 'localhost';
      
      if (isDev) {
        // Simular aprovação após 10 segundos em desenvolvimento
        console.log('🧪 MODO DESENVOLVIMENTO - Simulando verificação de pagamento...');
        
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular aprovação após 10 segundos
        if (timeLeft <= (15 * 60 - 10)) {
          setPaymentStatus('approved');
          onPaymentConfirmed();
        }
      } else {
        // Produção - verificação real
        const response = await fetch(`/api/verify-payment/${pixData.id}`);
        const result = await response.json();
        
        if (result.success && result.data.status === 'approved') {
          setPaymentStatus('approved');
          onPaymentConfirmed();
        }
      }
    } catch (error) {
      console.error('Error checking payment:', error);
    } finally {
      setChecking(false);
    }
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixData.qr_code);
    alert('Chave PIX copiada! Cole no seu app bancário.');
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${pixData.qr_code_base64}`;
    link.download = 'pix-neurohack.png';
    link.click();
  };

  if (paymentStatus === 'approved') {
    return (
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-green-600/20 rounded-xl p-6 border border-green-500/50">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-green-400 font-bold text-xl mb-2">
            Pagamento Aprovado!
          </h3>
          <p className="text-white text-sm">
            Você receberá o acesso em instantes
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Timer */}
      <div className="text-center bg-orange-900/30 rounded-xl p-4 border border-orange-500/50">
        <h3 className="text-orange-400 font-bold mb-2">⏰ Tempo para pagamento:</h3>
        <div className={`font-black text-3xl ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
        <p className="text-orange-200 text-xs mt-2">
          Após este prazo, você precisará gerar um novo PIX
        </p>
      </div>

      {/* QR Code */}
      <div className="text-center space-y-4">
        <h3 className="text-white font-bold text-lg">📱 Escaneie o QR Code:</h3>
        
        <div className="bg-white p-4 rounded-2xl inline-block shadow-lg">
          <img 
            src={`data:image/png;base64,${pixData.qr_code_base64}`}
            alt="QR Code PIX"
            className="w-48 h-48"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">
            Abra o app do seu banco e escaneie o código
          </p>
          <button
            onClick={downloadQRCode}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            📥 Baixar QR Code
          </button>
        </div>
      </div>

      {/* Chave PIX */}
      <div className="space-y-3">
        <h4 className="text-white font-bold text-center text-lg">
          🔑 Ou copie a chave PIX:
        </h4>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-mono break-all flex-1 mr-3">
              {pixData.qr_code}
            </span>
            <button
              onClick={copyPixKey}
              className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              📋 Copiar
            </button>
          </div>
        </div>
        
        <p className="text-gray-400 text-xs text-center">
          Cole esta chave no app do seu banco para pagar
        </p>
      </div>

      {/* Status de Verificação */}
      <div className="text-center">
        {checking ? (
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Verificando pagamento...</span>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">
              💚 Assim que pagar, você receberá acesso imediatamente
            </p>
            <p className="text-yellow-400 text-xs">
              ⚡ PIX é processado em segundos
            </p>
          </div>
        )}
      </div>

      {/* Instruções */}
      <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/50">
        <h4 className="text-blue-400 font-bold text-sm mb-2">
          📋 Como pagar com PIX:
        </h4>
        <div className="text-gray-300 text-xs space-y-1">
          <p>1. Abra o app do seu banco</p>
          <p>2. Escaneie o QR Code ou cole a chave</p>
          <p>3. Confirme o pagamento</p>
          <p>4. Aguarde a confirmação automática</p>
        </div>
      </div>
    </motion.div>
  );
}
