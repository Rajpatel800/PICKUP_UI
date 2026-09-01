const fs = require('fs');
const path = require('path');

const origDir = 'D:/Codes/PickUp/Driver/DriverUI/PickUpDriver/src';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Fix duplicate SafeAreaView
  if (content.includes("from 'react-native-safe-area-context';")) {
    const importRN = content.match(/import\s+\{([^}]+)\}\s+from\s+'react-native';/);
    if (importRN && importRN[1].includes('SafeAreaView')) {
      const newImport = importRN[1].replace(/\bSafeAreaView\b,?/g, '').trim().replace(/,\s*$/, '');
      if (newImport.length > 0) {
        content = content.replace(importRN[0], `import { ${newImport} } from 'react-native';`);
      } else {
        content = content.replace(importRN[0] + '\n', '');
      }
      changed = true;
    }
  }

  // 2. Fix missing View, Text, StyleSheet
  const needsFix = ['EmptyState.tsx', 'ErrorState.tsx'];
  if (needsFix.some(f => filePath.endsWith(f))) {
    const importRN = content.match(/import\s+.*from\s+'react-native';/);
    if (!importRN || !importRN[0].includes('{ View, Text, StyleSheet }')) {
      content = content.replace(/(import React.*?from 'react';\r?\n)/, "$1import { View, Text, StyleSheet } from 'react-native';\n");
      changed = true;
    }
  }

  // 3. Fix empty expressions <Icon name={} /> or <Icon name={[]} /> etc.
  if (content.includes('<Icon name={}')) {
    const origPath = filePath.replace('./src', origDir).replace('.\\src', origDir);
    if (fs.existsSync(origPath)) {
      const origContent = fs.readFileSync(origPath, 'utf8');
      
      const r1 = /<Text\s+style={\[([^\]]*?styles\.icon[^\]]*?)\]}>\s*\{([a-zA-Z0-9_\.]+)\}\s*<\/Text>/g;
      const r2 = /<Text\s+style={styles\.icon}>\s*\{([a-zA-Z0-9_\.]+)\}\s*<\/Text>/g;
      const r3 = /<Text\s+style={styles\.icon}>\s*([a-zA-Z0-9_]+)\s*<\/Text>/g;
      
      let matches1 = [...origContent.matchAll(r1)];
      let matches2 = [...origContent.matchAll(r2)];
      let matches3 = [...origContent.matchAll(r3)];

      let i1 = 0;
      content = content.replace(/<Icon name=\{\} style=\{\[\]\} \/>/g, () => {
        if (i1 < matches1.length) {
          let m = matches1[i1++];
          return `<Icon name={${m[2]}} style={[${m[1]}]} />`;
        }
        return '<Icon name={} style={[]} />';
      });

      let i2 = 0;
      content = content.replace(/<Icon name=\{\} \/>/g, () => {
        if (i2 < matches2.length) {
          let m = matches2[i2++];
          return `<Icon name={${m[1]}} />`;
        }
        return '<Icon name={} />';
      });
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed ' + filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fixFile(fullPath);
    }
  }
}

processDir('./src');