import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['5ca56b5e4784121058ceeb02d16d4318'],
    name: 'KLF_TestJasmineMatchers',
    script: Now.include('./sys_script_include_5ca56b5e4784121058ceeb02d16d4318.server.js'),
    apiName: 'global.KLF_TestJasmineMatchers',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
