// frontend/src/App.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

function App() {
  const { user, login, logout } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [backendStatus, setBackendStatus] = useState('Checking...');
  
  // Form Bindings
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('tenant');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/test')
      .then(res => setBackendStatus(res.data.message))
      .catch(() => setBackendStatus('❌ Connection severed. Is Backend offline?'));
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isRegistering) {
        const res = await axios.post('http://127.0.0.1:5000/api/auth/register', { fullname, email, phone, password, role });
        if (res.data.success) {
          setMessage('✨ Account verified and active! Now toggle Login.');
          setIsRegistering(false);
        }
      } else {
        await login(email, password);
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Transaction rejected'}`);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Structural Header Navigation */}
      <nav style={{ background: '#1a365d', color: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ flexGrow: 1 }}><h2 style={{ margin: 0, letterSpacing: '0.5px' }}>SmartBasai <span style={{ fontSize: '10px', color: '#da291c', verticalAlign: 'super' }}>NEPAL</span></h2></div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>System Engine: <strong style={{ color: '#63b3ed' }}>{backendStatus}</strong></span>
          {user && <button onClick={logout} style={{ background: '#da291c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Sign Out</button>}
        </div>
      </nav>

      {/* Main Core Content Interface Workspace */}
      <div style={{ flexGrow: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {!user ? (
          <div className="glass-card" style={{ maxWidth: '450px', margin: '40px auto', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, color: '#1a365d', fontSize: '1.5rem', textAlign: 'center' }}>{isRegistering ? 'Create SmartBasai Account' : 'Secure Member Login'}</h3>
            {message && <p style={{ padding: '10px', borderRadius: '4px', background: '#edf2f7', textAlign: 'center', fontSize: '13px' }}>{message}</p>}
            
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {isRegistering && (
                <>
                  <input type="text" placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0' }} required />
                  <input type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0' }} required />
                  <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0', background: '#fff' }}>
                    <option value="tenant">Tenant (Looking for Room)</option>
                    <option value="landlord">Landlord (Want to Rent out)</option>
                  </select>
                </>
              )}
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0' }} required />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0' }} required />
              
              <button type="submit" style={{ background: '#1a365d', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>
                {isRegistering ? 'Register' : 'Access Dashboard'}
              </button>
            </form>
            <p onClick={() => setIsRegistering(!isRegistering)} style={{ textAlign: 'center', color: '#2b6cb0', cursor: 'pointer', fontSize: '14px', marginTop: '15px' }}>
              {isRegistering ? 'Already a member? Sign In instead' : 'Need an account? Sign Up without brokers'}
            </p>
          </div>
        ) : (
          <div>
            {/* Contextual Workspace Dynamic Dashboard Router */}
            <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h2 style={{ marginTop: 0, color: '#1a365d' }}>Welcome back, {user.fullname}!</h2>
              <p>Profile Context Authorization Flag: <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>{user.role}</span></p>
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
              
              {user.role === 'tenant' && (
                <div>
                  <h3>🎯 Tenant Room Search Workspace</h3>
                  <p>Search active properties directly across Kathmandu, Lalitpur, Pokhara, and more without broker fees.</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <input type="text" placeholder="Enter Location or District..." style={{ padding: '12px', width: '70%', borderRadius: '4px', border: '1px solid #cbd5e0' }} />
                    <button style={{ background: '#1a365d', color: 'white', padding: '0 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Search Rooms</button>
                  </div>
                </div>
              )}

              {user.role === 'landlord' && (
                <div>
                  <h3>🏢 Landlord Property Portfolio Control Panel</h3>
                  <p>List your rental properties, manage your tenants, and view rental application requests.</p>
                  <button style={{ background: '#2b6cb0', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    + List New Rental Property
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;