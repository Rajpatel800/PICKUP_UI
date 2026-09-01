const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'location', 'useDriverLocation.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  'console.log([NativeLocationDelivery] Received location: , );',
  'console.log(\'[NativeLocationDelivery] Received location:\', location.latitude, location.longitude);'
);
fs.writeFileSync(file, content);
console.log('Done');
