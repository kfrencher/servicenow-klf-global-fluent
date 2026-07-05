import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['28c097ae4758161058ceeb02d16d43da'],
    name: 'KLF_TestChance',
    script: Now.include('./sys_script_include_28c097ae4758161058ceeb02d16d43da.server.js'),
    description: 'Library based on https://chancejs.com/',
    apiName: 'global.KLF_TestChance',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
