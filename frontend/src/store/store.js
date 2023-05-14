import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { adminApi } from "../features/Api/adminApi";
import { searchApi } from "../features/Api/searchApi";
import { doctorApi } from "../features/Api/doctorApi";
import { appointmentApi } from "../features/Api/appointmentApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminApi.middleware,
      searchApi.middleware,
      doctorApi.middleware,
      appointmentApi.middleware
    ),
});
