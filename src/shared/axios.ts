import axios from "axios"

const instance = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
})

instance.interceptors.request.use(function(config) {
  return config
}, function(error){
  Promise.reject(error)
})

instance.interceptors.response.use(function(response) {
  return response.data
}, function(error){
  Promise.reject(error)
})

export default instance