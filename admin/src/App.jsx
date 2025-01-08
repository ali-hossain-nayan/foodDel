import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddItems from './pages/AddItems/AddItems'
import ListItems from './pages/ListItems/ListItems'
import Orders from './pages/Orders/Orders'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>

      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className='flex'>
          <Sidebar />
          <Routes>
            <Route path='/add' element={<AddItems />} />
            <Route path='/list' element={<ListItems />} />
            <Route path='/order' element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
