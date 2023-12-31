import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Settings from '../views/Settings.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/signup',
			name: 'Signup',
			component: () => import('../views/Signup.vue'),
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			children: [
				{
					path: '', // default child route of dashboard
					name: 'Posts',
					component: () => import('../views/Post.vue'),
				},
				{
					path: '/dashboard/subscriptions',
					name: 'Subscriptions',
					component: () => import('../views/Subscriptions.vue'),
				},
				{
					path: '/dashboard/messages',
					name: 'Messages',
					component: () => import('../views/Messages.vue'),
				},
				{
					path: '/dashboard/accounting',
					name: 'Accounting',
					component: () => import('../views/Accounting.vue'),
				},
				{
					path: '/dashboard/post',
					name: 'PostDetails',
					component: () => import('../views/PostDetails.vue'),
				},
				{
					path: '/dashboard/settings',
					name: 'Settings',
					component: Settings,
				},
			],
		},
		// TODO: Delete this page later
		{
			path: '/testing',
			component: () => import('../views/Testing.vue'),
		},
	],
});

export default router;
