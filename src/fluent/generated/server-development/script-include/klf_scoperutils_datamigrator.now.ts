import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['faeddb9387e4d290e2041f8d3fbb358b'],
    name: 'KLF_ScoperUtils_DataMigrator',
    script: Now.include('./klf_scoperutils_datamigrator.server.js'),
    apiName: 'global.KLF_ScoperUtils_DataMigrator',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
