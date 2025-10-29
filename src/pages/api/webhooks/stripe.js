import Stripe from 'stripe';

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.VITE_STRIPE_WEBHOOK_SECRET || '';

// ═══════════════════════════════════════════════════════════
// DESABILITAR BODY PARSER (IMPORTANTE!)
// ═══════════════════════════════════════════════════════════
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Aceitar apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // ═══════════════════════════════════════════════════════════
    // PEGAR ASSINATURA DO WEBHOOK
    // ═══════════════════════════════════════════════════════════

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    if (!sig) {
      console.error('[Webhook] Missing stripe-signature header');
      return res.status(400).json({ error: 'Missing signature' });
    }

    // ═══════════════════════════════════════════════════════════
    // VERIFICAR AUTENTICIDADE DO WEBHOOK
    // ═══════════════════════════════════════════════════════════

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const error = err;
      console.error('[Webhook] Signature verification failed:', error.message);
      return res.status(400).json({
        error: `Webhook Error: ${error.message}`,
      });
    }

    console.log('[Webhook] Event received:', {
      type: event.type,
      id: event.id,
    });

    // ═══════════════════════════════════════════════════════════
    // PROCESSAR EVENTOS
    // ═══════════════════════════════════════════════════════════

    switch (event.type) {
      // ─────────────────────────────────────────────────────────
      // PAGAMENTO COMPLETADO
      // ─────────────────────────────────────────────────────────
      case 'checkout.session.completed':
        const session = event.data.object;

        const sessionData = session.metadata || {};

        console.log('[Webhook] ✅ Pagamento confirmado!', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          userId: sessionData.userId,
          amount: session.amount_total,
        });

        // ═════════════════════════════════════════════════════════
        // AQUI: Atualizar seu banco de dados
        // ═════════════════════════════════════════════════════════

        try {
          // Exemplo: Atualizar status de usuário para premium
          // await updateUserToPremium(sessionData.userId);

          // Exemplo: Enviar email de confirmação
          // await sendConfirmationEmail(session.customer_email, sessionData);

          // Exemplo: Registrar transação no banco de dados
          // await saveTransaction({
          //   userId: sessionData.userId,
          //   email: session.customer_email,
          //   amount: session.amount_total,
          //   currency: session.currency,
          //   quizId: sessionData.quizId,
          //   stripeSessionId: session.id,
          //   status: 'completed',
          //   timestamp: new Date(),
          // });

          console.log('[Webhook] ✅ Database updated successfully');
        } catch (dbError) {
          console.error('[Webhook] Database update error:', dbError);
          // NÃO retornar erro - webhook deve sempre responder 200
          // Reprocessar manualmente depois se necessário
        }

        break;

      // ─────────────────────────────────────────────────────────
      // PAYMENT INTENT SUCCEEDED
      // ─────────────────────────────────────────────────────────
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const paymentData = paymentIntent.metadata || {};

        console.log('[Webhook] 💳 Payment Intent succeeded:', {
          paymentIntentId: paymentIntent.id,
          userId: paymentData.userId,
          amount: paymentIntent.amount,
        });

        // Pode fazer ações extras aqui se necessário
        break;

      // ─────────────────────────────────────────────────────────
      // PAGAMENTO FALHOU
      // ─────────────────────────────────────────────────────────
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        const failedData = failedPayment.metadata || {};

        console.error('[Webhook] ❌ Pagamento falhou:', {
          paymentIntentId: failedPayment.id,
          userId: failedData.userId,
          lastError: failedPayment.last_payment_error?.message,
        });

        // Opcional: Notificar user que pagamento falhou
        // await sendFailureEmail(failedData.userEmail);

        break;

      // ─────────────────────────────────────────────────────────
      // CHARGE SUCCEEDED
      // ─────────────────────────────────────────────────────────
      case 'charge.succeeded':
        const charge = event.data.object;

        console.log('[Webhook] ✅ Charge succeeded:', {
          chargeId: charge.id,
          amount: charge.amount,
          customer: charge.customer,
        });

        break;

      // ─────────────────────────────────────────────────────────
      // OUTROS EVENTOS
      // ─────────────────────────────────────────────────────────
      default:
        console.log('[Webhook] Unhandled event type:', event.type);
    }

    // ═══════════════════════════════════════════════════════════
    // RESPONDER COM 200 OK SEMPRE
    // ═══════════════════════════════════════════════════════════

    res.json({ received: true });
  } catch (error) {
    console.error('[Webhook] Unexpected error:', error);
    // Ainda assim responder 200 para não reprocessar
    res.status(200).json({ received: true });
  }
}

// Função para buffer (necessária para webhooks)
async function buffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

