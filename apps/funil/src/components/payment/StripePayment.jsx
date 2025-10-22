import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckoutButton } from '../CheckoutButton';

export default function StripePayment() {
  const [formData, setFormData] = useState({
    name: 'Maria Suellen',
    email: 'maria@email.com',
    document: '125.677.476-64',
    phone: '(22) 98835-8460'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para gerar ID único do usuário
  const generateUserId = () => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleDirectStripe = () => {
    // Link direto para o Stripe (fallback)
    const stripeUrl = 'https://buy.stripe.com/test_14k8wA0qw0qw0qw0qw';
    window.open(stripeUrl, '_blank');
  };

  const handleSimpleStripe = () => {
    // Link direto simples para o Stripe
    const stripeUrl = 'https://buy.stripe.com/test_14k8wA0qw0qw0qw0qw';
    window.location.href = stripeUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-6">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <motion.div 
          className="text-center space-y-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white">
            🧠 <span className="text-yellow-400">NeuroHack ENEM 2025</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Sistema completo • Acesso vitalício
          </p>
        </motion.div>

        {/* Preço */}
        <motion.div 
          className="text-center space-y-2 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-5xl font-black text-green-400">
            R$ 198,50
          </div>
          <div className="text-green-300 text-sm">
            💚 Com desconto especial
          </div>
        </motion.div>


        {/* Erro */}
        {error && (
          <motion.div 
            className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-200 text-center">⚠️ {error}</p>
          </motion.div>
        )}

        {/* Formulário */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
            <h3 className="text-white font-bold text-lg text-center mb-4">
              📝 Preencha seus dados
            </h3>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                CPF *
              </label>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          {/* Botões de Pagamento */}
          <div className="space-y-3">
            {/* Botão Principal - Stripe Checkout */}
            <CheckoutButton
              userEmail={formData.email}
              userId={generateUserId()}
              quizData={{
                quizId: 'neurohack_quiz_premium',
                score: 0,
                totalQuestions: 0,
              }}
              className="w-full"
            />

            {/* Botão Alternativo - Link direto */}
            <button
              onClick={handleSimpleStripe}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="text-lg">🚀</span>
              PAGAR DIRETO NO STRIPE
            </button>
          </div>

          {/* Informações de Segurança */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-purple-400">🔒</span>
              <span className="text-white font-bold text-sm">Pagamento 100% seguro via Stripe</span>
            </div>
            <p className="text-gray-400 text-xs text-center">
              Aceita cartões de crédito, débito e PIX
            </p>
          </div>

          {/* Garantia */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/50 text-center">
            <h3 className="text-blue-400 font-bold text-sm mb-2">
              🛡️ Garantia de 7 Dias
            </h3>
            <p className="text-gray-300 text-xs">
              Se não ficar satisfeito, devolvemos 100% do seu dinheiro
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
