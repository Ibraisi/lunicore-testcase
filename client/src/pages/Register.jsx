import React, { useState } from 'react'
import axios from 'axios'

import {useNavigate} from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      const response = await axios.post('/register', data)
      console.log('Registration successful:', response.data)
      setSuccess(true)
      setData({ firstName: '', lastName: '', email: '', password: '' }) // Clear form
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message)
      setError(error.response?.data?.message || 'An error occurred during registration')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={data.password} onChange={handleChange} required />
        <input name="id"  placeholder="employee id" value={data.id} onChange={handleChange}/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}