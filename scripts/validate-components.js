import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let hasError = false;

function scanDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) {return fileList;}
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDir(filePath, fileList);
    } else if (filePath.endsWith('.vue')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

console.log('🔍 Starting component validation...\n');

// 1. Validate Global Components
const globalComponentsDir = path.join(rootDir, 'src', 'components');
const globalComponents = scanDir(globalComponentsDir);

globalComponents.forEach((filePath) => {
  const relativePath = path.relative(globalComponentsDir, filePath);
  const fileName = path.basename(filePath);
  const dirName = path.dirname(relativePath);

  // Global components must be in specific subdirectories (common, layout, etc.)
  // Except for specific structural files if any, but we enforce strict structure.
  if (dirName === '.') {
    console.error(`❌ Error: Global component "${fileName}" should not be directly under src/components/. Please move it to src/components/common/ or src/components/layout/.`);
    hasError = true;
  }

  // Validate Naming Convention (App* or G*)
  // We can skip this for index.vue or components inside layout/components if we want, but let's be strict for common/
  if (dirName === 'common' && !fileName.startsWith('App') && !fileName.startsWith('G')) {
    console.error(`❌ Error: Global common component "${fileName}" must start with "App" or "G" to prevent naming conflicts.`);
    hasError = true;
  }
});

// 2. Validate Page Components
const viewsDir = path.join(rootDir, 'src', 'views');
if (fs.existsSync(viewsDir)) {
  const views = fs.readdirSync(viewsDir).filter(f => fs.statSync(path.join(viewsDir, f)).isDirectory());
  
  views.forEach(view => {
    const viewComponentsDir = path.join(viewsDir, view, 'components');
    if (fs.existsSync(viewComponentsDir)) {
      // Just check if they exist, page components are inherently scoped.
      // We could add cross-reference checks here, but AST parsing is required for deep analysis.
      // For now, we enforce that page components exist inside the 'components' folder of the view.
    }
    
    // Check if there are components directly in the view folder (other than index.vue)
    const viewFiles = fs.readdirSync(path.join(viewsDir, view));
    viewFiles.forEach(file => {
      if (file.endsWith('.vue') && file !== 'index.vue') {
        console.warn(`⚠️ Warning: Found "${file}" in src/views/${view}/. Page components should be placed in src/views/${view}/components/.`);
      }
    });
  });
}

if (hasError) {
  console.error('\n💥 Component validation failed! Please fix the errors above.');
  process.exit(1);
} else {
  console.log('✅ All components passed structural validation!');
}
