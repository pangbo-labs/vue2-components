import Vue from 'vue'

import Globals from './Globals.js'
Vue.prototype.$globals = Globals;

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import PbComponents from './components/pblabs-ui-vue2/src'
import "./components/pblabs-ui-vue2/themes/default.css"

// import PbComponents from '@pangbolabs/pblabs-ui-vue2'
// import "@pangbolabs/pblabs-ui-vue2/themes/default.css"
// import "@pangbolabs/pblabs-ui-vue2/dist/index.css"
import "./assets/google-icon-fonts.css"
Vue.use( PbComponents );

import hljs from 'highlight.js';
import "highlight.js/styles/github.css"
// import "highlight.js/styles/xcode.css"
Vue.prototype.$hljs = hljs;
Vue.prototype.$code = function( code, language )
{code = code.replaceAll( "&", "&amp;" );
	code = code.replaceAll( "<", "&lt;" );
	code = code.replaceAll( ">", "&gt;" );
	console.log( code );
	return code;

	// if (!language)
	// 	language = "plaintext";

	// return hljs.highlight( code, { language: language } ).value;
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
