export interface IAllJobType {
  numOfPages: number
  totalJobs: number
  jobs: IJob[]
}

export interface IMonthApplication {
  date: string
  count: number
}

export interface IDefaultStats {
  pending: number
  declined: number
  interview: number
}

export interface IStats {
  defaultStats: IDefaultStats
  monthlyApplications: IMonthApplication[]
}

export interface IJob {
  _id: string
  company: string
  jobLocation: string
  jobType: string
  position: string
  status: string
  createdAt?: string
}

export interface IUser {
  name: string
  email: string
  password: string
  lastName?: string
  location?: string
  token?: string
}
