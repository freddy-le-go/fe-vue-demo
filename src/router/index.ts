import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Cookies from 'js-cookie'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home - Vue.js Application',
      description:
        'Welcome to our Vue.js application. Explore our modern web application built with Vue 3, TypeScript, and Tailwind CSS.',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login - Vue.js Application',
      description:
        'Sign in to your account. Secure login with modern authentication.',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Register - Vue.js Application',
      description:
        'Create your account. Join our community with secure registration.',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true,
      title: 'Profile - Vue.js Application',
      description:
        'Manage your profile and account settings. Update your personal information.',
    },
    children: [
      {
        path: '',
        redirect: '/profile/basic',
      },
      {
        path: 'basic',
        name: 'ProfileBasic',
        component: () => import('../views/profile/BasicDetails/template.vue'),
        meta: {
          requiresAuth: true,
          title: 'Basic Details - Profile',
          description: 'Manage your basic profile information.',
        },
      },
      {
        path: 'additional',
        name: 'ProfileAdditional',
        component: () => import('../views/profile/AdditionalDetails.vue'),
        meta: {
          requiresAuth: true,
          title: 'Additional Details - Profile',
          description: 'Manage your additional profile information.',
        },
      },
      {
        path: 'spouse',
        name: 'ProfileSpouse',
        component: () => import('../views/profile/SpouseDetails.vue'),
        meta: {
          requiresAuth: true,
          title: 'Spouse Details - Profile',
          description: 'Manage your spouse information.',
        },
      },
      {
        path: 'preferences',
        name: 'ProfilePreferences',
        component: () => import('../views/profile/PersonalPreferences.vue'),
        meta: {
          requiresAuth: true,
          title: 'Personal Preferences - Profile',
          description: 'Manage your personal preferences.',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authToken = Cookies.get('auth_token')

  if (to.meta.requiresAuth && !authToken) {
    next('/login')
  } else {
    next()
  }
})

export default router
