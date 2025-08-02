import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

/**
 * @param {formData}
 * @returns {Promise<{user: {id: string, name: string, avatar: string}, accessToken: string}>}
 * @throws {{message: string} | Array<{message: string, field: string}>}
 */
export const registerUser = createAsyncThunk(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.registerUser(formData);
      const {
        user: { _id: id, name, avatar },
        accessToken,
      } = data;

      api.setAuthorizationHeader(accessToken);

      return {
        user: { id, name, avatar },
        accessToken,
      };
    } catch (axiosError) {
      const errStatus = axiosError.response?.status;
      const apiError = axiosError.response?.data;
      if (errStatus === 409) {
        const errorMessage = apiError?.data?.message;
        return rejectWithValue({ message: errorMessage });
      }

      const errors = apiError.data;

      if (errStatus === 400 && Array.isArray(errors)) {
        const fieldErrorObjects = errors.map(err => ({
          message: err.message,
          field: err.path[0],
        }));

        return rejectWithValue([fieldErrorObjects]);
      }

      return rejectWithValue({
        message: 'Something went wrong. Try again later.',
      });
    }
  }
);

/**
 * @param {formData}
 * @returns {Promise<{user: {id: string, name: string, avatar: string}, accessToken: string}>}
 * @throws {{message: string} | Array<{message: string, field: string}>}
 */
export const loginUser = createAsyncThunk(
  'user/login',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.loginUser(formData);
      const {
        user: { _id: id, name, avatar },
        accessToken,
      } = data;

      api.setAuthorizationHeader(accessToken);

      return {
        user: { id, name, avatar },
        accessToken,
      };
    } catch (axiosError) {
      const errStatus = axiosError.response?.status;
      const apiError = axiosError.response?.data;

      if (errStatus === 404 || errStatus === 401) {
        return rejectWithValue({ message: apiError.message });
      }

      const errors = apiError.data;

      if (errStatus === 400 && Array.isArray(errors)) {
        const fieldErrorObjects = errors.map(err => ({
          message: err.message,
          field: err.path[0],
        }));

        return rejectWithValue([fieldErrorObjects]);
      }

      return rejectWithValue({
        message: 'Something went wrong. Try again later.',
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.logoutUser();
    } catch {
      return rejectWithValue('');
    }
  }
);

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { accessToken } = state.user;

    api.setAuthorizationHeader(accessToken);

    try {
      const data = await api.getUserData();
      const { _id: id, name, avatar } = data;

      return {
        user: { id, name, avatar },
      };
    } catch {
      await thunkAPI.dispatch(logoutUser());
    }
  }
);

/**
 * @param {string}
 * @returns {Promise<Array<string>>}
 * @throws {{message: string}}
 */
export const addArticleToBookmarks = createAsyncThunk(
  'user/addArticleToBookmarks',
  async (articleId, { rejectWithValue }) => {
    try {
      return await api.addArticleToBookmarks(articleId);
    } catch {
      return rejectWithValue({
        message: 'Something went wrong. Try again later.',
      });
    }
  }
);

/**
 * @param {string}
 * @returns {Promise<Array<string>>}
 * @throws {{message: string}}
 */
export const removeArticleFromBookmarks = createAsyncThunk(
  'user/removeArticleFromBookmarks',
  async (articleId, { rejectWithValue }) => {
    try {
      return await api.deleteArticleFromBookmarks(articleId);
    } catch {
      return rejectWithValue({
        message: 'Something went wrong. Try again later.',
      });
    }
  }
);
