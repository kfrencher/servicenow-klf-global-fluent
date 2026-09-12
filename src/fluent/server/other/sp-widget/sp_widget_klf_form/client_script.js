api.controller = function() {}; // Only here to satisfy validation client script "Validate Client Controller". It requires this script begin with a function

// @ts-ignore
api.controller =
    /**
     * @param {angular.IRootScopeService} $rootScope 
     * @param {AngularScope} $scope 
     * @param {angular.ITimeoutService} $timeout 
     * @param {angular.ILocationService} $location 
     * @param {angular.ILogService} $log 
     * @param {angular.IWindowService} $window 
     * @param {*} spUtil 
     * @param {*} nowAttachmentHandler 
     * @param {*} spAriaUtil 
     * @param {*} spNavStateManager 
     * @param {*} glideUserSession 
     * @param {*} i18n 
     * @param {*} klfModal 
     */
    function controller($rootScope, $scope, $timeout, $location, $log, $window, spUtil, nowAttachmentHandler, spAriaUtil, spNavStateManager, glideUserSession, i18n, klfModal, uiActionExecutor, spUIActionFactory, klfFormContext) {
        // KLF ADDITION
        // adding the g_user reference to allow UI Actions to be compatible
        /** @type {g_user} */
        var g_user;
        glideUserSession.loadCurrentUser().then(function( /**@type {g_user}*/ _g_user) {
            g_user = _g_user;
        });
        // END KLF ADDITION

        $scope.submitting = false;
        $scope.mandatory = [];
        $scope.errorMessages = [];
        $scope.data.show_sql = false;
        $scope.saveButtonSuffix = spUtil.getAccelerator('s');
        $scope.isPageReady = false;
        $scope.embeddedInModal = false;
        $scope.adminMenu = {
            encodedPageUrl: encodeURIComponent($location.url()),
            getClientScriptCount: function() {
                var count = 0;
                if ($scope.data.f.client_script) {
                    count += $scope.data.f.client_script.onChange.length;
                    count += $scope.data.f.client_script.onLoad.length;
                    count += $scope.data.f.client_script.onSubmit.length;
                }
                return count;
            }
        };
        var tableId = $scope.data.sys_id != -1 ? $scope.data.sys_id : ($scope.data.f ? $scope.data.f._attachmentGUID : -1);
        spUtil.recordWatch($scope, "sys_attachment", "table_sys_id=" + tableId, function( /**@type{*}*/ response, /**@type{*}*/ data) {
            $scope.attachmentHandler.getAttachmentList();
            if (response.data) {
                var options = {};
                options.operation = response.data.operation;
                options.filename = response.data.display_value;
                options.sys_id = tableId;
                options.table = $scope.data.table;
                options.state = (response.data.record && response.data.record.state) ? response.data.record.state.value : "";
                if (options.operation === 'update' && options.state === 'not_available')
                    $rootScope.$broadcast("attachment.updated", options);
            }
        });

        $rootScope.$on('$sp.html.editor.progress', function(e, conf) {
            $scope.submitting = conf.state;
        });

        $scope.getButtonClass = function( /**@type{SPAction}*/ action) {
            if (action.form_style == "destructive")
                return "btn-danger";

            if (action.form_style == "primary")
                return "btn-primary";

            return "btn-default";
        };
        $scope.cancel = function() {
            $rootScope.$emit('sp.ReferenceFieldModal.dismiss');
        };

        $scope.getUIActions = function( /**@type{string}*/ type) {
            if ($scope.data.disableUIActions)
                return [];
            if (type) {
                return $scope.data.f._ui_actions.filter(function( /**@type{SPAction}*/ action) {
                    // KLF ADDITION
                    //We handle the primary action button separately.
                    // return !action.primary && action['is_' + type];
                    return action['is_' + type];
                });
            } else {
                return $scope.data.f._ui_actions;
            }
        };

        $scope.getPrimaryAction = function() {
            var primaryActions = $scope.data.f._ui_actions.filter(function( /**@type{SPAction}*/ action) {
                return action.primary;
            });
            return (primaryActions.length) ? primaryActions[0] : null;
        };

        $scope.getUIActionContextMenu = function( /**@type{MouseEvent}*/ event) {
            /** @type {Array.<[string, () => void]|null>} */
            var menu = [];
            if (event.ctrlKey)
                return menu;

            var contextActions = $scope.getUIActions('context');
            contextActions.forEach(function( /**@type{SPAction}*/ action) {
                menu.push([action.name, function() {
                    $scope.triggerUIAction(action);
                }]);
            });

            if (contextActions.length > 0)
                menu.push(null);
            menu.push([$scope.data.exportPDFMsg, function() {
                exportPDF("");
            }]);
            menu.push([$scope.data.exportPDFLandMsg, function() {
                exportPDF('true');
            }]);

            return menu;
        };

        function exportPDF( /**@type{string}*/ landscape) {
            $window.open("/" + $scope.data.f.table + ".do?PDF&landscape=" + landscape + "&sys_id=" + $scope.data.sys_id + "&sysparm_view=" + $scope.data.f.view);
        }

        //trigger the primary UI Action on save (if there is one)
        var deregister = $scope.$on('$sp.save', function() {
            var primaryAction = $scope.getPrimaryAction();
            if (primaryAction)
                $scope.triggerUIAction(primaryAction);
        });
        $scope.$on('$destroy', function() {
            deregister();

            // KLF ADDITION
            // Firing this event to let other listeners know this form is going away
            // THis allows external scripts like UI Policies and Client Scripts
            // access to objects in Service Portal if the script is running in the
            // Service Portal context
            // @ts-ignore -- CustomEvent.fire is not defined
            CustomEvent.fire('klf.form.destroy', {
                g_form: g_form,
                $rootScope: $rootScope,
                $scope: $scope,
                $timeout: $timeout,
                $location: $location,
                $log: $log,
                $window: $window,
                spUtil: spUtil,
                nowAttachmentHandler: nowAttachmentHandler,
                spAriaUtil: spAriaUtil,
                spNavStateManager: spNavStateManager,
                glideUserSession: glideUserSession,
                i18n: i18n,
                klfModal: klfModal
            });
            // END KLF ADDITION
        });

        // KLF ADDITION
        // Allowing external widgets to trigger a UI Action
        $rootScope.$on('klf.form.triggeraction', function(e, action) {
            $scope.triggerUIAction(action);
        });

        // I'm clearing messages that may be hanging around when the user executes another
        // UI Action. The original function has been moved to a standalone function
        $scope.triggerUIAction = function( /**@type{SPAction}*/ action) {
            // Clear any current messages now that the user is trying to do a new action
            if (g_form) {
                g_form.clearMessages();
                setTimeout(function() {
                    // Intentionally adding action to scope
                    $scope.uiAction = action;
                    originalTriggerUIAction(action);
                });
            } else {
                originalTriggerUIAction(action);
            }
        };
        // END KLF ADDITION

        // KLF ADDITION
        function originalTriggerUIAction( /**@type{SPAction}*/ action) {
            if ($scope.data.disableUIActions && !action.primary) {
                return;
            }

            var activeElement = document.activeElement;
            if (activeElement) {
                // @ts-ignore - blur() is not a function on type Element
                activeElement.blur();
            }

            // KLF ADDITION
            // Wrapping this code in a function to call later
            function triggerAction() {
                $scope.$evalAsync(function() {
                    if (g_form) {
                        $scope.submitting = true;
                        if (!g_form.submit(action.action_name || action.sys_id))
                            $scope.submitting = false;
                    }
                });
            }

            // KLF ADDITION
            // Allowing other widgets to know an action is about to fire
            $rootScope.$broadcast('klf.triggeruiaction', action);
            // END KLF ADDITION

            // KLF ADDITION
            if (action.is_custom) {
                if (action.fn && action.is_client) {
                    var fnCall = action.fn;
                    if (action.onclick) {
                        eval(fnCall + '\n\n' + action.onclick); // eslint ignore
                    } else {
                        spUtil.addErrorMessage('Client action must include an onclick function');
                    }
                }
                return;
            } else {
                triggerAction();
            }
            // END KLF ADDITION

        }

        // @ts-ignore
        var me = this;
        $scope.$on("spModel.uiActionComplete", function(evt, response, savedFormSysId) {
            // KLF ADDITION
            var uiAction = $scope.uiAction;
            $scope.uiAction = null; // Cleaning up
            // END KLF ADDITION

            if (!response.isInsert && ($scope.data.sys_id !== savedFormSysId))
                return;

            $scope.submitting = false;
            if (response.isActionAborted)
                return;

            var sysID = (response.isInsert) ? response.sys_id : $scope.data.sys_id;

            // KLF ADDITION
            // adding to support URL redirection
            // loadForm($scope.data.table, sysID).then(constructResponseHandler(response));
            // @ts-ignore
            me.server.get({
                action: 'getActionResponseFromSession',
                uiAction: uiAction
            }).then(function( /**@type{*}*/ redirectResponse) {
                if (redirectResponse.data.redirectUrl) {
                    $location.url(redirectResponse.data.redirectUrl);
                } else {
                    loadForm($scope.data.table, sysID).then(constructResponseHandler(response, uiAction));
                }
            });
            // END KLF ADDITION
        });

        function constructResponseHandler( /**@type{*}*/ response, /**@type{SPAction}*/ uiAction) {
            return function() {
                // KLF ADDITION
                // Adding some additions to thie event: uiAction, and isInsert
                $rootScope.$broadcast("sp.form.submitted", {
                    uiAction: uiAction,
                    isInsert: response.isInsert,
                    sys_id: (response.isInsert) ? response.sys_id : $scope.data.sys_id
                });
                // END KLF ADDITION

                var message;
                var eventName = "sp.form.record.updated";
                if (response.isInsert) {
                    message = $scope.data.recordAddedMsg;
                    var search = $location.search();
                    search.sys_id = response.sys_id;
                    search.spa = 1;
                    $location.search(search).replace();
                } else
                    message = $scope.data.updatedMsg;

                $scope.data.hideRelatedLists = hideRelatedLists();
                $scope.$emit(eventName, $scope.data.f._fields, $scope.data.sys_id);
                $rootScope.$broadcast(eventName, $scope.data.f._fields, $scope.data.sys_id);
                $scope.status = message;
                spUtil.addTrivialMessage(message);
                // KLF ADDITION
                // This function not always available
                if (spUtil.simulateFakeFormSubmitForAutoComplete) {
                    spUtil.simulateFakeFormSubmitForAutoComplete('widget-form', $scope.data.f._fields);
                }
                // END KLF ADDITION
                $timeout(clearStatus, 2000);
            };
        }

        /** @type {any} */
        var ctrl = this;
        // switch forms
        var unregister = $scope.$on('$sp.list.click', onListClick);
        $scope.$on("$destroy", function() {
            unregister();
        });

        function _save() {
            var primaryAction = $scope.getPrimaryAction();
            if (primaryAction)
                $scope.triggerUIAction(primaryAction);
        }

        function onListClick( /**@type{angular.IAngularEvent}*/ evt, /**@type{*}*/ arg) {
            loadForm(arg.table, arg.sys_id);
        }

        /**
         * @param {string} table 
         * @param {string} sys_id 
         * @returns 
         */
        function loadForm(table, sys_id) {
            var f = {};
            $scope.data.table = f.table = table;
            $scope.data.sys_id = f.sys_id = sys_id;
            f.view = $scope.data.view;

            // KLF ADDITION
            // Firing this event to let other listeners know this form is going away
            // THis allows external scripts like UI Policies and Client Scripts
            // access to objects in Service Portal if the script is running in the
            // Service Portal context
            // @ts-ignore -- CustomEvent.fire is not defined
            CustomEvent.fire('klf.form.load', {
                g_form: g_form,
                $rootScope: $rootScope,
                $scope: $scope,
                $timeout: $timeout,
                $location: $location,
                $log: $log,
                $window: $window,
                spUtil: spUtil,
                nowAttachmentHandler: nowAttachmentHandler,
                spAriaUtil: spAriaUtil,
                spNavStateManager: spNavStateManager,
                glideUserSession: glideUserSession,
                i18n: i18n,
                klfModal: klfModal,
                f: f
            });
            // END KLF ADDITION

            return $scope.server.update().then(setupAttachmentHandler);
        }

        /**
         * @param {MouseEvent} e 
         * @param {string} queryString 
         */
        function openRelatedList(e, queryString) {
            // todo: Open this in a modal
            $location.search(queryString);
            e.preventDefault();
        }

        $scope.$on('spModel.fields.rendered', function() {
            if (ctrl.panels)
                ctrl.panels.removeClass('shift-out').addClass('shift-in');
        });

        /** @type {g_form} */
        var g_form;

        function initForm( /**@type{g_form}*/ gFormInstance) {
            $scope.$evalAsync(function() {
                if ($('#widget-form').parents('.modal').length)
                    $scope.embeddedInModal = true;
            });

            if (gFormInstance.getTableName() == $scope.data.f.table) {
                g_form = gFormInstance;
                // @ts-ignore
                window.g_form = g_form;

                // KLF ADDITION
                // disabling for now so dirty form popup does not display
                // spNavStateManager.register($scope.data.table, _save, g_form);
                // END KLF ADDITION

                $scope.isPageReady = true;
                $timeout(function() {
                    $rootScope.$emit('spModel.gForm.rendered', g_form);
                }, 175);
            }
        }

        $scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
            initForm(gFormInstance);
        });

        $scope.$on('spModel.gForm.env.created', function(e, gFormInstance) {
            initForm(gFormInstance);
        });

        // update the comments or worknotes based on activity stream
        $scope.$on("activity_stream_is_changed", function(event, data) {
            if (g_form && g_form.hasField(data.fieldName)) {
                g_form.setValue(data.fieldName, data.input);
                if (data.fieldToClear != "" && g_form.hasField(data.fieldToClear))
                    g_form.setValue(data.fieldToClear, "");
            }
        });

        // Show or hide related lists
        $scope.$watch('data.f._related_lists', function() {
            $scope.data.hideRelatedLists = hideRelatedLists();
        }, true);

        $scope.hideDuplicateSaveAction = function( /**@type{SPAction}*/ item) {
            if (!$scope.data.advancedUIEnabled)
                return true;
            return ($scope.data.advancedUIEnabled && item.sys_id !== "432ace8b0a0a0b34006b02832660c894" && item.sys_id !== "42e780d40a0a0b34007e0d4a52d33405");
        };

        function hideRelatedLists() {
            if (!$scope.data.f._related_lists)
                return true;
            if ($scope.options.hideRelatedLists == true)
                return true;
            if ($scope.data.sys_id == '-1')
                return true;
            // If all related lists are visible=false then hide
            if ($scope.data.f._related_lists.length > 0) {
                for (var i in $scope.data.f._related_lists) {
                    var list = $scope.data.f._related_lists[i];
                    if (list.visible) {
                        return false;
                    }
                }
            }
            return true;
        }

        function clearStatus() {
            $scope.status = "";
        }

        function setupAttachmentHandler() {
            $scope.attachmentHandler = new nowAttachmentHandler(appendDone, appendError);

            $scope.$evalAsync(function() {
                $scope.attachmentHandler.setParams($scope.data.table, $scope.data.f._attachmentGUID, 1024 * 1024 * $scope.data.maxAttachmentSize);
            });

            $scope.$on('dialog.upload_too_large.show', function(e) {
                $log.error($scope.data.largeAttachmentMsg);
                spUtil.addErrorMessage($scope.data.largeAttachmentMsg);
            });
        }
        setupAttachmentHandler();

        function appendDone() {
            // don't know here whether upload succeeded, so can't show msg either way
            $scope.$broadcast("sp.attachments.update", $scope.data.f._attachmentGUID);
            spUtil.retrieveSessionMessages();
        }

        function appendError( /**@type{{msg:string,fileName:string}}*/ error) {
            $scope.errorMessages.push(error);
            spUtil.addErrorMessage(error.msg + error.fileName);
        }

        if ($scope.data.f.title) {
            $scope.$emit('sp.widget-modal.set-aria-label', $scope.data.f.title);
        }

        // KLF ADDITION
        // patch g_form because it doesn't properly skip validation on
        // some action names it should by default
        // adding a 'nvalidate' option so i can pass in any UI Action that has
        // 'novalidate' and it will skip validation
        var controllerArguments = arguments;
        $scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {
            var originalValidate = gFormInstance.$private.validateForm;
            // @ts-ignore
            window.klfForm = gFormInstance;
            // @ts-ignore
            window.uiActionExecutor = uiActionExecutor;
            // @ts-ignore
            window.spUIActionFactory = spUIActionFactory;
            gFormInstance.$private.validateForm = function( /**@type{string}*/ actionName) {
                if (actionName) {
                    if (actionName.endsWith('novalidate')) {
                        return true;
                    }
                    if (['sysverb_back', 'sysverb_cancel', 'sysverb_delete', 'sysverb_query'].indexOf(actionName) >= 0) {
                        return true;
                    }
                }
                return originalValidate.apply(gFormInstance.$private, arguments);
            };

            // THis allows external scripts like UI Policies and Client Scripts
            // access to objects in Service Portal if the script is running in the
            // Service Portal context
            // @ts-ignore -- CustomEvent.fire is not defined
			console.info('Firing klf.form.initialized');
			var formContext = {
                g_form: g_form,
                $rootScope: $rootScope,
                $scope: $scope,
                $timeout: $timeout,
                $location: $location,
                $log: $log,
                $window: $window,
                spUtil: spUtil,
                nowAttachmentHandler: nowAttachmentHandler,
                spAriaUtil: spAriaUtil,
                spNavStateManager: spNavStateManager,
                glideUserSession: glideUserSession,
                i18n: i18n,
                klfModal: klfModal,
				uiActionExecutor: uiActionExecutor
            };
            // @ts-ignore
            CustomEvent.fire('klf.form.initialized', formContext);
			klfFormContext.setContext(formContext);
        });
        // END KLF ADDITION
    };