import axios from 'axios'

export const getCategories = async () => {
  const req = await axios.get('/api/v1/category');

  return req.data;
}
