const fs = require('fs');
const path = require('path');

function fixSyntax(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // ApiClient
  content = content.replace(/endpoint : \$\+\{env\.API_BASE_URL\}\$\+\{endpoint\}/g, '`\\${env.API_BASE_URL}\\${endpoint}`');
  content = content.replace(/\$`\+\{method\}:\$`\+\{url\}:\$`\+\{JSON\.stringify\(body \|\| \{\}\)\}/g, '\\`\\${method}:\\${url}:\\${JSON.stringify(body || {})}\\`');
  content = content.replace(/Bearer \$`\+\{this\.token\}/g, 'Bearer \\${this.token}');

  // ChatService
  content = content.replace(/id: `msg-\$`\+\{Date\.now\(\)\}/g, 'id: \\`msg-\\${Date.now()}\\`');
  content = content.replace(/\/chat\/\$`\+\{tripId\}\/messages/g, '\\`/chat/\\${tripId}/messages\\`');
  content = content.replace(/\/chat\/\$`\+\{tripId\}\/read/g, '\\`/chat/\\${tripId}/read\\`');

  // KycService
  content = content.replace(/id: `DOC-\$`\+\{Date\.now\(\)\}/g, 'id: \\`DOC-\\${Date.now()}\\`');
  content = content.replace(/name: `document-\$`\+\{Date\.now\(\)\}\.jpg`/g, 'name: \\`document-\\${Date.now()}.jpg\\`');

  // TrackingAdapter
  content = content.replace(/console\.log\(`\[MockTrackingAdapter\] Published location \[`\+\$`\+\{location\.latitude\}, `\+\$`\+\{location\.longitude\}\] for trip `\+\$`\+\{tripId\}`\)/g, 'console.log(`[MockTrackingAdapter] Published location [\\${location.latitude}, \\${location.longitude}] for trip \\${tripId}`)');
  content = content.replace(/\/tracking\/`\+\$`\+\{tripId\}\/location/g, '\\`/tracking/\\${tripId}/location\\`');

  // WalletService
  content = content.replace(/id: `TXN-\$`\+\{Date\.now\(\)\}/g, 'id: \\`TXN-\\${Date.now()}\\`');

  // TripService
  content = content.replace(/\/trip\/\$`\+\{tripId\}\/accept/g, '\\`/trip/\\${tripId}/accept\\`');
  content = content.replace(/\/trip\/\$`\+\{tripId\}\/decline/g, '\\`/trip/\\${tripId}/decline\\`');
  content = content.replace(/\/trip\/\$`\+\{tripId\}\/status/g, '\\`/trip/\\${tripId}/status\\`');

  // EarningsService
  content = content.replace(/\/earnings\/trip\/\$`\+\{tripId\}/g, '\\`/earnings/trip/\\${tripId}\\`');
  
  // And there was a plain endpoint logic
  content = content.replace(/endpoint : endpoint/g, "endpoint : `\\${env.API_BASE_URL}\\${endpoint}`");

  fs.writeFileSync(filePath, content);
}

const files = [
  'src/services/api/ApiClient.ts',
  'src/services/chat/ChatService.ts',
  'src/services/kyc/KycService.ts',
  'src/services/tracking/TrackingAdapter.ts',
  'src/services/wallet/WalletService.ts',
  'src/services/trip/TripService.ts',
  'src/services/earnings/EarningsService.ts'
];

files.forEach(fixSyntax);
console.log('Fixed syntax using regex');