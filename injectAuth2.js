const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'hooks', 'useAuth.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  'return { driver: { id: "1", name: "Test Driver", phone: "9876543210", status: "active" }, isAuthenticated: true, loading: false,\n    authState,\n    phone,\n    driver,\n    isLoading,\n    error,\n    setPhone,\n    sendOtp,\n    verifyOtp,\n    resendOtp,\n    completeOnboarding,\n    logout,\n  };',
  'return {\n    authState: "authenticated",\n    phone: "9876543210",\n    driver: { id: "1", name: "Test Driver", phone: "9876543210", status: "active" } as any,\n    isLoading: false,\n    error: null,\n    setPhone,\n    sendOtp,\n    verifyOtp,\n    resendOtp,\n    completeOnboarding,\n    logout,\n  };'
);
fs.writeFileSync(file, content);
console.log('Done');
