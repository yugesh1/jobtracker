import React, { useState } from 'react'
import Wrapper from './Navbar.styled'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from '../Logo'
import { toggleSidebar } from '../../features/reducers/userSlice'
import { clearStore } from '../../features/thunks/userSlice'
import { useAppDispatch, useAppSelector } from '../../store'

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowLogout(!showLogout)
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={async () => {
                await dispatch(clearStore('Logging out successful...'))
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
