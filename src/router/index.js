import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DocumentationHome from '../views/documentation/DocumentationHome.vue'
import SamplesHome from '../views/samples/SamplesHome.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/documentation',
		name: 'DocumentationHome',
		component: DocumentationHome
	},
	{
		path: '/samples',
		name: 'SamplesHome',
		component: SamplesHome
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
