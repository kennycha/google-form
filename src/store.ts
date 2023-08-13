import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/app";
import formReducer from "./features/form";

export const store = configureStore({
  reducer: {
    app: appReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
