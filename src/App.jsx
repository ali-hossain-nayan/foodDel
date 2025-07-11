import './App.css'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrder/MyOrders'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import Login from './components/Login/Login'
import { Toaster } from 'react-hot-toast'

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
          },
        }}
      />
      </div>
      <Footer />
    </>
  )
}

export default App
