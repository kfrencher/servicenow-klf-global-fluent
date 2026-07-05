import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['d165423a87285290e2041f8d3fbb354c'],
    name: 'KLF_ScoperUtils',
    script: Now.include('./sys_script_include_d165423a87285290e2041f8d3fbb354c.server.js'),
    apiName: 'global.KLF_ScoperUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
