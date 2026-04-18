import DriverDashboard from './DriverDashboard'
import OwnerDashboard from './OwnerDashboard'
import PlatformDashboard from './PlatformDashboard'
import SuperAdminDashboard from './SuperAdminDashboard'
import useAuthStore from '@/stores/useAuthStore'

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const role = user?.roles?.[0]

  if (role === 'SuperAdmin') return <SuperAdminDashboard />
  if (role === 'CarOwner') return <OwnerDashboard />
  if (role === 'Vendor') return <PlatformDashboard />
  return <DriverDashboard />
}
