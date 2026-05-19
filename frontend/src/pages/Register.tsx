import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function useRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function register(data: {
    Name: string
    email: string
    password: string
    phone: string
    address: string
    postal_code: string
  }) {
    setError('')
    setLoading(true)
    try {
      await axios.post('http://localhost:3000/api/user/registerUser', data)
      navigate('/login')
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}


export default function Register() {
  const { register, loading, error } = useRegister()

  const [form, setForm] = useState({
    Name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    postal_code: '',
  })

  const [pwError, setPwError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setPwError('Passwords do not match')
      return
    }
    setPwError('')
    const { confirmPassword, ...payload } = form
    register(payload)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create account</h2>
        <p>Fill in your details to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="Name"
              placeholder="John Doe"
              value={form.Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="0771234567"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <input
              name="postal_code"
              placeholder="10001"
              value={form.postal_code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              placeholder="123 Main St, City"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {pwError && <p className="error-msg">{pwError}</p>}
          {error && <p className="error-msg">{error}</p>}

          <button className="btn btn-blue" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}
