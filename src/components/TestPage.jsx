import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎉 Sistema Funcionando!
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          A Central de Pagamento NeuroHack ENEM está operacional
        </p>
        <div className="space-y-4">
          <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4">
            <p className="text-green-400 font-medium">✅ Servidor rodando na porta 8000</p>
          </div>
          <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-4">
            <p className="text-blue-400 font-medium">✅ Roteamento configurado</p>
          </div>
          <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-yellow-400 font-medium">✅ Mercado Pago configurado</p>
          </div>
        </div>
        <div className="mt-8 space-x-4">
          <a 
            href="/vendas/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🛒 Ir para Checkout
          </a>
          <a 
            href="/admin" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            🔐 Acessar Admin
          </a>
        </div>
      </div>
    </div>
  );
}



