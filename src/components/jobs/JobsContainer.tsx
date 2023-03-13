import React, { useEffect } from 'react'

import Job from './Job'
import Wrapper from './JobsContainer.styled'
import Loading from '../Loading'
import { getAllJobs } from '../../features/thunks/allJobs'
import PageBtnContainer from '../pagination/PageBtnContainer'
import { useAppDispatch, useAppSelector } from '../../store'

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchType,
    sort,
    searchStatus
  } = useAppSelector((state) => state.allJobs)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getJobs = async () => {
      await dispatch(getAllJobs())
    }
    getJobs().catch((err) => { console.error(err) })
    // eslint-disable-next-line
  }, [page, search, searchType, sort, searchStatus]);
  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
