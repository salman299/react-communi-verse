import { refreshToken } from './authSlice';

const tokenMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { accessToken, expiresIn, isRefreshing } = state.auth;

  // Don't check for token refresh if we're already refreshing or if the action is refreshToken
  if (
    isRefreshing ||
    action.type === refreshToken.pending.type ||
    action.type === refreshToken.fulfilled.type ||
    action.type === refreshToken.rejected.type
  ) {
    return next(action);
  }

  if (accessToken && expiresIn) {
    const currentTime = Date.now();
    // 1 hour buffer
    if (expiresIn - currentTime < 3600000) {
      store.dispatch(refreshToken());
    }
  }

  return next(action);
};

export default tokenMiddleware;
