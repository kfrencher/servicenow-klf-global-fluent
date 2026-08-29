import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['5b4d2f71837632103c9299e0deaad31f'],
    name: 'KLF_Password2Inspector',
    script: Now.include('./klf_password2inspector.server.js'),
    description: 'Finds password2 fields and checks if they are KMF encoded or 3DES encoded',
    apiName: 'global.KLF_Password2Inspector',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
