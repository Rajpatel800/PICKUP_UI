const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'customer');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk(srcDir, (filePath) => {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Rewrite @expo/vector-icons
  const expoVectorRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@expo\/vector-icons['"];?/g;
  content = content.replace(expoVectorRegex, (match, p1) => {
    const icons = p1.split(',').map(i => i.trim()).filter(Boolean);
    let newImports = [];
    icons.forEach(icon => {
      newImports.push(`import ${icon} from 'react-native-vector-icons/${icon}';`);
    });
    return newImports.join('\n');
  });

  // 2. Rewrite Engine/Config relative imports
  const importRegex = /from\s*['"]([^'"]+)['"]/g;
  content = content.replace(importRegex, (match, importPath) => {
    if (!importPath.startsWith('.')) return match;
    
    // We moved everything to src/customer/, which is 1 level deeper.
    // E.g., `../../api/engine` -> `../../../services/engine`
    
    if (importPath.includes('/api/')) {
       return `from '${importPath.replace('/api/', '/../../services/engine/')}'`;
    }
    if (importPath.endsWith('/api')) {
       return `from '${importPath.replace(/\/api$/, '/../../services/engine')}'`;
    }
    
    if (importPath.includes('/config/')) {
       return `from '${importPath.replace('/config/', '/../../config/')}'`;
    }
    if (importPath.endsWith('/config')) {
       return `from '${importPath.replace(/\/config$/, '/../../config')}'`;
    }
    
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
