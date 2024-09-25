import login from '@/views/login/index.vue'
import layout from '@/layout/index.vue'

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
      title: '工作台',
      icon: 'ant-design:field-time-outlined'
    },
    children: [
      { path: '', name: 'workplace', component: () => import('@/views/workplace/index.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
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
      title: '列表页',
      icon: 'ant-design:table-outlined'
    },
    redirect: '/list/table-list',
    children: [
      {
        path: '/list/table-list',
        name: 'table-list',
        component: () => import('@/views/list/table-list/index.vue'),
        meta: {
          title: '查询表格'
        }
      },
      {
        path: '/list/basic-list',
        name: 'basic-list',
        component: () => import('@/views/list/basic-list/index.vue'),
        meta: {
          title: '标准表格'
        }
      }
    ]
  },
  {
    path: '/nested',
    name: 'nested',
    component: layout,
    meta: {
      title: '路由嵌套',
      icon: 'ant-design:folder-open-outlined'
    },
    redirect: '/menu1/menu1-2/menu1-2-1',
    children: [
      {
        path: '/menu1',
        name: 'menu1',
        meta: {
          title: 'menu1'
        },
        children: [
          {
            path: '/menu1/menu1-1',
            name: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            meta: {
              title: 'menu1-1'
            }
          },
          {
            path: '/menu1/menu1-2',
            name: 'menu1-2',
            meta: {
              title: 'menu1-2'
            },
            children: [
              {
                path: '/menu1/menu1-2/menu1-2-1',
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
        path: '/menu2',
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
  if (!localStorage.getItem('token') && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
