const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'src', 'customer', 'screens');
const outDir = path.join(__dirname, 'src', 'customer', 'navigation');
const stacksDir = path.join(outDir, 'stacks');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(stacksDir)) fs.mkdirSync(stacksDir, { recursive: true });

const folders = fs.readdirSync(screensDir).filter(f => fs.statSync(path.join(screensDir, f)).isDirectory());

const stacks = {};
const allRoutes = [];

folders.forEach(folder => {
  const stackName = 'Customer' + folder.charAt(0).toUpperCase() + folder.slice(1) + 'Stack';
  const paramListName = stackName + 'ParamList';
  
  const files = fs.readdirSync(path.join(screensDir, folder)).filter(f => f.endsWith('.tsx'));
  const screens = files.map(f => f.replace('.tsx', ''));
  
  stacks[stackName] = { folder, screens, paramListName };
  screens.forEach(s => allRoutes.push(s));
});

// Generate types.ts
let typesContent = `/**
 * Customer Navigation Types
 */

import { NavigatorScreenParams } from '@react-navigation/native';

`;

for (const [stackName, data] of Object.entries(stacks)) {
  typesContent += `export type ${data.paramListName} = {\n`;
  data.screens.forEach(s => {
    typesContent += `  ${s}: undefined;\n`;
  });
  typesContent += `};\n\n`;
}

typesContent += `export type CustomerRootStackParamList = {\n`;
for (const [stackName, data] of Object.entries(stacks)) {
  typesContent += `  ${stackName}: NavigatorScreenParams<${data.paramListName}>;\n`;
}
typesContent += `};\n\n`;
typesContent += `declare global {\n  namespace ReactNavigation {\n    interface RootParamList extends CustomerRootStackParamList {}\n  }\n}\n`;

fs.writeFileSync(path.join(outDir, 'types.ts'), typesContent);

// Generate each stack file
for (const [stackName, data] of Object.entries(stacks)) {
  let stackContent = `import React from 'react';\nimport { createNativeStackNavigator } from '@react-navigation/native-stack';\nimport { ${data.paramListName} } from '../types';\n\n`;
  
  data.screens.forEach(s => {
    stackContent += `import ${s} from '../../screens/${data.folder}/${s}';\n`;
  });
  
  stackContent += `\nconst Stack = createNativeStackNavigator<${data.paramListName}>();\n\n`;
  stackContent += `export const ${stackName}: React.FC = () => {\n  return (\n    <Stack.Navigator screenOptions={{ headerShown: false }}>\n`;
  
  data.screens.forEach(s => {
    stackContent += `      <Stack.Screen name="${s}" component={${s}} />\n`;
  });
  
  stackContent += `    </Stack.Navigator>\n  );\n};\n`;
  
  fs.writeFileSync(path.join(stacksDir, `${stackName}.tsx`), stackContent);
}

// Generate CustomerNavigator.tsx
let rootContent = `import React from 'react';\nimport { createNativeStackNavigator } from '@react-navigation/native-stack';\nimport { CustomerRootStackParamList } from './types';\n\n`;
for (const [stackName] of Object.entries(stacks)) {
  rootContent += `import { ${stackName} } from './stacks/${stackName}';\n`;
}

rootContent += `\nconst Stack = createNativeStackNavigator<CustomerRootStackParamList>();\n\n`;
rootContent += `export const CustomerNavigator: React.FC = () => {\n  return (\n    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CustomerHomeStack">\n`;
for (const [stackName] of Object.entries(stacks)) {
  rootContent += `      <Stack.Screen name="${stackName}" component={${stackName}} />\n`;
}
rootContent += `    </Stack.Navigator>\n  );\n};\n`;

fs.writeFileSync(path.join(outDir, 'CustomerNavigator.tsx'), rootContent);

console.log("Generated files successfully.");
