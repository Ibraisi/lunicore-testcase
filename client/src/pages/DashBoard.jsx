import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';  // Adjust the import path as needed
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (user && user.role === 'employee') {
        try {
          const response = await axios.get(`employees/${user.employeeId}`);
          setEmployeeDetails(response.data);
        } catch (error) {
          console.error('Error fetching employee details:', error);
        }
      }
      setLoading(false);
    };

    fetchEmployeeDetails();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {user.role === 'employee' && employeeDetails ? (
        <>
          <h1 className="text-3xl font-bold mb-6  text-gray-800">Welcome to your Dashboard, {employeeDetails.name}!</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-lg mb-2  text-gray-700">Employee ID: {employeeDetails.id}</p>
            <p className="text-lg mb-2  text-gray-700">Role: {user.role}</p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to your Dashboard!</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-lg mb-2 text-gray-700">User ID: {user.id}</p>
            <p className="text-lg mb-2 text-gray-700">Role: {user.role}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;