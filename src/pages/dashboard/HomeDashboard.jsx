import { Navigate } from 'react-router-dom'
import DriverDashboard from './DriverDashboard'
import OwnerDashboard from './OwnerDashboard'
import PlatformDashboard from './PlatformDashboard'
import useAuthStore from '@/stores/useAuthStore'

export default function HomeDashboard() {
  const user = useAuthStore((s) => s.user)
  const role = user?.roles?.[0]

  if (role === 'Driver') return <DriverDashboard />
  if (role === 'CarOwner') return <OwnerDashboard />
  if (role === 'Vendor') return <PlatformDashboard />

  return <Navigate to="/login" replace />
}
