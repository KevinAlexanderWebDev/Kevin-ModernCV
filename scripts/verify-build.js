import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Verificando build...\n');

const checks = [
  {
    name: 'Build exitoso',
    fn: () => {
      execSync('npm run build', { stdio: 'pipe' });
      return true;
    }
  },
  {
    name: 'Dist existe',
    fn: () => fs.existsSync('dist')
  },
  {
    name: 'index.html existe',
    fn: () => fs.existsSync('dist/index.html')
  },
  {
    name: 'es/index.html existe',
    fn: () => fs.existsSync('dist/es/index.html')
  },
  {
    name: 'en/index.html existe',
    fn: () => fs.existsSync('dist/en/index.html')
  },
  {
    name: 'Assets optimizados (.webp/.avif)',
    fn: () => {
      const assets = fs.readdirSync('dist/assets', { recursive: true });
      const webpCount = assets.filter(f => f.endsWith('.webp')).length;
      const avifCount = assets.filter(f => f.endsWith('.avif')).length;
      console.log(`   📊 ${webpCount} WebP, ${avifCount} AVIF`);
      return webpCount > 0 && avifCount > 0;
    }
  },
  {
    name: 'CSS minificado',
    fn: () => {
      const cssFiles = fs.readdirSync('dist', { recursive: true })
        .filter(f => f.endsWith('.css'));
      return cssFiles.some(f => {
        const content = fs.readFileSync(path.join('dist', f), 'utf-8');
        return !content.includes('\n\n') && content.length < 50000;
      });
    }
  },
  {
    name: 'JS minificado',
    fn: () => {
      const jsFiles = fs.readdirSync('dist', { recursive: true })
        .filter(f => f.endsWith('.js'));
      return jsFiles.some(f => {
        const content = fs.readFileSync(path.join('dist', f), 'utf-8');
        return content.length < 100000;
      });
    }
  },
];

let passed = 0;
let failed = 0;

for (const check of checks) {
  try {
    const result = check.fn();
    if (result) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}`);
      failed++;
    }
  } catch (e) {
    console.log(`❌ ${check.name} - Error: ${e.message}`);
    failed++;
  }
}

console.log(`\n📊 Resultado: ${passed}/${checks.length} checks pasados`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ¡Todo verificado correctamente!');
}