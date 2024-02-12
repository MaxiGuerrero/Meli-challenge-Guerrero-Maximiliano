const path = require('path');
const { execSync } = require('node:child_process');
const fs = require('fs');

const currentPath = path.join(__dirname);
const builtFolder = `${currentPath}/dist`;
const srcPath = `${currentPath}/src`;

try {
  console.log('Building...');
  const output = execSync('npx tsc --project tsconfig.json && npx tsc-alias -p tsconfig.json');
  fs.cpSync(`${srcPath}/docs`, `${builtFolder}/src/docs`, { recursive: true });
  console.log(`Build successfully: `, output.toString());
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
