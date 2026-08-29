import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['e03ce4a6470c121058ceeb02d16d43db'],
    name: 'KLF_RoleUtils',
    script: Now.include('./klf_roleutils.server.js'),
    apiName: 'global.KLF_RoleUtils',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: false,
    },
})
