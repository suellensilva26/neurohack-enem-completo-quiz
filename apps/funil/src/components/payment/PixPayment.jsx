import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/formatters';

export default function PixPayment({ pixData, onPaymentConfirmed, onDirectMercadoPago }) {
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
    if (pixData.qr_code && !pixData.qr_code.startsWith('data:')) {
      navigator.clipboard.writeText(pixData.qr_code);
      alert('Chave PIX copiada! Cole no seu app bancário.');
    } else {
      alert('Chave PIX ainda não foi gerada. Use a opção "Pagar no Mercado Pago".');
    }
  };

  const downloadQRCode = () => {
    if (pixData.qr_code_base64 && pixData.qr_code_base64 !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==') {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${pixData.qr_code_base64}`;
      link.download = 'pix-neurohack.png';
      link.click();
    } else {
      alert('QR Code ainda não foi gerado. Use a opção "Pagar no Mercado Pago".');
    }
  };

  const handleDirectMercadoPago = () => {
    if (onDirectMercadoPago && pixData.init_point) {
      console.log('🚀 Redirecionando para Mercado Pago:', pixData.init_point);
      // Forçar redirecionamento
      window.location.href = pixData.init_point;
    } else {
      console.error('❌ Dados de pagamento não disponíveis');
      alert('Erro: Dados de pagamento não disponíveis. Tente novamente.');
    }
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
        <h3 className="text-orange-400 font-bold mb-2 flex items-center justify-center gap-2">
          <span className="text-xl">⏰</span>
          Tempo para pagamento
        </h3>
        <div className={`font-black text-3xl ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
        <p className="text-orange-200 text-xs mt-2">
          Após este prazo, você precisará gerar um novo PIX
        </p>
      </div>

      {/* Botão Principal - Sempre Funciona */}
      <div className="text-center bg-green-900/30 rounded-xl p-6 border border-green-500/50">
        <h3 className="text-green-400 font-bold text-lg mb-3 flex items-center justify-center gap-2">
          <span className="text-2xl">🚀</span>
          Pagamento Garantido
        </h3>
        <p className="text-green-200 text-sm mb-4">
          Clique no botão abaixo para pagar diretamente no Mercado Pago. 
          Esta é a forma mais confiável e segura.
        </p>
        <button
          onClick={handleDirectMercadoPago}
          className="w-full px-6 py-4 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3 shadow-lg"
        >
          <span className="text-2xl">💳</span>
          PAGAR AGORA NO MERCADO PAGO
        </button>
        <p className="text-green-300 text-xs mt-3">
          ✅ 100% Seguro • ✅ Aprovação Instantânea • ✅ Suporte 24/7
        </p>
      </div>

      {/* QR Code */}
      <div className="text-center space-y-4">
        <h3 className="text-white font-bold text-lg flex items-center justify-center gap-2">
          <span className="text-2xl">📱</span>
          Escaneie o QR Code
        </h3>
        
        <div className="bg-white p-6 rounded-2xl inline-block shadow-lg border-2 border-gray-200">
          {pixData.qr_code_base64 && pixData.qr_code_base64 !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' ? (
            <img 
              src={`data:image/png;base64,${pixData.qr_code_base64}`}
              alt="QR Code PIX"
              className="w-64 h-64 mx-auto"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">📱</div>
                <p className="text-gray-600 text-sm">QR Code será gerado</p>
                <p className="text-gray-500 text-xs">Aguarde o processamento</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">
            Abra o app do seu banco e escaneie o código
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={downloadQRCode}
              className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>📥</span>
              Baixar QR Code
            </button>
            {onDirectMercadoPago && (
              <button
                onClick={handleDirectMercadoPago}
                className="px-6 py-3 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <span>🚀</span>
                Pagar no Mercado Pago
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chave PIX */}
      <div className="space-y-3">
        <h4 className="text-white font-bold text-center text-lg flex items-center justify-center gap-2">
          <span className="text-2xl">🔑</span>
          Ou copie a chave PIX
        </h4>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              {pixData.qr_code && pixData.qr_code.startsWith('data:') ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">🔑</div>
                  <p className="text-gray-400 text-sm">Chave PIX será gerada</p>
                  <p className="text-gray-500 text-xs">Aguarde o processamento</p>
                </div>
              ) : (
                <span className="text-white text-sm font-mono break-all block">
                  {pixData.qr_code || 'Chave PIX será gerada automaticamente'}
                </span>
              )}
            </div>
            <button
              onClick={copyPixKey}
              className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>📋</span>
              Copiar
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
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <span className="text-xl">💚</span>
              <p className="text-sm">Assim que pagar, você receberá acesso imediatamente</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <span className="text-lg">⚡</span>
              <p className="text-xs">PIX é processado em segundos</p>
            </div>
          </div>
        )}
      </div>

      {/* Aviso sobre problemas técnicos */}
      <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/50">
        <h4 className="text-yellow-400 font-bold text-sm mb-2 flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          Problemas técnicos?
        </h4>
        <p className="text-yellow-200 text-xs mb-3">
          Se o QR Code ou chave PIX não estiver funcionando corretamente, use o botão abaixo para pagar diretamente no Mercado Pago.
        </p>
        {onDirectMercadoPago && (
          <button
            onClick={handleDirectMercadoPago}
            className="w-full px-4 py-2 bg-yellow-600 text-white text-sm font-bold rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>🚀</span>
            Pagar no Mercado Pago (Mais Confiável)
          </button>
        )}
      </div>

      {/* Instruções */}
      <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/50">
        <h4 className="text-blue-400 font-bold text-sm mb-3 flex items-center gap-2">
          <span className="text-lg">📋</span>
          Como pagar com PIX
        </h4>
        <div className="text-gray-300 text-xs space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">1.</span>
            <p>Abra o app do seu banco</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">2.</span>
            <p>Escaneie o QR Code ou cole a chave</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">3.</span>
            <p>Confirme o pagamento</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">4.</span>
            <p>Aguarde a confirmação automática</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
