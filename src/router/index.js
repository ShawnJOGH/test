import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js";

import indexController from '../components/indexController.vue'
// import user from '../components/centerController.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',

    component: indexController,
    children: [
      {
        path: 'Jingxuan',
        component: () => import('../views/Jingxuan.vue'),
        props($route) {
          return {
            productlist: $route.query.productlist,
          }
        }
      },
      {
        path: 'both',
        component: () => import('../views/Both.vue'),
        props($route) {
          return {
            productlist: JSON.parse($route.query.productlist),
          }
        },
      },
      {
        path: 'Remen',
        component: () => import('../views/Remen.vue'),
        props($route) {
          return {
            productlist: $route.query.productlist,
          }
        }

      },
      {
        path: 'Changxiao',
        component: () => import('../views/Changxiao.vue'),
        props($route) {
          return {
            productlist: $route.query.productlist,
          }
        }
      },
      {
        path: 'Jingdian',
        component: () => import('../views/Jingdian.vue'),
        props($route) {
          return {
            productlist: $route.query.productlist,
          }
        }
      },
    ],
    scrollBehavior() {
      // 期望滚动到哪个位置
      return {
        x: 0,
        y: 0
      }
    }
  },

  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart.vue')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../views/Select.vue'),
    props($route) {
      return {
        index: $route.query.index,
      }
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user.vue'),
    props($route) {
      return {
        username:$route.query.username,
        userlogin:$route.query.userlogin
      }
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../components/detail.vue'),
    props($route) {
      return {
        product: JSON.parse($route.query.product),
      }
    },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/account.vue'),
    props($route) {
      return {
        product: JSON.parse($route.query.product),
        isCart: $route.query.isCart
      }
    },
  },
  {
    path:'/SuccessDeal',
    name:'SuccessDeal',
    component: () => import('../views/SuccessDeal.vue'),
    props($route) {
      return {
        tabs:$route.query.tabs
      }
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    // props($route) {
    //   return {
    //     product: JSON.parse($route.query.product),
    //     isCart: $route.query.isCart
    //   }
    // },
  },
  {
    path:'/myMap',
    name:'myMap',
    component: () => import('../components/myMap.vue'),
  },
  {
    path:'/SearchDeatil',
    name:'SearchDeatil',
    component: () => import('../views/SearchDeatil.vue'),
    props($route) {
      return {
        productlist: JSON.parse($route.query.productlist),
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

