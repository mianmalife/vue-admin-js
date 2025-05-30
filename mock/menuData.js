export default {
  menuList: [
    {
      path: '/list',
      name: 'list',
      component: 'layout',
      meta: {
        title: 'Listpage',
        icon: 'table'
      },
      redirect: '/list/table-list',
      children: [
        {
          path: '/list/table-list',
          name: 'table-list',
          component: 'list/table-list',
          meta: {
            title: 'EnquiryForm'
          }
        },
        {
          path: '/list/basic-list',
          name: 'basic-list',
          component: 'list/basic-list',
          meta: {
            title: 'Standardforms'
          }
        }
      ]
    },
    {
      path: '/nested',
      name: 'nested',
      component: 'layout',
      meta: {
        title: 'Nestedroutes',
        icon: 'foler-open'
      },
      redirect: '/nested/menu1/menu1-2/menu1-2-1',
      children: [
        {
          path: '/menu1',
          name: 'menu1',
          meta: {
            title: 'menu1'
          },
          component: 'layout',
          children: [
            {
              path: '/nested/menu1/menu1-1',
              name: 'menu1-1',
              component: 'nested/menu1/menu1-1',
              meta: {
                title: 'menu1-1'
              }
            },
            {
              path: '/nested/menu1/menu1-2',
              name: 'menu1-2',
              component: 'layout',
              meta: {
                title: 'menu1-2'
              },
              children: [
                {
                  path: '/nested/menu1/menu1-2/menu1-2-1',
                  name: 'menu1-2-1',
                  component: 'nested/menu1/menu1-2/menu1-2-1',
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
          component: 'nested/menu2',
          meta: {
            title: 'menu2'
          }
        }
      ]
    }
  ]
}