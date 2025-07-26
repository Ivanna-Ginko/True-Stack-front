export const selectIsLoggedIn = state => !!state.token;
export const selectIsLoading = state => state.isLoading;
export const selectIsRefreshing = state => state.isRefreshing;
export const selectSavedArticles = state => state.savedArticles;
export const selectUser = state => state.user;
