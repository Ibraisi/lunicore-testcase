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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Registration successful!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="email" 
          placeholder="Email" 
          value={data.email} 
          onChange={handleChange} 
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={data.password} 
          onChange={handleChange} 
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          name="id"  
          placeholder="Employee ID" 
          value={data.id} 
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  )
}