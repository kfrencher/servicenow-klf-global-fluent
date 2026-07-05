import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['3c2ca59b97ebb51024d7b066f053af5f'],
    name: 'KLF_GroupUtils',
    script: Now.include('./sys_script_include_3c2ca59b97ebb51024d7b066f053af5f.server.js'),
    apiName: 'global.KLF_GroupUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
