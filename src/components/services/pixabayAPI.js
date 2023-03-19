import axios from 'axios';

export const getImages = async (query, page) => {
  const API_KEY = '32361210-742caff85eeb39601dd1b539c';
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const SEARCH_SETTING = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return await axios.get(`/${SEARCH_SETTING}`);
};
