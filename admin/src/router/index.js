import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Storage} from "@/utils/expire.js"

const routes = [
  {
    path: '/',
    redirect: {
      path: '/index'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/index',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/users',
        component: () => import('@/views/Users.vue')
      },
      {
        path: '/data',
        component: () => import('@/views/Data.vue')
      },
      {
        path: '/message',
        component: () => import('@/views/Message.vue')
      },
      {
        path: '/health',
        component: () => import('@/views/Health.vue')
      },
      {
        path: '/dataView',
        component: () => import('@/views/DataView.vue')
      }
    ]
  },
  {
    path: '/download',
    component: () => import('@/views/Download.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const ls = new Storage();
  if (localStorage.token) next()
  else {
    if (to.path == '/login') next()
    else {
      ElMessage({
				message: "您还未登录，请先登录。",
				type: 'info',
        center: 'true',
				offset: 50
			})
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
})

export default router;