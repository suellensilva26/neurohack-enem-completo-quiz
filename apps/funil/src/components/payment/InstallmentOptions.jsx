import { motion } from 'framer-motion';
import { calculateInstallmentPrice, formatCurrencySimple } from '../../utils/formatters';

export default function InstallmentOptions({ value, onChange, price }) {
  const installmentOptions = [
    { value: 1, label: 'À vista', interest: false },
    { value: 2, label: '2x', interest: false },
    { value: 3, label: '3x', interest: false },
    { value: 4, label: '4x', interest: false },
    { value: 5, label: '5x', interest: false },
    { value: 6, label: '6x', interest: false },
    { value: 7, label: '7x', interest: true },
    { value: 8, label: '8x', interest: true },
    { value: 9, label: '9x', interest: true },
    { value: 10, label: '10x', interest: true },
    { value: 11, label: '11x', interest: true },
    { value: 12, label: '12x', interest: true }
  ];

  const selectedOption = installmentOptions.find(opt => opt.value === value);
  const installmentData = calculateInstallmentPrice(price, value);

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-white font-bold text-center text-lg">
        📅 ESCOLHA O PARCELAMENTO:
      </h3>
      
      {/* Grid de opções */}
      <div className="grid grid-cols-3 gap-2">
        {installmentOptions.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-3 rounded-lg border-2 transition-all text-center ${
              value === option.value
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-yellow-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="font-bold text-sm">{option.label}</div>
            {option.interest && (
              <div className="text-xs text-orange-400">c/ juros</div>
            )}
            {!option.interest && option.value > 1 && (
              <div className="text-xs text-green-400">sem juros</div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Resumo da parcela selecionada */}
      {selectedOption && (
        <motion.div 
          className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-4 border border-green-500/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center space-y-2">
            <h4 className="text-green-400 font-bold text-lg">
              {selectedOption.label} de {formatCurrencySimple(installmentData.installmentValue)}
            </h4>
            
            <div className="text-white text-sm">
              Total: <span className="font-bold">{formatCurrencySimple(installmentData.total)}</span>
            </div>
            
            {installmentData.hasInterest && (
              <div className="text-orange-400 text-xs">
                ⚠️ Taxa de {installmentData.interestRate}% a.m. aplicada
              </div>
            )}
            
            {!installmentData.hasInterest && selectedOption.value > 1 && (
              <div className="text-green-400 text-xs">
                ✅ Parcelamento sem juros
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}









