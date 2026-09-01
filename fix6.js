const fs = require('fs');

let mockData = fs.readFileSync('src/data/mockData.ts', 'utf8');

// Replace the import
mockData = mockData.replace(
  "import { DriverProfile, DocumentStatus, ChatMessage } from '../types/user';",
  "import { DriverProfile, DocumentStatus } from '../types/user';\nimport type { ChatMessage } from '../types/chat';"
);

// Replace mockChatMessages
const searchMock = `export const mockChatMessages: readonly ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'dispatcher-1',
    text: 'Please confirm pickup at Dock 4',
    timestamp: '2:30 PM',
    status: 'read',
    isDriver: false,
  },
  {
    id: 'msg-2',
    senderId: 'driver-1',
    text: 'Confirmed, arriving in 2 mins',
    timestamp: '2:31 PM',
    status: 'sent',
    isDriver: true,
  },
];`;

const replaceMock = `export const mockChatMessages: readonly ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'rider',
    text: 'Please confirm pickup at Dock 4',
    timestamp: '2:30 PM',
    status: 'read',
  },
  {
    id: 'msg-2',
    sender: 'driver',
    text: 'Confirmed, arriving in 2 mins',
    timestamp: '2:31 PM',
    status: 'sent',
  },
];`;

mockData = mockData.replace(searchMock, replaceMock);
fs.writeFileSync('src/data/mockData.ts', mockData);