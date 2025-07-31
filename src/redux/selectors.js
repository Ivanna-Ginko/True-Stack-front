export const selectIsLoggedIn = state => !!state.user.accessToken;
export const selectIsLoading = state => state.user.isLoading;
export const selectIsFetchingUser = state => state.user.isFetchingUser;
export const selectSavedArticles = state => state.user.savedArticles;
export const selectUser = state => state.user.user;
