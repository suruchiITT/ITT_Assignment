// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import ErrorMessage from '../components/ErrorMessage'

// const Register = () => {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setError('')
//     try {
//       const res = await axios.post('http://localhost:5000/api/register', { name, email, password })
//       localStorage.setItem('token', res.data.token)
//       navigate('/dashboard')
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong')
//     }
//   }

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Register</h2>
//         <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required/>
//         <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required/>
//         <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/>
//         <button type="submit">Register</button>
//         <ErrorMessage message={error}/>
//         <p>Already Register: <span onClick={()=>navigate('/login')}>Login</span></p>
//       </form>
//     </div>
//   )
// }

// export default Register


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Something went wrong')
        return
      }

      
      const loginRes = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const loginData = await loginRes.json()
      if (!loginRes.ok) {
        setError(loginData.message || 'Login after registration failed')
        return
      }

      localStorage.setItem('token', loginData.token)
      navigate('/dashboard') 
    } catch (err) {
      console.error(err)
      setError('Server error')
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <ErrorMessage message={error} />
      <p>Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'blue', cursor: 'pointer' }}>Login</span></p>
      </form>
    </div>
  )
}

export default Register
