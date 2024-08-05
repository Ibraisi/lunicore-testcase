import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';  // Adjust this import path as needed
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="text-white font-bold text-xl">Home</Link>
        {user ? (
          <div className="flex items-center space-x-4">
                <Link to='/employees' className="text-white hover:text-gray-300">Employees</Link>
                <Link to='/carmodels' className="text-white hover:text-gray-300">Car Models</Link>
                <Link to='/total-sales' className="text-white hover:text-gray-300">Total Sales</Link>
            {user.role === 'employee' && (
              <>
                <Link to='/dashboard' className="text-white hover:text-gray-300">Dashboard</Link>
              </>
            )}
            <span className="text-gray-300">Welcome, {user.email} ({user.role})</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to='/login' className="text-white hover:text-gray-300">Login</Link>
            <Link to='/register' className="text-white hover:text-gray-300">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}