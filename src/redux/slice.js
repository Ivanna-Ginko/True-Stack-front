import { createSlice } from '@reduxjs/toolkit';
import {
  addArticleToBookmarks,
  loginUser,
  registerUser,
  removeArticleFromBookmarks,
  logoutUser,
  getUserData,
} from './operations';

const initialState = {
  user: {
    id: '',
    name: '',
    avatarUrl: '',
  },
  savedArticles: [],
  accessToken: '',
  isLoading: false,
  isFetchingUser: true,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: () => ({ ...initialState, isFetchingUser: false }),
    clearError: state => ({
      ...state,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        error: action.payload || action.error,
      }))

      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        error: action.payload || action.error,
      }))

      .addCase(getUserData.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        isFetchingUser: false,
      }))

      .addCase(logoutUser.fulfilled, () => ({
        ...initialState,
        isFetchingUser: false,
      }))
      .addCase(logoutUser.rejected, () => ({
        ...initialState,
        isFetchingUser: false,
      }))

      .addCase(addArticleToBookmarks.fulfilled, (state, action) => ({
        ...state,
        savedArticles: action.payload,
      }))

      .addCase(removeArticleFromBookmarks.fulfilled, (state, action) => ({
        ...state,
        savedArticles: action.payload,
      }))

      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => ({
          ...state,
          isLoading: true,
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
