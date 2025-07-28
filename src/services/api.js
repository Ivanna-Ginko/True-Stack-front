import axios from 'axios'

axios.defaults.baseURL = 'https://truestack.onrender.com'

export const setAuthorizationHeader = token =>
  (axios.defaults.headers.common.Authorization = token);

export const deleteAuthorizationHeader = () =>
  delete axios.defaults.headers.common.Authorization;

export const fetchArticles = async () => {
    const response = await axios.get('/articles');
      return response
    }

const config = {
     params: {
        'sortBy': 'rate',
     }
    }
export const fetchPopularArticles = async () => {
    const response = await axios.get('/articles', config);
      return response
    }






 