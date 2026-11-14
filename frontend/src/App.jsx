import { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Calendar,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Plus,
  CheckCircle2,
  Search,
  Trash2
} from 'lucide-react';
import './App.css';

/* Custom 3D-style Cherry SVG matching the sidebar & footer */
const CherryGraphic = ({ size = 65 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Stems */}
    <path d="M35 65 C38 35, 55 20, 72 15" stroke="#4a7c2c" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M68 72 C65 45, 68 28, 72 15" stroke="#5c9438" strokeWidth="3.5" strokeLinecap="round" />
    {/* Leaf */}
    <path d="M72 15 C85 8, 96 16, 88 26 C80 32, 72 22, 72 15 Z" fill="#68a83e" />
    <path d="M72 15 C60 5, 45 10, 52 22 C58 28, 68 20, 72 15 Z" fill="#4f872b" />
    {/* Left Cherry */}
    <defs>
      <radialGradient id="cherryGrad1" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#ff6b81" />
        <stop offset="45%" stopColor="#c91834" />
        <stop offset="100%" stopColor="#5e0514" />
      </radialGradient>
      <radialGradient id="cherryGrad2" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#ff8598" />
        <stop offset="45%" stopColor="#d91e3c" />
        <stop offset="100%" stopColor="#690718" />
      </radialGradient>
    </defs>
    <circle cx="34" cy="70" r="19" fill="url(#cherryGrad1)" />
    <ellipse cx="28" cy="63" rx="5" ry="2.5" transform="rotate(-30 28 63)" fill="rgba(255,255,255,0.65)" />
    {/* Right Cherry */}
    <circle cx="67" cy="75" r="18" fill="url(#cherryGrad2)" />
    <ellipse cx="61" cy="68" rx="4.5" ry="2.2" transform="rotate(-30 61 68)" fill="rgba(255,255,255,0.65)" />
  </svg>
);

/* Custom Cherry Blossom Branch SVG for Top-Left and Bottom-Left */
const BlossomBranch = ({ className }) => (
  <svg className={className} viewBox="0 0 360 220" fill="none">
    {/* Dark wooden branch */}
    <path d="M-10 10 Q90 35 190 95 T330 140" stroke="#592832" strokeWidth="5" strokeLinecap="round" />
    <path d="M85 45 Q130 20 185 15" stroke="#592832" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M135 68 Q165 110 215 135" stroke="#592832" strokeWidth="3" strokeLinecap="round" />

    {/* Blossom Flowers */}
    {[
      { x: 45, y: 24, s: 1.1 },
      { x: 115, y: 52, s: 1.25 },
      { x: 185, y: 18, s: 0.95 },
      { x: 195, y: 95, s: 1.15 },
      { x: 255, y: 118, s: 0.9 },
      { x: 75, y: 85, s: 0.85 },
      { x: 150, y: 130, s: 0.8 },
      { x: 295, y: 80, s: 0.7 }
    ].map((f, idx) => (
      <g key={idx} transform={`translate(${f.x}, ${f.y}) scale(${f.s})`}>
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-13"
            rx="8"
            ry="13"
            fill="#ffb7c9"
            stroke="#ff94b0"
            strokeWidth="0.6"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="5" fill="#d9385a" />
        <circle cx="0" cy="0" r="2.2" fill="#ffd166" />
      </g>
    ))}

    {/* Floating Petals */}
    <ellipse cx="240" cy="45" rx="6" ry="3.5" transform="rotate(25 240 45)" fill="#ff9eb7" opacity="0.8" />
    <ellipse cx="310" cy="110" rx="5" ry="3" transform="rotate(-20 310 110)" fill="#ff9eb7" opacity="0.7" />
    <ellipse cx="110" cy="145" rx="6" ry="3.5" transform="rotate(40 110 145)" fill="#ff9eb7" opacity="0.75" />
  </svg>
);

function App() {
  const [apartments, setApartments] = useState([
    {
      id: 1,
      name: 'UK Ground Floor 01',
      bedroomType: '2 Bedroom',
      status: 'Booked',
      bookingFrom: '-',
      bookingTo: '-'
    },
    {
      id: 2,
      name: 'UK Ground Floor 02',
      bedroomType: '2 Bedroom',
      status: 'Booked',
      bookingFrom: '-',
      bookingTo: '-'
    }
  ]);

  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newApt, setNewApt] = useState({
    name: '',
    bedroomType: '1 Bedroom',
    status: 'Available',
    bookingFrom: '',
    bookingTo: ''
  });

  const totalCount = apartments.length;
  const availableCount = apartments.filter((a) => a.status === 'Available').length;
  const bookedCount = apartments.filter((a) => a.status === 'Booked').length;

  const filteredApartments = apartments.filter(
    (apt) =>
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.bedroomType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddApartment = (e) => {
    e.preventDefault();
    if (!newApt.name.trim()) return;
    setApartments([
      ...apartments,
      {
        id: Date.now(),
        name: newApt.name,
        bedroomType: newApt.bedroomType,
        status: newApt.status,
        bookingFrom: newApt.bookingFrom || '-',
        bookingTo: newApt.bookingTo || '-'
      }
    ]);
    setNewApt({ name: '', bedroomType: '1 Bedroom', status: 'Available', bookingFrom: '', bookingTo: '' });
    setShowAddForm(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setApartments(apartments.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)));
  };

  const handleDelete = (id) => {
    setApartments(apartments.filter((apt) => apt.id !== id));
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Apartments', icon: Home },
    { name: 'Bookings', icon: Calendar },
    { name: 'Tenants', icon: Users },
    { name: 'Reports', icon: BarChart2 },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-silk-glow"></div>

        <div className="brand">
          <div className="sidebar-cherry-top">
            <CherryGraphic size={76} />
          </div>
          {/* Roofline icon */}
          <svg width="95" height="32" viewBox="0 0 120 40" fill="none" className="roof-svg">
            <path d="M10 34 L60 6 L110 34" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="53" y="21" width="6" height="6" fill="#ffffff" />
            <rect x="61" y="21" width="6" height="6" fill="#ffffff" />
            <rect x="53" y="29" width="6" height="6" fill="#ffffff" />
            <rect x="61" y="29" width="6" height="6" fill="#ffffff" />
          </svg>
          <h2>Cherry Land</h2>
          <div className="brand-subtitle">
            <span></span> Luxury Apartments <span></span>
          </div>
        </div>

        <div className="menu-label">MAIN MENU</div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(item.name);
                }}
              >
                <IconComponent size={18} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">SD</div>
            <div>
              <div className="user-name">Admin</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
          <button className="logout-btn" onClick={() => alert('Logging out...')}>
            <LogOut size={17} />
            <span>Logout</span>
          </button>

          {/* Bottom-right cherry cluster on sidebar */}
          <div className="sidebar-cherry-bottom">
            <CherryGraphic size={68} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* Top & Bottom Silk Pink Waves */}
        <svg className="wave-bg top-wave" viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            fill="#f7b7c8"
            fillOpacity="0.45"
            d="M0,120 C320,210 620,20 980,110 C1220,170 1350,120 1440,90 L1440,0 L0,0 Z"
          />
          <path
            fill="#f29bb2"
            fillOpacity="0.25"
            d="M0,70 C400,160 800,10 1440,130 L1440,0 L0,0 Z"
          />
        </svg>

        <svg className="wave-bg bottom-wave" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            fill="#f5acc0"
            fillOpacity="0.45"
            d="M0,80 C380,180 860,20 1440,120 L1440,200 L0,200 Z"
          />
        </svg>

        {/* Cherry Blossom Branches */}
        <BlossomBranch className="blossom-branch top-left-branch" />
        <BlossomBranch className="blossom-branch bottom-left-branch" />

        {/* TOP HEADER */}
        <header className="topbar">
          <div className="topbar-spacer"></div>
          <div className="topbar-center">
            <h1>Cherry Land Dashboard</h1>
            <div className="subtitle-with-lines">
              <span className="line"></span>
              <p>Welcome back! Here&apos;s your apartment overview.</p>
              <span className="line"></span>
            </div>
          </div>
          <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus size={16} />
            <span>Add Apartment</span>
          </button>
        </header>

        {/* COLLAPSIBLE ADD FORM */}
        {showAddForm && (
          <section className="form-card">
            <h2>Add New Apartment</h2>
            <p>Enter apartment details to register it in Cherry Land.</p>
            <form onSubmit={handleAddApartment}>
              <div className="form-group">
                <label>Apartment Name</label>
                <input
                  type="text"
                  placeholder="e.g. UK First Floor 01"
                  value={newApt.name}
                  onChange={(e) => setNewApt({ ...newApt, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Bedroom Type</label>
                <select
                  value={newApt.bedroomType}
                  onChange={(e) => setNewApt({ ...newApt, bedroomType: e.target.value })}
                >
                  <option value="1 Bedroom">1 Bedroom</option>
                  <option value="2 Bedroom">2 Bedroom</option>
                  <option value="3 Bedroom">3 Bedroom</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newApt.status}
                  onChange={(e) => setNewApt({ ...newApt, status: e.target.value })}
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                </select>
              </div>
              <button type="submit" className="add-button">Save Unit</button>
              <button type="button" className="cancel-button" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </form>
          </section>
        )}

        {/* STATISTICS CARDS */}
        <section className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">
              <Home size={25} />
            </div>
            <div className="stat-details">
              <h3>Total Apartments</h3>
              <h2>{totalCount}</h2>
            </div>
            <Home className="stat-watermark" size={74} />
          </div>

          <div className="stat-card available">
            <div className="stat-icon">
              <CheckCircle2 size={25} />
            </div>
            <div className="stat-details">
              <h3>Available</h3>
              <h2>{availableCount}</h2>
            </div>
            <Home className="stat-watermark" size={74} />
          </div>

          <div className="stat-card booked">
            <div className="stat-icon">
              <Calendar size={25} />
            </div>
            <div className="stat-details">
              <h3>Booked</h3>
              <h2>{bookedCount}</h2>
            </div>
            <Calendar className="stat-watermark" size={74} />
          </div>
        </section>

        {/* APARTMENT LIST TABLE */}
        <section className="apartment-section">
          <div className="section-header">
            <div className="section-title-group">
              <div className="section-badge">
                <Home size={19} />
              </div>
              <div>
                <h2>Apartment List</h2>
                <p className="section-subtext">Manage all your apartments</p>
              </div>
            </div>

            <div className="search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search apartment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Apartment</th>
                  <th>Bedroom Type</th>
                  <th>Status</th>
                  <th>Booking From</th>
                  <th>Booking To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApartments.map((apt) => (
                  <tr key={apt.id}>
                    <td><strong>{apt.name}</strong></td>
                    <td>{apt.bedroomType}</td>
                    <td>
                      <span className={`status ${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>{apt.bookingFrom}</td>
                    <td>{apt.bookingTo}</td>
                    <td>
                      <div className="actions">
                        <select
                          value={apt.status}
                          onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                        >
                          <option value="Available">Available</option>
                          <option value="Booked">Booked</option>
                        </select>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(apt.id)}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM BRAND WATERMARK */}
        <footer className="dashboard-footer">
          <CherryGraphic size={28} />
          <span>Cherry Land Residencies —</span>
        </footer>
      </main>
    </div>
  );
}

export default App;