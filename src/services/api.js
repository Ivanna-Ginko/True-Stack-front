import axios from 'axios';

axios.defaults.baseURL = 'https://truestack.onrender.com';

export const setAuthorizationHeader = token =>
  (axios.defaults.headers.common.Authorization = 'Bearer ' + token);

export const deleteAuthorizationHeader = () =>
  delete axios.defaults.headers.common.Authorization;

export const fetchArticles = async (config = {}) => {
  const response = await axios.get('/articles', config);
  return response;
};

export const fetchArticleById = async id => {
  const response = await axios.get(`/articles/${id}`);
  return response;
};

export const registerUser = async formData => {
  const response = await axios.post('/auth/register', formData);

  return response.data.data;
};

export const fetchAuthors = async (page, perPage) => {
  const response = await axios.get('/users', {
    params: {
      page: page,
      perPage: perPage,
      //sortBy: 'name'
    },
  });

  return response.data;
};

export const loginUser = async formData => {
  const response = await axios.post('/auth/login', formData);

  return response.data.data;
};

export const refreshUser = async () => {
  const response = await axios.post('/auth/refresh');

  return response.data.data;
};

export const getUserData = async () => {
  const response = await axios.get('/users/me');

  return response.data.data;
};

export const logoutUser = async () => {
  await axios.post('/auth/logout');
};

export const fetchAuthorById = async userId => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};
// export const fetchAuthorCreatedArticles = async () => {
//   const response = await axios.get(`/user/created-articles}`);
//   return response.data;
// };
export const getSavedArticles = async () => {
  const response = await axios.get("/users/saved-articles");
  return response.data;
};

export const addArticleToBookmarks = async articleId => {
  const response = await axios.post('/users/saved-articles', {
    articleId,
  });

  return response.data.data;
};

export const deleteArticleFromBookmarks = async articleId => {
  const response = await axios.delete(`/users/saved-articles/${articleId}`, {
    articleId,
  });

  return response.data.data;
};

export const createArticle = async (articleData) => {
  const response = await axios.post('/articles', articleData);
  return response.data.data;
};

export const updateArticle = async (articleId, articleData) => {
  const response = await axios.patch(`/articles/${articleId}`, articleData);
  return response.data.data;
};
