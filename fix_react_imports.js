const fs = require('fs');
const path = require('path');

const origDir = 'D:/Codes/PickUp/Driver/DriverUI/PickUpDriver/src';

function fixReactImport(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes("from 'react'")) {
    return; // Already has it
  }
  
  // filePath is something like src\screens\trip\ActiveTripChatScreen.tsx
  // We want to replace 'src' with origDir
  const relativePath = filePath.substring(4); // remove 'src\'
  const origPath = path.join(origDir, relativePath);
  
  if (!fs.existsSync(origPath)) return;
  
  const origContent = fs.readFileSync(origPath, 'utf8');
  const match = origContent.match(/import React.*?from 'react';?/s);
  if (match) {
    const reactImport = match[0];
    content = reactImport + '\n' + content;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Restored React import for ' + filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fixReactImport(fullPath);
    }
  }
}

processDir('src');