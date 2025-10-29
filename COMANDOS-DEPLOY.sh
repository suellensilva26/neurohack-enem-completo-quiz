#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# 🚀 COMANDOS DE DEPLOY - NEUROHACK ENEM
# ═══════════════════════════════════════════════════════════════
# 
# Este arquivo contém todos os comandos necessários para fazer
# deploy do projeto. Copie e cole os blocos conforme necessário.
#
# ═══════════════════════════════════════════════════════════════

# ═══════════════════════════════════════════════════════════════
# 📦 ETAPA 1: PREPARAR PROJETO
# ═══════════════════════════════════════════════════════════════

# Navegar até o projeto
cd "/home/usuario/Área de trabalho/Quiz completo/neurohack-enem-completo"

# Instalar todas as dependências
npm run install-all

# Testar localmente
npm run dev
# → Quiz: http://localhost:8080
# → Funil: http://localhost:3000
# Pressione Ctrl+C para parar

# Build de produção
npm run build

# Testar build localmente
npm run preview
# → http://localhost:8000
# Pressione Ctrl+C para parar


# ═══════════════════════════════════════════════════════════════
# 🐙 ETAPA 2: GITHUB (NECESSÁRIO PARA VERCEL)
# ═══════════════════════════════════════════════════════════════

# Renomear branch para main (Vercel prefere main)
git branch -M main

# Adicionar remote do GitHub (SUBSTITUA SEU-USUARIO!)
git remote add origin https://github.com/suellensilva26/neurohack-enem-completo.git

# Push inicial
git push -u origin main

# ═══════════════════════════════════════════════════════════════
# ⚡ OPÇÃO A: DEPLOY NA VERCEL (RECOMENDADO)
# ═══════════════════════════════════════════════════════════════

# Instalar Vercel CLI
npm install -g vercel

# Login na Vercel (abrirá navegador)
vercel login

# Deploy em produção
vercel --prod

# Durante o setup, responda:
# ? Set up and deploy? → Y
# ? Which scope? → Seu usuário
# ? Link to existing project? → N
# ? Project name? → neurohack-enem-completo
# ? Directory? → ./
# ? Override settings? → Y
#   - Build Command: npm run build
#   - Output Directory: dist
#   - Development Command: npm run dev

# Após deploy, você receberá uma URL:
# https://neurohack-enem-completo.vercel.app

# Testar:
# - https://seu-projeto.vercel.app/
# - https://seu-projeto.vercel.app/vendas


# ═══════════════════════════════════════════════════════════════
# 🌐 OPÇÃO B: DEPLOY NA HOSTINGER (VIA FTP)
# ═══════════════════════════════════════════════════════════════

# 1. Build o projeto
npm run build

# 2. Instalar FileZilla (se não tem)
# Ubuntu/Debian:
sudo apt install filezilla

# 3. Conectar via FTP:
# - Host: ftp.neurohackenem.com (ou IP fornecido)
# - Usuário: seu_usuario_ftp
# - Senha: sua_senha_ftp
# - Porta: 21

# 4. Upload:
# Navegue até: public_html/
# Arraste TODOS os arquivos de: dist/
# Aguarde upload completo

# 5. Verificar .htaccess:
# No cPanel File Manager, ative "Show Hidden Files"
# Confirme que .htaccess está presente

# Testar:
# - https://neurohackenem.com/
# - https://neurohackenem.com/vendas


# ═══════════════════════════════════════════════════════════════
# 🔷 OPÇÃO C: DEPLOY NA NETLIFY
# ═══════════════════════════════════════════════════════════════

# Instalar Netlify CLI
npm install -g netlify-cli

# Login (abrirá navegador)
netlify login

# Deploy em produção
netlify deploy --prod --dir=dist

# Durante setup:
# ? Create & configure a new site? → Y
# ? Team? → Seu time
# ? Site name? → neurohack-enem
# Deploy path: dist

# Após deploy, você receberá uma URL:
# https://neurohack-enem.netlify.app

# Testar:
# - https://seu-site.netlify.app/
# - https://seu-site.netlify.app/vendas


# ═══════════════════════════════════════════════════════════════
# 🔄 ATUALIZAÇÕES FUTURAS
# ═══════════════════════════════════════════════════════════════

# Fazer alterações no código
# Depois:

# 1. Commit
git add .
git commit -m "feat: descrição da mudança"

# 2. Push (dispara deploy automático na Vercel/Netlify)
git push origin main

# 3. Para Hostinger, rebuild e re-upload:
npm run build
# Upload novamente via FTP


# ═══════════════════════════════════════════════════════════════
# 🌍 CONFIGURAR DOMÍNIO CUSTOMIZADO
# ═══════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────────────
# VERCEL:
# ─────────────────────────────────────────────────────────────
# 1. Dashboard Vercel → Seu projeto → Settings → Domains
# 2. Adicionar: neurohackenem.com
# 3. Configurar DNS no provedor do domínio:
#
#    Tipo: A
#    Nome: @
#    Valor: 76.76.21.21
#
#    Tipo: CNAME
#    Nome: www
#    Valor: cname.vercel-dns.com

# ─────────────────────────────────────────────────────────────
# NETLIFY:
# ─────────────────────────────────────────────────────────────
# 1. Dashboard Netlify → Site settings → Domain management
# 2. Add custom domain: neurohackenem.com
# 3. Configurar DNS:
#
#    Tipo: A
#    Nome: @
#    Valor: 75.2.60.5
#
#    Tipo: CNAME
#    Nome: www
#    Valor: seu-site.netlify.app

# ─────────────────────────────────────────────────────────────
# HOSTINGER:
# ─────────────────────────────────────────────────────────────
# Se domínio já está na Hostinger, não precisa configurar DNS!
# Apenas faça upload para public_html/


# ═══════════════════════════════════════════════════════════════
# 📊 ADICIONAR GOOGLE ANALYTICS
# ═══════════════════════════════════════════════════════════════

# 1. Criar propriedade em: https://analytics.google.com
# 2. Copiar ID de medição: G-XXXXXXXXXX
# 3. Editar apps/quiz/index.html e apps/funil/index.html
# 4. Adicionar antes de </head>:

cat << 'EOF'
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
EOF

# 5. Rebuild e redeploy:
npm run build
git add .
git commit -m "feat: adiciona Google Analytics"
git push origin main


# ═══════════════════════════════════════════════════════════════
# 💳 INTEGRAR SISTEMA DE PAGAMENTO
# ═══════════════════════════════════════════════════════════════

# Editar: apps/quiz/src/components/QuizResult.tsx
# Linha 128: onClick={() => window.location.href = '/vendas'}
# 
# Trocar para:
# onClick={() => window.location.href = 'https://pay.hotmart.com/SEU-LINK'}
# 
# Ou para o funil:
# Editar: apps/funil/src/components/SuperCheckout.jsx
# Adicionar link de pagamento nos botões de checkout


# ═══════════════════════════════════════════════════════════════
# 🐛 COMANDOS DE TROUBLESHOOTING
# ═══════════════════════════════════════════════════════════════

# Limpar tudo e recomeçar
rm -rf node_modules apps/*/node_modules dist apps/*/dist
npm run install-all
npm run build

# Verificar erros de build
npm run build 2>&1 | grep -i error

# Ver logs do Vercel
vercel logs

# Verificar permissões (Hostinger)
# No cPanel: File Manager → Selecionar .htaccess → Permissions → 644

# Limpar cache do navegador
# Chrome: Ctrl + Shift + Delete
# Ou teste em modo anônimo: Ctrl + Shift + N


# ═══════════════════════════════════════════════════════════════
# ✅ CHECKLIST PÓS-DEPLOY
# ═══════════════════════════════════════════════════════════════

# Testar cada URL:
# □ Quiz carrega em /
# □ Funil carrega em /vendas
# □ Botão CTA redireciona corretamente
# □ Animações funcionam
# □ Timer de urgência ativo
# □ Prova social visível
# □ Responsivo mobile OK
# □ HTTPS ativo (cadeado verde)
# □ Sem erros no console (F12)
# □ Velocidade < 3s


# ═══════════════════════════════════════════════════════════════
# 📱 TESTAR EM MÚLTIPLOS DISPOSITIVOS
# ═══════════════════════════════════════════════════════════════

# Usando Chrome DevTools:
# 1. F12 → Toggle device toolbar (Ctrl + Shift + M)
# 2. Testar em:
#    - iPhone 12/13/14
#    - Samsung Galaxy S21
#    - iPad
#    - Desktop 1920x1080

# Usando BrowserStack (grátis 30 dias):
# https://www.browserstack.com/


# ═══════════════════════════════════════════════════════════════
# 🎯 COMANDOS ÚTEIS DE MANUTENÇÃO
# ═══════════════════════════════════════════════════════════════

# Ver status do Git
git status

# Ver histórico de commits
git log --oneline

# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1

# Ver diferenças antes de commit
git diff

# Atualizar dependências
npm update
cd apps/quiz && npm update
cd ../funil && npm update

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades automático
npm audit fix


# ═══════════════════════════════════════════════════════════════
# 🔥 COMANDO ÚNICO PARA DEPLOY COMPLETO (VERCEL)
# ═══════════════════════════════════════════════════════════════

# Rode TUDO de uma vez:
cd "/home/usuario/Área de trabalho/Quiz completo/neurohack-enem-completo" && \
npm run build && \
git add . && \
git commit -m "build: atualização $(date +'%Y-%m-%d %H:%M')" && \
git push origin main && \
vercel --prod

# Aguarde ~2 minutos e acesse seu site! 🚀


# ═══════════════════════════════════════════════════════════════
# 🎉 FIM - BOA SORTE COM SEU FUNIL!
# ═══════════════════════════════════════════════════════════════

echo "✅ Todos os comandos disponíveis!"
echo ""
echo "📚 Próximos passos:"
echo "1. Escolha uma plataforma (Vercel recomendado)"
echo "2. Execute os comandos da seção correspondente"
echo "3. Teste as URLs geradas"
echo "4. Configure domínio customizado"
echo "5. Adicione analytics"
echo "6. Comece a gerar tráfego!"
echo ""
echo "🚀 BORA FATURAR! 💰"










