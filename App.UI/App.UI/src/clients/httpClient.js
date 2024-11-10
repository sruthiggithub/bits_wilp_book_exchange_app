import { axiosPrototype } from './axiosInit';  // Assuming axiosPrototype is an initialized instance of Axios.

class HttpClient {
  constructor() {
    // Initialize axiosInstance using axiosPrototype
    this.axiosInstance = axiosPrototype();
  }

  // GET request
  async get(url, configParams) {
    return this.axiosInstance.get(url, configParams);
  }

  // POST request
  async post(url, reqObject, configParams) {
    return this.axiosInstance.post(url, reqObject, configParams);
  }

  // PUT request
  async put(url, reqObject) {
    return this.axiosInstance.put(url, reqObject);
  }

  // DELETE request
  async delete(url, params) {
    return this.axiosInstance.delete(url, params);
  }

  // PATCH request
  async patch(url, params) {
    return this.axiosInstance.patch(url, params);
  }
}

export default HttpClient;