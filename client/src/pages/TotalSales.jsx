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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6  text-gray-800 ">Total Sales</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Total Sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {salesData.map(employee => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-700">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-700">${employee.sales.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}