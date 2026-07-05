import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['4985423a87285290e2041f8d3fbb353d'],
    name: 'KLF_Scoper_ViewCopierTest',
    script: Now.include('./sys_script_include_4985423a87285290e2041f8d3fbb353d.server.js'),
    apiName: 'global.KLF_Scoper_ViewCopierTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
