import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['0c15368e833c36103c9299e0deaad348'],
    name: 'KLF_CalendarCreatorTest',
    script: Now.include('./sys_script_include_0c15368e833c36103c9299e0deaad348.server.js'),
    apiName: 'global.KLF_CalendarCreatorTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
