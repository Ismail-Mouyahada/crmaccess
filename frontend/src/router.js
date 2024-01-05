
import { createRouter, createWebHashHistory } from 'vue-router';

import { useAuth } from 'src/composables/auth';


function passRouteToProps(route){
	return {
		queryParams: route.query,
		fieldName: route.params.fieldName, 
		fieldValue: route.params.fieldValue
	}
}


let routes = [
	//Dashboard routes


//compteurselec routes
			{
				path: '/compteurselec/:fieldName?/:fieldValue?',
				name: 'compteurseleclist',
				component: () => import('./pages/compteurselec/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/compteurselec/view/:id', 
				name: 'compteurselecview', 
				component: () => import('./pages/compteurselec/view.vue'), 
				props: true
			},
		
			{ 
				path: '/compteurselec/add', 
				name: 'compteurselecadd', 
				component: () => import('./pages/compteurselec/add.vue'), 
				props: true
			},
	
			{ 
				path: '/compteurselec/edit/:id', 
				name: 'compteurselecedit', 
				component: () => import('./pages/compteurselec/edit.vue'), 
				props: true
			},
		

//compteursgaz routes
			{
				path: '/compteursgaz/:fieldName?/:fieldValue?',
				name: 'compteursgazlist',
				component: () => import('./pages/compteursgaz/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/compteursgaz/view/:id', 
				name: 'compteursgazview', 
				component: () => import('./pages/compteursgaz/view.vue'), 
				props: true
			},
		
			{ 
				path: '/compteursgaz/add', 
				name: 'compteursgazadd', 
				component: () => import('./pages/compteursgaz/add.vue'), 
				props: true
			},
	
			{ 
				path: '/compteursgaz/edit/:id', 
				name: 'compteursgazedit', 
				component: () => import('./pages/compteursgaz/edit.vue'), 
				props: true
			},
		

//evenements routes
			{
				path: '/evenements/:fieldName?/:fieldValue?',
				name: 'evenementslist',
				component: () => import('./pages/evenements/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/evenements/view/:id', 
				name: 'evenementsview', 
				component: () => import('./pages/evenements/view.vue'), 
				props: true
			},
		
			{ 
				path: '/evenements/add', 
				name: 'evenementsadd', 
				component: () => import('./pages/evenements/add.vue'), 
				props: true
			},
	
			{ 
				path: '/evenements/edit/:id', 
				name: 'evenementsedit', 
				component: () => import('./pages/evenements/edit.vue'), 
				props: true
			},
		

//fournisseurs routes
			{
				path: '/fournisseurs/:fieldName?/:fieldValue?',
				name: 'fournisseurslist',
				component: () => import('./pages/fournisseurs/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/fournisseurs/view/:id', 
				name: 'fournisseursview', 
				component: () => import('./pages/fournisseurs/view.vue'), 
				props: true
			},
		
			{ 
				path: '/fournisseurs/add', 
				name: 'fournisseursadd', 
				component: () => import('./pages/fournisseurs/add.vue'), 
				props: true
			},
	
			{ 
				path: '/fournisseurs/edit/:id', 
				name: 'fournisseursedit', 
				component: () => import('./pages/fournisseurs/edit.vue'), 
				props: true
			},
		

//messages routes
			{
				path: '/messages/:fieldName?/:fieldValue?',
				name: 'messageslist',
				component: () => import('./pages/messages/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/messages/view/:id', 
				name: 'messagesview', 
				component: () => import('./pages/messages/view.vue'), 
				props: true
			},
		
			{ 
				path: '/messages/add', 
				name: 'messagesadd', 
				component: () => import('./pages/messages/add.vue'), 
				props: true
			},
	
			{ 
				path: '/messages/edit/:id', 
				name: 'messagesedit', 
				component: () => import('./pages/messages/edit.vue'), 
				props: true
			},
		

//societes routes
			{
				path: '/societes/:fieldName?/:fieldValue?',
				name: 'societeslist',
				component: () => import('./pages/societes/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/societes/view/:id', 
				name: 'societesview', 
				component: () => import('./pages/societes/view.vue'), 
				props: true
			},
		
			{ 
				path: '/societes/add', 
				name: 'societesadd', 
				component: () => import('./pages/societes/add.vue'), 
				props: true
			},
	
			{ 
				path: '/societes/edit/:id', 
				name: 'societesedit', 
				component: () => import('./pages/societes/edit.vue'), 
				props: true
			},
		

//typeevenements routes

//utilisateurs routes
			{
				path: '/utilisateurs/:fieldName?/:fieldValue?',
				name: 'utilisateurslist',
				component: () => import('./pages/utilisateurs/list.vue'), 
				props: route => passRouteToProps(route)
			},
	
			{ 
				path: '/utilisateurs/view/:id', 
				name: 'utilisateursview', 
				component: () => import('./pages/utilisateurs/view.vue'), 
				props: true
			},
		
			{ 
				path: '/index/register', 
				name: 'utilisateursuserregister', 
				component: () => import('./pages/index/userregister.vue'), 
				props: true
			},
	
			{ 
				path: '/account/edit', 
				name: 'utilisateursaccountedit', 
				component: () => import('./pages/account/accountedit.vue'), 
				props: true
			},
	
			{ 
				path: '/account', 
				name: 'utilisateursaccountview', 
				component: () => import('./pages/account/accountview.vue'), 
				props: true
			},
	
			{ 
				path: '/utilisateurs/add', 
				name: 'utilisateursadd', 
				component: () => import('./pages/utilisateurs/add.vue'), 
				props: true
			},
	
			{ 
				path: '/utilisateurs/edit/:id', 
				name: 'utilisateursedit', 
				component: () => import('./pages/utilisateurs/edit.vue'), 
				props: true
			},
		

	
	
//Password reset routes
			{ 
				path: '/index/forgotpassword', 
				name: 'forgotpassword', 
				component: () => import('./pages/index/forgotpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword', 
				name: 'resetpassword', 
				component: () => import('./pages/index/resetpassword.vue'), 
				props: true
			},
			{ 
				path: '/index/resetpassword_completed', 
				name: 'resetpassword_completed', 
				component: () => import('./pages/index/resetpassword_completed.vue'), 
				props: true
			},
	
	
	
	{ 
		path:  '/error/forbidden', 
		name: 'forbidden', 
		component: () => import('./pages/errors/forbidden.vue'),
		props: true
	},
	{ 
		path: '/error/notfound', 
		name: 'notfound',
		component: () => import('./pages/errors/pagenotfound.vue'),
		props: true
	},
	{
		path: '/:catchAll(.*)', 
		component: () => import('./pages/errors/pagenotfound.vue')
	}
];

export default () => {
	
const auth = useAuth();

	
	const user = auth.user;
	if(user){
		routes.push({ path: '/', alias: '/home', name: 'home', component: () => import(`./pages/home/home.vue`) });
	}
	else{
		routes.push({ path: '/', alias: '/index', name: 'index', component: () => import('./pages/index/index.vue') });
	}

	const router = createRouter({
		history: createWebHashHistory(),
		routes,
		scrollBehavior(to, from, savedPostion){
			if(savedPostion) return savedPostion;
			return { top:0 }
		}
	});
	
	router.beforeEach((to, from, next) => {
		const user = auth.user;
		let path = to.path;
		let authRequired = auth.pageRequiredAuth(path);
		
		//authenticate user
		if (authRequired && !user) {
			//user is not logged. redirect to login
			return next({ path: '/',  query: { nexturl: to.fullPath } });
		}

		if(user && to.name == "index"){
			//already logged in, show home when try to access index page
			return next({ path: "/home"});
		}

		//navigate to redirect url if available
		if(to.name == "home" && to.query.nexturl){
			return next({ path: to.query.nexturl});
		}

		//close dialog from previous page
		//store.dispatch('app/closeDialogs');

		//continue to specified route
		next();
	});

	return router;
}
