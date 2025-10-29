import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatCPF, formatPhone, validateCPF, validateCPFDev, validateEmail, validatePhone } from '../../utils/formatters';

export default function PaymentForm({ method, formData, onChange, onSubmit, processing }) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    // Aplicar formatação específica
    if (field === 'document') {
      formattedValue = formatCPF(value);
    } else if (field === 'phone') {
      formattedValue = formatPhone(value);
    }
    
    onChange({
      ...formData,
      [field]: formattedValue
    });
    
    // Limpar erro do campo
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.document.trim()) {
      newErrors.document = 'CPF é obrigatório';
    } else {
      // Usar validação baseada no ambiente
      const isDev = import.meta.env.DEV || window.location.hostname === 'localhost';
      const isValidCPF = isDev ? validateCPFDev(formData.document) : validateCPF(formData.document);
      
      if (!isValidCPF) {
        newErrors.document = 'CPF inválido';
      }
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit();
    }
  };

  const getMethodIcon = () => {
    switch (method) {
      case 'pix': return '💚';
      case 'credit_card': return '💳';
      case 'boleto': return '🏦';
      default: return '💳';
    }
  };

  const getMethodTitle = () => {
    switch (method) {
      case 'pix': return 'PIX - Pagamento Instantâneo';
      case 'credit_card': return 'Cartão de Crédito';
      case 'boleto': return 'Boleto Bancário';
      default: return 'Pagamento';
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-white font-bold text-lg flex items-center justify-center space-x-2">
          <span>{getMethodIcon()}</span>
          <span>{getMethodTitle()}</span>
        </h3>
        <p className="text-gray-400 text-sm mt-2">
          Preencha seus dados para continuar
        </p>
      </div>

      {/* Nome Completo */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">
          👤 Nome Completo *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none transition-colors ${
            errors.name ? 'border-red-500' : 'border-gray-600 focus:border-yellow-500'
          }`}
          placeholder="Digite seu nome completo"
        />
        {errors.name && (
          <p className="text-red-400 text-xs">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">
          📧 Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-600 focus:border-yellow-500'
          }`}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="text-red-400 text-xs">{errors.email}</p>
        )}
      </div>

      {/* CPF */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">
          🆔 CPF *
        </label>
        <input
          type="text"
          value={formData.document}
          onChange={(e) => handleInputChange('document', e.target.value)}
          maxLength="14"
          className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none transition-colors ${
            errors.document ? 'border-red-500' : 'border-gray-600 focus:border-yellow-500'
          }`}
          placeholder="000.000.000-00"
        />
        {errors.document && (
          <p className="text-red-400 text-xs">{errors.document}</p>
        )}
      </div>

      {/* Telefone */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">
          📱 Telefone *
        </label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          maxLength="15"
          className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none transition-colors ${
            errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-yellow-500'
          }`}
          placeholder="(11) 99999-9999"
        />
        {errors.phone && (
          <p className="text-red-400 text-xs">{errors.phone}</p>
        )}
      </div>

      {/* Botão de Pagamento */}
      <motion.button
        type="submit"
        disabled={processing}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden ${
          processing
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105 shadow-lg'
        }`}
        whileHover={!processing ? { scale: 1.02 } : {}}
        whileTap={!processing ? { scale: 0.98 } : {}}
      >
        {processing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processando...</span>
          </div>
        ) : (
          <span className="relative z-10">
            {method === 'pix' && '💚 PAGAR COM PIX'}
            {method === 'credit_card' && '💳 PAGAR COM CARTÃO'}
            {method === 'boleto' && '🏦 GERAR BOLETO'}
          </span>
        )}
        
        {!processing && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100 transition-opacity"></div>
        )}
      </motion.button>

      {/* Informações de Segurança */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-green-400 text-sm">
          <span>🔒</span>
          <span>Pagamento 100% seguro</span>
        </div>
        <p className="text-gray-400 text-xs">
          Seus dados estão protegidos com criptografia SSL
        </p>
      </div>
    </motion.form>
  );
}
