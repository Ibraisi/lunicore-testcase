import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';  // Adjust this import path as needed

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    // Optionally, you can add a redirect here if needed
    // navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to='/' style={styles.link}>Home</Link>
      {user ? (
        <div style={styles.userSection}>
          <Link to='/dashboard' style={styles.link}>Dashboard</Link>
          {user.role === 'employee' && (
            <>
              <Link to='/employees' style={styles.link}>Employees</Link>
              <Link to='/carmodels' style={styles.link}>Car Models</Link>
              <Link to='/total-sales' style={styles.link}>Total Sales</Link>
            </>
          )}
          <span style={styles.welcomeMessage}>Welcome, {user.email} ({user.role})</span>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      ) : (
        <div style={styles.authSection}>
          <Link to='/login' style={styles.link}>Login</Link>
          <Link to='/register' style={styles.link}>Register</Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    marginRight: '1rem',
    fontWeight: 'bold',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  authSection: {
    display: 'flex',
  },
  welcomeMessage: {
    marginRight: '1rem',
    color: '#6c757d',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};