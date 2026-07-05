/**
 * This widget was cloned from the OOB Form widget
 * 
 * It has been modified to support the following:
 * - Support for client-side UI actions
 * > NOTE: To make a client-side UI action visible to Service Portal you must add *Service Portal* to the
 * > UI Action Visibility* related list of the UI action.
 * - Support for applying templates (sys_ui_template) to the form. The template name is passed as a URL parameter called 'template_name'
 * - Support for redirecting to a URL after an action has been executed. Refer to {@link global.KLF_SPUtils#setRedirectURL} for more information
 * - Support for showing all audit entries in the ticket conversation widget
 * 
 * Look for areas in the code that have been marked with "KLF ADDITION" for the custom code
 */

// form functionality - URL parameter driven
(function($sp, input, data, options, gs) {
    /* "use strict"; -linter issues */
    // populate the 'data' variable
    data.attachmentUploadSuccessMsg = gs.getMessage("Attachment upload was successful");
    data.recordAddedMsg = gs.getMessage("Record Added");
    data.updatedMsg = gs.getMessage("Record Updated");
    data.exportPDFMsg = gs.getMessage("Export to PDF");
    data.exportPDFLandMsg = gs.getMessage("Export to PDF (landscape)");
    data.addAttachmentMsg = gs.getMessage("Add an attachment");
    data.maxAttachmentSize = parseInt(gs.getProperty("com.glide.attachment.max_size", 1024));
    data.advancedUIEnabled = (gs.getProperty("glide.ui.advanced") == "true");
    data.closeWindowMsg = gs.getMessage("Close Window");
    if (isNaN(data.maxAttachmentSize))
        data.maxAttachmentSize = 24;
    data.largeAttachmentMsg = gs.getMessage("Attached files must be smaller than {0} - please try again", "" + data.maxAttachmentSize + "MB");

    data.isAdmin = gs.hasRightsTo('sp/configure.all/execute', null);
    data.emptyStateTemplate = options.empty_state_template;
    var isPopup = false;

    if (input) {
        // KLF Addition
        // adding support for URL redirection
        if (input.action == 'getActionResponseFromSession') {
            var uiAction = input.uiAction;
            if (uiAction) {
                var session = gs.getSession();
                var actionDataJson = session.getClientData(uiAction.sys_id);
                if (actionDataJson) {
                    data.actionData = JSON.parse(actionDataJson);
                    data.redirectUrl = data.actionData.redirectUrl;
                    return;
                }
            }
        }
        // END KLF Addition

        data.table = input.table;
        data.sys_id = input.sys_id;
        data.view = input.view;
        var result = null;
        if (input._fields) {
            result = $sp.saveRecord(input.table, input.sys_id, input._fields);
            data.sys_id = result.sys_id;
        }

        if (input.sys_id == '-1')
            data.isNewRecord = true;
        if (input.isPopup === true)
            isPopup = true;
    } else {
        data.table = options.table || $sp.getParameter("t") || $sp.getParameter("table") || $sp.getParameter("sl_table");
        data.sys_id = options.sys_id || $sp.getParameter("sys_id") || $sp.getParameter("sl_sys_id");
        if (!data.sys_id && options.sys_id_required != "true")
            data.sys_id = "-1";

        // KLF ADDITION
        // making default view SP
        // data.view = options.view || $sp.getParameter("view") || $sp.getParameter("v"); // no default
        data.view = options.view || $sp.getParameter("view") || $sp.getParameter("v") || 'sp';
        // END KLF ADDITION
    }

    if (isPopup && gs.getProperty("glide.service_portal.reference.use_sys_popup_view", "false") == "true") {
        options.hideRelatedLists = true;
        options.disableUIActions = "true";
    }
    data.hideRelatedLists = options.hideRelatedLists || false;
    data.disableUIActions = options.disableUIActions === "true";

    data.query = $sp.getParameter("query") || options.query || "";
    data.f = {};
    if (!data.table)
        return;

    // Form widget is not a supported way to view an attachment
    if (data.table == "sys_attachment") {
        data.tableUnsupported = true;
        return;
    }

    if (!GlideTableDescriptor.isValid(data.table))
        return;

    if (!data.sys_id)
        return;

    var rec = $sp.getRecord(data.table, data.sys_id);

    if (data.sys_id != "-1" && !rec.canRead())
        return; // can't see requested record

    if (data.sys_id == "-1" && !rec.canCreate())
        return; // can't create a new record

    data.isValid = rec.isValid() || data.sys_id == "-1";
    if (!data.isValid)
        return;

    data.table = rec.getRecordClassName();
    data.tableHierarchy = GlideDBObjectManager.getTables(data.table).toArray().join();
    data.canWrite = rec.canWrite();
    var hasRecordAccess = data.sys_id == "-1" ? rec.canCreate() : data.canWrite;
    data.canAttach = !options.omitAttachmentButton && hasRecordAccess && gs.hasRole(gs.getProperty('glide.attachment.role')) && !GlideTableDescriptor.get(data.table).getED().getBooleanAttribute("no_attachment");
    data.f = $sp.getForm(data.table, data.sys_id, data.query, data.view, isPopup);

    // KLF ADDITION
    var klfSpUtils = new global.KLF_SPUtils();
    // Adding code to support applying templates
    var templateName = $sp.getParameter('template_name');
    if ((gs.hasRole('admin') || gs.getSession().isImpersonating()) && templateName) {
        klfSpUtils.applyGlideRecordTemplate(templateName, data.f);
    }
    // adding order to actions
    var actionSysIds = data.f._ui_actions.map(function( /**@type {*}*/ action) {
        return action.sys_id;
    });
    if (actionSysIds.length > 0) {
        var actionGr = new GlideRecord('sys_ui_action');
        actionGr.addQuery('sys_id', 'IN', actionSysIds);
        actionGr.query();
        while (actionGr.next()) {
            data.f._ui_actions.forEach(function( /**@type{*}*/ action) {
                if (action.sys_id == actionGr.getUniqueValue()) {
                    action.display_order = parseInt(actionGr.getValue('order')) || 100;
                }
            });
        }
    }
    // Add client side UI actions
    var clientActions = klfSpUtils.getSPClientUIActions(data.table, rec, data.view);
    // @ts-ignore
    var filteredActions = klfSpUtils.filterForSPActionsInView([].concat(data.f._ui_actions, clientActions), data.view);
    data.f._ui_actions = filteredActions;
    // END KLF ADDITION

    // PRB1335036: show appropriate message when record is in cross app scope
    data.f.outOfScope = !rec.isInSelectedScope();
    // Populate scope labels only when needed
    if (data.f.outOfScope) {
        data.f.recordScopeLabel = gs.getScopeLabelByRecordId(rec.getUniqueValue());
        data.f.currentScopeLabel = gs.getCurrentApplicationName();
    }

    // Activity formatter is hardcoded to set specific options
    for (var f in data.f._formatters) {
        var fm = data.f._formatters[f];
        if (fm.formatter == "activity.xml") {
            fm.hardcoded = true;
            fm.widgetInstance = $sp.getWidget('klf-ticket-conversation', // KLF ADDITION - substituting custom ticket widget that adds audit entries
                {
                    table: data.table,
                    sys_id: data.sys_id,
                    includeExtended: true,
                    hideAttachmentBtn: true,
                    title: "${Activity}",
                    use_dynamic_placeholder: true,
                    btnLabel: "${Post}"
                });
        } else if (fm.formatter == "com_glideapp_servicecatalog_veditor" || fm.formatter == "com_glideapp_questionset_default_question_editor") {
            var qsConfig = $sp.getValue('quick_start_config');
            if (qsConfig)
                qsConfig = JSON.parse(qsConfig)[0];
            fm.widgetInstance = $sp.getWidget(fm.widget, {
                table: data.table,
                sys_id: data.sys_id,
                readonly_variable_editor: qsConfig ? qsConfig.readonly_variable_editor : 'false'
            });
        } else
            fm.widgetInstance = $sp.getWidget(fm.widget, data);
    }
})($sp, input, data, options, gs);