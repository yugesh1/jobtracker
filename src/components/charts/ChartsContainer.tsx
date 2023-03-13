import React, { useState } from 'react'
import BarChartComponent from './BarChartComponent'
import AreaChartComponent from './AreaChartComponent'
import Wrapper from './ChartsContainer.styled'
import { useAppSelector } from '../../store'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useAppSelector(
    (state) => state.allJobs
  )
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => { setBarChart(!barChart) }}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart
        ? (
        <BarChartComponent data={data} />
          )
        : (
        <AreaChartComponent data={data} />
          )}
    </Wrapper>
  )
}

export default ChartsContainer
