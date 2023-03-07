import { configureStore } from "@reduxjs/toolkit";
import allJobsSlice from "./features/reducers/allJobsSlice";
import jobSlice from "./features/reducers/jobSlice";
import userSlice from "./features/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type appDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<appDispatch>();
