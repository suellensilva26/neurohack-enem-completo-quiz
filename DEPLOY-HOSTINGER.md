# 🌐 Guia Completo de Deploy na Hostinger

## 📋 Pré-requisitos

- ✅ Conta na Hostinger ativa
- ✅ Domínio configurado (ex: `neurohackenem.com`)
- ✅ Acesso ao cPanel ou FTP
- ✅ Node.js instalado localmente (para build)

---

## 🚀 PASSO A PASSO COMPLETO

### ETAPA 1: Build do Projeto Localmente

```bash
# Navegue até a pasta do projeto
cd "/home/usuario/Área de trabalho/Quiz completo/neurohack-enem-completo"

# Instale todas as dependências (se ainda não instalou)
npm run install-all

# Faça o build completo
npm run build
```

**✅ Aguarde a conclusão. Você verá:**
```
🚀 Iniciando merge dos builds...

🧹 Limpando pasta dist...
📦 Copiando Quiz para raiz (/)...
📦 Copiando Funil para /vendas...
⚙️  Criando .htaccess...
⚙️  Criando _redirects...
⚙️  Criando vercel.json...

✅ Build unificado criado com sucesso!

📁 Estrutura final:
   dist/
   ├── index.html          ← Quiz (raiz)
   ├── assets/
   ├── vendas/
   │   ├── index.html      ← Funil
   │   └── assets/
   ├── .htaccess           ← Config Hostinger
   ├── _redirects          ← Config Netlify
   └── vercel.json         ← Config Vercel

🚀 Pronto para deploy!
```

### ETAPA 2: Verificar Build Local (Opcional mas Recomendado)

```bash
# Teste o build localmente
npm run preview

# Acesse: http://localhost:8000
# Teste ambas as rotas:
# - http://localhost:8000/        (Quiz)
# - http://localhost:8000/vendas  (Funil)
```

---

## 📂 MÉTODO 1: Upload via cPanel (Recomendado)

### PASSO 1: Acesse o cPanel da Hostinger

1. Faça login em: https://hpanel.hostinger.com
2. Clique em **"Websites"**
3. Selecione seu domínio
4. Clique em **"Gerenciador de Arquivos"** ou **"File Manager"**

### PASSO 2: Navegue até public_html

1. Abra a pasta `public_html/`
2. **IMPORTANTE:** Faça backup de arquivos existentes (se houver)

### PASSO 3: Limpar public_html (se necessário)

- **Se for primeira instalação:** Pode pular
- **Se já existe site:** 
  1. Selecione TODOS os arquivos (exceto `.well-known/`)
  2. Clique em **"Delete"**

### PASSO 4: Upload dos Arquivos

1. No File Manager, clique em **"Upload"**
2. Arraste TODOS os arquivos da pasta `dist/` local
3. **CERTIFIQUE-SE de incluir:**
   - ✅ `index.html`
   - ✅ Pasta `assets/`
   - ✅ Pasta `vendas/`
   - ✅ Arquivo `.htaccess` **(CRÍTICO!)**
   - ✅ Outros arquivos (robots.txt, favicon, etc)

### PASSO 5: Verificar Estrutura Final

Sua pasta `public_html/` deve ficar assim:

```
public_html/
├── index.html              ← Quiz principal
├── favicon.ico
├── robots.txt
├── .htaccess              ← Arquivo OCULTO (importante!)
├── assets/
│   ├── index-abc123.js
│   ├── index-def456.css
│   └── ...
├── vendas/
│   ├── index.html         ← Funil de vendas
│   └── assets/
│       ├── index-xyz789.js
│       └── ...
└── .well-known/           ← NÃO DELETAR (SSL)
```

### PASSO 6: Verificar o .htaccess

1. No File Manager, clique em **"Settings"** (canto superior direito)
2. Marque **"Show Hidden Files (dotfiles)"**
3. Verifique se `.htaccess` está presente
4. Clique nele e em **"Edit"** para confirmar conteúdo:

```apache
# NeuroHack ENEM - Configuração de Rotas
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirecionar /vendas para pasta vendas
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^vendas/(.*)$ /vendas/$1 [L]

  # SPA Routing - Quiz (raiz)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(?!vendas)(.*)$ /index.html [L]
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
</IfModule>
```

---

## 📂 MÉTODO 2: Upload via FTP (FileZilla)

### PASSO 1: Configurar FileZilla

1. Abra FileZilla
2. Vá em **File → Site Manager**
3. Clique em **"New Site"**
4. Configure:
   - **Host:** ftp.neurohackenem.com (ou IP fornecido pela Hostinger)
   - **Port:** 21
   - **Protocol:** FTP
   - **Encryption:** Use explicit FTP over TLS if available
   - **Logon Type:** Normal
   - **User:** Seu usuário FTP (da Hostinger)
   - **Password:** Sua senha FTP

### PASSO 2: Conectar e Upload

1. Clique em **"Connect"**
2. No painel direito, navegue até `public_html/`
3. No painel esquerdo, navegue até sua pasta `dist/`
4. Selecione TODOS os arquivos da pasta `dist/`
5. Arraste para o painel direito (public_html/)
6. Aguarde upload completo

---

## ✅ ETAPA 3: Testar o Deploy

### Teste 1: Quiz Principal
Acesse: `https://neurohackenem.com/`

**Esperado:**
- ✅ Página do quiz carrega normalmente
- ✅ Animações funcionando
- ✅ Navegação entre perguntas OK
- ✅ Resultado exibe corretamente

### Teste 2: Funil de Vendas
Acesse: `https://neurohackenem.com/vendas`

**Esperado:**
- ✅ Página do funil carrega
- ✅ Prova social visível
- ✅ Timer funcionando
- ✅ VSL carrega

### Teste 3: Fluxo Completo
1. Acesse `https://neurohackenem.com/`
2. Complete o quiz (6 perguntas)
3. Veja o resultado
4. Clique em **"🧠 HACKEAR MEU CÉREBRO AGORA!"**
5. **Deve redirecionar para:** `https://neurohackenem.com/vendas`

### Teste 4: Rotas SPA
Tente acessar diretamente:
- `https://neurohackenem.com/quiz` ← Deve funcionar (SPA routing)
- `https://neurohackenem.com/vendas` ← Deve carregar o funil

---

## 🐛 Troubleshooting

### Problema 1: Erro 404 ao acessar /vendas

**Causa:** Arquivo `.htaccess` não foi carregado

**Solução:**
1. No cPanel File Manager, ative "Show Hidden Files"
2. Verifique se `.htaccess` existe
3. Se não existir, crie manualmente:
   - Clique em **"+ File"**
   - Nome: `.htaccess`
   - Cole o conteúdo do arquivo (veja PASSO 6 acima)

### Problema 2: Página em branco

**Causa:** Caminho dos assets incorreto

**Solução:**
1. Verifique se a pasta `assets/` está na raiz de `public_html/`
2. Abra o console do navegador (F12)
3. Veja se há erros 404 nos arquivos JS/CSS
4. Se sim, refaça o upload garantindo TODOS os arquivos

### Problema 3: Estilos não carregam

**Causa:** Cache do navegador ou CDN da Hostinger

**Solução:**
1. Limpe cache do navegador (Ctrl + Shift + Delete)
2. Teste em modo anônimo (Ctrl + Shift + N)
3. No cPanel, vá em **"Cache Manager"** e limpe o cache

### Problema 4: Redirecionamento não funciona

**Causa:** `.htaccess` com sintaxe incorreta ou não carregado

**Solução:**
1. Verifique permissões do `.htaccess` (deve ser 644)
2. No cPanel, clique com direito → **"Change Permissions"**
3. Configure: `rw-r--r--` (644)

### Problema 5: Site lento após deploy

**Causa:** Assets não comprimidos ou sem cache

**Solução:**
1. Verifique se o `.htaccess` tem as diretivas de cache
2. No cPanel, ative **"Gzip Compression"**
3. Considere usar Cloudflare (CDN grátis)

---

## 🔒 Configurações Adicionais (Recomendadas)

### 1. SSL/HTTPS (Se ainda não configurado)

1. No hPanel Hostinger
2. Vá em **"SSL"**
3. Ative **"Force HTTPS"**
4. Aguarde propagação (até 24h)

### 2. Configurar Domínio Customizado

Se você tem domínio externo (ex: GoDaddy):

**No provedor do domínio:**
1. Adicione registros DNS:
   ```
   Tipo: A
   Nome: @
   Valor: [IP da Hostinger]
   
   Tipo: CNAME
   Nome: www
   Valor: neurohackenem.com
   ```

**Na Hostinger:**
1. Vá em **"Websites"** → **"Manage"**
2. **"Domain"** → **"Add Domain"**
3. Digite seu domínio
4. Aguarde propagação DNS (2-48h)

### 3. Otimizar Performance

**No cPanel:**
1. Ative **"LiteSpeed Cache"** (se disponível)
2. Ative **"Gzip Compression"**
3. Configure **"Browser Caching"**

### 4. Monitoramento

**Google Analytics:**
- Adicione script do GA4 no `index.html` antes do `</head>`

**Hotjar:**
- Para heatmaps e gravações de sessão

---

## 📊 Checklist Final de Deploy

Antes de considerar concluído:

- [ ] ✅ Quiz carrega em `/`
- [ ] ✅ Funil carrega em `/vendas`
- [ ] ✅ Botão CTA redireciona corretamente
- [ ] ✅ Animações funcionando
- [ ] ✅ Timer de urgência ativo
- [ ] ✅ Prova social visível
- [ ] ✅ Responsivo mobile OK
- [ ] ✅ HTTPS ativo (cadeado verde)
- [ ] ✅ Sem erros no console (F12)
- [ ] ✅ Velocidade aceitável (<3s load time)

---

## 🎯 URLs Finais para Testar

Substitua `neurohackenem.com` pelo seu domínio:

- https://neurohackenem.com/
- https://neurohackenem.com/quiz
- https://neurohackenem.com/vendas
- https://www.neurohackenem.com/ (com www)

---

## 📞 Suporte

**Problemas com a Hostinger:**
- Chat: https://www.hostinger.com.br/contato
- E-mail: support@hostinger.com

**Problemas com o código:**
- Verifique o console do navegador (F12)
- Teste localmente com `npm run preview`
- Compare com a estrutura esperada

---

## 🚀 Próximos Passos Após Deploy

1. **Analytics:**
   - Configurar Google Analytics 4
   - Adicionar Facebook Pixel
   - Implementar evento de conversão

2. **Marketing:**
   - Configurar Google Ads
   - Criar campanhas no Facebook/Instagram
   - Testar diferentes criativos

3. **Otimização:**
   - A/B testing de headlines
   - Testar diferentes CTAs
   - Otimizar copy do funil

4. **Automação:**
   - Integrar com sistema de pagamento (Hotmart, Stripe, etc)
   - Configurar e-mail marketing
   - Automatizar entrega de produto

---

**🎉 Parabéns! Seu funil está no ar!**

**Estrutura Final Funcionando:**
- ✅ `neurohackenem.com/` → Quiz Diagnóstico
- ✅ `neurohackenem.com/vendas` → Funil Completo

Agora é hora de **gerar tráfego** e **converter**! 🚀💰










