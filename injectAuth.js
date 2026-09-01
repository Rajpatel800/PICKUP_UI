const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'hooks', 'useAuth.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  'return {',
  'return { driver: { id: \"1\", name: \"Test Driver\", phone: \"9876543210\", status: \"active\" }, isAuthenticated: true, loading: false,'
);
fs.writeFileSync(file, content);
console.log('Done');
