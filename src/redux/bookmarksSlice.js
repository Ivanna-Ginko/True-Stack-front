// import { createSlice } from '@reduxjs/toolkit';

// const bookmarksSlice = createSlice({
//   name: 'bookmarks',
//   initialState: {
//     savedArticles: [],
//   },
//   reducers: {
//     addBookmark: (state, action) => {
//       const id = String(action.payload);
//       if (!state.savedArticles.includes(id)) {
//         state.savedArticles.push(id);
//         console.log('bookmarksSlice - addBookmark - Updated savedArticles:', state.savedArticles);
//       }
//     },
//     removeBookmark: (state, action) => {
//       const id = String(action.payload);
//       console.log('bookmarksSlice - removeBookmark - Before:', state.savedArticles);
//       state.savedArticles = state.savedArticles.filter(savedId => savedId !== id);
//       console.log('bookmarksSlice - removeBookmark - After:', state.savedArticles);
//     },
//     setSavedArticles: (state, action) => {
//       console.log('bookmarksSlice - setSavedArticles - Incoming payload:', action.payload);
//       state.savedArticles = action.payload.map(id => String(id));
//       console.log('bookmarksSlice - setSavedArticles - Updated savedArticles:', state.savedArticles);
//     },
//   },
// });

// export const { addBookmark, removeBookmark, setSavedArticles } = bookmarksSlice.actions;
// export default bookmarksSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    savedArticles: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      const id = String(action.payload);
      if (!state.savedArticles.includes(id)) {
        state.savedArticles.push(id);
      }
    },
    removeBookmark: (state, action) => {
      const id = String(action.payload);
      state.savedArticles = state.savedArticles.filter(savedId => savedId !== id);
    },
    setSavedArticles: (state, action) => {
      state.savedArticles = action.payload.map(id => String(id));
    },
  },
});

export const { addBookmark, removeBookmark, setSavedArticles } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;