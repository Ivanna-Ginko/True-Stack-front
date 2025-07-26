import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = '%%%%%%%%%%%%%';

const setAuthorizationHeader = token =>
  (axios.defaults.headers.common.Authorization = token);

const deleteAuthorizationHeader = () =>
  delete axios.defaults.headers.common.Authorization;

export const registerUser = createAsyncThunk(
  'user/register',
  async (formData, thunkAPI) => {
    const { name, email, password, photo } = formData;
    const bodyData = { name, email, password, photo };

    try {
      const response = await axios.post('register endpoint', bodyData);
      const { name, photo, token } = response.data;

      return { user: { name, photo }, token };
    } catch (err) {
      const message = err.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (formData, thunkAPI) => {
    const { email, password } = formData;
    const bodyData = { email, password };

    try {
      const response = await axios.post('login endpoint', bodyData);
      const { name, photo, token } = response.data;

      return { user: { name, photo }, token };
    } catch (err) {
      const message = err.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) return thunkAPI.rejectWithValue('');

    setAuthorizationHeader(token);

    try {
      const response = await axios.get('authenticate endpoint');
      const { name, photo, token } = response.data;

      return { user: { name, photo }, token };
    } catch (err) {
      const message = err.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await axios.get('logout endpoint');

      deleteAuthorizationHeader();
    } catch (err) {
      const message = err.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addArticleToBookmarks = createAsyncThunk(
  'user/addArticleToBookmarks',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post('save article endpoint', { id });
      const savedArticles = response.data;

      return savedArticles;
    } catch (err) {
      const message = err.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeArticleFromBookmarks = createAsyncThunk(
  'user/removeArticleFromBookmarks',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post('remove article from endpoint', { id });
      const savedArticles = response.data;

      return savedArticles;
    } catch (err) {
      const message = err.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);
