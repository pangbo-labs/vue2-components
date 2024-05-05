import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DocHome from '../views/docs/DocHome.vue'
import PbButtonDoc from '../views/docs/docs/PbButtonDoc.vue'
import PbTableDoc from '../views/docs/docs/PbTableDoc.vue'
import PbTreeDoc from '../views/docs/docs/PbTreeDoc.vue'
import PbFormDoc from '../views/docs/docs/PbFormDoc.vue'
import PbDialogBoxDoc from '../views/docs/docs/PbDialogBoxDoc.vue'
import SamplesHome from '../views/samples/SamplesHome.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/docs',
		name: 'DocHome',
		component: DocHome,
		children: [
			{
				path: 'pb-button',
				name: 'PbButtonDoc',
				component: PbButtonDoc
			},
			{
				path: 'pb-table',
				name: 'PbTableDoc',
				component: PbTableDoc
			},
			{
				path: 'pb-tree',
				name: 'PbTreeDoc',
				component: PbTreeDoc
			},
			{
				path: 'pb-form',
				name: 'PbFormDoc',
				component: PbFormDoc
			},
			{
				path: 'pb-dialog-box',
				name: 'PbDialogBoxDoc',
				component: PbDialogBoxDoc
			},
		],
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
