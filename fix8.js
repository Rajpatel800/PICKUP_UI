const fs = require('fs');

let mockData = fs.readFileSync('src/data/mockData.ts', 'utf8');

mockData = mockData.replace(/senderId: 'dispatcher-1',/g, "sender: 'system',");
mockData = mockData.replace(/senderId: 'rider-1',/g, "sender: 'rider',");
mockData = mockData.replace(/senderId: 'driver-1',/g, "sender: 'driver',");
mockData = mockData.replace(/isDriver: false,/g, "");
mockData = mockData.replace(/isDriver: true,/g, "");

fs.writeFileSync('src/data/mockData.ts', mockData);

let chatScreen = fs.readFileSync('src/screens/trip/ActiveTripChatScreen.tsx', 'utf8');
chatScreen = chatScreen.replace("import type { ChatMessage } from '../../types/user';", "import type { ChatMessage } from '../../types/chat';");
fs.writeFileSync('src/screens/trip/ActiveTripChatScreen.tsx', chatScreen);