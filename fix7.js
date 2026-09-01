const fs = require('fs');

let mockData = fs.readFileSync('src/data/mockData.ts', 'utf8');

// Replace ChatMessage in the import
mockData = mockData.replace('  ChatMessage,\n} from \'../types/user\';', '} from \'../types/user\';\nimport type { ChatMessage } from \'../types/chat\';');

fs.writeFileSync('src/data/mockData.ts', mockData);