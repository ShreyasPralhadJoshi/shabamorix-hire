import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RoleSelect from './pages/RoleSelect'
import CandidateDashboard from './pages/CandidateDashboard'
import InterviewerDashboard from './pages/InterviewerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ResumePage from './pages/ResumePage'
import TestsPage from './pages/TestsPage'
import InterviewsPage from './pages/InterviewsPage'
import ProtectedRoute from './components/ProtectedRoute'   // <-- add this

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/role" element={<RoleSelect />} />

      {/* protected dashboards */}
      <Route
        path="/candidate"
        element={
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewer"
        element={
          <ProtectedRoute>
            <InterviewerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* other pages (you can protect these later if needed) */}
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/tests" element={<TestsPage />} />
      <Route path="/interviews" element={<InterviewsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
