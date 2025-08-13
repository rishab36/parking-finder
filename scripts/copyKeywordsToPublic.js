// Script to copy keywords.json to public directory for frontend use
import fs from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'scripts', 'keywords.json');
const dest = path.join(process.cwd(), 'public', 'keywords.json');

fs.copyFileSync(src, dest);
console.log('Copied keywords.json to public/ for frontend access.');
