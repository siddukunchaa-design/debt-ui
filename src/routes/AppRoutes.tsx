import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import Chat from '../pages/Chat/Chat'
import Dashboard from '../pages/Dashboard/Dashboard'
import Debts from '../pages/Debts/Debts'
import Login from '../pages/Login/Login'
import Settings from '../pages/Settings/Settings'
import Users from '../pages/Users/Users'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/debts" element={<Debts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
