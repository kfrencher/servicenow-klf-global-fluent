import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['82b7058897b86550b2e1f97e6253afa2'],
    name: 'KLF_TestUtils',
    script: Now.include('./klf_testutils.server.js'),
    apiName: 'global.KLF_TestUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
