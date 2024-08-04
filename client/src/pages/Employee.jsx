import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';  // Adjust the import path as needed
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get('/employees')
        .then(response => {
          setEmployees(response.data.employees);
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Employees</h1>
      <ul className="bg-white shadow-md rounded-lg divide-y">
        {employees.map(employee => (
          <li key={employee.id} className="px-4 py-3 hover:bg-gray-50 text-gray-700">
            {employee.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;