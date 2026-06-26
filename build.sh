#!/bin/bash
set -e

echo "→ Building Storybook Desktop..."
cd storybook-desktop
npm ci
npm run build-storybook
cd ..

echo "→ Building Storybook App..."
cd storybook-app
npm ci
npm run build-storybook
cd ..

echo "→ Setting up output directory..."
rm -rf public
mkdir -p public/storybook-desktop/src
mkdir -p public/storybook-app/src
mkdir -p public/storybook-ui
mkdir -p public/storybook-app-ui
mkdir -p public/dashboard-rede
mkdir -p public/dashboard-adm
mkdir -p public/app
mkdir -p public/src
mkdir -p public/shared

echo "→ Copying Storybook UI..."
cp -r storybook-desktop/storybook-static/. public/storybook-ui/
cp -r storybook-app/storybook-static/. public/storybook-app-ui/

echo "→ Copying CSS source files..."
cp -r storybook-desktop/src/. public/storybook-desktop/src/
cp -r storybook-app/src/. public/storybook-app/src/

echo "→ Copying shared CSS..."
cp -r shared/. public/shared/

echo "→ Copying dashboard files..."
cp -r dashboard-rede/. public/dashboard-rede/
cp -r dashboard-adm/. public/dashboard-adm/

echo "→ Copying app files..."
cp -r app/. public/app/

echo "→ Copying assets..."
cp -r src/. public/src/

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
