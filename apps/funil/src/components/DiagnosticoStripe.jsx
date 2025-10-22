import { useState, useEffect } from 'react';

export function DiagnosticoStripe() {
  const [diagnostico, setDiagnostico] = useState({});

  useEffect(() => {
    const chave = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const secret = import.meta.env.VITE_STRIPE_SECRET_KEY;
    const priceId = import.meta.env.VITE_STRIPE_PRICE_ID;
    
    console.log("🔍 DIAGNÓSTICO STRIPE:");
    console.log("Chave Pública:", chave);
    console.log("Tamanho da chave:", chave?.length);
    console.log("Chave Secreta:", secret ? "✅ Presente" : "❌ Ausente");
    console.log("Price ID:", priceId);
    console.log("Todas as variáveis:", import.meta.env);
    
    setDiagnostico({
      chave,
      tamanho: chave?.length,
      secret: secret ? "✅ Presente" : "❌ Ausente",
      priceId,
      todas: import.meta.env
    });
  }, []);

  return (
    <div className="p-6 bg-gray-100 border border-gray-400 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 DIAGNÓSTICO STRIPE</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded border">
          <h3 className="font-bold text-green-600">✅ Chave Pública:</h3>
          <p className="text-sm break-all bg-gray-50 p-2 rounded">
            {diagnostico.chave || "❌ UNDEFINED"}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Tamanho: {diagnostico.tamanho || 0} caracteres
          </p>
        </div>
        
        <div className="bg-white p-4 rounded border">
          <h3 className="font-bold text-blue-600">🔑 Chave Secreta:</h3>
          <p className="text-sm">{diagnostico.secret}</p>
        </div>
        
        <div className="bg-white p-4 rounded border">
          <h3 className="font-bold text-purple-600">💰 Price ID:</h3>
          <p className="text-sm break-all bg-gray-50 p-2 rounded">
            {diagnostico.priceId || "❌ UNDEFINED"}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded border">
          <h3 className="font-bold text-orange-600">🌐 URL:</h3>
          <p className="text-sm">{window.location.href}</p>
          <p className="text-xs text-gray-600">
            Protocolo: {window.location.protocol}
          </p>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
        <h3 className="font-bold text-yellow-800">⚠️ POSSÍVEL PROBLEMA:</h3>
        <p className="text-sm text-yellow-700">
          Se você está usando chave LIVE (pk_live_...) em HTTP (localhost), 
          o Stripe pode rejeitar por questões de segurança.
        </p>
        <p className="text-sm text-yellow-700 mt-2">
          <strong>Solução:</strong> Use chave TEST (pk_test_...) para desenvolvimento local.
        </p>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => {
            console.log("🔍 DIAGNÓSTICO COMPLETO:");
            console.log("Chave:", diagnostico.chave);
            console.log("Tamanho:", diagnostico.tamanho);
            console.log("Secret:", diagnostico.secret);
            console.log("Price ID:", diagnostico.priceId);
            console.log("Todas as variáveis:", diagnostico.todas);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          📋 Log Completo no Console
        </button>
      </div>
    </div>
  );
}
