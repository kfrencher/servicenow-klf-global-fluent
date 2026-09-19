import { SPAngularProvider } from '@servicenow/sdk/core'

SPAngularProvider({
    $id: Now.ID['59923196ff5efa1020d2333663e9726d'],
    name: 'uiActionExecutor',
    type: 'service',
    script: `/**
 * The uiActionExecutor allows direct execution of a UI Action from ServicePortal without the user
 * clicking a button
 * 
 * spUIActionFactory is defined in glide-service-portal-x.x.x.jar
 * Look for factory.spUIActionFactory.js and directive.spModel.js
 * @param {*} spUIActionFactory
 * @param {ReturnType<typeof klfFormContext>} klfFormContext
 * @returns {{
 *   execute: (actionSysId: string) => Promise<any>,
 *   executeWithoutContext: (g_form: g_form, actionSysId: string, attachmentGUID?: string) => Promise<any>
 * }}
 */
function uiActionExecutor(spUIActionFactory, klfFormContext) {
    /**
     * @param {g_form} g_form GlideForm object
     * @param {string} [attachmentGUID] The attachmentGUID associated with the form model. Typically $scope.data.f._attachmentGUID
     * Returns a data object in the format required by spUIActionFactory.executeUIAction
     */
    function getFormData(g_form, attachmentGUID) {
        var formData = {};
        var fieldNames = g_form.getFieldNames();
        fieldNames.forEach(function(name) {
            formData[name] = g_form.getField(name);
        });

        if (attachmentGUID) {
            formData._attachmentGUID = attachmentGUID;
        }

        return formData;
    }

    /**
     * @param {string} actionSysId The sys_ui_action.sys_id to call
     * @returns {Promise}
     */
    function execute(actionSysId) {
        if (!klfFormContext) {
            throw 'Cannot use execute without context';
        }

        return klfFormContext.getContext().then(function(context) {
            var g_form = context.g_form;
            var formModel = context.$scope.data.f;
            if (!g_form) {
                throw 'g_form is null';
            }

            if (!formModel) {
                throw 'formModel is null';
            }

            return executeWithoutContext(g_form, actionSysId, formModel._attachmentGUID);
        });
    }

    /**
     * @param {g_form} g_form GlideForm object
     * @param {string} actionSysId The sys_ui_action.sys_id to call
     * @param {string} [attachmentGUID] The attachmentGUID associated with the form model. Typically $scope.data.f._attachmentGUID
     * @returns {Promise}
     */
    function executeWithoutContext(g_form, actionSysId, attachmentGUID) {
        return spUIActionFactory.executeUIAction(actionSysId, g_form.getTableName(), g_form.getSysId(), getFormData(g_form, attachmentGUID));
    }

    return {
        execute: execute,
        executeWithoutContext: executeWithoutContext
    };

}

/**
 * @private
 * This is just here to show what is really happening. A REST call is made to invoke the
 * UI Action
 */
// function async _execute(actionSysId, tableName, recordSysId, formData) {
//     // create the request
//     var req = {
//         method: "POST",
//         url: "/api/now/sp/uiaction/" + actionSysId,
//         headers: {
//             'Accept': 'application/json',
//             'x-portal': $rootScope.portal_id
//         },
//         data: {
//             table: tableName,
//             recordID: recordSysId,
//             data: formData
//         }
//     };
//     try {
//         var response = await $http(req);
//         var r = response.data.result;
//         if (r && r.$$uiNotification) {
//             $rootScope.$broadcast("$$uiNotification", r.$$uiNotification);
//         }
//         return r;
//     } catch (e) {
//         console.error("Error " + e.status + " " + e.statusText);
//     }
// }`,
    requires: ['cf2feedeff52321020d2333663e97267'],
})
