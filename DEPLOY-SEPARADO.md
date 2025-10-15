# 🚀 DEPLOY SEPARADO - QUIZ + FUNIL

## 📋 INSTRUÇÕES COMPLETAS

### 🎯 **ESTRATÉGIA:**
Separar os projetos para evitar conflitos de monorepo e garantir builds 100% estáveis no Vercel.

---

## 📁 **PASSO 1: CRIAR REPOSITÓRIOS SEPARADOS**

### 🔗 **Quiz (Diagnóstico):**
```bash
# Criar novo repositório no GitHub: quiz-neurohackenem
# Copiar conteúdo de apps/quiz/ para o novo repositório
```

### 🔗 **Funil (Vendas):**
```bash
# Criar novo repositório no GitHub: funil-neurohackenem
# Copiar conteúdo de apps/funil/ para o novo repositório
```

---

## ⚙️ **PASSO 2: CONFIGURAR VERCEL**

### 🎯 **Projeto 1: Quiz**
- **Nome:** quiz-neurohackenem
- **Repository:** suellensilva26/quiz-neurohackenem
- **Framework:** Vite
- **Build Command:** npm run build
- **Output Directory:** dist
- **Domain:** quiz-neurohackenem.vercel.app

### 🎯 **Projeto 2: Funil**
- **Nome:** funil-neurohackenem
- **Repository:** suellensilva26/funil-neurohackenem
- **Framework:** Vite
- **Build Command:** npm run build
- **Output Directory:** dist
- **Domain:** neurohackenem-funil.vercel.app

---

## 🔑 **PASSO 3: ENVIRONMENT VARIABLES (FUNIL)**

No projeto **funil-neurohackenem** no Vercel:

```
NEXT_PUBLIC_MP_PUBLIC_KEY = APP_USR-ffdc65d6-cea9-45b3-b6ad-3024fd36a896
MP_ACCESS_TOKEN = APP_USR-7689299563100038-071019-3ca7375225a53590c7e12206503cfe4d-2547567185
MP_WEBHOOK_SECRET = TqMjTQGmRjUedPdK6DvRVL9PoVKjqTpd
NEXT_PUBLIC_SITE_URL = https://neurohackenem-funil.vercel.app
```

---

## 🔗 **PASSO 4: CONFIGURAR WEBHOOK**

No painel Mercado Pago:
```
URL: https://neurohackenem-funil.vercel.app/api/webhook-mercadopago
Eventos: payment
```

---

## 📱 **PASSO 5: TESTAR PRODUÇÃO**

### ✅ **URLs Finais:**
- **Quiz:** https://quiz-neurohackenem.vercel.app
- **Funil:** https://neurohackenem-funil.vercel.app

### ✅ **Fluxo:**
1. Usuário acessa quiz
2. Completa diagnóstico
3. Clica "DESCOBRIR MINHA SOLUÇÃO PERSONALIZADA"
4. Redireciona para funil
5. Completa processo de vendas
6. Sistema de pagamento Mercado Pago ativo

---

## 🎯 **VANTAGENS:**

✅ **Builds 100% estáveis** - Sem conflitos de monorepo
✅ **Deploy independente** - Cada projeto roda isolado
✅ **Manutenção fácil** - Mudanças não afetam o outro
✅ **Escalabilidade** - Cada projeto pode crescer independentemente
✅ **Debugging simples** - Problemas isolados por projeto

---

## 📋 **CHECKLIST FINAL:**

- [ ] Criar repositório quiz-neurohackenem
- [ ] Criar repositório funil-neurohackenem
- [ ] Configurar projeto quiz no Vercel
- [ ] Configurar projeto funil no Vercel
- [ ] Adicionar Environment Variables no funil
- [ ] Configurar webhook Mercado Pago
- [ ] Testar quiz funcionando
- [ ] Testar funil funcionando
- [ ] Testar fluxo completo
- [ ] Testar pagamentos

---

## 🚀 **RESULTADO FINAL:**

**Quiz:** https://quiz-neurohackenem.vercel.app
**Funil:** https://neurohackenem-funil.vercel.app
**Fluxo:** Quiz → Funil → Pagamento → Sucesso

**✅ Projetos separados, builds estáveis, deploy automático!**
