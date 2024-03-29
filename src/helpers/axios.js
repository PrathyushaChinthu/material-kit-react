import axios from 'axios';

const config = {
  baseUrl: 'https://jsonplaceholder.typicode.com/',
};
const axiosInstance = axios.create(config);
export default axiosInstance;
