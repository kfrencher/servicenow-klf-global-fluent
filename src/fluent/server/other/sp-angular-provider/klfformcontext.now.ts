import { SPAngularProvider } from '@servicenow/sdk/core'

SPAngularProvider({
    $id: Now.ID['cf2feedeff52321020d2333663e97267'],
    name: 'klfFormContext',
    type: 'service',
    script: `/**
 * @type {() =>{
 * 	 setContext: (context: KLF_FormContext) => void,
 * 	 getContext: () => Promise<KLF_FormContext>
 * }}
 */
function klfFormContext() {
	this.context = null;
	this.resolveGetContext = null;

	return {
		/**
		 * Called from KLF Form widget. This should only be called from the form widget.
		 * It sets the context when the form is initialized. The context can be used by
		 * other widgets that need access to some of the form objects.
		 */
		setContext: function(context) {
			/** @type {KLF_FormContext} */
			this.context = context;
			if(this.resolveGetContext) {
				this.resolveGetContext(context);
			}
		},

		/**
		 * This can be called by other widgets to retrieve context.
		 * This will return a promise that is resolved with the form context data.
		 * @returns {Promise<KLF_FormContext>}
		 */
		getContext: function() {
			var me = this;
			return new Promise(function(resolve) {
				if(me.context) {
					resolve(me.context);
				} else {
					me.resolveGetContext = resolve;
				}
			});
		}
	};
}`,
})
