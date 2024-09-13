
import login from '@/views/login/index.vue'

const staticRouter = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    },
  },
  {
  path: '/login',
  name: 'login',
  meta: {
    title: "登录",
  },
  components: {
    login
  }
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...staticRouter
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (!localStorage.getItem('token') && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
