import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import graphqlUserSlice from './graphqlUser/graphqlUserSlice';
import userSlice  from './user/userSlice';


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {

    customer:userSlice,
    user:graphqlUserSlice
  },
});
