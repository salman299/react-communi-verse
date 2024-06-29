import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import reducer from './reducer';
// import { persistStore, persistReducer } from 'redux-persist';
import customizationReducer from './customizationReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'isAuthenticated']
};

const authPersistedReducer = persistReducer(persistConfig, authReducer);

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    auth: authPersistedReducer
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
const persistor = persistStore(store);

export { store, persistor };
