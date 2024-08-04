import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import AddCarForm from '../components/AddCar';

function CarModelPage() {
  const [carModels, setCarModels] = useState([]);
  const { user, loading } = useContext(UserContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
    <div className="car-model-page">
      <h1>Car Models</h1>
      <AddCarForm onAddCar={handleAddCar} />
      <ul>
        {carModels.map(car => (
          <li key={car.id}>
            {car.brand} {car.model} - ${car.price}
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarModelPage;