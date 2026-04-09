import { Navigate, useOutletContext } from 'react-router-dom'
import DriverDashboard from './DriverDashboard'
import OwnerDashboard from './OwnerDashboard'
import PlatformDashboard from './PlatformDashboard'

export default function HomeDashboard() {
  const context = useOutletContext() || {}
  const role = context.role || localStorage.getItem('trustdrive-user-role')

  if (role === 'driver') return <DriverDashboard />
  if (role === 'owner') return <OwnerDashboard />
  if (role === 'platform') return <PlatformDashboard />

  return <Navigate to="/login" replace />
}
