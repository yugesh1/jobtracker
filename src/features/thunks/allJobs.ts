import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IAllJobType, type IStats } from '../../constants/interface'
import { type RootState } from '../../store'
import customFetch from '../../utils/axios'

export const getAllJobs = createAsyncThunk<
IAllJobType,
undefined,
{ rejectValue: string, state: RootState }
>('allJobs/getAllJobs', async (_, { rejectWithValue, getState }) => {
  const { page, searchStatus, searchType, sort, search } = getState().allJobs
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
  if (search !== '') {
    url = url + `&search=${search}`
  }
  try {
    const resp = await customFetch.get(url)
    return resp.data
  } catch (error: any) {
    return rejectWithValue(error.response.data.msg)
  }
})

export const showStats = createAsyncThunk<
IStats,
undefined,
{ rejectValue: string }
>('allJobs/showStats', async (_, { rejectWithValue }) => {
  try {
    const resp = await customFetch.get('/jobs/stats')
    return resp.data
  } catch (error: any) {
    return rejectWithValue(error.response.data.msg)
  }
})
