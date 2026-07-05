import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['77b1e09547f3821058ceeb02d16d4310'],
    name: 'KLF_CalendarCreator',
    script: Now.include('./sys_script_include_77b1e09547f3821058ceeb02d16d4310.server.js'),
    apiName: 'global.KLF_CalendarCreator',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
