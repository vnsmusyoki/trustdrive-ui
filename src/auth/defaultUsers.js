export const defaultUsers = [
  {
    id: 'driver-demo',
    name: 'Derek Driver',
    email: 'driver@trustdrive.com',
    password: 'Driver@123',
    role: 'driver',
    links: [
      { label: 'Home', to: '/home' },
      { label: 'Overview', to: '/home?section=overview' },
      { label: 'Trip Activity', to: '/home?section=trips' },
      { label: 'Ratings', to: '/home?section=ratings' },
      { label: 'Documents', to: '/home?section=documents' },
      { label: 'Earnings', to: '/home?section=earnings' },
    ],
  },
  {
    id: 'owner-demo',
    name: 'Olivia Owner',
    email: 'owner@trustdrive.com',
    password: 'Owner@123',
    role: 'owner',
    links: [
      { label: 'Home', to: '/home' },
      { label: 'Overview', to: '/home?section=overview' },
      { label: 'Fleet', to: '/home?section=fleet' },
      { label: 'Driver Requests', to: '/home?section=requests' },
      { label: 'Payouts', to: '/home?section=payouts' },
      { label: 'Claims', to: '/home?section=claims' },
    ],
  },
  {
    id: 'platform-demo',
    name: 'Peter Platform',
    email: 'platform@trustdrive.com',
    password: 'Platform@123',
    role: 'platform',
    links: [
      { label: 'Home', to: '/home' },
      { label: 'Overview', to: '/home?section=overview' },
      { label: 'Partners', to: '/home?section=partners' },
      { label: 'Moderation', to: '/home?section=moderation' },
      { label: 'API Health', to: '/home?section=api-health' },
      { label: 'Insights', to: '/home?section=insights' },
    ],
  },
  {
    id: 'super-admin-demo',
    name: 'Sophia Super Admin',
    email: 'superadmin@trustdrive.com',
    password: 'SuperAdmin@123',
    role: 'super_admin',
    links: [
      { label: 'Home', to: '/home' },
      { label: 'Overview', to: '/home?section=overview' },
      { label: 'User Governance', to: '/home?section=governance' },
      { label: 'System Audit', to: '/home?section=audit' },
      { label: 'Platform Settings', to: '/home?section=settings' },
      { label: 'Security Center', to: '/home?section=security' },
    ],
  },
]

export function getDefaultUserByCredentials(email, password) {
  const normalizedEmail = (email || '').trim().toLowerCase()
  return defaultUsers.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password
  )
}
