import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['2d1b858c97b86550b2e1f97e6253af73'],
    name: 'KLF_TestUtilsTest',
    script: Now.include('./sys_script_include_2d1b858c97b86550b2e1f97e6253af73.server.js'),
    apiName: 'global.KLF_TestUtilsTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
