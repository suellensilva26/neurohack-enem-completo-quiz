# 🚀 DEPLOY COMPLETO - GITHUB + VERCEL

## 📋 **PASSO A PASSO PARA DEPLOY:**

### 1. 🔗 **CRIAR REPOSITÓRIO NO GITHUB:**

**Acesse:** https://github.com/new

**Configurações:**
- **Repository name:** `neurohack-enem-completo`
- **Description:** `Sistema completo de quiz ENEM com pagamentos Mercado Pago`
- **Visibility:** Public ✅
- **Initialize:** ❌ (não marcar nada)

**Clique:** "Create repository"

### 2. 📤 **CONECTAR REPOSITÓRIO LOCAL:**

```bash
cd "/home/usuario/Área de trabalho/Quiz completo/neurohack-enem-completo"
git remote add origin https://github.com/SEU-USUARIO/neurohack-enem-completo.git
git push -u origin main
```

### 3. 🚀 **DEPLOY NO VERCEL:**

**Acesse:** https://vercel.com/new

**Configurações:**
- **Import Git Repository:** Selecione `neurohack-enem-completo`
- **Framework Preset:** Other
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
```
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-ffdc65d6-cea9-45b3-b6ad-3024fd36a896
MP_ACCESS_TOKEN=APP_USR-7689299563100038-071019-3ca7375225a53590c7e12206503cfe4d-2547567185
MP_WEBHOOK_SECRET=TqMjTQGmRjUedPdK6DvRVL9PoVKjqTpd
NEXT_PUBLIC_SITE_URL=https://neurohackenem.com
```

**Clique:** "Deploy"

### 4. 🔗 **CONFIGURAR DOMÍNIO:**

**No Vercel Dashboard:**
- Vá em "Settings" → "Domains"
- Adicione: `neurohackenem.com`
- Configure DNS conforme instruções

### 5. 🔧 **CONFIGURAR WEBHOOK MERCADO PAGO:**

**URL do Webhook:**
```
https://neurohackenem.com/api/webhook-mercadopago
```

**Eventos:**
- ✅ payment
- ✅ payment.updated

## ✅ **RESULTADO FINAL:**

- **Quiz:** `https://neurohackenem.com/`
- **Funil:** `https://neurohackenem.com/vendas/`
- **Pagamentos:** 100% funcionais
- **Webhook:** Processamento automático

## 🎯 **SISTEMA COMPLETO:**

✅ **Quiz Diagnóstico** (raiz)
✅ **Funil de Vendas** (/vendas)
✅ **Pagamentos Mercado Pago** (PIX, Cartão, Boleto)
✅ **Validação CPF** (desenvolvimento/produção)
✅ **Webhook Automático**
✅ **Scroll Corrigido**
✅ **Responsivo Mobile**

---

**🎉 SEU SISTEMA ESTÁ 100% PRONTO PARA PRODUÇÃO!**

**Siga os passos acima e terá seu sistema online funcionando perfeitamente!**
