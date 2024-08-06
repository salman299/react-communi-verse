import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import customizationReducer from './customizationReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import tokenMiddleware from './tokenMiddleware';
import areaCitySlice from './areaCitySlice';
import snackbarReducer from './snackbarSlice';
import { initializeApp } from './appInitialization';
import userSlice from './userSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'isAuthenticated', 'expiresIn']
};

const authPersistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    auth: authPersistedReducer,
    snackbar: snackbarReducer,
    areaCity: areaCitySlice
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(tokenMiddleware)
});

const persistor = persistStore(store);
store.dispatch(initializeApp());

export { store, persistor };
