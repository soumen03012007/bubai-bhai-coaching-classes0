import { useEffect, useMemo, useState } from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import teacherPhoto from './assets/bubai-owner.jpeg'
import './App.css'

const API_BASE = 'http://localhost:5000/api'
const ALL_CLASSES = [5, 6, 7, 8, 9, 10]
const ALL_SUBJECTS = ['Mathematics', 'Physics', 'Chemistry']

const CONTACT = {
  teacherName: 'BUBAI MONDAL',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  email: 'bubaimondalcoaching@example.com',
  address: 'Online Coaching / Remote Sessions, West Bengal, India',
  hours: 'Mon - Sat: 4:00 PM - 8:30 PM',
}

const successStories = [
  { name: 'Aarav Sen', classLevel: 10, subject: 'Mathematics', achievement: '95%', year: '2025' },
  { name: 'Riya Das', classLevel: 9, subject: 'Physics', achievement: '92%', year: '2025' },
  { name: 'Soham Roy', classLevel: 8, subject: 'Chemistry', achievement: '90%', year: '2024' },
]

const formatCurrency = (value) => `₹${Number(value).toLocaleString('en-IN')}`

function getFeeSchedule(classLevel) {
  if (Number(classLevel) >= 9) {
    return { Mathematics: 500, Physics: 500, Chemistry: 500 }
  }

  return { Mathematics: 300, Physics: 250, Chemistry: 250 }
}

function calculateFee(classLevel, selectedSubjects) {
  const schedule = getFeeSchedule(classLevel)
  return (selectedSubjects || []).reduce((total, subject) => total + (schedule[subject] ?? 0), 0)
}

function getSelectionFromStorage() {
  try {
    const value = localStorage.getItem('coachingSelection')
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

function setSelectionInStorage(classLevel, selectedSubjects) {
  localStorage.setItem(
    'coachingSelection',
    JSON.stringify({ classLevel: Number(classLevel), selectedSubjects: selectedSubjects || [] }),
  )
}

function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="brand">
          <div className="brand-mark">B</div>
          <div>
            <strong>{CONTACT.teacherName}</strong>
            <span>Online Coaching Classes</span>
          </div>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/#about">About</NavLink>
          <NavLink to="/#teacher">Teacher</NavLink>
          <NavLink to="/#success">Success</NavLink>
          <NavLink to="/#subjects">Subjects & Fees</NavLink>
          <NavLink to="/#calculator">Fee Calculator</NavLink>
          <NavLink to="/apply">Apply Now</NavLink>
          <NavLink to="/#contact">Contact</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </div>
    </header>
  )
}

function HomePage() {
  const navigate = useNavigate()

  const applyNow = (classLevel, subjects) => {
    setSelectionInStorage(classLevel, subjects)
    navigate('/apply')
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Personalized Guidance</p>
            <h1>Learn. Improve. Succeed.</h1>
            <p className="lead">Online Coaching Classes for Classes 5–10 with a strong focus on concept clarity, regular practice, and consistent academic growth.</p>
            <div className="cta-row">
              <button className="primary-btn" onClick={() => applyNow(8, ['Mathematics'])}>Apply for Coaching</button>
              <a className="secondary-btn" href="#calculator">View Subjects & Fees</a>
            </div>
            <div className="hero-meta">
              <span>Teacher: {CONTACT.teacherName}</span>
              <span>Classes 5–10</span>
            </div>
          </div>
          <div className="hero-card">
            <div className="academic-box">
              <p>Live online guidance</p>
              <h3>Mathematics • Physics • Chemistry</h3>
              <ul>
                <li>Concept-based learning</li>
                <li>Weekly doubt support</li>
                <li>Focused exam preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="content-section">
        <div className="container">
          <section-heading>
            <p className="eyebrow">About Coaching</p>
            <h2>Learning that is personal, practical, and progress-driven.</h2>
          </section-heading>
          <div className="about-box">
            <p>
              Personalized online coaching for students from Class 5 to Class 10 with a focus on strong fundamentals,
              conceptual understanding, and academic improvement. Every class is designed to build confidence, improve
              regular study habits, and create a deeper understanding of core subjects.
            </p>
          </div>
        </div>
      </section>

      <section id="teacher" className="content-section alt-bg">
        <div className="container teacher-layout">
          <img
            src={teacherPhoto}
            alt="BUBAI MONDAL teacher portrait"
            className="teacher-photo"
          />
          <div>
            <p className="eyebrow">Teacher Profile</p>
            <h2>{CONTACT.teacherName}</h2>
            <p className="role">Owner & Teacher</p>
            <p>Short biography: Dedicated educator with a student-first teaching approach and a strong focus on clarity, discipline, and academic progress.</p>
            <div className="teacher-stats">
              <div><strong>6+ Years</strong><span>Experience</span></div>
              <div><strong>3</strong><span>Core Subjects</span></div>
              <div><strong>Classes 5–10</strong><span>Focused</span></div>
            </div>
            <p><strong>Teaching philosophy:</strong> Every student learns differently, so I focus on clarity, consistency, and conceptual confidence.</p>
            <div className="cta-row">
              <button className="primary-btn" onClick={() => applyNow(7, ['Mathematics', 'Physics'])}>Apply for Coaching</button>
            </div>
          </div>
        </div>
      </section>

      <section id="success" className="content-section">
        <div className="container">
          <section-heading>
            <p className="eyebrow">Previous Academic Success</p>
            <h2>Demo success stories</h2>
          </section-heading>
          <div className="card-grid three-col">
            {successStories.map((story) => (
              <article key={`${story.name}-${story.year}`} className="info-card">
                <span className="badge">Demo Story</span>
                <h3>{story.name}</h3>
                <p>Class {story.classLevel}</p>
                <p>{story.subject}</p>
                <strong>{story.achievement}</strong>
                <small>{story.year}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="subjects" className="content-section alt-bg">
        <div className="container">
          <section-heading>
            <p className="eyebrow">Classes & Subjects</p>
            <h2>Focused learning for Classes 5 to 10</h2>
          </section-heading>
          <div className="card-grid three-col">
            <article className="pricing-card">
              <h3>Class 5–8</h3>
              <ul>
                <li>Mathematics — {formatCurrency(300)}/month</li>
                <li>Physics — {formatCurrency(250)}/month</li>
                <li>Chemistry — {formatCurrency(250)}/month</li>
              </ul>
              <button className="primary-btn" onClick={() => applyNow(8, ['Mathematics', 'Physics'])}>Apply Now</button>
            </article>
            <article className="pricing-card highlight">
              <h3>Class 9–10</h3>
              <ul>
                <li>Mathematics — {formatCurrency(500)}/month</li>
                <li>Physics — {formatCurrency(500)}/month</li>
                <li>Chemistry — {formatCurrency(500)}/month</li>
              </ul>
              <button className="primary-btn" onClick={() => applyNow(9, ['Mathematics'])}>Apply Now</button>
            </article>
            <article className="pricing-card">
              <h3>Flexible Combo</h3>
              <ul>
                <li>Choose one or multiple subjects</li>
                <li>Monthly fee updates instantly</li>
                <li>Simple admission process</li>
              </ul>
              <button className="primary-btn" onClick={() => applyNow(6, ['Mathematics', 'Physics'])}>Apply Now</button>
            </article>
          </div>
        </div>
      </section>

      <FeeCalculator onApplyNow={applyNow} />

      <section id="contact" className="content-section footer-contact">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Get in touch for admission</h2>
            <ul className="contact-list">
              <li><strong>Teacher:</strong> {CONTACT.teacherName}</li>
              <li><strong>Phone:</strong> {CONTACT.phone}</li>
              <li><strong>WhatsApp:</strong> {CONTACT.whatsapp}</li>
              <li><strong>Email:</strong> {CONTACT.email}</li>
              <li><strong>Address:</strong> {CONTACT.address}</li>
              <li><strong>Coaching Hours:</strong> {CONTACT.hours}</li>
            </ul>
          </div>
          <div className="contact-actions">
            <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello BUBAI MONDAL, I am interested in joining your online coaching classes.')}`} className="primary-btn" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`tel:${CONTACT.phone.replace(/\D/g, '')}`} className="secondary-btn">Call Now</a>
          </div>
        </div>
      </section>
    </>
  )
}

function FeeCalculator({ onApplyNow }) {
  const [selectedClass, setSelectedClass] = useState(8)
  const [selectedSubjects, setSelectedSubjects] = useState(['Mathematics'])

  useEffect(() => {
    const saved = getSelectionFromStorage()
    if (saved) {
      setSelectedClass(saved.classLevel || 8)
      setSelectedSubjects(saved.selectedSubjects || ['Mathematics'])
    }
  }, [])

  const totalFee = useMemo(() => calculateFee(selectedClass, selectedSubjects), [selectedClass, selectedSubjects])

  const toggleSubject = (subject) => {
    setSelectedSubjects((current) =>
      current.includes(subject) ? current.filter((item) => item !== subject) : [...current, subject],
    )
  }

  return (
    <section id="calculator" className="content-section alt-bg">
      <div className="container calculator-box">
        <div>
          <p className="eyebrow">Fee Calculator</p>
          <h2>Calculate Your Monthly Fee</h2>
        </div>
        <div className="calculator-grid">
          <label>
            <span>Select Class</span>
            <select value={selectedClass} onChange={(event) => setSelectedClass(Number(event.target.value))}>
              {ALL_CLASSES.map((classLevel) => (
                <option value={classLevel} key={classLevel}>Class {classLevel}</option>
              ))}
            </select>
          </label>
          <div className="subject-list">
            <span>Select Subjects</span>
            {ALL_SUBJECTS.map((subject) => (
              <label className="checkbox-row" key={subject}>
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => toggleSubject(subject)}
                />
                <span>{subject}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="fee-summary">
          <p>Selected Subjects:</p>
          <strong>{selectedSubjects.length > 0 ? selectedSubjects.join(', ') : 'None selected'}</strong>
          <h3>Your Monthly Fee: {formatCurrency(totalFee)} </h3>
          <button className="primary-btn" onClick={() => onApplyNow(selectedClass, selectedSubjects)}>Apply Now</button>
        </div>
      </div>
    </section>
  )
}

function ApplicationPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    full_name: '',
    class_level: 8,
    subjects: ['Mathematics'],
    phone_number: '',
    whatsapp_number: '',
    email: '',
  })
  const [sameAsPhone, setSameAsPhone] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(null)

  useEffect(() => {
    const saved = getSelectionFromStorage()
    if (saved) {
      setForm((current) => ({
        ...current,
        class_level: saved.classLevel || 8,
        subjects: saved.selectedSubjects || ['Mathematics'],
      }))
    }
  }, [])

  const totalFee = useMemo(() => calculateFee(form.class_level, form.subjects), [form.class_level, form.subjects])

  const handleSubjectToggle = (subject) => {
    setForm((current) => ({
      ...current,
      subjects: current.subjects.includes(subject)
        ? current.subjects.filter((item) => item !== subject)
        : [...current.subjects, subject],
    }))
  }

  const handlePhoneChange = (value) => {
    setForm((current) => ({ ...current, phone_number: value }))
    if (sameAsPhone) {
      setForm((current) => ({ ...current, whatsapp_number: value }))
    }
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!form.full_name.trim()) nextErrors.full_name = 'Full name is required.'
    if (!ALL_CLASSES.includes(Number(form.class_level))) nextErrors.class_level = 'Please select a valid class.'
    if (!form.subjects.length) nextErrors.subjects = 'Please choose at least one subject.'
    if (!/^\d{10}$/.test(String(form.phone_number).replace(/\s+/g, ''))) nextErrors.phone_number = 'Phone must be a valid 10-digit Indian number.'
    if (!/^\d{10}$/.test(String(form.whatsapp_number).replace(/\s+/g, ''))) nextErrors.whatsapp_number = 'WhatsApp must be a valid 10-digit Indian number.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.full_name,
          class_level: Number(form.class_level),
          subjects: form.subjects,
          phone_number: form.phone_number,
          whatsapp_number: form.whatsapp_number,
          email: form.email,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit application.')
      }

      setSubmitSuccess(data.data)
      localStorage.removeItem('coachingSelection')
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <section className="content-section">
        <div className="container confirmation-box">
          <div className="success-icon">✓</div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you, {submitSuccess.full_name}.</p>
          <p>Your application has been received.</p>
          <div className="summary-box">
            <p><strong>Class:</strong> {submitSuccess.class_level}</p>
            <p><strong>Subjects:</strong> {submitSuccess.subjects}</p>
            <p><strong>Monthly Fee:</strong> {formatCurrency(submitSuccess.monthly_fee)}</p>
          </div>
          <p>The coaching team will contact you soon.</p>
          <div className="cta-row">
            <a className="primary-btn" href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hello BUBAI MONDAL, I am interested in joining your online coaching classes.')}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="secondary-btn" href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}>Call</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="content-section">
      <div className="container form-layout">
        <div>
          <p className="eyebrow">Admission Form</p>
          <h2>Apply for coaching</h2>
          <div className="summary-box">
            <p><strong>Student:</strong> {form.full_name || 'Pending'}</p>
            <p><strong>Class:</strong> {form.class_level}</p>
            <p><strong>Subjects:</strong> {form.subjects.length ? form.subjects.join(', ') : 'No subject selected'}</p>
            <p><strong>Monthly Fee:</strong> {formatCurrency(totalFee)}</p>
          </div>
        </div>

        <form className="application-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Full Name</span>
            <input value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} />
            {errors.full_name && <small>{errors.full_name}</small>}
          </label>

          <label>
            <span>Class</span>
            <select value={form.class_level} onChange={(event) => setForm({ ...form, class_level: Number(event.target.value) })}>
              {ALL_CLASSES.map((classLevel) => (
                <option value={classLevel} key={classLevel}>Class {classLevel}</option>
              ))}
            </select>
            {errors.class_level && <small>{errors.class_level}</small>}
          </label>

          <div className="subject-block">
            <span>Subjects</span>
            <div className="subject-grid">
              {ALL_SUBJECTS.map((subject) => (
                <label className="checkbox-row" key={subject}>
                  <input type="checkbox" checked={form.subjects.includes(subject)} onChange={() => handleSubjectToggle(subject)} />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
            {errors.subjects && <small>{errors.subjects}</small>}
          </div>

          <label>
            <span>Phone Number</span>
            <input value={form.phone_number} onChange={(event) => handlePhoneChange(event.target.value)} />
            {errors.phone_number && <small>{errors.phone_number}</small>}
          </label>

          <label className="checkbox-row inline-check">
            <input type="checkbox" checked={sameAsPhone} onChange={(event) => {
              const checked = event.target.checked
              setSameAsPhone(checked)
              if (checked) {
                setForm((current) => ({ ...current, whatsapp_number: current.phone_number }))
              }
            }} />
            <span>WhatsApp number is same as phone number</span>
          </label>

          <label>
            <span>WhatsApp Number</span>
            <input value={form.whatsapp_number} onChange={(event) => setForm({ ...form, whatsapp_number: event.target.value })} />
            {errors.whatsapp_number && <small>{errors.whatsapp_number}</small>}
          </label>

          <label>
            <span>Email (Optional)</span>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            {errors.email && <small>{errors.email}</small>}
          </label>

          {errors.submit && <div className="error-banner">{errors.submit}</div>}

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  )
}

function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Login failed.')

      localStorage.setItem('coachingAdminToken', data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="content-section">
      <div className="container auth-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <label>
            <span>Username / Email</span>
            <input type="email" value={form.email} placeholder="Enter admin email" onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={form.password} placeholder="Enter password" onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </label>
          {error && <div className="error-banner">{error}</div>}
          <button type="submit" className="primary-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </section>
  )
}

function AdminDashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ total: 0, pending: 0, contacted: 0, enrolled: 0, rejected: 0 })
  const [applications, setApplications] = useState([])
  const [filters, setFilters] = useState({ search: '', classLevel: 'all', subject: 'all', status: 'all' })
  const [loading, setLoading] = useState(true)

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('coachingAdminToken')}`,
  })

  const fetchDashboard = async () => {
    const token = localStorage.getItem('coachingAdminToken')
    if (!token) {
      navigate('/admin')
      return
    }

    try {
      const [dashboardResponse, appResponse] = await Promise.all([
        fetch(`${API_BASE}/admin/dashboard`, { headers: getHeaders() }),
        fetch(`${API_BASE}/admin/applications?classLevel=all&subject=all&status=all`, { headers: getHeaders() }),
      ])

      const dashboardData = await dashboardResponse.json()
      const apps = await appResponse.json()
      setStats(dashboardData)
      setApplications(apps)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const filteredApps = applications.filter((item) => {
    const matchesSearch = !filters.search || [item.full_name, item.phone_number, item.whatsapp_number, item.email].some((value) =>
      String(value || '').toLowerCase().includes(filters.search.toLowerCase()),
    )
    const matchesClass = filters.classLevel === 'all' || String(item.class_level) === filters.classLevel
    const matchesSubject = filters.subject === 'all' || item.subjects.toLowerCase().includes(filters.subject.toLowerCase())
    const matchesStatus = filters.status === 'all' || item.application_status === filters.status
    return matchesSearch && matchesClass && matchesSubject && matchesStatus
  })

  const updateStatus = async (applicationId, nextStatus) => {
    try {
      await fetch(`${API_BASE}/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: nextStatus }),
      })
      fetchDashboard()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteApplication = async (applicationId) => {
    try {
      await fetch(`${API_BASE}/applications/${applicationId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      })
      fetchDashboard()
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('coachingAdminToken')
    navigate('/admin')
  }

  return (
    <section className="content-section">
      <div className="container admin-shell">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button className="secondary-btn" onClick={logout}>Logout</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><span>Total Applications</span><strong>{stats.total}</strong></div>
          <div className="stat-card"><span>Pending</span><strong>{stats.pending}</strong></div>
          <div className="stat-card"><span>Contacted</span><strong>{stats.contacted}</strong></div>
          <div className="stat-card"><span>Enrolled</span><strong>{stats.enrolled}</strong></div>
          <div className="stat-card"><span>Rejected</span><strong>{stats.rejected}</strong></div>
        </div>

        <div className="filter-row">
          <input
            placeholder="Search name / phone / email"
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
          />
          <select value={filters.classLevel} onChange={(event) => setFilters({ ...filters, classLevel: event.target.value })}>
            <option value="all">All Classes</option>
            {ALL_CLASSES.map((classLevel) => <option key={classLevel} value={classLevel}>Class {classLevel}</option>)}
          </select>
          <select value={filters.subject} onChange={(event) => setFilters({ ...filters, subject: event.target.value })}>
            <option value="all">All Subjects</option>
            {ALL_SUBJECTS.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
          </select>
          <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {loading ? <p>Loading applications...</p> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Subjects</th>
                  <th>Phone</th>
                  <th>Monthly Fee</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((application) => (
                  <tr key={application.id}>
                    <td>{application.full_name}</td>
                    <td>{application.class_level}</td>
                    <td>{application.subjects}</td>
                    <td>{application.phone_number}</td>
                    <td>{formatCurrency(application.monthly_fee)}</td>
                    <td>
                      <select value={application.application_status} onChange={(event) => updateStatus(application.id, event.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>{new Date(application.created_at).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button className="secondary-btn small-btn" onClick={() => alert(`Student: ${application.full_name}\nPhone: ${application.phone_number}\nWhatsApp: ${application.whatsapp_number}\nEmail: ${application.email || 'N/A'}`)}>View</button>
                      <button className="secondary-btn small-btn danger" onClick={() => deleteApplication(application.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<ApplicationPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>{CONTACT.teacherName}</h3>
            <p>Online Coaching Classes</p>
            <p>Classes 5–10</p>
            <p>Mathematics | Physics | Chemistry</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#teacher">Teacher</a></li>
              <li><a href="#subjects">Subjects & Fees</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>{CONTACT.phone}</p>
            <p>{CONTACT.whatsapp}</p>
            <p>{CONTACT.email}</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 {CONTACT.teacherName}. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
