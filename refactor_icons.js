const fs = require('fs');
const path = require('path');

const featherToMaterial = {
  'menu': 'menu',
  'arrow-left': 'arrow-back',
  'truck': 'local-shipping',
  'user': 'person',
  'video': 'videocam',
  'check-circle': 'check-circle',
  'map': 'map',
  'video-off': 'videocam-off',
  'check': 'check',
  'square': 'check-box-outline-blank',
  'x': 'close',
  'search': 'search',
  'navigation': 'navigation',
  'alert-circle': 'error-outline',
  'map-pin': 'place',
  'chevron-down': 'keyboard-arrow-down',
  'info': 'info-outline',
  'arrow-right': 'arrow-forward',
  'edit-2': 'edit',
  'plus': 'add',
  'help-circle': 'help-outline',
  'bell': 'notifications',
  'crosshair': 'my-location',
  'chevron-right': 'keyboard-arrow-right',
  'clock': 'access-time',
  'file-text': 'description',
  'bookmark': 'bookmark-border',
  'home': 'home',
  'more-vertical': 'more-vert',
  'phone': 'phone',
  'message-circle': 'chat-bubble-outline',
  'package': 'inventory-2',
  'check-square': 'check-box',
  'shield': 'security',
  'circle': 'radio-button-unchecked',
  'share': 'share',
  'refresh-cw': 'refresh',
  'credit-card': 'credit-card',
  'camera': 'camera-alt',
  'image': 'image',
  'trash-2': 'delete-outline',
  'lock': 'lock-outline',
  'star': 'star-border',
  'download': 'file-download',
  'filter': 'filter-list',
  'loader': 'loop',
  'paperclip': 'attach-file',
  'send': 'send',
  'mic-off': 'mic-off',
  'grid': 'grid-view',
  'volume-2': 'volume-up',
  'cloud-off': 'cloud-off',
  'wifi-off': 'wifi-off',
  'copy': 'content-copy',
  'share-2': 'share'
};

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      let original = c;

      // Ensure Icon is imported
      if (/<Feather/g.test(c) || /<MaterialIcons/g.test(c)) {
        if (!/import Icon from '@react-native-vector-icons\/material-icons'/.test(c)) {
           c = "import Icon from '@react-native-vector-icons/material-icons';\n" + c;
        }
      }

      // Replace <Feather name="x" ... />
      c = c.replace(/<Feather([^>]+)name=['"]([^'"]+)['"]([^>]*)>/g, (match, before, name, after) => {
        let newName = featherToMaterial[name] || name;
        return `<Icon${before}name="${newName}"${after}>`;
      });
      c = c.replace(/<\/Feather>/g, "</Icon>");

      // Replace <MaterialIcons name="x" ... />
      c = c.replace(/<MaterialIcons([^>]+)name=['"]([^'"]+)['"]([^>]*)>/g, (match, before, name, after) => {
        return `<Icon${before}name="${name}"${after}>`;
      });
      c = c.replace(/<\/MaterialIcons>/g, "</Icon>");

      // Remove the old vector-icons imports from my previous script output if they exist
      c = c.replace(/import Feather from 'react-native-vector-icons\/Feather';\n?/g, '');
      c = c.replace(/import MaterialIcons from 'react-native-vector-icons\/MaterialIcons';\n?/g, '');
      
      // If we never used Icon after all, we might have an unused import, but tsc will just warn or we can leave it.

      if (c !== original) {
        fs.writeFileSync(p, c, 'utf8');
        console.log('Refactored icons in ' + p);
      }
    }
  });
}

walk('src/customer');
