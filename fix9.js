const fs = require('fs');

// 1. types/chat.ts
let chatTypes = fs.readFileSync('src/types/chat.ts', 'utf8');
chatTypes = chatTypes.replace('text: string;', 'text?: string;\n  imageUrl?: string;');
fs.writeFileSync('src/types/chat.ts', chatTypes);

// 2. ActiveTripChatScreen.tsx
let screen = fs.readFileSync('src/screens/trip/ActiveTripChatScreen.tsx', 'utf8');
screen = screen.replace(/senderId: 'driver-1',/g, "sender: 'driver',");
screen = screen.replace(/status === 'failed'/g, "status === 'error'");
screen = screen.replace(/isDriver/g, "sender === 'driver'");
screen = screen.replace(/item\.sender === 'driver'/g, "item.sender === 'driver'"); // Already replaced by previous line but just to be sure logic holds
fs.writeFileSync('src/screens/trip/ActiveTripChatScreen.tsx', screen);