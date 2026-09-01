const glyphMap = require('./node_modules/@react-native-vector-icons/material-icons/glyphmaps/MaterialIcons.json');

// All icon names used in the project (underscore convention from Material Symbols)
const projectIcons = [
  'account_balance', 'account_balance_wallet', 'assignment', 'block', 'cancel',
  'card_membership', 'chat_bubble_outline', 'chat_error', 'check', 'check_circle',
  'cloud_done', 'credit_card_off', 'description', 'electric_rickshaw', 'error',
  'error_outline', 'fire_truck', 'folder_open', 'gpp_bad', 'gps_off', 'help',
  'image', 'inbox', 'info', 'inventory_2', 'language', 'local_shipping',
  'location_off', 'location_on', 'lock', 'logout', 'notifications',
  'notifications_none', 'payments', 'person', 'receipt_long', 'route',
  'sms_failed', 'timer_off', 'two_wheeler', 'verified', 'warning', 'wifi_off',
  'home', 'chevron_right', 'arrow_back', 'arrow_forward', 'close', 'add',
  'remove', 'edit', 'delete', 'search', 'settings', 'star', 'star_border',
  'camera_alt', 'photo_camera', 'send', 'attach_file', 'more_vert',
  'more_horiz', 'share', 'visibility', 'visibility_off', 'refresh', 'sync',
  'schedule', 'access_time'
];

const results = [];
for (const name of projectIcons) {
  const hyphenated = name.replace(/_/g, '-');
  if (glyphMap[name] !== undefined) {
    results.push({ name, mapped: name, found: true });
  } else if (glyphMap[hyphenated] !== undefined) {
    results.push({ name, mapped: hyphenated, found: true });
  } else {
    // Find closest match
    const words = name.split('_');
    const candidates = Object.keys(glyphMap).filter(k => words.every(w => k.includes(w)));
    results.push({ name, mapped: null, found: false, candidates: candidates.slice(0, 5) });
  }
}

const found = results.filter(r => r.found);
const missing = results.filter(r => !r.found);
console.log('FOUND: ' + found.length + '/' + projectIcons.length);
console.log('MISSING (' + missing.length + '):');
for (const m of missing) {
  console.log('  ' + m.name + ' -> candidates: ' + JSON.stringify(m.candidates));
}