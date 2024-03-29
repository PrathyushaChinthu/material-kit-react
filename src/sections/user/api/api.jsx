import axios from 'axios';

const config = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
};
const fetchUsers = axios.create(config);
export default fetchUsers;
