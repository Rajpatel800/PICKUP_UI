const fs = require('fs');
let testCode = fs.readFileSync('__tests__/api.test.ts', 'utf8');

testCode = testCode.replace("'https://api.pickup.dev/v1/test'", "'https://api.pickup.dev/test'");

fs.writeFileSync('__tests__/api.test.ts', testCode);