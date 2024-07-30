import { refreshToken } from './authSlice';

const tokenMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { accessToken, expiresIn } = state.auth;

  if (accessToken && expiresIn) {
    const currentTime = Date.now();
    console.log(expiresIn - currentTime);
    // 1 hour buffer
    if (expiresIn - currentTime < 3600000) {
      store.dispatch(refreshToken());
    }
  }

  return next(action);
};

export default tokenMiddleware;
