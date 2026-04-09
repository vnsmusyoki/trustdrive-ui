import DriverDashboard from './DriverDashboard'
import OwnerDashboard from './OwnerDashboard'
import PlatformDashboard from './PlatformDashboard'
import SuperAdminDashboard from './SuperAdminDashboard'

function normalizeRole(value) {
  if (value === 'driver' || value === 'owner' || value === 'platform' || value === 'super_admin') return value
  return 'driver'
}

export default function Dashboard({ role }) {
  const assignedRole = normalizeRole(role || localStorage.getItem('trustdrive-user-role'))

  if (assignedRole === 'super_admin') return <SuperAdminDashboard />
  if (assignedRole === 'owner') return <OwnerDashboard />
  if (assignedRole === 'platform') return <PlatformDashboard />
  return <DriverDashboard />
}
