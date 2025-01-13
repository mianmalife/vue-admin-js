import { faker } from "@faker-js/faker";

faker.seed(123)

export default function getUserList() {
  return import.meta.env.MODE === 'development' ? Array.from({ length: 10 }, () => ({
    date: new Date(faker.date.anytime()).toLocaleDateString(),
    name: faker.person.fullName(),
    address: `${faker.location.city()}, ${faker.location.country()}, ${faker.location.streetAddress()}`
  })) : []
}