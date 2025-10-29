# Configuração Mercado Pago - NeuroHack ENEM

## 🔑 Chaves Necessárias

Para configurar o sistema de pagamento, você precisa das seguintes chaves do Mercado Pago:

### 1. Acesse o Painel do Mercado Pago
- Vá para: https://www.mercadopago.com.br/developers/panel/credentials
- Faça login com sua conta Mercado Pago

### 2. Crie um arquivo `.env.local` na pasta `apps/funil/`:

```bash
# Mercado Pago Configuration
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxxxxxxxx
MP_ACCESS_TOKEN=APP_USR-xxxxxxxxx
MP_WEBHOOK_SECRET=xxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://neurohackenem.com
NODE_ENV=development
```

### 3. Configuração do Webhook

No painel do Mercado Pago:
- Vá em "Webhooks"
- Adicione a URL: `https://neurohackenem.com/api/webhook-mercadopago`
- Selecione os eventos: `payment`

## 🧪 Modo Sandbox vs Produção

### Sandbox (Desenvolvimento)
- Use as chaves de teste
- Pagamentos são simulados
- Ideal para testes

### Produção
- Use as chaves de produção
- Pagamentos reais
- Configure webhook para URL de produção

## 📋 Checklist de Configuração

- [ ] Conta Mercado Pago criada
- [ ] Chaves obtidas do painel
- [ ] Arquivo `.env.local` configurado
- [ ] Webhook configurado
- [ ] Teste de pagamento realizado
- [ ] Deploy com chaves de produção

## 🚀 Testando o Sistema

1. **PIX**: Gera QR code e chave PIX
2. **Cartão**: Redireciona para checkout
3. **Boleto**: Gera boleto para impressão

## 📞 Suporte

Em caso de dúvidas:
- Documentação: https://www.mercadopago.com.br/developers
- Suporte: https://www.mercadopago.com.br/developers/support









