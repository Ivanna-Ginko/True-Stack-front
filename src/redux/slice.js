import { createSlice } from '@reduxjs/toolkit';
import {
  addArticleToBookmarks,
  refreshUser,
  loginUser,
  registerUser,
  removeArticleFromBookmarks,
  logoutUser,
} from './operations';

const initialState = {
  user: {
    id: '',
    name: '',
    avatar: '',
  },
  savedArticles: [],
  accessToken: '',
  isLoading: false,
  isFetchingUser: true,
  error: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: () => ({ ...initialState, isFetchingUser: false }),
    clearError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        error: null,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        error: action.payload || action.error,
      }))

      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        error: null,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        error: action.payload || action.error,
      }))

      .addCase(logoutUser.fulfilled, () => ({
        ...initialState,
        isFetchingUser: false,
        error: null,
      }))
      .addCase(logoutUser.rejected, () => ({
        ...initialState,
        isFetchingUser: false,
        error: null,
      }))

      .addCase(refreshUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        isFetchingUser: false,
        error: null,
      }))

      .addCase(addArticleToBookmarks.fulfilled, (state, action) => ({
        ...state,
        savedArticles: action.payload,
        error: null,
      }))

      .addCase(removeArticleFromBookmarks.fulfilled, (state, action) => ({
        ...state,
        savedArticles: action.payload,
        error: null,
      }))

      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => ({
          ...state,
          isLoading: true,
          error: null,
        })
      )
      .addMatcher(
        action =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        state => ({
          ...state,
          isLoading: false,
        })
      );
  },
});

export const authActions = slice.actions;

export default slice.reducer;
