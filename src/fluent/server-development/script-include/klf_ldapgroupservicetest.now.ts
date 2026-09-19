import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['8a81643997e8a910b2e1f97e6253af2a'],
    name: 'KLF_LdapGroupServiceTest',
    script: Now.include('./klf_ldapgroupservicetest.server.js'),
    apiName: 'global.KLF_LdapGroupServiceTest',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
    $meta: {
        useEsLatest: true,
    },
})
