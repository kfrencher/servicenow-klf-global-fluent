const { mkdirSync, readdirSync, readFileSync, writeFileSync } = require('node:fs')
const { join, resolve } = require('node:path')

const projectRoot = resolve(__dirname, '..')
const scriptIncludeDirectory = join(projectRoot, 'src', 'fluent', 'server-development', 'script-include')
const outputPath = join(projectRoot, 'dist', 'x_klf_global.server.js')
const namespaceDeclaration = 'var global = global || {};'

const sourceFiles = readdirSync(scriptIncludeDirectory)
    .filter((fileName) => fileName.endsWith('.server.js') && fileName != 'klf_testjasminematchers.server.js' && fileName != 'klf_testchance.server.js' && !fileName.endsWith('test.server.js'))
    .sort()

const combinedScript = sourceFiles
    .map((fileName) => readFileSync(join(scriptIncludeDirectory, fileName), 'utf8').replace(/\r?\n?$/, ''))
    .join('\n\n')

mkdirSync(join(projectRoot, 'dist'), { recursive: true })
writeFileSync(outputPath, `${namespaceDeclaration}\n\n${combinedScript}\n`, 'utf8')
