#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Iniciando build para Vercel...');

try {
  // 1. Instalar dependências
  console.log('📦 Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });

  // 2. Build do quiz
  console.log('🔨 Fazendo build do quiz...');
  execSync('cd apps/quiz && npm run build', { stdio: 'inherit' });

  // 3. Build do funil
  console.log('🔨 Fazendo build do funil...');
  execSync('cd apps/funil && npm run build', { stdio: 'inherit' });

  // 4. Executar merge
  console.log('🔗 Executando merge dos builds...');
  execSync('node scripts/merge-builds.js', { stdio: 'inherit' });

  console.log('✅ Build concluído com sucesso!');

} catch (error) {
  console.error('❌ Erro no build:', error.message);
  process.exit(1);
}
