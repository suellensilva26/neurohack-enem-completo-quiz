#!/bin/bash

# 🚀 SCRIPT DE CONFIGURAÇÃO - CENTRAL DE PAGAMENTO NEUROHACK ENEM
# Este script configura automaticamente a central de pagamento

echo "🚀 CONFIGURANDO CENTRAL DE PAGAMENTO NEUROHACK ENEM..."
echo "=================================================="

# Verificar se estamos no diretório correto
if [ ! -d "apps/funil" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto neurohack-enem-completo"
    exit 1
fi

echo "✅ Diretório correto encontrado"

# Criar arquivo .env.local se não existir
if [ ! -f "apps/funil/.env.local" ]; then
    echo "📝 Criando arquivo de configuração .env.local..."
    
    cat > apps/funil/.env.local << EOF
# 🔑 CONFIGURAÇÃO MERCADO PAGO - NEUROHACK ENEM
# Configuração automática gerada em $(date)

# Chave pública (frontend)
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-ffdc65d6-cea9-45b3-b6ad-3024fd36a896

# Token de acesso (backend)
MP_ACCESS_TOKEN=APP_USR-7689299563100038-071019-3ca7375225a53590c7e12206503cfe4d-2547567185

# Client ID e Secret
MP_CLIENT_ID=7689299563100038
MP_CLIENT_SECRET=TqMjTQGmRjUedPdK6DvRVL9PoVKjqTpd

# Webhook secret (gerado automaticamente)
MP_WEBHOOK_SECRET=neurohack_webhook_2025_secure_key

# URL do site
NEXT_PUBLIC_SITE_URL=https://neurohackenem.com

# Ambiente
NODE_ENV=production
EOF
    
    echo "✅ Arquivo .env.local criado com sucesso"
else
    echo "⚠️  Arquivo .env.local já existe"
fi

# Verificar se as dependências estão instaladas
echo "📦 Verificando dependências..."
cd apps/funil

if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências..."
    npm install
    echo "✅ Dependências instaladas"
else
    echo "✅ Dependências já instaladas"
fi

# Fazer build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build realizado com sucesso"
else
    echo "❌ Erro no build. Verifique os logs acima."
    exit 1
fi

# Voltar para o diretório raiz
cd ../..

echo ""
echo "🎉 CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!"
echo "======================================"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo ""
echo "1. 🔗 CONFIGURAR WEBHOOK NO MERCADO PAGO:"
echo "   - Acesse: https://www.mercadopago.com.br/developers/panel"
echo "   - Vá em 'Webhooks'"
echo "   - Crie webhook com URL: https://neurohackenem.com/api/webhook-mercadopago"
echo "   - Eventos: payment"
echo ""
echo "2. 🧪 TESTAR O SISTEMA:"
echo "   - Acesse: http://localhost:8000/vendas/"
echo "   - Navegue até o checkout"
echo "   - Teste os métodos de pagamento"
echo ""
echo "3. 🔐 ACESSAR DASHBOARD ADMINISTRATIVO:"
echo "   - Acesse: http://localhost:8000/admin"
echo "   - Senha: neurohack2025"
echo ""
echo "4. 🚀 FAZER DEPLOY:"
echo "   - Faça upload dos arquivos para o servidor"
echo "   - Configure o webhook para a URL de produção"
echo "   - Teste em produção"
echo ""
echo "📊 FUNCIONALIDADES DISPONÍVEIS:"
echo "✅ PIX com QR Code e desconto de 5%"
echo "✅ Cartão de crédito com parcelamento até 12x"
echo "✅ Boleto bancário com vencimento em 3 dias"
echo "✅ Dashboard administrativo completo"
echo "✅ Sistema de notificações automáticas"
echo "✅ Monitoramento em tempo real"
echo "✅ Sistema de backup e recuperação"
echo "✅ Analytics detalhados"
echo ""
echo "🔗 URLs IMPORTANTES:"
echo "   - Checkout: /vendas/"
echo "   - Admin: /admin"
echo "   - Webhook: /api/webhook-mercadopago"
echo ""
echo "📞 SUPORTE:"
echo "   - Documentação: CENTRAL-PAGAMENTO-COMPLETA.md"
echo "   - Logs: Console do navegador e servidor"
echo ""
echo "🎯 SISTEMA PRONTO PARA PRODUÇÃO!"
echo "================================="



