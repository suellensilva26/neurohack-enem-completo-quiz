import { loadStripe } from '@stripe/stripe-js';

export function StripeTest() {
  const testStripe = async () => {
    console.log('🔍 Testando Stripe...');
    console.log('Chave do .env:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    console.log('Tamanho da chave:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.length);
    
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      console.log('✅ Stripe carregado com sucesso:', stripe);
      return stripe;
    } catch (error) {
      console.error('❌ Erro ao carregar Stripe:', error);
      return null;
    }
  };

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
      <h3 className="text-lg font-bold text-yellow-800">🧪 Teste Stripe</h3>
      <button 
        onClick={testStripe}
        className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
      >
        Testar Stripe
      </button>
    </div>
  );
}
