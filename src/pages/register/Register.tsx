import React, { useState, useEffect } from 'react'

import { FormRow, Logo } from '../../components'
import Wrapper from './RegisterPage.styled'
import { toast } from 'react-toastify'
import { loginUser, registerUser } from '../../features/thunks/userSlice'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const { isLoading, user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (email !== '' || password !== '' || (!isMember && name !== '')) {
      toast.error('please fill out all fields')
      return
    }
    if (isMember) {
      await dispatch(loginUser({ email, password }))
      return
    }
    await dispatch(registerUser({ name, email, password }))
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  useEffect(() => {
    if (user != null) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={async () =>
            await dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }
        >
          {isLoading ? 'loading...' : 'demo app'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
