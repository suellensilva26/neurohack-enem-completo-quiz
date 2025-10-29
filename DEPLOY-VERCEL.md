# ⚡ Deploy Automático na Vercel

## 🎯 Método Mais Rápido (Recomendado)

A Vercel oferece deploy automático via GitHub com zero configuração!

---

## 🚀 PASSO A PASSO

### ETAPA 1: Preparar Repositório GitHub

```bash
# Navegue até o projeto
cd "/home/usuario/Área de trabalho/Quiz completo/neurohack-enem-completo"

# Criar branch main (Vercel prefere main ao invés de master)
git branch -M main

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "🚀 NeuroHack ENEM - Projeto Completo Unificado"
```

### ETAPA 2: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `neurohack-enem-completo`
3. Descrição: `Quiz Diagnóstico + Funil de Vendas NeuroHack ENEM`
4. Visibilidade: **Private** (recomendado)
5. **NÃO** marque "Add README" (já temos)
6. Clique em **"Create repository"**

### ETAPA 3: Push para GitHub

```bash
# Adicionar remote origin (substitua SEU-USUARIO pelo seu usuário GitHub)
git remote add origin https://github.com/suellensilva26/neurohack-enem-completo.git

# Push inicial
git push -u origin main
```

### ETAPA 4: Deploy na Vercel

#### Opção A: Via Dashboard (Mais Fácil)

1. Acesse: https://vercel.com/new
2. Clique em **"Import Git Repository"**
3. Selecione **"Import from GitHub"**
4. Autorize a Vercel a acessar seus repos (se ainda não autorizou)
5. Selecione o repositório `neurohack-enem-completo`
6. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (deixe vazio)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm run install-all`
7. Clique em **"Deploy"**

#### Opção B: Via CLI (Mais Rápido)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login na Vercel
vercel login

# Deploy
cd "/home/usuario/Área de trabalho/Quiz completo/neurohack-enem-completo"
vercel --prod
```

**Durante o setup, responda:**
```
? Set up and deploy "~/neurohack-enem-completo"? [Y/n] y
? Which scope do you want to deploy to? → Seu usuário
? Link to existing project? [y/N] n
? What's your project's name? → neurohack-enem-completo
? In which directory is your code located? → ./
? Want to override the settings? [y/N] y
? Build Command: → npm run build
? Output Directory: → dist
? Development Command: → npm run dev
```

---

## 🎉 Pronto! Seu Site Está no Ar!

A Vercel vai gerar uma URL:
```
https://neurohack-enem-completo.vercel.app
```

---

## 🌐 Configurar Domínio Customizado

### No Dashboard da Vercel:

1. Vá no seu projeto
2. Clique em **"Settings"**
3. Clique em **"Domains"**
4. Digite seu domínio: `neurohackenem.com`
5. Clique em **"Add"**

### Configurar DNS:

**Se o domínio está em outro provedor:**

Adicione estes registros DNS:

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

**Ou use Nameservers da Vercel (recomendado):**

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

## ⚙️ Configuração Avançada (vercel.json)

O arquivo `vercel.json` já foi criado automaticamente no build, mas você pode editá-lo:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/vendas/(.*)",
      "dest": "/vendas/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🔄 Deploy Automático

Agora, **TODA VEZ** que você fizer push para o GitHub:

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

A Vercel vai:
1. ✅ Detectar mudanças automaticamente
2. ✅ Rodar build
3. ✅ Deploy automático
4. ✅ Notificar no Slack/Discord (se configurado)

---

## 📊 Monitoramento

### Analytics da Vercel (Grátis)

1. No dashboard do projeto
2. Aba **"Analytics"**
3. Veja:
   - Visitas
   - Pageviews
   - Top pages
   - Dispositivos

### Speed Insights (Grátis)

1. Aba **"Speed Insights"**
2. Veja performance real dos usuários
3. Core Web Vitals

---

## 🌍 URLs Finais

Depois do deploy, teste:

- `https://seu-projeto.vercel.app/`
- `https://seu-projeto.vercel.app/vendas`
- `https://neurohackenem.com/` (se configurou domínio)
- `https://neurohackenem.com/vendas`

---

## 🐛 Troubleshooting

### Erro: "Build failed"

**Causa:** Dependências não instaladas corretamente

**Solução:**
1. Vá em **"Settings"** → **"General"**
2. **Install Command:** `npm run install-all`
3. **Build Command:** `npm run build`
4. Redeploy

### Erro: "404 Not Found" em /vendas

**Causa:** Routing não configurado

**Solução:**
1. Verifique se `vercel.json` está na raiz de `dist/`
2. Ou adicione na raiz do projeto:

```json
{
  "rewrites": [
    { "source": "/vendas/:path*", "destination": "/vendas/:path*" },
    { "source": "/:path*", "destination": "/:path*" }
  ]
}
```

### Build está lento

**Solução:**
1. Vá em **"Settings"** → **"Functions"**
2. Aumente **"Function Region"** para sua região
3. Configure cache de dependências

### Deploy não dispara automaticamente

**Solução:**
1. Vá em **"Settings"** → **"Git"**
2. Verifique se **"Production Branch"** está como `main`
3. Reconecte repositório se necessário

---

## 🚀 Features Extras da Vercel

### 1. Preview Deployments

Todo PR no GitHub gera URL de preview:
```
https://neurohack-enem-completo-git-feature-xyz.vercel.app
```

### 2. Environment Variables

Adicione variáveis de ambiente:
1. **"Settings"** → **"Environment Variables"**
2. Exemplo:
   ```
   VITE_API_URL=https://api.exemplo.com
   VITE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

### 3. Redirects Customizados

Em `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

### 4. Proteção por Senha

Para projetos em desenvolvimento:
1. **"Settings"** → **"Deployment Protection"**
2. Ative **"Password Protection"**

---

## 📈 Otimizações Recomendadas

### 1. Habilitar Compression

Já ativo por padrão na Vercel! ✅

### 2. Edge Network

A Vercel usa CDN global automaticamente! ✅

### 3. Image Optimization

Para imagens futuras, use `next/image` (se migrar para Next.js)

---

## 💰 Custos

### Plano Hobby (Grátis):
- ✅ Deploy ilimitados
- ✅ 100 GB bandwidth/mês
- ✅ Analytics básico
- ✅ SSL automático
- ✅ Deploy automático

**Perfeito para começar!**

### Plano Pro ($20/mês):
- Bandwidth ilimitado
- Analytics avançado
- Suporte prioritário
- Proteção DDoS

---

## 🎯 Workflow Recomendado

```bash
# 1. Desenvolver localmente
npm run dev

# 2. Testar build
npm run build
npm run preview

# 3. Commit
git add .
git commit -m "feat: implementa nova feature"

# 4. Push (dispara deploy automático)
git push origin main

# 5. Acessar em produção após ~1 minuto
# https://seu-projeto.vercel.app
```

---

## 📱 Integrações Úteis

### Slack/Discord

Receba notificações de deploy:
1. **"Settings"** → **"Integrations"**
2. Adicione Slack ou Discord
3. Webhook configurado

### GitHub Actions

CI/CD customizado (opcional):
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## ✅ Checklist Pós-Deploy

- [ ] ✅ Site carrega em `https://xxx.vercel.app`
- [ ] ✅ Quiz funciona em `/`
- [ ] ✅ Funil funciona em `/vendas`
- [ ] ✅ Redirecionamento CTA OK
- [ ] ✅ SSL ativo (HTTPS)
- [ ] ✅ Analytics configurado
- [ ] ✅ Domínio customizado (se aplicável)
- [ ] ✅ Deploy automático funcionando

---

## 🆘 Suporte

**Documentação Oficial:**
- https://vercel.com/docs

**Community:**
- https://github.com/vercel/vercel/discussions

**Status:**
- https://vercel-status.com

---

**🎉 Parabéns! Deploy na Vercel concluído com sucesso!**

**URLs Finais:**
- ✅ `https://seu-projeto.vercel.app/` → Quiz
- ✅ `https://seu-projeto.vercel.app/vendas` → Funil

**Próximos passos:**
1. Configurar domínio customizado
2. Adicionar analytics (Google/Facebook)
3. Começar a gerar tráfego! 🚀💰










