// /src/lib/realtime.js - Monitor em tempo real

/**
 * Conectar ao monitor em tempo real
 */
export const connect = () => {
  console.log('[Realtime] Connected to real-time monitor');
  return { connected: true };
};

/**
 * Desconectar do monitor
 */
export const disconnect = () => {
  console.log('[Realtime] Disconnected from real-time monitor');
  return { connected: false };
};

/**
 * Escutar eventos
 */
export const on = (event, callback) => {
  console.log('[Realtime] Listening to event:', event);
  return { success: true };
};

export default {
  connect,
  disconnect,
  on,
};