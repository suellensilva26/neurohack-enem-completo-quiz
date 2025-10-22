import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  // Aceitar apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', sessionId: '' });
  }

  try {
    const {
      priceId,
      customerEmail,
      userId,
      quizData,
    } = req.body;

    // ═══════════════════════════════════════════════════════════
    // VALIDAÇÕES IMPORTANTES
    // ═══════════════════════════════════════════════════════════

    if (!priceId) {
      console.error('[Stripe] Missing priceId');
      return res
        .status(400)
        .json({ error: 'priceId é obrigatório', sessionId: '' });
    }

    if (!customerEmail) {
      console.error('[Stripe] Missing customerEmail');
      return res
        .status(400)
        .json({ error: 'customerEmail é obrigatório', sessionId: '' });
    }

    if (!userId) {
      console.error('[Stripe] Missing userId');
      return res
        .status(400)
        .json({ error: 'userId é obrigatório', sessionId: '' });
    }

    // ═══════════════════════════════════════════════════════════
    // CRIAR CHECKOUT SESSION
    // ═══════════════════════════════════════════════════════════

    const baseUrl =
      process.env.VITE_APP_URL || 'http://localhost:8000';

    const session = await stripe.checkout.sessions.create({
      // ─────────────────────────────────────────────────────────
      // CONFIGURAÇÕES BÁSICAS
      // ─────────────────────────────────────────────────────────
      mode: 'payment', // 'payment' para pagamento único, 'subscription' para recorrente
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },

      // ─────────────────────────────────────────────────────────
      // CLIENTE
      // ─────────────────────────────────────────────────────────
      customer_email: customerEmail,

      // ─────────────────────────────────────────────────────────
      // PRODUTOS E PREÇOS
      // ─────────────────────────────────────────────────────────
      line_items: [
        {
          price: priceId, // price_1SL7dR00yw4vq8UEO2ss3TZp
          quantity: 1,
        },
      ],

      // ─────────────────────────────────────────────────────────
      // METADATA DA SESSION (para receber no webhook)
      // ─────────────────────────────────────────────────────────
      metadata: {
        userId: userId,
        quizId: quizData?.quizId || 'neurohack_quiz_premium',
        source: 'neurohack_app',
        productType: 'enem_premium',
      },

      // ─────────────────────────────────────────────────────────
      // METADATA DO PAYMENT INTENT (também será salva)
      // ─────────────────────────────────────────────────────────
      payment_intent_data: {
        metadata: {
          userId: userId,
          quizId: quizData?.quizId || 'neurohack_quiz_premium',
          userEmail: customerEmail,
          score: quizData?.score?.toString() || '0',
          totalQuestions: quizData?.totalQuestions?.toString() || '0',
          timestamp: new Date().toISOString(),
        },
      },

      // ─────────────────────────────────────────────────────────
      // URLS DE REDIRECIONAMENTO
      // ─────────────────────────────────────────────────────────
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/vendas?cancelled=true`,

      // ─────────────────────────────────────────────────────────
      // CONFIGURAÇÕES ADICIONAIS
      // ─────────────────────────────────────────────────────────
      allow_promotion_codes: true, // Permite cupons/códigos de desconto
      locale: 'pt-BR', // Idioma português
      submit_type: 'pay', // Botão "Pagar"
    });

    console.log('[Stripe] Checkout session created:', {
      sessionId: session.id,
      userId,
      email: customerEmail,
      price: priceId,
    });

    // ═══════════════════════════════════════════════════════════
    // RETORNAR SESSION ID PARA FRONTEND
    // ═══════════════════════════════════════════════════════════

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('[Stripe] Error creating checkout session:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';

    return res.status(500).json({
      error: `Erro ao criar sessão de pagamento: ${errorMessage}`,
      sessionId: '',
    });
  }
}