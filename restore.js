const fs = require('fs');
const path = require('path');

const srcDir = './src';
const origDir = 'D:/Codes/PickUp/Driver/DriverUI/PickUpDriver/src';

function restoreFile(filePath) {
  const origPath = filePath.replace('./src', origDir).replace('.\\src', origDir);
  if (!fs.existsSync(origPath)) {
    console.log('Skipping ' + filePath + ' (not in orig)');
    return;
  }

  let origContent = fs.readFileSync(origPath, 'utf8');
  let currentContent = fs.readFileSync(filePath, 'utf8');

  // Fix import
  currentContent = currentContent.replace(/\n Icon from/, '\nimport Icon from');
  
  // Extract all text icon occurrences from origContent
  const r1 = /<Text\s+style={\[([^\]]*?styles\.icon[^\]]*?)\]}>\s*\{([a-zA-Z0-9_\.]+)\}\s*<\/Text>/g;
  const r2 = /<Text\s+style={styles\.icon}>\s*\{([a-zA-Z0-9_\.]+)\}\s*<\/Text>/g;
  const r3 = /<Text\s+style={styles\.icon}>\s*([a-zA-Z0-9_]+)\s*<\/Text>/g;
  
  let matches1 = [...origContent.matchAll(r1)];
  let matches2 = [...origContent.matchAll(r2)];
  let matches3 = [...origContent.matchAll(r3)];

  // Replace back the correct names in currentContent
  let i1 = 0;
  currentContent = currentContent.replace(/<Icon name=\{\} style=\{\[\]\} \/>/g, () => {
    if (i1 < matches1.length) {
      let m = matches1[i1++];
      return '<Icon name={' + m[2] + '} style={[' + m[1] + ']} />';
    }
    return '<Icon name={} style={[]} />';
  });

  let i2 = 0;
  currentContent = currentContent.replace(/<Icon name=\{\} \/>/g, () => {
    if (i2 < matches2.length) {
      let m = matches2[i2++];
      return '<Icon name={' + m[1] + '} />';
    }
    return '<Icon name={} />';
  });

  let i3 = 0;
  currentContent = currentContent.replace(/<Icon name="" \/>/g, () => {
    if (i3 < matches3.length) {
      let m = matches3[i3++];
      return '<Icon name="' + m[1] + '" />';
    }
    return '<Icon name="" />';
  });

  // For BottomTabBar
  if (filePath.includes('BottomTabBar')) {
    currentContent = currentContent.replace(/<Icon name=\{tab\.iconName\} style=\{\[styles\.icon, isActive \? styles\.iconActive : styles\.iconInactive\]\} \/>/, '<Icon name={tab.iconName} style={[isActive ? styles.iconActive : styles.iconInactive]} />');
  }

  // Restore the dynamic styles styles.xyzIcon
  const r4 = /<Text\s+style={\[?styles\.([a-zA-Z0-9_]+)\]?}>\s*([a-zA-Z0-9_]+)\s*<\/Text>/g;
  let matches4 = [...origContent.matchAll(r4)].filter(m => m[1].toLowerCase().includes('icon'));
  
  let i4 = 0;
  // In the broken file, they became: <Icon name=""" style={styles.xyz} />
  currentContent = currentContent.replace(/<Icon name=""([a-zA-Z0-9_]+)"" style=\{styles\.([a-zA-Z0-9_]+)\} \/>/g, () => {
    if (i4 < matches4.length) {
      let m = matches4[i4++];
      return '<Icon name="' + m[2] + '" style={styles.' + m[1] + '} />';
    }
    return '<Icon BROKEN />';
  });
  
  // Actually, wait, the script for styles.xyzIcon was: '<Icon name="' + iconName + '" style={styles.' + styleName + '} />'
  // So it would be <Icon name="iconName" style={styles.styleName} />
  currentContent = currentContent.replace(/<Icon name="([a-zA-Z0-9_]+)" style=\{styles\.([a-zA-Z0-9_]+)\} \/>/g, (match, iconName, styleName) => {
      return '<Icon name="' + iconName + '" style={styles.' + styleName + '} />';
  });

  fs.writeFileSync(filePath, currentContent, 'utf8');
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      restoreFile(fullPath);
    }
  }
}

processDir(srcDir);
console.log('Restored!');