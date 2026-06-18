const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const routes = ['yazilar', 'hakkimizda', 'arsiv'];

const indexPath = path.join(buildDir, 'index.html');
const fallbackPath = path.join(buildDir, '404.html');

console.log('--- Starting Post-Build Router Generation ---');

if (fs.existsSync(indexPath)) {
  // 1. Copy index.html to 404.html (for fallback)
  fs.copyFileSync(indexPath, fallbackPath);
  console.log('✔ Copied index.html to 404.html (for fallback/direct links)');

  // 2. Create directories for routes and copy index.html
  routes.forEach(route => {
    const routeDir = path.join(buildDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));
    console.log(`✔ Created route directory and copied index.html for: /${route}`);
  });
  console.log('--- Post-Build Completed Successfully ---');
} else {
  console.error('❌ Error: build/index.html not found! Make sure to run "npm run build" first.');
  process.exit(1);
}
