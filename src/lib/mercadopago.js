// /src/lib/mercadopago.js - Mercado Pago (removido, usando Stripe)

/**
 * Este arquivo foi mantido para compatibilidade
 * Mas agora usamos Stripe para pagamentos
 */
export const createPreference = async (data) => {
  console.log('[MercadoPago] Deprecated - using Stripe instead');
  throw new Error('Mercado Pago foi removido. Use Stripe.');
};

export default {
  createPreference,
};