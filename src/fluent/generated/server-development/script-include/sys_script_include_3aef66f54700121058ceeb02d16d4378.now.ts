import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['3aef66f54700121058ceeb02d16d4378'],
    name: 'KLF_JasmineTest',
    script: Now.include('./sys_script_include_3aef66f54700121058ceeb02d16d4378.server.js'),
    apiName: 'global.KLF_JasmineTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
