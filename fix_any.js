const fs = require('fs');
const glob = require('glob'); // Not available by default in bare node, but let's use simple recursion.
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

walk('src', (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace catch (e: any) with catch (e: unknown)
    content = content.replace(/catch \((.+?): any\)/g, 'catch ($1: unknown)');

    // Replace e.message with error message extraction
    // Since this is risky with regex, I'll only do it for known variables
    // In hooks, they often do: e.message || '...'
    // I'll replace `e.message` where `e` is the catch variable, but wait, the catch variable name can be anything.
    // Instead of messing up the code, I will simply replace `e.message` with `(e instanceof Error ? e.message : 'Unknown error')`
    // but only if it's next to || or inside setError
    
    // Actually, I can just replace `(e: any)` with `(e: unknown)`. 
    // And if there is `e.message` or `e.code`, I'll cast it `(e as any).message` or `(e as Error).message`.
    // Wait, the prompt says "Replace avoidable: any with: unknown, typed interfaces...".
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
    }
  }
});