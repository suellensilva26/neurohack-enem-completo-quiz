#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build customizado para Vercel...');

try {
  // 1. Instalar dependências
  console.log('📦 Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });

  // 2. Instalar dependências do quiz
  console.log('📦 Instalando dependências do quiz...');
  execSync('cd apps/quiz && npm install', { stdio: 'inherit' });

  // 3. Instalar dependências do funil
  console.log('📦 Instalando dependências do funil...');
  execSync('cd apps/funil && npm install', { stdio: 'inherit' });

  // 4. Build do quiz
  console.log('🔨 Fazendo build do quiz...');
  execSync('cd apps/quiz && npx vite build', { stdio: 'inherit' });

  // 5. Build do funil
  console.log('🔨 Fazendo build do funil...');
  execSync('cd apps/funil && npx vite build', { stdio: 'inherit' });

  // 6. Executar merge
  console.log('🔗 Executando merge dos builds...');
  execSync('node scripts/merge-builds.js', { stdio: 'inherit' });

  console.log('✅ Build customizado concluído com sucesso!');

} catch (error) {
  console.error('❌ Erro no build customizado:', error.message);
  process.exit(1);
}
