import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { email, password })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <ErrorMessage message={error} />
        <p>
          New User: <span onClick={() => navigate('/register')}>Register</span>
        </p>
      </form>
    </div>
  )
}

export default Login
