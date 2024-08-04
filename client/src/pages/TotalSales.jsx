import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function TotalSales() {
  const [salesData, setSalesData] = useState([]);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios.get('/total_sales')
        .then(response => {
          setSalesData(response.data.employees);
        })
        .catch(error => {
          console.error('Error fetching total sales:', error);
        });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="total-sales">
      <h1>Total Sales</h1>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>${employee.sales.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}