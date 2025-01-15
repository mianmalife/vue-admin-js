import "nprogress/nprogress.css"
import NProgress from "nprogress"
import userData from "~/mock/getUserData.js"
import { useActiveStore } from "@/stores/topmenu"
import isArray from '@/shared/isArray'
import layout from '@/layout/index.vue'
import { useMultiTabsStore } from '@/stores/multiTabs'

const RootRoute = { path: '/', name: 'home', component: layout, redirect: '/workplace' }
const LoginRoute = { path: '/login', name: 'login', meta: { title: 'Login' }, component: () => import('@/views/login/index.vue') }
const NotFoundRoute = { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notFound/index.vue') }
export const StaticRoutes = [
  {
    path: '/workplace',
    component: layout,
    meta: {
      title: 'Workbenches',
      icon: 'ep:compass'
    },
    children: [
      {
        path: '',
        name: 'workplace',
        meta: {
          title: 'Workbenches'
        },
        component: () => import('@/views/workplace/index.vue')
      }
    ]
  },
]

const StaticMenu = [
  {
    path: '/workplace',
    component: 'layout',
    meta: {
      title: 'Workbenches',
      icon: 'ep:compass'
    },
    children: [
      {
        path: '',
        name: 'workplace',
        meta: {
          title: 'Workbenches'
        },
        component: 'workplace'
      }
    ]
  },
]

const viewsModules = import.meta.glob('@/views/**/index.vue')

export async function convertMenuData() {
  const usrData = await userData()
  const topStore = useActiveStore()
  topStore.setAllRoutes(StaticMenu.concat(usrData.menuList))

  const transformRoute = (route, f) => {
    let component
    if (!f && route.component === 'layout') {
      component = layout
    } else if (f && component === 'layout') {
      component = null
    } else {
      component = viewsModules[`/src/views/${route.component}/index.vue`]
    }
    return {
      ...route,
      component: component,
      children: isArray(route.children) && route.children.length > 0 ? route.children.map(r => transformRoute(r, 'A')) : []
    }
  }

  const routeMenu = []
  usrData.menuList.forEach(route => {
    const compRoute = transformRoute(route)
    routeMenu.push(compRoute)
  })

  return routeMenu
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...StaticRoutes, RootRoute, LoginRoute, NotFoundRoute]
})

const addDynamicRoute = async (menuData) => {
  menuData.forEach(route => {
    router.addRoute(route)
  })
}

let hasLoad = true

router.beforeEach(async (to, from) => {
  NProgress.start()
  const token = localStorage.getItem('token')
  if (!token && to.name !== 'login') {
    NProgress.done()
    return '/login'
  }
  if (token && to.name === 'login') {
    NProgress.done()
    return '/'
  }
  if (token && to.name !== 'login') {
    if (to.name !== 'NotFound') {
      const multiTabsStore = useMultiTabsStore()
      multiTabsStore.setMultiTabsStore(to)
    }
    if (hasLoad) {
      const afterMenuData = await convertMenuData()
      await addDynamicRoute(afterMenuData)
      hasLoad = false
      NProgress.done()
      return to.fullPath
    }
  }
  NProgress.done()
})

export default router
