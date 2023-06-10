import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Home, UserMenu, VehicleMenu, ServiceMenu } from './cotainers'
import { Navbar } from './components'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<NormalPage Page={Home} />} />
        <Route path='/users/*' element={<NormalPage Page={UserMenu} />} />
        <Route path='/vehicles/*' element={<NormalPage Page={VehicleMenu} />} />
        <Route path='/services/*' element={<NormalPage Page={ServiceMenu} />} />
      </Routes>
    </Router>
  )
}

const NormalPage = ({ Page }) => {
  return (
    <>
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Page />
    </>
  )
}

export default App
