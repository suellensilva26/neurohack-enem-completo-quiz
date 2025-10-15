# 📁 FUNIL STANDALONE - CONTEÚDO PARA NOVO REPOSITÓRIO

## 📋 **INSTRUÇÕES:**

1. Criar novo repositório: `funil-neurohackenem`
2. Copiar TODO o conteúdo da pasta `apps/funil/` para a raiz do novo repositório
3. Configurar no Vercel como projeto Vite

## 📂 **ESTRUTURA FINAL:**
```
funil-neurohackenem/
├── src/
│   ├── components/
│   │   ├── SuperCheckout.jsx       ← Checkout com cupom
│   │   ├── VSLScreen.jsx           ← VSL com timer 3min
│   │   └── payment/                ← Sistema Mercado Pago
│   ├── pages/api/                  ← APIs MP
│   ├── lib/
│   │   └── mercadopago.js          ← Config MP
│   └── utils/
│       └── formatters.js           ← Validação CPF
├── package.json                    ← Dependências atualizadas
├── vite.config.js                  ← Config Vite
├── .npmrc                          ← Config npm
├── ENV-LOCAL-CONFIG.txt            ← Variáveis ambiente
└── tsconfig.json                   ← Config TS
```

## 🔑 **ENVIRONMENT VARIABLES (.env.local):**
```
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-ffdc65d6-cea9-45b3-b6ad-3024fd36a896
MP_ACCESS_TOKEN=APP_USR-7689299563100038-071019-3ca7375225a53590c7e12206503cfe4d-2547567185
MP_WEBHOOK_SECRET=TqMjTQGmRjUedPdK6DvRVL9PoVKjqTpd
NEXT_PUBLIC_SITE_URL=https://neurohackenem-funil.vercel.app
```

## ⚙️ **CONFIGURAÇÃO VERCEL:**
- Framework: Vite
- Build Command: npm run build
- Output Directory: dist
- Domain: neurohackenem-funil.vercel.app

## 🔗 **WEBHOOK MERCADO PAGO:**
```
URL: https://neurohackenem-funil.vercel.app/api/webhook-mercadopago
Eventos: payment
```

## ✅ **FUNCIONALIDADES:**
- ✅ VSL com timer 3 minutos
- ✅ Checkout com cupom 50% OFF (20s)
- ✅ Sistema Mercado Pago completo
- ✅ Validação CPF
- ✅ Pagamentos: PIX, Boleto, Cartão
- ✅ Webhook automático
