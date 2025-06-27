import "@/styles/nprogress.css"
import NProgress from "nprogress"
import { useActiveStore } from "@/stores/topmenu"
import isArray from '@/shared/isArray'
import layout from '@/layout/index.vue'
import { useTagStore } from '@/stores/multiTag'
import getMenuList from "~/mock/menuData"
import { userInfoStore } from "@/stores/userInfo"

const LoginRoute = { path: '/login', name: 'login', meta: { title: 'Login' }, component: () => import('@/views/login/index.vue') }
const NotFoundRoute = { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notFound/index.vue') }
export const StaticRoutes = [
  {
    path: '/',
    component: layout,
    meta: {
      title: 'Workbenches',
      icon: 'compass'
    },
    redirect: '/workplace',
    children: [
      {
        path: '/workplace',
        name: 'workplace',
        meta: {
          title: 'Workbenches',
          icon: 'compass'
        },
        component: () => import('@/views/workplace/index.vue')
      }
    ]
  },
]

const StaticMenu = [
  {
    path: '/workplace',
    name: 'workplace',
    meta: {
      title: 'Workbenches',
      icon: 'compass'
    },
    component: 'workplace'
  }
]

const viewsModules = import.meta.glob('@/views/**/index.vue')

export async function convertMenuData() {
  const res = await getMenuList()
  const topStore = useActiveStore()
  topStore.setAllRoutes(StaticMenu.concat(res.menuList))

  const transformRoute = (route, f) => {
    let component
    if (!f && route.component === 'layout') {
      component = layout
    } else if (f && component === 'layout') {
      component = null
    } else if (route.meta.url) {
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
  res.menuList.forEach(route => {
    const compRoute = transformRoute(route)
    routeMenu.push(compRoute)
  })

  return routeMenu
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...StaticRoutes, LoginRoute, NotFoundRoute]
})

const addDynamicRoute = async (menuData) => {
  menuData.forEach(route => {
    router.addRoute(route)
  })
}

let hasLoad = true

router.beforeEach(async (to, from) => {
  NProgress.start()
  const token = userInfoStore().user.accessToken
  if (!token && to.name !== 'login') {
    NProgress.done()
    hasLoad = true
    return '/login'
  }
  if (token && to.name === 'login') {
    NProgress.done()
    return '/'
  }
  if (token && to.name !== 'login') {
    if (to.meta.url) {
      return
    }
    if (to.name !== 'NotFound') {
      const tagStore = useTagStore()
      tagStore.setTagList({ path: to.path, meta: to.meta })
    }
    if (hasLoad) {
      const afterMenuData = await convertMenuData()
      await addDynamicRoute(afterMenuData)
      hasLoad = false
      NProgress.done()
      return to.fullPath
    }
  } else {
    hasLoad = true
  }
  NProgress.done()
})

export default router
