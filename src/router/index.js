import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: '/pay',
        name: 'Pay',
        component: () => import('../views/Paybill.vue')
      },
      {
        path: '/paysuccess',
        name: 'Paysuccess',
        component: () => import('../views/Paysuccess.vue')
      },
      {
        path: '/product/:id',
        component: () => import('../views/Product.vue')
      },
      {
        path: 'login',
        component: () => import('../views/Login.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue')
      },
      {
        path: 'images',
        component: () => import('../views/dashboard/Images.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
