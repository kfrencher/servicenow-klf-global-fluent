import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['90733b9847d8961058ceeb02d16d43d9'],
    name: 'KLF_RecordSync_GroupUtilsTest',
    script: Now.include('./sys_script_include_90733b9847d8961058ceeb02d16d43d9.server.js'),
    apiName: 'global.KLF_RecordSync_GroupUtilsTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
