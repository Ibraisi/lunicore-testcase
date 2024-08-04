import './index.css'  // Make sure this imports your Tailwind CSS
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
    <UserContextProvider>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col">
          <Navbar />
          <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/employees' element={<Employees/>}/>
              <Route path="/carmodels" element={<CarModelPage />} />
              <Route path="/total-sales" element={<TotalSales />} />
            </Routes>
          </main>
        </div>
      </div>
    </UserContextProvider>
  )
}

export default App