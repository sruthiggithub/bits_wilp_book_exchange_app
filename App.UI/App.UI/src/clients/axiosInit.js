import axios from 'axios'

export const axiosPrototype = () => {  
  const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: { 'Content-Type': 'application/json', 'Authorization': window.localStorage.getItem('token') },    
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    },
  )

  return instance
}
