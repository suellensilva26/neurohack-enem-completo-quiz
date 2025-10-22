import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Inicializar Stripe uma única vez
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export function CheckoutButton({
  userEmail,
  userId,
  quizData,
  className = '',
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('═════════════════════════════════════════════');
      console.log('[Payment] Button clicked');
      console.log('[Payment] User email:', userEmail);
      console.log('[Payment] User ID:', userId);
      console.log('[Payment] Price ID:', import.meta.env.VITE_STRIPE_PRICE_ID || 'price_1SL7dR00yw4vq8UEO2ss3TZp');
      console.log('═════════════════════════════════════════════');

      // ═════════════════════════════════════════════════════════
      // VALIDAÇÕES
      // ═════════════════════════════════════════════════════════

      if (!userEmail) {
        throw new Error('Email do usuário é obrigatório');
      }

      if (!userId) {
        throw new Error('ID do usuário é obrigatório');
      }

      // ═════════════════════════════════════════════════════════
      // 1. CHAMAR BACKEND PARA CRIAR CHECKOUT SESSION
      // ═════════════════════════════════════════════════════════

      console.log('[Payment] Calling /api/create-checkout-session');
      console.log('[Payment] Request body:', {
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID || 'price_1SL7dR00yw4vq8UEO2ss3TZp',
        customerEmail: userEmail,
        userId: userId,
      });

      // ═════════════════════════════════════════════════════════
      // SOLUÇÃO PARA VITE: Usar Stripe diretamente no frontend
      // ═════════════════════════════════════════════════════════
      
      console.log('[Payment] Using direct Stripe integration (Vite compatible)');
      
      const stripe = await stripePromise;
      
      if (!stripe) {
        console.error('[Payment] Stripe not initialized!');
        throw new Error('Stripe não foi inicializado corretamente');
      }

      const { error: redirectError } = await stripe.redirectToCheckout({
        lineItems: [{
          price: import.meta.env.VITE_STRIPE_PRICE_ID || 'price_1SL7dR00yw4vq8UEO2ss3TZp',
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment/failure`,
        customerEmail: userEmail,
        // ⚠️ METADATA REMOVIDO - deve estar no backend, não aqui!
      });

      if (redirectError) {
        console.error('[Payment] Redirect ERROR:', redirectError);
        throw new Error(redirectError.message || 'Erro ao redirecionar');
      }

      console.log('[Payment] ✅ Redirecting to Stripe Checkout...');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[Checkout] Error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            PROCESSANDO PAGAMENTO...
          </>
        ) : (
          <>
            <span className="text-2xl">💳</span>
            PAGAR R$ 198,50 COM STRIPE
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mt-4">
          <p className="text-red-200 text-center">⚠️ {error}</p>
        </div>
      )}
    </div>
  );
}
