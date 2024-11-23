import axios from "@/shared/axios";

// type IResultObj = {
//   picture: object,
//   email: string,
//   name: object
// }
interface IRandomUser {
  info: object
  results: {
    picture: object,
    email: string,
    name: object
  }[]
}
export function getRandomUser(): Promise<IRandomUser> {
  return axios({ url: 'https://randomuser.me/api/' })
}