const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let c = fs.readFileSync(p, 'utf8');
      let original = c;

      // Ensure Icon is imported
      if (/<Feather/g.test(c) || /<MaterialIcons/g.test(c)) {
        if (!/import Icon from '@react-native-vector-icons\/material-icons'/.test(c)) {
           c = "import Icon from '@react-native-vector-icons/material-icons';\n" + c;
        }
      }

      // Replace tags with JSX expressions for name
      c = c.replace(/<Feather/g, '<Icon');
      c = c.replace(/<\/Feather>/g, '</Icon>');
      c = c.replace(/<MaterialIcons/g, '<Icon');
      c = c.replace(/<\/MaterialIcons>/g, '</Icon>');
      
      // Replace types
      c = c.replace(/keyof typeof Feather\.glyphMap/g, 'string');
      c = c.replace(/keyof typeof MaterialIcons\.glyphMap/g, 'string');

      // Fix TextInput type issues
      c = c.replace(/useRef<Array<TextInput \| null>>/g, 'useRef<any>');
      c = c.replace(/useRef<TextInput \| null>/g, 'useRef<any>');

      if (c !== original) {
        fs.writeFileSync(p, c, 'utf8');
        console.log('Fixed tags and types in ' + p);
      }
    }
  });
}

walk('src/customer');
