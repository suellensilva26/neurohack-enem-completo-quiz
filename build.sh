#!/bin/bash

# Build script for Vercel deployment
echo "🚀 Building NeuroHack ENEM Complete..."

# Install dependencies
npm install

# Build quiz
echo "📦 Building Quiz..."
cd apps/quiz
npm install
npm run build
cd ../..

# Build funil
echo "📦 Building Funil..."
cd apps/funil
npm install
npm run build
cd ../..

# Merge builds
echo "🔗 Merging builds..."
node scripts/merge-builds.js

echo "✅ Build complete! Ready for deployment."


