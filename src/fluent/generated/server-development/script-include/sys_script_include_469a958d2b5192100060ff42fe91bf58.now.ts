import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['469a958d2b5192100060ff42fe91bf58'],
    name: 'KLF_TestMockRESTAPIRequest',
    script: Now.include('./sys_script_include_469a958d2b5192100060ff42fe91bf58.server.js'),
    apiName: 'global.KLF_TestMockRESTAPIRequest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
