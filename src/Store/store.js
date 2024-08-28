import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer'; // Ensure correct path

const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store ;