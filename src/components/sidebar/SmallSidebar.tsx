import React from 'react'
import Wrapper from './SmallSidebar.styled'
import { FaTimes } from 'react-icons/fa'
import Logo from '../Logo'
import { toggleSidebar } from '../../features/reducers/userSlice'
import NavLinks from './NavLinks'
import { useAppDispatch, useAppSelector } from '../../store'

const SmallSidebar = () => {
  const dispatch = useAppDispatch()
  const { isSidebarOpen } = useAppSelector((state) => state.user)
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
