import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['a61315288315e2103c9299e0deaad380'],
    name: 'KLF_MigratorUtils',
    script: Now.include('./sys_script_include_a61315288315e2103c9299e0deaad380.server.js'),
    apiName: 'global.KLF_MigratorUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
