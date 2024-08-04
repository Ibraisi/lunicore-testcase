
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'

import { UserContextProvider } from './context/UserContext'
import Dashboard from './pages/DashBoard'
import Employees from './pages/Employee'
import CarModelPage from './pages/CarModel'
import TotalSales from './pages/TotalSales'

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <UserContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path="/carmodels" element={<CarModelPage />} />
        <Route path="/total-sales" element={<TotalSales />} />

      </Routes>
    </UserContextProvider>
    </>
  )
}

export default App
