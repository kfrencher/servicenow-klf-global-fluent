import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['5fced04b87289e506db4ffb2debb357f'],
    name: 'KLF_ScoperUtilsTest',
    script: Now.include('./klf_scoperutilstest.server.js'),
    apiName: 'global.KLF_ScoperUtilsTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
