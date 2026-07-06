#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const generatedRoot = path.join(projectRoot, 'src', 'fluent', 'generated');
const mapPath = path.join(projectRoot, 'rename-generated-map.json');
const args = new Set(process.argv.slice(2));
const apply = args.has('--apply');

const textExtensions = new Set(['.ts', '.js', '.mjs', '.cjs', '.json']);
const sourceExtensions = new Set(['.now.ts']);

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function extractByRegex(content, re) {
  const m = content.match(re);
  return m?.[1]?.trim();
}

function extractCandidateName(content) {
  const topName = extractByRegex(content, /^\s{4}name:\s*['"`]([^'"`]+)['"`],?\s*$/m);
  if (topName) return { value: topName, field: 'name' };

  const dataName = extractByRegex(
    content,
    /\bdata:\s*\{[\s\S]*?^\s{8}name:\s*['"`]([^'"`]+)['"`],?\s*$/m,
  );
  if (dataName) return { value: dataName, field: 'data.name' };

  const shortDescription = extractByRegex(content, /^\s{4}shortDescription:\s*['"`]([^'"`]+)['"`],?\s*$/m);
  if (shortDescription) return { value: shortDescription, field: 'shortDescription' };

  const endpoint = extractByRegex(content, /^\s{4}endpoint:\s*['"`]([^'"`]+)['"`],?\s*$/m);
  if (endpoint) {
    const noExt = endpoint.replace(/\.[a-z0-9]+$/i, '');
    return { value: noExt, field: 'endpoint' };
  }

  return null;
}

function normalizeName(name) {
  const normalized = name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  return normalized || null;
}

function ensureDotSlash(relPath) {
  if (relPath.startsWith('./') || relPath.startsWith('../')) return relPath;
  return `./${relPath}`;
}

function renameFile(oldAbs, newAbs) {
  fs.mkdirSync(path.dirname(newAbs), { recursive: true });
  fs.renameSync(oldAbs, newAbs);
}

if (!fs.existsSync(generatedRoot)) {
  console.error(`Generated root not found: ${generatedRoot}`);
  process.exit(1);
}

const allFiles = walk(generatedRoot);
const nowTsFiles = allFiles.filter((f) => f.endsWith('.now.ts')).sort();
const byDir = new Map();
for (const file of nowTsFiles) {
  const dir = path.dirname(file);
  if (!byDir.has(dir)) byDir.set(dir, []);
  byDir.get(dir).push(file);
}

const records = [];
for (const file of nowTsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const extracted = extractCandidateName(content);

  if (!extracted) {
    records.push({ file, decision: 'skip', reason: 'no_name_field' });
    continue;
  }

  const normalized = normalizeName(extracted.value);
  if (!normalized) {
    records.push({ file, decision: 'skip', reason: 'empty_after_normalize', field: extracted.field, rawName: extracted.value });
    continue;
  }

  records.push({
    file,
    dir: path.dirname(file),
    oldFileName: path.basename(file),
    oldBase: path.basename(file, '.now.ts'),
    normalizedBase: normalized,
    field: extracted.field,
    rawName: extracted.value,
    decision: 'candidate',
  });
}

const candidateGroups = new Map();
for (const r of records.filter((x) => x.decision === 'candidate')) {
  const key = `${r.dir}::${r.normalizedBase}`;
  if (!candidateGroups.has(key)) candidateGroups.set(key, []);
  candidateGroups.get(key).push(r);
}

for (const group of candidateGroups.values()) {
  group.sort((a, b) => a.file.localeCompare(b.file));
  for (let i = 0; i < group.length; i += 1) {
    group[i].newBase = i === 0 ? group[i].normalizedBase : `${group[i].normalizedBase}_${i + 1}`;
    if (group.length > 1) group[i].collisionGroupSize = group.length;
  }
}

const renameOps = [];
const usedTargets = new Set();
for (const r of records.filter((x) => x.decision === 'candidate')) {
  const newNowName = `${r.newBase}.now.ts`;
  const oldNowAbs = r.file;
  const newNowAbs = path.join(r.dir, newNowName);

  if (path.basename(oldNowAbs) !== newNowName) {
    renameOps.push({
      type: 'file',
      oldAbs: oldNowAbs,
      newAbs: newNowAbs,
      reason: 'rename_now_ts',
      sourceField: r.field,
      rawName: r.rawName,
    });
  }

  const siblings = fs.readdirSync(r.dir);
  const siblingJs = siblings.filter((name) => name.startsWith(r.oldBase) && name.endsWith('.js'));
  for (const jsName of siblingJs) {
    const suffix = jsName.slice(r.oldBase.length, -3);
    const newJsName = `${r.newBase}${suffix}.js`;
    if (jsName === newJsName) continue;

    renameOps.push({
      type: 'file',
      oldAbs: path.join(r.dir, jsName),
      newAbs: path.join(r.dir, newJsName),
      reason: 'rename_paired_js',
      pairedNowTs: path.basename(oldNowAbs),
    });
  }
}

for (const op of renameOps) {
  const k = toPosix(op.newAbs.toLowerCase());
  if (usedTargets.has(k)) {
    console.error(`Target collision detected: ${op.newAbs}`);
    process.exit(1);
  }
  usedTargets.add(k);
}

const renameByOldAbs = new Map();
for (const op of renameOps) {
  renameByOldAbs.set(path.resolve(op.oldAbs), path.resolve(op.newAbs));
}

function rewriteReferencesInFile(filePath, logEntries) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;

  const patterns = [
    /(Now\.include\(\s*['"`])([^'"`]+)(['"`]\s*\))/g,
    /(from\s+['"`])([^'"`]+)(['"`])/g,
    /(require\(\s*['"`])([^'"`]+)(['"`]\s*\))/g,
  ];

  const applyPathRewrite = (match, left, ref, right) => {
    if (!ref.startsWith('./') && !ref.startsWith('../')) return match;

    const currentDir = path.dirname(filePath);
    const oldTargetAbs = path.resolve(currentDir, ref);
    const mappedNewAbs = renameByOldAbs.get(oldTargetAbs);
    if (!mappedNewAbs) return match;

    if (!fs.existsSync(mappedNewAbs)) {
      logEntries.push({
        type: 'rewrite_skipped',
        file: toPosix(path.relative(projectRoot, filePath)),
        from: ref,
        to: toPosix(path.relative(currentDir, mappedNewAbs)),
        reason: 'target_missing',
      });
      return match;
    }

    let nextRef = toPosix(path.relative(currentDir, mappedNewAbs));
    nextRef = ensureDotSlash(nextRef);
    return `${left}${nextRef}${right}`;
  };

  for (const pattern of patterns) {
    updated = updated.replace(pattern, applyPathRewrite);
  }

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    return true;
  }

  return false;
}

const map = {
  generatedAt: new Date().toISOString(),
  mode: apply ? 'apply' : 'dry-run',
  root: toPosix(path.relative(projectRoot, generatedRoot)),
  summary: {
    totalNowTsFiles: nowTsFiles.length,
    candidates: records.filter((r) => r.decision === 'candidate').length,
    skipped: records.filter((r) => r.decision === 'skip').length,
    fileRenamesPlanned: renameOps.length,
  },
  skipped: records
    .filter((r) => r.decision === 'skip')
    .map((r) => ({
      file: toPosix(path.relative(projectRoot, r.file)),
      reason: r.reason,
      sourceField: r.field || null,
      rawName: r.rawName || null,
    })),
  renames: renameOps.map((op) => ({
    type: op.type,
    reason: op.reason,
    oldPath: toPosix(path.relative(projectRoot, op.oldAbs)),
    newPath: toPosix(path.relative(projectRoot, op.newAbs)),
    sourceField: op.sourceField || null,
    rawName: op.rawName || null,
    pairedNowTs: op.pairedNowTs || null,
  })),
  rewrite: {
    filesUpdated: 0,
    skipped: [],
  },
};

if (!apply) {
  fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));
  console.log(`Dry run complete. Planned renames: ${renameOps.length}`);
  console.log(`Candidates: ${map.summary.candidates}, skipped: ${map.summary.skipped}`);
  console.log(`Map written to: ${toPosix(path.relative(projectRoot, mapPath))}`);
  process.exit(0);
}

renameOps.sort((a, b) => {
  const aWeight = a.oldAbs.length;
  const bWeight = b.oldAbs.length;
  if (aWeight !== bWeight) return bWeight - aWeight;
  return a.oldAbs.localeCompare(b.oldAbs);
});

for (const op of renameOps) {
  renameFile(op.oldAbs, op.newAbs);
}

const rewriteFiles = walk(generatedRoot).filter((f) => textExtensions.has(path.extname(f)));
let rewrittenCount = 0;
for (const file of rewriteFiles) {
  if (rewriteReferencesInFile(file, map.rewrite.skipped)) {
    rewrittenCount += 1;
  }
}

map.rewrite.filesUpdated = rewrittenCount;
fs.writeFileSync(mapPath, JSON.stringify(map, null, 2));

console.log(`Apply complete. Renamed files: ${renameOps.length}`);
console.log(`Reference files updated: ${rewrittenCount}`);
console.log(`Reference rewrites skipped: ${map.rewrite.skipped.length}`);
console.log(`Map written to: ${toPosix(path.relative(projectRoot, mapPath))}`);
