const fs = require('fs');

// Fix mockData.ts
let mock = fs.readFileSync('D:/PU/Driver/src/data/mockData.ts', 'utf8');
mock = mock.replace(/currency:\s*'[^'\x00-\x7F]+'/g, "currency: '₹'");
mock = mock.replace(/description:\s*'[^'\x00-\x7F]+1,000/g, "description: '₹1,000");
mock = mock.replace(/Ready now [^\x00-\x7F]+ Dock 4/g, "Ready now — Dock 4");
mock = mock.replace(/hardcode content [^\x00-\x7F]+ only reference/g, "hardcode content — only reference");
mock = mock.replace(/\/\/\s*[^\x00-\x7F]+\s*(.*?)\s*[^\x00-\x7F]+/g, "// ───  ───");
fs.writeFileSync('D:/PU/Driver/src/data/mockData.ts', mock);

// Fix EarningsHistoryScreen.tsx
let earnings = fs.readFileSync('D:/PU/Driver/src/screens/earnings/EarningsHistoryScreen.tsx', 'utf8');
earnings = earnings.replace(/\/\/ Mock: same data for all periods [^\x00-\x7F]+ in production/, "// Mock: same data for all periods — in production");
earnings = earnings.replace(/\{item.date\}\s*[^\x00-\x7F]+\s*\{item.time\}/, "{item.date} • {item.time}");
earnings = earnings.replace(/\{item.stops\[0\]\?\.address\}\s*[^\x00-\x7F]+\s*\{item.stops\[item\.stops\.length - 1\]\?\.address\}/, "{item.stops[0]?.address} → {item.stops[item.stops.length - 1]?.address}");
fs.writeFileSync('D:/PU/Driver/src/screens/earnings/EarningsHistoryScreen.tsx', earnings);
