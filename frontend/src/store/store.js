import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { apiSlices } from "../slices/apiSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlices.reducerPath] : apiSlices.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlices.middleware),
  devTools: true,
});

export default store;
