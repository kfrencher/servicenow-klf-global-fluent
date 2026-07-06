import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['7da4a486c4ba221020d2af62322a08ba'],
    name: 'KLF_OAuthHelper',
    script: Now.include('./klf_oauthhelper.server.js'),
    apiName: 'global.KLF_OAuthHelper',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    accessibleFrom: 'public',
    active: true,
})
