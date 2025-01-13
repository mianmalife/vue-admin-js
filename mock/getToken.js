import { faker } from "@faker-js/faker";

export default function getToken() {
  const isDev = import.meta.env.MODE === 'development'
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(isDev ? faker.string.uuid() : Math.random() * 10)
    }, 800)
  })
}