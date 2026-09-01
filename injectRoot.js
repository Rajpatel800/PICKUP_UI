const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'navigation', 'RootNavigator.tsx');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  'const [isAuthenticated, setIsAuthenticated] = useState(false);',
  'const [isAuthenticated, setIsAuthenticated] = useState(true);'
);
fs.writeFileSync(file, content);
console.log('Done');
