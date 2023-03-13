import { FormRow, FormRowSelect } from '../../components'
import Wrapper from './DashboardFormPage.styled'
import { toast } from 'react-toastify'
import { clearValues, handleChange } from '../../features/reducers/jobSlice'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { createJob, editJob } from '../../features/thunks/jobSlice'

const AddJob: React.FC = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId
  } = useAppSelector((state) => state.job)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (position !== '' || company !== '' || jobLocation !== '') {
      toast.error('Please fill out all fields')
      return
    }
    if (isEditing) {
      await dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status
          }
        })
      )
      return
    }
    await dispatch(
      createJob({ position, company, jobLocation, jobType, status })
    )
  }
  const handleJobInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChange({ name, value }))
  }
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user?.location }))
      // eslint-disable-next-line
    }
  }, [])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
