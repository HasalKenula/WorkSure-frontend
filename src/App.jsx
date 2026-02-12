import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUsPage'
import ContactPage from './pages/ContactPage'
import Payment from './pages/Payment'
import UserFeedback from './pages/UserFeedback'
import UserProfile from './pages/UserProfile'
import WorkerDashBoard from './pages/WorkerDashBoard'
import WorkerHire from './pages/WorkerHire'
import WorkerProfileView from './pages/WorkerProfileView'
import WorkerRegistration from './pages/WorkerRegistration'
import WorkerSearch from './pages/WorkerSearch'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashBoard from './pages/AdminDashBoard'
import WorkerRegistrationDetails from './pages/WorkerRegistrationDetails'
import WorkerProfileUpdate from './pages/WorkerProfileUpdate'
import WorkerView from './pages/WorkerView'
import { Toaster } from 'react-hot-toast'
import WorkerProfileCard from './pages/WorkerProfileCard'
import WorkerProgress from './pages/WorkerProgress'
import PlanUpgradePage from './pages/PlanUpgradePage'
import MoneyTransferPage from './pages/MoneyTransferPage'
import WorkerBankDetailsPage from './pages/WorkerBankDetailsPage'
import ChatbotWidget from './chatbot/ChatbotWidget'
import TransferDetailsPage from './pages/TransferDetailsPage'
import AdminOnlyRoute from './components/AdminOnlyRoute'
import PaymentSIPUpload from './pages/PaymentSIPUpload'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path='/*' element={<HomePage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactPage />} />


          <Route element={<ProtectedRoute />}>
            <Route path='/payment' element={<Payment />} />
            <Route path='/feedback/:workerId' element={<UserFeedback />} />
            <Route path='/userProfile' element={<UserProfile />} />
            <Route path='/workerDashboard' element={<WorkerDashBoard />} />
            <Route path='/hire/:workerId' element={<WorkerHire />} />
            <Route path='/workerProfile' element={<WorkerProfileView />} />
            <Route path='/workerRegistration' element={<WorkerRegistration />} />
            <Route path='/workerDetails' element={<WorkerSearch />} />

            <Route path="/workerRegistrationDetails/:workerId" element={<WorkerRegistrationDetails />} />
            <Route path="/workerProfileUpdate" element={<WorkerProfileUpdate />} />
            <Route path='/workerView/:userId' element={<WorkerView />} />
            <Route path='/workerCard/:workerId' element={<WorkerProfileCard />} />
            <Route path='/WorkerProgress/:workerId' element={<WorkerProgress />} />
            <Route path='/planUpgradePage' element={<PlanUpgradePage />} />
            <Route path='/transfer' element={<MoneyTransferPage />} />
            <Route path='/bank' element={<WorkerBankDetailsPage />} />
            <Route path="/workerTransfers/:workerId" element={<TransferDetailsPage />} />
            <Route path='/slip/:workerId' element={<PaymentSIPUpload />} />

          </Route>

          <Route element={<AdminOnlyRoute />}>
            <Route path="/adminDashBoard" element={<AdminDashBoard />} />
          </Route>

        </Routes>
        <ChatbotWidget />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
