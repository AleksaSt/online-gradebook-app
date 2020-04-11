import Vue from 'vue'
import VueRouter from 'vue-router'
import Gradebooks from '../views/Gradebooks.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AllProfessors from '../views/AllProfessors.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Gradebooks',
    component: Gradebooks,
    meta: {
      guest: true
    } 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/teachers',
    name: 'AllProfessors',
    component: AllProfessors,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  const isUserLoggedIn = store.getters.isUserLoggedIn

  if (!to.meta.guest && !isUserLoggedIn) {
      return next({
          name: 'Login'
      })
  }

  if (to.name === 'Login' && isUserLoggedIn) {
      return next({
          name: 'Gradebooks'
      })
  }

  if (to.name === 'Register' && isUserLoggedIn) {
      return next({
          name: 'Gradebooks'
      })
  }

  return next()
})

export default router
