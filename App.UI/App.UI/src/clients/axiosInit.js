import axios from 'axios'

export const axiosPrototype = () => {  
  const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: { 'Content-Type': 'application/json' },    
  })

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Adjust this to where you store your token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    },
  )

  return instance
}
