import login from '@/views/login/index.vue'
import layout from '@/layout/index.vue'
import { useMultiTabsStore } from '@/stores/multiTabs'

export const staticRoutes = [
  {
    path: '/',
    name: 'home',
    component: layout,
    redirect: '/workplace'
  },
  {
    path: '/workplace',
    component: layout,
    meta: {
      title: 'Workbenches',
      icon: 'ant-design:field-time-outlined'
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
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: login
  }
]
export const dynamicRoutes = [
  {
    path: '/list',
    name: 'list',
    component: layout,
    meta: {
      title: 'List page',
      icon: 'ant-design:table-outlined'
    },
    redirect: '/list/table-list',
    children: [
      {
        path: '/list/table-list',
        name: 'table-list',
        component: () => import('@/views/list/table-list/index.vue'),
        meta: {
          title: 'Enquiry Form'
        }
      },
      {
        path: '/list/basic-list',
        name: 'basic-list',
        component: () => import('@/views/list/basic-list/index.vue'),
        meta: {
          title: 'Standard forms'
        }
      }
    ]
  },
  {
    path: '/nested',
    name: 'nested',
    component: layout,
    meta: {
      title: 'Nested routes',
      icon: 'ant-design:folder-open-outlined'
    },
    redirect: '/nested/menu1/menu1-2/menu1-2-1',
    children: [
      {
        path: '/menu1',
        name: 'menu1',
        meta: {
          title: 'menu1'
        },
        children: [
          {
            path: '/nested/menu1/menu1-1',
            name: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            meta: {
              title: 'menu1-1'
            }
          },
          {
            path: '/nested/menu1/menu1-2',
            name: 'menu1-2',
            meta: {
              title: 'menu1-2'
            },
            children: [
              {
                path: '/nested/menu1/menu1-2/menu1-2-1',
                name: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                meta: {
                  title: 'menu1-2-1'
                }
              }
            ]
          }
        ]
      },
      {
        path: '/nested/menu2',
        name: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        meta: {
          title: 'menu2'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...dynamicRoutes]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.name !== 'login') {
    const multiTabsStore = useMultiTabsStore()
    multiTabsStore.setMultiTabsStore(to)
  }
  if (!localStorage.getItem('token') && to.name !== 'login') {
    next({ name: 'login' })
  } else {

    next()
  }
})

export default router
