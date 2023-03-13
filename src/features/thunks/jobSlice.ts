import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IJob } from '../../constants/interface'
import { type RootState } from '../../store'
import customFetch from '../../utils/axios'
import { clearValues } from '../reducers/jobSlice'
import { logoutUser } from '../reducers/userSlice'
import { hideLoading, showLoading } from '../reducers/allJobsSlice'
import { getAllJobs } from './allJobs'

type JobDef = Omit<IJob, '_id'>

export const createJob = createAsyncThunk<
undefined,
JobDef,
{ rejectValue: string }
>('job/createJob', async (job, { dispatch, rejectWithValue }) => {
  try {
    const resp = await customFetch.post('/jobs', job)
    dispatch(clearValues())
    return resp.data
  } catch (error: any) {
    if (error.response.status === 401) {
      dispatch(logoutUser())
      return rejectWithValue('Unauthorized! Logging out...')
    }
    return rejectWithValue(error.response.data.msg)
  }
})

export const editJob = createAsyncThunk<
undefined,
{ jobId: string, job: JobDef },
{ rejectValue: string, state: RootState }
>('job/editJob', async ({ jobId, job }, { rejectWithValue, dispatch }) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job)
    dispatch(clearValues())
    return resp.data
  } catch (error: any) {
    if (error.response.status === 401) {
      dispatch(logoutUser())
      return rejectWithValue('Unauthorized! Logging out...')
    }
    return rejectWithValue(error.response.data.msg)
  }
})

export const deleteJob = createAsyncThunk<
string,
string,
{ rejectValue: string, state: RootState }
>('job/deleteJob', async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`)
    await thunkApi.dispatch(getAllJobs())
    return resp.data.msg
  } catch (error: any) {
    thunkApi.dispatch(hideLoading())
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
})
