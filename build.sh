#!/bin/bash
set -e

echo "→ Building Storybook..."
cd storybook
npm ci
npm run build-storybook
cd ..

echo "→ Setting up output directory..."
rm -rf public
mkdir -p public/storybook/src
mkdir -p public/storybook-ui
mkdir -p public/dashboard-rede
mkdir -p public/dashboard-adm

echo "→ Copying Storybook UI..."
cp -r storybook/storybook-static/. public/storybook-ui/

echo "→ Copying CSS source files..."
cp -r storybook/src/. public/storybook/src/

echo "→ Copying dashboard files..."
cp -r dashboard-rede/. public/dashboard-rede/
cp -r dashboard-adm/. public/dashboard-adm/

echo "→ Creating root redirect..."
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=/dashboard-rede/prototipo.html" />
  <title>Althus Eletropostos</title>
</head>
<body>
  <p>Redirecionando para o <a href="/dashboard-rede/prototipo.html">protótipo</a>...</p>
</body>
</html>
EOF

echo "✓ Build concluído."
