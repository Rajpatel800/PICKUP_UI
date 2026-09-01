const fs = require('fs');
const glob = require('glob');
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

    // Use regex to replace `e.message` where `e` is the catch variable
    // We already changed `catch (e: any)` to `catch (e: unknown)`.
    content = content.replace(/e\.message/g, "(e instanceof Error ? e.message : 'Unknown error')");
    content = content.replace(/err\.message/g, "(err instanceof Error ? err.message : 'Unknown error')");

    // In useDriverLocation.ts
    // catch (err: unknown) { setError(err); } -> setError(err as LocationError);
    // Actually, `setError(err instanceof Error ? { code: 'UNKNOWN', message: err.message } : null)`
    // I'll manually fix useDriverLocation.ts if it's too complex. Let's just do a specific replacement.
    content = content.replace(/setError\(err\)/g, "setError({ code: 'UNKNOWN_ERROR', message: err instanceof Error ? err.message : 'Unknown error' } as any)");

    if (content !== original) {
      fs.writeFileSync(filePath, content);
    }
  }
});