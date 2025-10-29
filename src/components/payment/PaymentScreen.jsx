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
      
      // Sempre usar API real do Mercado Pago
      console.log('🚀 Criando pagamento real no Mercado Pago...');
      
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

      // Para desenvolvimento, vamos criar uma preferência real do Mercado Pago
      const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY || 'APP_USR-ffdc65d6-cea9-45b3-b6ad-3024fd36a896');
      
      const preference = {
        items: paymentRequest.items,
        payer: {
          name: paymentRequest.customer.name,
          email: paymentRequest.customer.email,
          phone: {
            number: paymentRequest.customer.phone
          },
          identification: {
            type: 'CPF',
            number: paymentRequest.customer.document
          }
        },
        back_urls: {
          success: `${window.location.origin}/payment/success`,
          failure: `${window.location.origin}/payment/failure`,
          pending: `${window.location.origin}/payment/pending`
        },
        auto_return: 'approved',
        notification_url: `${window.location.origin}/api/webhook-mercadopago`,
        external_reference: `neurohack-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };

      // Configurações específicas por método
      if (paymentRequest.method === 'pix') {
        preference.payment_methods = {
          excluded_payment_methods: [
            { id: 'visa' }, { id: 'master' }, { id: 'amex' }
          ],
          excluded_payment_types: [
            { id: 'credit_card' }, { id: 'debit_card' }, { id: 'ticket' }
          ],
          installments: 1
        };
        preference.items[0].unit_price = paymentRequest.amount * 0.95; // 5% desconto PIX
      }

      const result = await mp.preferences.create(preference);
      
      if (result.body) {
        const paymentData = {
          id: result.body.id,
          init_point: result.body.init_point,
          sandbox_init_point: result.body.sandbox_init_point,
          qr_code: paymentRequest.method === 'pix' ? result.body.qr_code : null,
          qr_code_base64: paymentRequest.method === 'pix' ? result.body.qr_code_base64 : null,
          external_reference: preference.external_reference
        };
        
        setPaymentData(paymentData);
        handlePaymentRedirect(paymentData);
      } else {
        throw new Error('Erro ao criar preferência no Mercado Pago');
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
        // Opção 1: Mostrar tela PIX personalizada
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

  const handleDirectMercadoPago = (data) => {
    console.log('🚀 Dados recebidos para redirecionamento:', data);
    
    if (data && data.init_point) {
      console.log('✅ Redirecionando para:', data.init_point);
      // Forçar redirecionamento
      window.location.href = data.init_point;
    } else {
      console.error('❌ Dados de pagamento inválidos:', data);
      alert('Erro: Dados de pagamento não disponíveis. Tente novamente.');
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
        onDirectMercadoPago={handleDirectMercadoPago}
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
