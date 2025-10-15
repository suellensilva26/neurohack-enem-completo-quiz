import MP from '../../../lib/mercadopago';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID do pagamento não fornecido'
      });
    }

    // Buscar pagamento no Mercado Pago
    const paymentData = await MP.payment.findById(id);
    
    if (!paymentData.body) {
      return res.status(404).json({
        success: false,
        error: 'Pagamento não encontrado'
      });
    }

    // Retornar status do pagamento
    res.status(200).json({
      success: true,
      data: {
        id: paymentData.body.id,
        status: paymentData.body.status,
        status_detail: paymentData.body.status_detail,
        external_reference: paymentData.body.external_reference,
        date_approved: paymentData.body.date_approved,
        date_created: paymentData.body.date_created,
        payer: {
          email: paymentData.body.payer?.email,
          name: paymentData.body.payer?.name
        },
        transaction_details: paymentData.body.transaction_details
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar pagamento',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
