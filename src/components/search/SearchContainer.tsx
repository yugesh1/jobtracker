import React, { useMemo, useState } from 'react'
import { FormRow, FormRowSelect } from '..'
import Wrapper from './SearchContainer.styled'
import {
  clearFilters,
  handleChange
} from '../../features/reducers/allJobsSlice'
import { useAppDispatch, useAppSelector } from '../../store'

const SearchContainer = () => {
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((state) => state.allJobs)
  const [localSearch, setLocalSearch] = useState('')
  const { jobTypeOptions, statusOptions } = useAppSelector(
    (state) => state.job
  )
  const dispatch = useAppDispatch()
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }

  const debounce = () => {
    let timeoutId: any
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      }, 1000)
    }
  }

  const optimisedDebounce = useMemo(() => {
    return debounce()
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimisedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
