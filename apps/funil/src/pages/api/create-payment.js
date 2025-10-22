import MP from '../../lib/mercadopago';
import paymentDB from '../../lib/database';
import notificationSystem from '../../lib/notifications';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { method, amount, installments, customer, items } = req.body;

    // Validações básicas
    if (!method || !amount || !customer || !items) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios não fornecidos'
      });
    }

    if (!['pix', 'credit_card', 'boleto'].includes(method)) {
      return res.status(400).json({
        success: false,
        error: 'Método de pagamento inválido'
      });
    }

    // Criar preferência no Mercado Pago
    const preference = {
      items: items.map(item => ({
        title: item.title,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: 'BRL'
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
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/pending`
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook-mercadopago`,
      external_reference: `neurohack-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    // Configurações específicas por método
    switch (method) {
      case 'pix':
        preference.payment_methods = {
          excluded_payment_methods: [
            { id: 'visa' }, { id: 'master' }, { id: 'amex' }
          ],
          excluded_payment_types: [
            { id: 'credit_card' }, { id: 'debit_card' }, { id: 'ticket' }
          ],
          installments: 1
        };
        preference.items[0].unit_price = amount * 0.95; // 5% desconto PIX
        break;

      case 'credit_card':
        preference.payment_methods = {
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
        preference.payment_methods = {
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

    const result = await MP.preferences.create(preference);

    // Salvar dados do pagamento no banco de dados
    const paymentData = {
      id: result.body.id,
      external_reference: preference.external_reference,
      method,
      amount,
      installments,
      customer,
      items,
      status: 'pending',
      created_at: new Date().toISOString(),
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],
        source: 'website'
      }
    };

    // Salvar no banco de dados
    const savedPayment = await paymentDB.createPayment(paymentData);
    
    // Criar ou atualizar cliente
    await paymentDB.createCustomer(customer);
    
    console.log('💾 Payment saved to database:', savedPayment);

    // Retornar dados para o frontend
    res.status(200).json({
      success: true,
      data: {
        id: result.body.id,
        init_point: result.body.init_point,
        sandbox_init_point: result.body.sandbox_init_point,
        qr_code: method === 'pix' ? result.body.qr_code : null,
        qr_code_base64: method === 'pix' ? result.body.qr_code_base64 : null,
        external_reference: preference.external_reference
      }
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
