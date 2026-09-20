/**
 * @param {angular.IScope & Object.<string, *>} $scope
 * @param {*} spUtil
 * @param {*} uiActionExecutor 
 */
function controller($scope, spUtil, uiActionExecutor) {
	
	$scope.executeAction = async function () {
		spUtil.addInfoMessage('Executing action');
		var specialSaveUIActionSysId = '2698d25aff123e1020d2333663e97212';
		try {
			// var result = await uiActionExecutor.execute(g_form, specialSaveUIActionSysId, formModel._attachmentGUID);
			var result = await uiActionExecutor.execute(specialSaveUIActionSysId);
			console.info('Result: ' + JSON.stringify(result, null, 4));
		} catch(e) {
			console.error('Failed to execute action', e);
		}
	};

};