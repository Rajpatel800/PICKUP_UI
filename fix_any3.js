const fs = require('fs');
let file = fs.readFileSync('src/location/useDriverLocation.ts', 'utf8');
file = file.replace(/e\?\.message \|\| 'Failed to check status'/g, "e instanceof Error ? e.message : 'Failed to check status'");
fs.writeFileSync('src/location/useDriverLocation.ts', file);