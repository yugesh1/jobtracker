import React, { type ReactElement } from 'react'

import Wrapper from './JobInfo.styled'

interface IProps {
  icon: ReactElement
  text: string
}

const JobInfo: React.FC<IProps> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  )
}

export default JobInfo
