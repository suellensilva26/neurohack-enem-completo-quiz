import crypto from 'crypto';
import MP from '../../lib/mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // Verificar assinatura do webhook (em produção)
    const signature = req.headers['x-signature'];
    const requestId = req.headers['x-request-id'];
    
    if (process.env.NODE_ENV === 'production' && !verifyWebhookSignature(req.body, signature)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { action, data, type } = req.body;
    console.log('Webhook received:', { action, type, data });

    // Processar apenas pagamentos
    if (type === 'payment') {
      const paymentId = data.id;
      
      try {
        // Buscar dados do pagamento no Mercado Pago
        const paymentData = await MP.payment.findById(paymentId);
        
        if (paymentData.body) {
          await processPayment(paymentData.body);
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function verifyWebhookSignature(body, signature) {
  if (!process.env.MP_WEBHOOK_SECRET) {
    console.warn('MP_WEBHOOK_SECRET not configured');
    return true; // Em desenvolvimento, aceitar sem verificação
  }

  const secret = process.env.MP_WEBHOOK_SECRET;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  
  return hash === signature;
}

async function processPayment(paymentData) {
  const { status, external_reference, payer, transaction_details } = paymentData;
  
  console.log(`Processing payment: ${external_reference} - Status: ${status}`);
  
  switch (status) {
    case 'approved':
      // Liberar acesso ao produto
      await grantAccess(external_reference, payer.email);
      await sendWelcomeEmail(payer.email);
      break;
      
    case 'pending':
      // Aguardando pagamento (boleto, PIX)
      await sendPendingPaymentEmail(payer.email);
      break;
      
    case 'rejected':
      // Pagamento rejeitado
      await sendRejectionEmail(payer.email);
      break;
      
    case 'cancelled':
      // Pagamento cancelado
      await sendCancellationEmail(payer.email);
      break;
  }
}

async function grantAccess(reference, email) {
  // Implementar liberação de acesso
  console.log(`✅ GRANTING ACCESS for ${email} - Reference: ${reference}`);
  
  // Aqui você pode:
  // 1. Salvar no banco de dados que o usuário tem acesso
  // 2. Enviar email de boas-vindas
  // 3. Criar conta de usuário
  // 4. Liberar acesso ao quiz/produto
}

async function sendWelcomeEmail(email) {
  console.log(`📧 Sending welcome email to: ${email}`);
  
  // Implementar envio de email de boas-vindas
  // Pode usar SendGrid, Mailgun, AWS SES, etc.
}

async function sendPendingPaymentEmail(email) {
  console.log(`⏳ Sending pending payment email to: ${email}`);
  
  // Implementar envio de email para pagamento pendente
}

async function sendRejectionEmail(email) {
  console.log(`❌ Sending rejection email to: ${email}`);
  
  // Implementar envio de email para pagamento rejeitado
}

async function sendCancellationEmail(email) {
  console.log(`🚫 Sending cancellation email to: ${email}`);
  
  // Implementar envio de email para pagamento cancelado
}
