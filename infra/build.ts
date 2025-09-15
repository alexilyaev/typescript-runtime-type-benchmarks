import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../');

// Dynamically discover variant files
const entriesDir = path.resolve(rootDir, 'src', 'build-entries');
const entryFilesMap: Record<string, string> = {};
const entryFiles: string[] = [];

for (const file of fs.readdirSync(entriesDir)) {
  if (file.endsWith('.ts')) {
    const name = path.basename(file, '.ts');

    entryFilesMap[name] = path.join(entriesDir, file);
    entryFiles.push(path.join(entriesDir, file));
  }
}

for (const [entryName, entryFile] of Object.entries(entryFilesMap)) {
  await build({
    root: rootDir,
    base: '/src/',
    build: {
      outDir: path.join(rootDir, 'dist', entryName),
      lib: {
        entry: entryFile,
        formats: ['es'],
        name: 'typescript-runtime-type-benchmarks',
        fileName: (format, entryName) => `${entryName}.js`,
      },
    },
  });
}
