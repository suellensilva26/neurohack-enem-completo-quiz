import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentMethods from './PaymentMethods';
import InstallmentOptions from './InstallmentOptions';
import PaymentForm from './PaymentForm';
import PixPayment from './PixPayment';
import PaymentSuccess from './PaymentSuccess';
import { calculateInstallmentPrice, formatCurrencySimple } from '../../utils/formatters';

function PaymentScreen({ initialName = '' }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [installments, setInstallments] = useState(1);
  const [finalPrice, setFinalPrice] = useState(198.50);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: initialName,
    document: '',
    phone: ''
  });
  const [paymentData, setPaymentData] = useState(null);
  const [showPixPayment, setShowPixPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calcular preço final baseado no método e parcelamento
  useEffect(() => {
    if (selectedMethod === 'pix') {
      // Desconto de 5% no PIX
      setFinalPrice(198.50 * 0.95);
    } else {
      setFinalPrice(198.50);
    }
  }, [selectedMethod]);

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Verificar se está em desenvolvimento
      const isDev = window.location.hostname === 'localhost';
      
      if (isDev) {
        // Simular pagamento em desenvolvimento
        console.log('🧪 MODO DESENVOLVIMENTO - Simulando pagamento...');
        
        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Dados simulados
        const mockPaymentData = {
          id: 'mock-' + Date.now(),
          init_point: '#',
          qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
          qr_code_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
          external_reference: 'dev-' + Date.now()
        };
        
        setPaymentData(mockPaymentData);
        handlePaymentRedirect(mockPaymentData);
        
      } else {
        // Produção - chamada real para API
        const paymentRequest = {
          method: selectedMethod,
          amount: finalPrice,
          installments,
          customer: formData,
          items: [{
            title: 'NeuroHack ENEM 2025',
            description: 'Sistema completo de aprovação no ENEM com técnicas de neurociência',
            quantity: 1,
            unit_price: finalPrice
          }]
        };

        const response = await fetch('/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentRequest)
        });

        const result = await response.json();
        
        if (result.success) {
          setPaymentData(result.data);
          handlePaymentRedirect(result.data);
        } else {
          throw new Error(result.error || 'Erro ao processar pagamento');
        }
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentRedirect = (data) => {
    switch (selectedMethod) {
      case 'pix':
        setShowPixPayment(true);
        break;
      case 'boleto':
        // Abrir boleto em nova aba
        window.open(data.init_point, '_blank');
        break;
      case 'credit_card':
        // Redirecionar para checkout
        window.location.href = data.init_point;
        break;
      default:
        console.error('Método de pagamento não reconhecido');
    }
  };

  const handlePaymentConfirmed = () => {
    setShowSuccess(true);
  };

  const handleAccessQuiz = () => {
    // Redirecionar para o quiz principal
    window.location.href = '/';
  };

  const installmentData = calculateInstallmentPrice(finalPrice, installments, selectedMethod);

  if (showSuccess) {
    return <PaymentSuccess onAccessQuiz={handleAccessQuiz} />;
  }

  if (showPixPayment && paymentData) {
    return (
      <PixPayment 
        pixData={paymentData} 
        onPaymentConfirmed={handlePaymentConfirmed}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6 overflow-y-auto">
      <div className="max-w-sm mx-auto space-y-6 pb-20">
        
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-white">
            🧠 <span className="text-yellow-400">NeuroHack ENEM 2025</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Sistema completo • Acesso vitalício
          </p>
        </motion.div>

        {/* Preço */}
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-4xl font-black text-green-400">
            {formatCurrencySimple(finalPrice)}
          </div>
          {selectedMethod === 'pix' && (
            <div className="text-green-300 text-sm">
              💚 Com desconto PIX de 5%
            </div>
          )}
          {installments > 1 && selectedMethod === 'credit_card' && (
            <div className="text-yellow-400 text-sm">
              ou {installments}x de {formatCurrencySimple(installmentData.installmentValue)}
            </div>
          )}
        </motion.div>

        {/* Métodos de Pagamento */}
        <PaymentMethods
          selected={selectedMethod}
          onSelect={setSelectedMethod}
        />

        {/* Opções de Parcelamento */}
        <AnimatePresence>
          {selectedMethod === 'credit_card' && (
            <InstallmentOptions
              value={installments}
              onChange={setInstallments}
              price={finalPrice}
            />
          )}
        </AnimatePresence>

        {/* Formulário */}
        <AnimatePresence>
          {selectedMethod && (
            <PaymentForm
              method={selectedMethod}
              formData={formData}
              onChange={setFormData}
              onSubmit={handlePayment}
              processing={processing}
            />
          )}
        </AnimatePresence>

        {/* Garantia */}
        <motion.div 
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/50 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-blue-400 font-bold text-sm mb-2">
            🛡️ Garantia de 7 Dias
          </h3>
          <p className="text-gray-300 text-xs">
            Se não ficar satisfeito, devolvemos 100% do seu dinheiro
          </p>
        </motion.div>
        
      </div>
    </div>
  );
}

export default PaymentScreen;
