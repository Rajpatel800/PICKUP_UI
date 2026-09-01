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

  // Fix the malformed paths
  // If it has `..//../../` or `.../../../`
  content = content.replace(/['"]\.\.\/\.\.\/\.\.\/services\/engine\/?([^'"]*)['"]/g, "'../../services/engine/$1'");
  content = content.replace(/['"]\.\.\/\.\.\/\.\.\/\.\.\/services\/engine\/?([^'"]*)['"]/g, "'../../../services/engine/$1'");
  
  content = content.replace(/['"]\.\.\/\.\.\/\.\.\/config\/?([^'"]*)['"]/g, "'../../config/$1'");
  content = content.replace(/['"]\.\.\/\.\.\/\.\.\/\.\.\/config\/?([^'"]*)['"]/g, "'../../../config/$1'");

  // Fix any remaining /api or /config imports correctly by looking at the file depth
  // The depth of the file from `src/customer`
  const relativeToCustomer = path.relative(srcDir, path.dirname(filePath));
  const depth = relativeToCustomer === '' ? 0 : relativeToCustomer.split(path.sep).length;
  // If depth=0 (e.g. src/customer/theme.ts), to reach src/services/engine: `../services/engine`
  // If depth=1 (e.g. src/customer/screens/X.tsx), to reach src/services/engine: `../../services/engine`
  // If depth=2 (e.g. src/customer/screens/auth/X.tsx), it is `../../../services/engine`
  
  const enginePath = '../'.repeat(depth + 1) + 'services/engine';
  const configPath = '../'.repeat(depth + 1) + 'config';

  const importRegex = /from\s*['"]([^'"]+)['"]/g;
  content = content.replace(importRegex, (match, importPath) => {
    if (!importPath.startsWith('.')) return match;
    
    // Check if the import path ends up resolving to old api or config
    // The old path was resolved from the old file location
    // The old file location was 1 level up (src/screens vs src/customer/screens)
    // We can just explicitly check the remaining bad ones.
    
    // Instead of doing it dynamically again, let's just use the fixed regex replacements above.
    return match;
  });
  
  // Clean up any trailing slashes in imports like '.../engine/'
  content = content.replace(/services\/engine\/['"]/g, "services/engine'");
  content = content.replace(/config\/['"]/g, "config'");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});