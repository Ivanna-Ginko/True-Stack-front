import { createSlice } from '@reduxjs/toolkit';
import {
  addArticleToBookmarks,
  authenticateUser,
  loginUser,
  registerUser,
  removeArticleFromBookmarks,
} from './operations';

const initialState = {
  user: {
    id: '',
    name: '',
    photo: '',
  },
  savedArticles: [],
  token: '',
  isLoading: false,
  isRefreshing: true,
  message: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        isLoading: false,
      }))
      .addCase(registerUser.rejected, (_, action) => ({
        initialState,
        message: action.payload,
        isLoading: false,
      }))

      .addCase(loginUser.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        isLoading: false,
      }))
      .addCase(loginUser.rejected, (_, action) => ({
        initialState,
        message: action.payload,
        isLoading: false,
      }))

      .addCase(authenticateUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        isLoading: false,
        isRefreshing: false,
      }))
      .addCase(authenticateUser.rejected, (_, action) => ({
        initialState,
        message: action.payload,
        isLoading: false,
        isRefreshing: false,
      }))

      .addCase(addArticleToBookmarks.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(addArticleToBookmarks.fulfilled, (state, action) => ({
        ...state,
        savedArticles: action.payload,
        isLoading: false,
      }))
      .addCase(addArticleToBookmarks.rejected, (state, action) => ({
        ...state,
        message: action.payload,
        isLoading: false,
      }))

      .addCase(removeArticleFromBookmarks.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(removeArticleFromBookmarks.fulfilled, (state, action) => ({
        ...state,
        savedArticles: action.payload,
        isLoading: false,
      }))
      .addCase(removeArticleFromBookmarks.rejected, (state, action) => ({
        ...state,
        message: action.payload,
        isLoading: false,
      }));
  },
});

export default slice.reducer
