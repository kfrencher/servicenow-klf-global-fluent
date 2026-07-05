import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['a9d822b9837c07103c9299e0deaad331'],
    name: 'KLF_RecordExporter',
    script: Now.include('./sys_script_include_a9d822b9837c07103c9299e0deaad331.server.js'),
    apiName: 'global.KLF_RecordExporter',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
