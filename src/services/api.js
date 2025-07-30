import axios from 'axios';

axios.defaults.baseURL = 'https://truestack.onrender.com';

export const setAuthorizationHeader = token =>
  (axios.defaults.headers.common.Authorization = token);

export const deleteAuthorizationHeader = () =>
  delete axios.defaults.headers.common.Authorization;

export const fetchArticles = async (config = {}) => {
  const response = await axios.get('/articles', config);
  return response
}



export const registerUser = async formData => {
  const response = await axios.post('/auth/register', formData);

  return response.data.data
}

export const fetchAuthors = async () => {
  const response = await axios.get('/user');
  return response.data;
};

//Add function to get TopCreators - not sure
export const fetchPopularAuthors = async () => {
  const response = await axios.get('/authors', {
    params: { sortBy: 'articlesAmount' }
  });
  return response.data;
}

export const loginUser = async formData => {
  const response = await axios.post('/auth/login', formData);

  return response.data.data;
};

export const refreshUser = async () => {
  const response = await axios.post('/auth/refresh');

  return response.data.data;
};

export const logoutUser = async() => {
  await axios.post('/auth/logout');
};

export const fetchUserData = async () => {
  axios.get('/user/')
}

export const addArticleToBookmarks = async articleId => {
  const response = await axios.post('/saved-articles/add-article', { articleId })

  return response.data.data
}

export const deleteArticleFromBookmarks = async articleId => {
  const response = await axios.delete(`/saved-articles/${articleId}`)

  return response.data.data
}

