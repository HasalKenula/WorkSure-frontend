import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import Payment from './pages/Payment'
import UserFeedback from './pages/UserFeedback'
import UserLogin from './pages/UserLogin'
import UserRegistration from './pages/UserRegistration'
import UserProfile from './pages/UserProfile'
import WorkerDashBoard from './pages/WorkerDashBoard'
import WorkerHire from './pages/WorkerHire'
import WorkerLogin from './pages/WorkerLogin'
import WorkerProfileView from './pages/WorkerProfileView'
import WorkerRegistration from './pages/WorkerRegistration'
import WorkerSearch from './pages/WorkerSearch'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path='/*' element={<HomePage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/feedback' element={<UserFeedback />} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/registration' element={<UserRegistration />} />
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/workerDashboard' element={<WorkerDashBoard />} />
        <Route path='/hire' element={<WorkerHire />} />
        <Route path='/workerLogin' element={<WorkerLogin />} />
        <Route path='/workerProfile' element={<WorkerProfileView />} />
        <Route path='/workerRegistration' element={<WorkerRegistration />} />
        <Route path='/workerDetails' element={<WorkerSearch />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
