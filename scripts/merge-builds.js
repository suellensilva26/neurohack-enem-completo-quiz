const fs = require('fs-extra');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const QUIZ_BUILD = path.join(ROOT, 'apps/quiz/dist');
const FUNIL_BUILD = path.join(ROOT, 'apps/funil/dist');

async function mergeBUILDS() {
  console.log('🚀 Iniciando merge dos builds...\n');

  try {
    // Limpar pasta dist
    console.log('🧹 Limpando pasta dist...');
    await fs.remove(DIST);
    await fs.ensureDir(DIST);

    // Copiar quiz para raiz do dist
    console.log('📦 Copiando Quiz para raiz (/)...');
    await fs.copy(QUIZ_BUILD, DIST);

    // Copiar funil para /vendas
    console.log('📦 Copiando Funil para /vendas...');
    const vendasDir = path.join(DIST, 'vendas');
    await fs.ensureDir(vendasDir);
    await fs.copy(FUNIL_BUILD, vendasDir);

    // Criar .htaccess para Hostinger
    console.log('⚙️  Criando .htaccess...');
    const htaccess = `# NeuroHack ENEM - Configuração de Rotas
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
</IfModule>`;
    
    await fs.writeFile(path.join(DIST, '.htaccess'), htaccess);

    // Criar _redirects para Netlify/Vercel
    console.log('⚙️  Criando _redirects...');
    const redirects = `/vendas/* /vendas/index.html 200
/* /index.html 200`;
    await fs.writeFile(path.join(DIST, '_redirects'), redirects);

    // Criar vercel.json
    console.log('⚙️  Criando vercel.json...');
    const vercelConfig = {
      "version": 2,
      "routes": [
        {
          "src": "/vendas/(.*)",
          "dest": "/vendas/$1"
        },
        {
          "src": "/(.*)",
          "dest": "/$1"
        }
      ]
    };
    await fs.writeFile(
      path.join(DIST, 'vercel.json'), 
      JSON.stringify(vercelConfig, null, 2)
    );

    console.log('\n✅ Build unificado criado com sucesso!');
    console.log('\n📁 Estrutura final:');
    console.log('   dist/');
    console.log('   ├── index.html          ← Quiz (raiz)');
    console.log('   ├── assets/');
    console.log('   ├── vendas/');
    console.log('   │   ├── index.html      ← Funil');
    console.log('   │   └── assets/');
    console.log('   ├── .htaccess           ← Config Hostinger');
    console.log('   ├── _redirects          ← Config Netlify');
    console.log('   └── vercel.json         ← Config Vercel');
    console.log('\n🚀 Pronto para deploy!\n');

  } catch (error) {
    console.error('❌ Erro ao fazer merge dos builds:', error);
    process.exit(1);
  }
}

mergeBUILDS();










