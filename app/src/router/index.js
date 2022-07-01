import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: {
      path: '/work'
    }
  },
  {
    path: '/school',
    component: () => import('@/views/School.vue')
  },
  {
    path: '/moments',
    component: () => import('@/views/Moments.vue')
  },
  {
    path: '/moment',
    component: () => import('@/views/Moment.vue')
  },
  {
    path: '/momentedit',
    component: () => import('@/views/MomentEdit.vue')
  },
  {
    path: '/ncov',
    component: () => import('@/views/Ncov.vue')
  },
  {
    path: '/agency',
    component: () => import('@/views/Agency.vue')
  },
  {
    path: '/risk',
    component: () => import('@/views/Risk.vue')
  },
  {
    path: '/work',
    component: () => import('@/views/Work.vue')
  },
  {
    path: '/course',
    component: () => import('@/views/Course.vue')
  },
  {
    path: '/message',
    component: () => import('@/views/Message.vue')
  },
  {
    path: '/users',
    component: () => import('@/views/Users.vue')
  },
  {
    path: '/chatroom',
    component: () => import('@/views/ChatRoom.vue')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat.vue')
  },
  {
    path: '/profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/profile_edit',
    component: () => import('@/views/Profile_Edit.vue')
  },
  {
    path: '/signin',
    component: () => import('@/views/MapContainer.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/searchres',
    component: () => import('@/views/SearchRes.vue')
  },
  {
    path: '/calendar',
    component: () => import('@/views/Calendar.vue')
  },
  {
    path: '/activity',
    component: () => import('@/views/Activity.vue')
  },
  {
    path: '/healthreport',
    component: () => import('@/views/HealthReport.vue')
  },
  {
    path: '/leaveapply',
    component: () => import('@/views/LeaveApply.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (localStorage.account) next()
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

export default router