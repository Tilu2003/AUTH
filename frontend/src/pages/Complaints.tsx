import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


interface Complaint {
  _id: string
  name: string
  postalcode: number
  prsdeshiya_sabha_related: string
  height: number
}


function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:3000/api/complaints', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setComplaints(res.data)
      })
      .catch(() => {
        setError('Failed to load complaints.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { complaints, loading, error }
}


export default function Complaints() {
  const { complaints, loading, error } = useComplaints()
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Redirect if not logged in
  if (!localStorage.getItem('token')) {
    navigate('/login')
    return null
  }

  return (
    <div className="complaints-page">

      {/* Header */}
      <div className="complaints-header">
        <h1>Submitted Complaints</h1>
        <button className="btn btn-red btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* States */}
      {loading && <p className="loading-text">Loading complaints...</p>}

      {error && <p className="error-msg" style={{ textAlign: 'center', marginTop: '40px' }}>{error}</p>}

      {!loading && !error && complaints.length === 0 && (
        <p className="no-complaints">No complaints found.</p>
      )}

      {/* Cards */}
      {!loading && !error && complaints.length > 0 && (
        <div className="cards-grid">
          {complaints.map((c) => (
            <div className="complaint-card" key={c._id}>
              <div className="card-name">{c.name}</div>

              <div className="card-row">
                <span>Postal Code</span>
                <span>{c.postalcode}</span>
              </div>

              <div className="card-row">
                <span>Height</span>
                <span>{c.height} m</span>
              </div>

              <span className="card-badge">{c.prsdeshiya_sabha_related}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
