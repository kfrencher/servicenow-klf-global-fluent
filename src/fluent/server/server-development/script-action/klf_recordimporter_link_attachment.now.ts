import { ScriptAction } from '@servicenow/sdk/core'

ScriptAction({
    $id: Now.ID['8a418fe5835543143c9299e0deaad3ae'],
    name: 'KLF_RecordImporter Link Attachment',
    eventName: 'klf_recordimporter.link_attachment',
    active: true,
    script: `global.KLF_RecordImporter.logInfo('Linking record to attachment');
global.KLF_RecordImporter.handleLinkAttachment(current, event.parm1, event.parm2);`,
    $meta: {
        useEsLatest: true,
    },
})
