const fs = require('fs');

// 1. ChatService
let chat = fs.readFileSync('src/services/chat/ChatService.ts', 'utf8');
chat = chat.replace('return mockChatMessages;', 'return [...mockChatMessages];');
fs.writeFileSync('src/services/chat/ChatService.ts', chat);

// 2. WalletService
let wallet = fs.readFileSync('src/services/wallet/WalletService.ts', 'utf8');
wallet = wallet.replace('return mockTransactions;', 'return [...mockTransactions];');
wallet = wallet.replace(
  "type: 'credit',\n      status: 'success',\n      description: 'Wallet Recharge',",
  "type: 'credit',\n      category: 'recharge',\n      title: 'Wallet Recharge',\n      currency: 'INR',\n      time: new Date().toLocaleTimeString(),"
);
fs.writeFileSync('src/services/wallet/WalletService.ts', wallet);