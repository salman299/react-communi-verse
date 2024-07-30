import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import customizationReducer from './customizationReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import tokenMiddleware from './tokenMiddleware';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'isAuthenticated', 'expiresIn']
};

const authPersistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    auth: authPersistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(tokenMiddleware)
});

const persistor = persistStore(store);

export { store, persistor };
