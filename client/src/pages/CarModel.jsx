import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import AddCarForm from '../components/AddCar';

function CarModelPage() {
  const [carModels, setCarModels] = useState([]);
  const { user, loading } = useContext(UserContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get('/carmodels')
        .then(response => {
          setCarModels(response.data.carmodels);
        })
        .catch(error => {
          console.error('Error fetching car models:', error);
        });
    }
  }, [user, refreshTrigger]);

  const handleDelete = (id) => {
    axios.delete(`/carmodels/${id}`)
      .then(() => {
        setRefreshTrigger(prev => prev + 1);
      })
      .catch(error => {
        console.error('Error deleting car model:', error);
      });
  };

  const handleAddCar = (newCar) => {
    axios.post('/carmodels', newCar)
      .then(() => {
        setRefreshTrigger(prev => prev + 1);
        setShowAddForm(false);  // Close the form after adding
      })
      .catch(error => {
        console.error('Error adding new car model:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Car Models</h1>
      <button 
        onClick={() => setShowAddForm(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Add New Car
      </button>
      <ul className="mt-6 space-y-4">
        {carModels.map(car => (
          <li key={car.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center text-gray-700">
            <span className="text-lg">{car.brand} {car.model} - ${car.price}</span>
            <button 
              onClick={() => handleDelete(car.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
            <AddCarForm onAddCar={handleAddCar} />
            <button 
              onClick={() => setShowAddForm(false)}
              className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarModelPage;