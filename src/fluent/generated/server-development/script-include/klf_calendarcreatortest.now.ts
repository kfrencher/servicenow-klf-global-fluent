import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['0c15368e833c36103c9299e0deaad348'],
    name: 'KLF_CalendarCreatorTest',
    script: Now.include('./klf_calendarcreatortest.server.js'),
    apiName: 'global.KLF_CalendarCreatorTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
