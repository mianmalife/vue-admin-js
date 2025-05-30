import { http, HttpResponse } from 'msw'
import { faker } from "@faker-js/faker";
import menulist from './menuData.js'

faker.seed(123)

const userTable = import.meta.env.MODE === 'development' ? Array.from({ length: 10 }, () => ({
  date: new Date(faker.date.anytime()).toLocaleDateString(),
  name: faker.person.fullName(),
  address: `${faker.location.city()}, ${faker.location.country()}, ${faker.location.streetAddress()}`
})) : []

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json()
    if (username === 'admin' && btoa(password) === 'YWRtaW4=') {
      return HttpResponse.json({
        code: 200,
        data: {
          access_token: btoa(`${username}-${Date.now()}-${Math.random()}`),
          loginTime: Date.now()
        },
        msg: '登录成功'
      })
    } else {
      return HttpResponse.json({
        code: 400,
        data: {},
        msg: '登录失败，用户名或密码错误'
      })
    }
  }),
  http.get('/api/system/user/getInfo', () => {
    return HttpResponse.json({
      code: 200,
      data: {
        permissions: [],
        role: ['admin'],
        user: {
          userName: 'admin',
          loginTime: Date.now()
        }
      },
      msg: '操作成功'
    })
  }),
  http.post('/api/auth/logOut', () => {
    return HttpResponse.json({
      code: 200,
      msg: '操作成功'
    })
  }),
  http.get('/api/auth/menus', () => {
    return HttpResponse.json({ code: 200, data: menulist, msg: '操作成功' })
  }),
  http.get('/api/user/table', () => {
    return HttpResponse.json({ code: 200, data: userTable, msg: '操作成功' })
  })
]