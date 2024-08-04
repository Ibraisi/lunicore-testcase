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
    <div className="dashboard">
      {user.role === 'employee' && employeeDetails ? (
        <>
          <h1>Welcome to your Dashboard, {employeeDetails.name}!</h1>
          <div className="user-info">
            <p>Employee ID: {employeeDetails.id}</p>
            <p>Role: {user.role}</p>
            {/* Add more employee-specific information here */}
          </div>
        </>
      ) : (
        <>
          <h1>Welcome to your Dashboard!</h1>
          <div className="user-info">
            <p>User ID: {user.id}</p>
            <p>Role: {user.role}</p>
          </div>
        </>
      )}
    
    </div>
  );
}

export default Dashboard;