import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import GuestLayout from './layouts/GuestLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RegisterDriverPage from './pages/RegisterDriverPage'
import RegisterOwnerPage from './pages/RegisterOwnerPage'
import RegisterPlatformPage from './pages/RegisterPlatformPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SetNewPasswordPage from './pages/SetNewPasswordPage'
import Dashboard from '@/pages/dashboard/Dashboard'
import AppLayout from '@/layouts/AppLayout'

function App() { 
  return (
    <>
    <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/driver" element={<RegisterDriverPage />} />
          <Route path="/register/owner" element={<RegisterOwnerPage />} />
          <Route path="/register/platform" element={<RegisterPlatformPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/set-new-password" element={<SetNewPasswordPage />} />
        </Route>
     

        <Route element={<AppLayout />} requiredRole={["driver", "owner", "platform"]}>
            <Route path="/home" element={<Dashboard />} />
        </Route>

        <Route element={<AppLayout />} requiredRole={["driver"]}>
           {/* driver related links */}
        </Route>

        <Route element={<AppLayout />} requiredRole={["owner"]}>
            {/* owner related links */}
        </Route>

        <Route element={<AppLayout />} requiredRole={["platform"]}>
            {/* platform related links */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
