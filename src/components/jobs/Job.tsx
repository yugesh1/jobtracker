import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from './Job.styled'
import JobInfo from './JobInfo'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { setEditJob } from '../../features/reducers/jobSlice'
import { deleteJob } from '../../features/thunks/jobSlice'
import moment from 'moment/moment'
import { type IJob } from '../../constants/interface'
import { useAppDispatch } from '../../store'

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status
}: IJob) => {
  const date = moment(createdAt).format('MMM Do, YYYY')
  const dispatch = useAppDispatch()
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status
                  })
                )
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={async () => {
                await dispatch(deleteJob(_id))
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
