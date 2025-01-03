/*
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
*/

import PbMessageBox from "./PbMessageBox/PbMessageBox.vue"

var g_Vue = null;
var g_msgBoxInstance = null;

function createInstance()
{
	const constructor = g_Vue.extend( PbMessageBox );
	g_msgBoxInstance = new constructor();
	g_msgBoxInstance.$mount();
	document.body.appendChild( g_msgBoxInstance.$el );
	// console.log( g_msgBoxInstance );
}

function showMessageBox( title, message, iconType, callback )
{
	if (g_msgBoxInstance == null) {
		createInstance();
	}
	g_msgBoxInstance.showMessageBox( title, message, iconType, callback );
}

function showConfirmBox( title, message, callback )
{
	if (g_msgBoxInstance == null) {
		createInstance();
	}
	g_msgBoxInstance.showConfirmBox( title, message, callback );
}

export default
{
	install: function( Vue )
	{
		g_Vue = Vue;
		Vue.prototype.$showMessage = showMessageBox;
		Vue.prototype.$confirm = showConfirmBox;
	}
}
