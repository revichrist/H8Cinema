import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import BookmarkPage from '../views/BookmarkPage.vue'
import DetailsPage from '../views/DetailsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: BookmarkPage
    },
    {
      path: '/details/:id',
      name: 'details',
      component: DetailsPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem('access_token')
  
  if (to.name === 'bookmark' && !access_token) {
    next({ name: 'login' })
  }else if(to.name === 'login' && access_token){
    next({name: 'home'})
  }else{
    next()
  }
})

export default router
