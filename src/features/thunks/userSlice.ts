import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../constants/interface";
import { RootState } from "../../store";
import customFetch from "../../utils/axios";
import { logoutUser } from "../reducers/userSlice";
import { clearAllJobsState } from "../reducers/allJobsSlice";
import { clearValues } from "../reducers/jobSlice";

type loggedInUser = Pick<IUser, "email" | "password">;

type updatedUser = Omit<IUser, "password">;

export const registerUser = createAsyncThunk<
  { user: IUser },
  IUser,
  { rejectValue: string; state: RootState }
>("user/registerUser", async (user, thunkApi) => {
  try {
    const resp = await customFetch.post("/auth/register", user);
    return resp.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
});

export const loginUser = createAsyncThunk<
  { user: IUser },
  loggedInUser,
  { rejectValue: string }
>("user/loginUser", async (user, { rejectWithValue }) => {
  try {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.msg);
  }
});

export const updateUser = createAsyncThunk<
  { user: IUser },
  updatedUser,
  { rejectValue: string }
>("user/updateUser", async (user, { rejectWithValue, dispatch }) => {
  try {
    const resp = await customFetch.patch("/auth/updateUser", user);
    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    if (error.response.status === 401) {
      dispatch(logoutUser());
      return rejectWithValue("Unauthorized! Logging Out...");
    }
    return rejectWithValue(error.response.data.msg);
  }
});

export const clearStore = createAsyncThunk<void, string, { state: RootState }>(
  "user/clearStore",
  async (message, { dispatch }) => {
    try {
      dispatch(logoutUser(message));
      dispatch(clearAllJobsState());
      dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);
