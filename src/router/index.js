import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ArtistDataImport from "../views/ArtistDataImport";
import Edit from "../views/ArtistDataEdit";
import ArtistListEdit from "../views/ArtistListEdit";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/list',
		name: 'List',
		component: ArtistListEdit
	},
	{
		path: '/import',
		name: 'Import',
		component: ArtistDataImport,
	},
	{
		path: '/edit/:oid',
		name: 'EditNo',
		component: Edit,
	},
	{
		path: '/edit',
		name: 'Edit',
		component: Edit,
	}
]

const router = new VueRouter({
	//mode: 'history',
	base: process.env.VUE_APP_URL_BASE,
	routes
})

export default router
