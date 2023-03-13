import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getAllJobs, showStats } from '../thunks/allJobs'
import {
  type IDefaultStats,
  type IJob,
  type IMonthApplication
} from '../../constants/interface'

enum ESortOption {
  LATEST = 'latest',
  OLDEST = 'oldest',
  AZ = 'a-z',
  ZA = 'z-a',
}

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: [
    ESortOption.LATEST,
    ESortOption.OLDEST,
    ESortOption.AZ,
    ESortOption.ZA
  ]
}

interface IInitialState {
  isLoading: boolean
  jobs: IJob[] | []
  totalJobs: number
  numOfPages: number
  page: number
  stats: IDefaultStats | null
  monthlyApplications: IMonthApplication[]
  search: string
  searchStatus: string
  searchType: string
  sort: string
  sortOptions: ESortOption[]
}

const initialState: IInitialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: null,
  monthlyApplications: [],
  ...initialFiltersState
}

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleChange: (
      state,
      action: PayloadAction<{ name: string, value: any }>
    ) => {
      const { name, value } = action.payload
      return {
        ...state,
        page: 1,
        [name]: value
      }
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFiltersState
      }
    },
    changePage: (state, { payload }) => {
      state.page = payload
    },
    clearAllJobsState: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jobs = payload.jobs
        state.numOfPages = payload.numOfPages
        state.totalJobs = payload.totalJobs
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
    builder
      .addCase(showStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  }
})

export const {
  showLoading,
  hideLoading,
  clearFilters,
  handleChange,
  changePage,
  clearAllJobsState
} = allJobsSlice.actions

export default allJobsSlice.reducer
