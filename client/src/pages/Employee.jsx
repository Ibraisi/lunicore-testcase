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
    <div className="employees">
      <h1>Employees</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;