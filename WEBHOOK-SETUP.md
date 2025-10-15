# 🔗 CONFIGURAÇÃO WEBHOOK MERCADO PAGO

## 📋 PASSO A PASSO PARA CONFIGURAR

### 1. Acesse o Painel do Mercado Pago
- URL: https://www.mercadopago.com.br/developers/panel
- Faça login com sua conta

### 2. Configure o Webhook
- Vá em **"Webhooks"** no menu lateral
- Clique em **"Criar webhook"**

### 3. Configurações do Webhook
```
URL: https://neurohackenem.com/api/webhook-mercadopago
Eventos: payment
Método: POST
```

### 4. Eventos a Monitorar
- ✅ **payment** - Para processar pagamentos
- ✅ **payment.updated** - Para atualizações de status

### 5. Teste do Webhook
- Use o botão **"Testar webhook"** no painel
- Verifique se recebe a notificação

## 🧪 TESTE LOCAL (OPCIONAL)

Para testar localmente antes do deploy:

```bash
# Instalar ngrok
npm install -g ngrok

# Expor porta 8000
ngrok http 8000

# Use a URL do ngrok no webhook
# Exemplo: https://abc123.ngrok.io/api/webhook-mercadopago
```

## 🚀 PRODUÇÃO

Para produção, configure:
```
URL: https://neurohackenem.com/api/webhook-mercadopago
```

## ✅ CHECKLIST

- [ ] Webhook configurado no painel MP
- [ ] URL de produção definida
- [ ] Eventos "payment" selecionados
- [ ] Teste realizado com sucesso
- [ ] Logs funcionando

---

**🎉 WEBHOOK CONFIGURADO = SISTEMA 100% AUTOMÁTICO!**
