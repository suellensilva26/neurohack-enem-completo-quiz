# 🚀 CRIAR REPOSITÓRIO GITHUB - PASSO A PASSO

## 📋 **PASSO 1: CRIAR REPOSITÓRIO NO GITHUB**

### 1. **Acesse o GitHub:**
- URL: https://github.com/new
- Faça login na sua conta

### 2. **Configurações do Repositório:**
```
Repository name: neurohack-enem-completo
Description: Sistema completo de quiz ENEM com pagamentos Mercado Pago
Visibility: Public ✅
Initialize this repository with: ❌ (NÃO marcar nada)
```

### 3. **Clique em "Create repository"**

## 📋 **PASSO 2: CONECTAR REPOSITÓRIO LOCAL**

**Execute estes comandos no terminal:**

```bash
cd "/home/usuario/Área de trabalho/Quiz completo/neurohack-enem-completo"
git remote remove origin
git remote add origin https://github.com/suellensilva26/neurohack-enem-completo.git
git push -u origin main
```

## 📋 **PASSO 3: DEPLOY NO VERCEL**

### 1. **Acesse o Vercel:**
- URL: https://vercel.com/new
- Faça login com sua conta GitHub

### 2. **Importar Repositório:**
- Selecione: `neurohack-enem-completo`
- Clique em "Import"

### 3. **Configurações do Deploy:**
```
Framework Preset: Other
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. **Environment Variables:**
```
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-ffdc65d6-cea9-45b3-b6ad-3024fd36a896
MP_ACCESS_TOKEN=APP_USR-7689299563100038-071019-3ca7375225a53590c7e12206503cfe4d-2547567185
MP_WEBHOOK_SECRET=TqMjTQGmRjUedPdK6DvRVL9PoVKjqTpd
NEXT_PUBLIC_SITE_URL=https://neurohackenem.com
```

### 5. **Clique em "Deploy"**

## 📋 **PASSO 4: CONFIGURAR DOMÍNIO**

### 1. **No Vercel Dashboard:**
- Vá em "Settings" → "Domains"
- Adicione: `neurohackenem.com`
- Configure DNS conforme instruções

### 2. **Configurar Webhook Mercado Pago:**
- URL: `https://neurohackenem.com/api/webhook-mercadopago`
- Eventos: `payment`, `payment.updated`

## ✅ **RESULTADO FINAL:**

- **Quiz:** `https://neurohackenem.com/`
- **Funil:** `https://neurohackenem.com/vendas/`
- **Pagamentos:** 100% funcionais
- **Sistema:** Pronto para produção

---

**🎯 Siga estes passos na ordem e seu sistema estará online!**









