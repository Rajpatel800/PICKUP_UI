const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'customer');

const featherToMaterial = {
  'clock':'access-time','truck':'local-shipping','alert-circle':'error-outline',
  'briefcase':'work','box':'inventory-2',
  'menu': 'menu','arrow-left': 'arrow-back','user': 'person','video': 'videocam',
  'check-circle': 'check-circle','map': 'map','video-off': 'videocam-off',
  'check': 'check','square': 'check-box-outline-blank','x': 'close',
  'search': 'search','navigation': 'navigation','map-pin': 'place',
  'chevron-down': 'keyboard-arrow-down','info': 'info-outline',
  'arrow-right': 'arrow-forward','edit-2': 'edit','plus': 'add',
  'help-circle': 'help-outline','bell': 'notifications','crosshair': 'my-location',
  'chevron-right': 'keyboard-arrow-right','file-text': 'description',
  'bookmark': 'bookmark-border','home': 'home','more-vertical': 'more-vert',
  'phone': 'phone','message-circle': 'chat-bubble-outline','package': 'inventory-2',
  'check-square': 'check-box','shield': 'security','circle': 'radio-button-unchecked',
  'share': 'share','refresh-cw': 'refresh','credit-card': 'credit-card',
  'camera': 'camera-alt','image': 'image','trash-2': 'delete-outline',
  'lock': 'lock-outline','star': 'star-border','download': 'file-download',
  'filter': 'filter-list','loader': 'loop','paperclip': 'attach-file',
  'send': 'send','mic-off': 'mic-off','grid': 'grid-view',
  'volume-2': 'volume-up','cloud-off': 'cloud-off','wifi-off': 'wifi-off',
  'copy': 'content-copy','share-2': 'share'
};

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let c = fs.readFileSync(p, 'utf8');
      
      // 1 & 2. Fix imports pathing (depth logic)
      const relativeToCustomer = path.relative(srcDir, path.dirname(p));
      const depth = relativeToCustomer === '' ? 0 : relativeToCustomer.split(path.sep).length;
      
      const enginePath = '../'.repeat(depth + 1) + 'services/engine';
      const configPath = '../'.repeat(depth + 1) + 'config';

      c = c.replace(/from\s*['"]([^'"]+)['"]/g, (match, importPath) => {
        if (!importPath.startsWith('.')) return match;
        
        // e.g. ../api/types
        if (importPath.includes('/api/')) {
           return `from '${importPath.replace(/.*\/api\//, enginePath + '/')}'`;
        }
        if (importPath.endsWith('/api')) {
           return `from '${enginePath}'`;
        }
        
        // e.g. ../config
        if (importPath.includes('/config/')) {
           return `from '${importPath.replace(/.*\/config\//, configPath + '/')}'`;
        }
        if (importPath.endsWith('/config')) {
           return `from '${configPath}'`;
        }
        
        return match;
      });

      // 3. absoluteFillObject -> absoluteFill
      c = c.replace(/absoluteFillObject/g, 'absoluteFill');

      // 4. Icons
      if (c.includes('@expo/vector-icons')) {
        c = c.replace(/import\s+\{[^}]+\}\s+from\s+['"]@expo\/vector-icons['"];?/g, "import Icon from '@react-native-vector-icons/material-icons';");
      } else if (c.includes('<Feather') || c.includes('<MaterialIcons')) {
        if (!c.includes("import Icon from '@react-native-vector-icons/material-icons'")) {
          c = "import Icon from '@react-native-vector-icons/material-icons';\n" + c;
        }
      }

      // Rename tags
      c = c.replace(/<Feather/g, '<Icon');
      c = c.replace(/<\/Feather>/g, '</Icon>');
      c = c.replace(/<MaterialIcons/g, '<Icon');
      c = c.replace(/<\/MaterialIcons>/g, '</Icon>');

      // Fix icon types
      c = c.replace(/keyof typeof Feather\.glyphMap/g, 'string');
      c = c.replace(/keyof typeof MaterialIcons\.glyphMap/g, 'string');

      // Map literal icon names
      c = c.replace(/<Icon([^>]+)name=['"]([^'"]+)['"]([^>]*)>/g, (m, a, name, b) => {
        let mapped = featherToMaterial[name] || name;
        return `<Icon${a}name="${mapped}"${b}>`;
      });
      
      // Fix dynamic icon names (remove type enforcement errors if they occur by casting to any)
      // but without breaking JSX
      c = c.replace(/<Icon([^>]+)name=\{([^}]+)\}([^>]*)>/g, (m, a, nameExp, b) => {
        // If it already contains "as any", skip
        if (nameExp.includes('as any')) {
          return `<Icon${a}name={${nameExp}}${b}>`;
        }
        return `<Icon${a}name={(${nameExp}) as any}${b}>`;
      });

      // 5. Fix TextInput types
      c = c.replace(/useRef<Array<TextInput \| null>>/g, 'useRef<any>');
      c = c.replace(/useRef<TextInput \| null>/g, 'useRef<any>');

      // 6. Fix useTripStatus
      if (p.endsWith('useTripStatus.ts')) {
        c = c.replace(/const isForeground = \(state: AppStateStatus \| string\): boolean =>/g, 
                      'const isForeground = (state: AppStateStatus | string | null | undefined): boolean =>');
      }

      fs.writeFileSync(p, c, 'utf8');
    }
  });
}

walk(srcDir);
console.log('Customer UI refactored successfully.');
