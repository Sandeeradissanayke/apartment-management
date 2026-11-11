
import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:5002/api/apartments'

function App() {
  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    apartmentNumber: '',
    bedroomType: '1 Bedroom'
  })

  // Get all apartments
  const fetchApartments = async () => {
    try {
      setLoading(true)

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to load apartments')
      }

      const data = await response.json()
      setApartments(data)
      setError('')

    } catch (err) {
      setError('Cannot connect to backend. Check server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApartments()
  }, [])

  // Add apartment
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      alert('Apartment added successfully!')

      setFormData({
        apartmentNumber: '',
        bedroomType: '1 Bedroom'
      })

      setShowForm(false)
      fetchApartments()

    } catch (err) {
      alert('Something went wrong')
    }
  }

  // Update apartment status
  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        throw new Error('Update failed')
      }

      fetchApartments()

    } catch (err) {
      alert('Unable to update apartment')
    }
  }

  // Delete apartment
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this apartment?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      alert('Apartment deleted successfully!')
      fetchApartments()

    } catch (err) {
      alert('Unable to delete apartment')
    }
  }

  const availableCount = apartments.filter(
    apartment => apartment.status === 'Available'
  ).length

  const bookedCount = apartments.filter(
    apartment => apartment.status === 'Booked'
  ).length

  const filteredApartments = apartments.filter(apartment =>
    apartment.apartmentNumber.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">A</div>
          <h2>Apartment<span>Hub</span></h2>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <div className="menu-item active">
          <span>▦</span> Dashboard
        </div>

        <div className="menu-item">
          <span>⌂</span> Apartments
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">SD</div>
          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your apartment overview.</p>
          </div>

          <button
            className="add-button"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Apartment
          </button>
        </header>

        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon total">⌂</div>
            <p>Total Apartments</p>
            <h2>{apartments.length}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon available">✓</div>
            <p>Available</p>
            <h2>{availableCount}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon booked">▣</div>
            <p>Booked</p>
            <h2>{bookedCount}</h2>
          </div>

        </section>

        {showForm && (
          <section className="form-card">
            <h2>Add New Apartment</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Apartment Number</label>
                <input
                  type="text"
                  placeholder="Example: A01"
                  value={formData.apartmentNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      apartmentNumber: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Bedroom Type</label>
                <select
                  value={formData.bedroomType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bedroomType: e.target.value
                    })
                  }
                >
                  <option value="1 Bedroom">1 Bedroom</option>
                  <option value="2 Bedroom">2 Bedroom</option>
                </select>
              </div>

              <button type="submit" className="add-button">
                Save Apartment
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        <section className="apartment-section">

          <div className="section-header">
            <div>
              <h2>Apartment List</h2>
              <p>Manage all your apartments</p>
            </div>

            <input
              className="search-input"
              type="text"
              placeholder="Search apartment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p className="message">Loading apartments...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : filteredApartments.length === 0 ? (
            <p className="message">No apartments found.</p>
          ) : (

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Apartment</th>
                    <th>Bedroom Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApartments.map(apartment => (
                    <tr key={apartment._id}>
                      <td>
                        <strong>{apartment.apartmentNumber}</strong>
                      </td>

                      <td>{apartment.bedroomType}</td>

                      <td>
                        <span className={`status ${apartment.status.toLowerCase()}`}>
                          {apartment.status}
                        </span>
                      </td>

                      <td>
                        <div className="actions">
                          <select
                            value={apartment.status}
                            onChange={(e) =>
                              handleStatusChange(
                                apartment._id,
                                e.target.value
                              )
                            }
                          >
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                          </select>

                          <button
                            className="delete-button"
                            onClick={() => handleDelete(apartment._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

      </main>
    </div>
  )
}

export default App
