const fs = require('fs');
const path = require('path');

function replaceIconInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('Material Symbols Outlined')) return;

  if (!content.includes('import Icon from')) {
    const depth = filePath.split(path.sep).length - 3; 
    let relativePath = '../'.repeat(depth) + 'components/atoms/Icon';
    if (filePath.includes('atoms')) relativePath = './Icon';
    else if (filePath.includes('molecules') || filePath.includes('organisms')) relativePath = '../atoms/Icon';
    else if (filePath.includes('screens')) relativePath = '../../components/atoms/Icon';
    else if (filePath.includes('navigation')) relativePath = '../components/atoms/Icon';
    
    content = content.replace(/(import .* from 'react-native';\r?\n)/, " Icon from '" + relativePath + "';\n");
  }

  // <Text style={[styles.icon, ...]}>{name}</Text>
  content = content.replace(/<Text\s+style={\[([^\]]*?styles\.icon[^\]]*?)\]}>\s*\{([a-zA-Z0-9_\.]+)\}\s*<\/Text>/g, '<Icon name={} style={[]} />');
  // <Text style={styles.icon}>{name}</Text>
  content = content.replace(/<Text\s+style={styles\.icon}>\s*\{([a-zA-Z0-9_\.]+)\}\s*<\/Text>/g, '<Icon name={} />');
  // <Text style={styles.icon}>name</Text>
  content = content.replace(/<Text\s+style={styles\.icon}>\s*([a-zA-Z0-9_]+)\s*<\/Text>/g, '<Icon name="" />');

  if (filePath.includes('BottomTabBar')) {
    content = content.replace(/<Text\s*style={\[\s*styles\.icon,\s*isActive \? styles\.iconActive : styles\.iconInactive,\s*\]}\s*>\s*\{tab\.iconName\}\s*<\/Text>/s, '<Icon name={tab.iconName} style={[styles.icon, isActive ? styles.iconActive : styles.iconInactive]} />');
  }

  content = content.replace(/<Text\s+style={\[?styles\.([a-zA-Z0-9_]+)\]?}>\s*([a-zA-Z0-9_]+)\s*<\/Text>/g, (match, styleName, iconName) => {
    if (styleName.toLowerCase().includes('icon')) {
      return '<Icon name="' + iconName + '" style={styles.' + styleName + '} />';
    }
    return match;
  });

  content = content.replace(/\s*fontFamily:\s*'Material Symbols Outlined',/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated: ' + filePath);
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceIconInFile(fullPath);
    }
  }
}

processDir('./src');