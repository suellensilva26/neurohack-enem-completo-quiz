# ⚡ Quick Start - NeuroHack ENEM

## 🚀 Começar em 3 Minutos

```bash
# 1. Instalar dependências
npm run install-all

# 2. Rodar em desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

---

## 📝 Comandos Principais

### Desenvolvimento

```bash
# Ambos os projetos simultaneamente (recomendado)
npm run dev
# → Quiz: http://localhost:8080
# → Funil: http://localhost:3000

# Apenas Quiz
npm run dev:quiz

# Apenas Funil
npm run dev:funil
```

### Build

```bash
# Build completo (Quiz + Funil + merge)
npm run build
# → Gera pasta dist/ pronta para deploy

# Build individual
npm run build:quiz    # apps/quiz/dist/
npm run build:funil   # apps/funil/dist/
```

### Preview Local

```bash
# Testar build de produção localmente
npm run preview
# → http://localhost:8000
```

---

## 📂 Estrutura de Pastas

```
neurohack-enem-completo/
├── apps/
│   ├── quiz/         → Quiz de Diagnóstico
│   └── funil/        → Funil de Vendas
├── scripts/          → Scripts de build
├── dist/             → Build final (gerado)
└── package.json      → Configuração raiz
```

---

## 🌐 URLs em Produção

- **`/`** → Quiz de Diagnóstico
- **`/vendas`** → Funil de Vendas

---

## 🐛 Solução Rápida de Problemas

### Erro: "Cannot find module"
```bash
rm -rf node_modules apps/*/node_modules
npm run install-all
```

### Build falha
```bash
npm run build:quiz
npm run build:funil
node scripts/merge-builds.js
```

### Porta já em uso
```bash
# Matar processos nas portas 8080 e 3000
lsof -ti:8080 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

---

## 📦 Deploy Rápido

### Vercel (mais rápido)
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Hostinger
```bash
npm run build
# Upload da pasta dist/ via FTP/cPanel
# Ver DEPLOY-HOSTINGER.md para detalhes
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## ✅ Checklist Antes de Deployar

- [ ] `npm run build` sem erros
- [ ] Testar localmente: `npm run preview`
- [ ] Quiz funciona em `/`
- [ ] Funil funciona em `/vendas`
- [ ] Redirecionamento do botão CTA OK
- [ ] Sem erros no console (F12)

---

## 📚 Documentação Completa

- **README.md** - Visão geral do projeto
- **DEPLOY-HOSTINGER.md** - Guia detalhado de deploy
- **QUICK-START.md** - Este arquivo

---

## 🆘 Suporte

**Problemas técnicos?**
1. Verifique console do navegador (F12)
2. Teste build local: `npm run preview`
3. Compare estrutura com README.md

**Problemas de deploy?**
- Ver DEPLOY-HOSTINGER.md
- Verificar .htaccess presente
- Testar modo anônimo (cache)

---

## 🎯 Fluxo de Trabalho Recomendado

```bash
# 1. Desenvolvimento
npm run dev
# Edite arquivos em apps/quiz/ ou apps/funil/
# Hot reload automático ✅

# 2. Teste local
npm run build
npm run preview

# 3. Deploy
git add .
git commit -m "feat: nova feature"
git push origin main
# → Deploy automático (Vercel/Netlify)
```

---

**🚀 Pronto! Agora é só desenvolver e converter!**










