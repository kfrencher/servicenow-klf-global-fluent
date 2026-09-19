import { ScriptAction } from '@servicenow/sdk/core'

ScriptAction({
    $id: Now.ID['35b9dc5f97152110b2e1f97e6253af3f'],
    name: 'KLF_CommandProbeAction',
    eventName: 'klf_commandprobe.response',
    active: true,
    script: `/**
 * Script Action that handles events generated from KLF_CommandProbe
 * @param {GlideRecord} event sysevent record
 * @param {GlideRecord} current ecc_queue record
 */
(function( /** @type {GlideRecord} **/ event, /** @type {GlideRecord} **/ eccQueue) {
    var outputJson = event.getValue('parm1');
    if (outputJson) {
        var output = JSON.parse(outputJson);
        if (output.stderr) {
            gs.log('KLF_CommandProbeAction: ERROR!!!! stderr=' + output.stderr);
            return;
        } else {
            gs.log('KLF_CommandProbeAction: stdout=' + output.stdout);
            return;
        }
    }
    gs.log('KLF_CommandProbeAction: ERROR!!!!');

    //@ts-ignore
})(event, current);`,
})
