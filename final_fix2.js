const fs = require('fs');
const path = require('path');

const origDir = 'D:/Codes/PickUp/Driver/DriverUI/PickUpDriver/src';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('<Icon name={}')) {
    // Correctly get origPath
    const relativePath = filePath.substring(4); // remove 'src\'
    const origPath = path.join(origDir, relativePath);
    
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

processDir('src');