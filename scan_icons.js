const fs = require('fs');
const path = require('path');

let feather = new Set();
let mat = new Set();

function walk(d) {
  fs.readdirSync(d).forEach(f => {
    let p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      let m;
      const rF = /<Feather[^>]+name=['"]([^'"]+)['"]/g;
      while ((m = rF.exec(c)) !== null) feather.add(m[1]);
      
      const rM = /<MaterialIcons[^>]+name=['"]([^'"]+)['"]/g;
      while ((m = rM.exec(c)) !== null) mat.add(m[1]);
    }
  });
}

walk('src/customer');
console.log('Feather:', [...feather].join(', '));
console.log('MaterialIcons:', [...mat].join(', '));