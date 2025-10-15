import MP from 'mercadopago';

// Configurar Mercado Pago
MP.configure({ 
  access_token: process.env.MP_ACCESS_TOKEN || 'APP_USR-7689299563100038-071019-3ca7375225a53590c7e12206503cfe4d-2547567185'
});

export default MP;

// Configurações padrão
export const defaultConfig = {
  currency: 'BRL',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://neurohackenem.com',
  backUrls: {
    success: '/payment/success',
    failure: '/payment/failure', 
    pending: '/payment/pending'
  },
  notificationUrl: '/api/webhook-mercadopago'
};

// Função para criar preferência de pagamento
export async function createPaymentPreference(paymentData) {
  try {
    const { method, amount, installments, customer, items } = paymentData;
    
    // Configuração base
    const preferenceData = {
      items: items.map(item => ({
        title: item.title,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: defaultConfig.currency
      })),
      payer: {
        name: customer.name,
        email: customer.email,
        phone: {
          number: customer.phone
        },
        identification: {
          type: 'CPF',
          number: customer.document
        }
      },
      back_urls: {
        success: `${defaultConfig.siteUrl}${defaultConfig.backUrls.success}`,
        failure: `${defaultConfig.siteUrl}${defaultConfig.backUrls.failure}`,
        pending: `${defaultConfig.siteUrl}${defaultConfig.backUrls.pending}`
      },
      auto_return: 'approved',
      notification_url: `${defaultConfig.siteUrl}${defaultConfig.notificationUrl}`,
      external_reference: `neurohack-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
    };

    // Configurações específicas por método
    switch (method) {
      case 'pix':
        preferenceData.payment_methods = {
          excluded_payment_methods: [
            { id: 'visa' }, { id: 'master' }, { id: 'amex' }
          ],
          excluded_payment_types: [
            { id: 'credit_card' }, { id: 'debit_card' }, { id: 'ticket' }
          ],
          installments: 1
        };
        // Aplicar desconto PIX de 5%
        preferenceData.items[0].unit_price = amount * 0.95;
        break;

      case 'credit_card':
        preferenceData.payment_methods = {
          excluded_payment_methods: [
            { id: 'bolbradesco' }, { id: 'pix' }
          ],
          excluded_payment_types: [
            { id: 'ticket' }
          ],
          installments: installments,
          default_installments: installments
        };
        break;

      case 'boleto':
        preferenceData.payment_methods = {
          excluded_payment_methods: [
            { id: 'visa' }, { id: 'master' }, { id: 'pix' }
          ],
          excluded_payment_types: [
            { id: 'credit_card' }, { id: 'debit_card' }
          ],
          installments: 1
        };
        break;
    }

    const result = await preference.create({ body: preferenceData });
    return result;

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    throw error;
  }
}

// Função para buscar pagamento
export async function getPaymentById(paymentId) {
  try {
    const result = await payment.get({ id: paymentId });
    return result;
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    throw error;
  }
}

export default client;
