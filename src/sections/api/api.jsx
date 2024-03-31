export const BASE_URL = 'https://jsonplaceholder.typicode.com';
export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed in fetching data');
  }
  const data = await response.data;
  return data;
};
