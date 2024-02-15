import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import PbComponents from './components/pblabs-components/index.js'
import "./components/pblabs-components/Themes/default.css"
import "./assets/google-icon-fonts.css"
Vue.use( PbComponents );

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
