import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['279e5d412b9192100060ff42fe91bf24'],
    name: 'KLF_TestMockRESTAPIResponse',
    script: Now.include('./klf_testmockrestapiresponse.server.js'),
    apiName: 'global.KLF_TestMockRESTAPIResponse',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
