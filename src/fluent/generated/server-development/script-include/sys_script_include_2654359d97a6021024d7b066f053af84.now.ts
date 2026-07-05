import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['2654359d97a6021024d7b066f053af84'],
    name: 'KLF_RecordSync_GroupUtils',
    script: Now.include('./sys_script_include_2654359d97a6021024d7b066f053af84.server.js'),
    apiName: 'global.KLF_RecordSync_GroupUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
