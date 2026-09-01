const fs = require('fs');
const path = require('path');
const results = new Set();
function walk(dir) {
  for (let f of fs.readdirSync(dir)) {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      const text = fs.readFileSync(p, 'utf8');
      const matches = [...text.matchAll(/navigate\(\s*['\"]([^'\"]+)['\"](.*)\)/g)];
      for (const m of matches) {
        if (m[2].trim().length > 1 && !m[2].startsWith(')')) {
          results.add(m[1] + ' -> ' + m[2]);
        }
      }
    }
  }
}
walk('src/customer');
console.log("Found params:", Array.from(results));
