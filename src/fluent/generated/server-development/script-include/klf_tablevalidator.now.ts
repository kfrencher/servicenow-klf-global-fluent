import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['98c57cc333d16610504662989d5c7bd8'],
    name: 'KLF_TableValidator',
    script: Now.include('./klf_tablevalidator.server.js'),
    apiName: 'global.KLF_TableValidator',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
