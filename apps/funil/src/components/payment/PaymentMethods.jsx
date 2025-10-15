import { motion } from 'framer-motion';

export default function PaymentMethods({ selected, onSelect }) {
  const methods = [
    {
      id: 'pix',
      name: 'PIX',
      icon: '💚',
      subtitle: 'Pagamento instantâneo',
      popular: true,
      discount: '5% desconto',
      description: 'Aprovação imediata'
    },
    {
      id: 'credit_card',
      name: 'Cartão de Crédito',
      icon: '💳',
      subtitle: 'Parcele até 12x',
      installments: 'sem juros até 6x',
      description: 'Aprovação instantânea'
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      icon: '🏦',
      subtitle: 'Vencimento em 3 dias',
      processing: '1-2 dias úteis',
      description: 'Pagamento seguro'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white font-bold text-center text-lg">
        💳 ESCOLHA COMO PAGAR:
      </h3>
      
      {methods.map((method, index) => (
        <motion.button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`w-full p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
            selected === method.id
              ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
              : 'border-gray-600 bg-gray-800/50 hover:border-yellow-500 hover:bg-gray-700/50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {method.popular && (
            <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
              POPULAR
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <span className="text-3xl">{method.icon}</span>
            <div className="flex-1 text-left">
              <div className="font-bold text-white text-base">{method.name}</div>
              <div className="text-gray-400 text-sm">{method.subtitle}</div>
              <div className="text-gray-300 text-xs mt-1">{method.description}</div>
              
              {method.discount && (
                <div className="text-green-400 text-sm font-bold mt-1">
                  🎁 {method.discount}
                </div>
              )}
              {method.installments && (
                <div className="text-yellow-400 text-sm mt-1">
                  📅 {method.installments}
                </div>
              )}
              {method.processing && (
                <div className="text-blue-400 text-sm mt-1">
                  ⏱️ {method.processing}
                </div>
              )}
            </div>
            
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selected === method.id 
                ? 'bg-green-500 border-green-500' 
                : 'border-gray-400'
            }`}>
              {selected === method.id && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
