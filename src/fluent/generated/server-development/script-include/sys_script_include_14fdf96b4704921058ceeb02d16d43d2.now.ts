import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['14fdf96b4704921058ceeb02d16d43d2'],
    name: 'KLF_RecordSyncTest',
    script: Now.include('./sys_script_include_14fdf96b4704921058ceeb02d16d43d2.server.js'),
    apiName: 'global.KLF_RecordSyncTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
