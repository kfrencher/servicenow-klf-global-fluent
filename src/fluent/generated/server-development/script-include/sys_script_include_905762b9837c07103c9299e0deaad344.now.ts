import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['905762b9837c07103c9299e0deaad344'],
    name: 'KLF_RecordImporter',
    script: Now.include('./sys_script_include_905762b9837c07103c9299e0deaad344.server.js'),
    apiName: 'global.KLF_RecordImporter',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
