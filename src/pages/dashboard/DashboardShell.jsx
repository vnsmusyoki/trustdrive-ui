import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'


const palette = {
  bg: 'var(--color-bg-main)',
  card: 'var(--color-bg-card)',
  border: 'var(--color-bg-border)',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  primary: 'var(--color-primary-main)',
  primaryDark: 'var(--color-primary-dark)',
  success: 'var(--color-status-success)',
  warning: 'var(--color-status-warning)',
  danger: 'var(--color-status-danger)',
}

const roleContent = {
  driver: {
    label: 'Driver',
    headline: 'Driver performance command center',
    subtitle: 'Monitor trust score, route consistency, recent reviews, and document readiness across your rental activity.',
    trustScore: '4.92',
    status: 'Top 8% of verified drivers',
    summary: [
      { label: 'Trips completed', value: '148', change: '+12 this month', meta: '26 in the last 7 days' },
      { label: 'Acceptance rate', value: '96%', change: '+4.1%', meta: 'Higher than regional average' },
      { label: 'Earnings verified', value: '$8.4k', change: '+9.6%', meta: 'Across connected platforms' },
      { label: 'Profile completion', value: '88%', change: '1 item missing', meta: 'Insurance renewal pending' },
    ],
    pulse: [
      { label: 'Punctuality', value: 97, benchmark: 90 },
      { label: 'Completion quality', value: 94, benchmark: 88 },
      { label: 'Passenger sentiment', value: 91, benchmark: 86 },
      { label: 'Document readiness', value: 82, benchmark: 95 },
    ],
    priorities: [
      { title: 'Upload refreshed insurance document', detail: 'Your profile is almost complete. Renew the insurance file before 18 Apr 2026 to maintain premium visibility.', owner: 'Compliance', due: '18 Apr', tone: 'warning' },
      { title: 'Approve two new platform access requests', detail: 'New marketplaces want to verify your reputation history before onboarding.', owner: 'Account', due: 'Today', tone: 'primary' },
      { title: 'Review recent passenger comments', detail: 'One review mentions route communication. Addressing it can strengthen your score trend.', owner: 'Feedback', due: 'Tomorrow', tone: 'success' },
    ],
    activity: [
      { title: 'Airport transfer closed', meta: '5 minutes ago', detail: 'Trip score verified and added to reputation history.', tone: 'success' },
      { title: 'Document reminder issued', meta: '1 hour ago', detail: 'Insurance certificate will expire in 9 days.', tone: 'warning' },
      { title: 'New review received', meta: 'Today, 09:12', detail: 'A five-star review praised professionalism and punctuality.', tone: 'primary' },
      { title: 'Background check synced', meta: 'Yesterday', detail: 'TrustDrive synced a successful verification from a connected platform.', tone: 'success' },
    ],
    benchmarks: [
      { label: 'Late arrival incidents', value: '1.3%', benchmark: '3.0% target' },
      { label: 'Verification depth', value: '6 badges', benchmark: '5 required' },
      { label: 'Review response time', value: '2h', benchmark: '4h target' },
    ],
    actions: [
      { label: 'Start trip log', meta: 'Capture a new verified trip' },
      { label: 'Review feedback', meta: 'Open your latest ratings and comments' },
      { label: 'Upload document', meta: 'Update compliance files and proofs' },
    ],
    spotlight: {
      title: 'Reliability trend',
      detail: 'Six consecutive weeks above target on punctuality and trip completion quality.',
      metrics: [
        { label: 'On-time arrivals', value: '97%' },
        { label: 'Verified badges', value: '6' },
        { label: 'Recent reviews', value: '22' },
      ],
    },
    checklist: [
      { label: 'Government ID verified', done: true },
      { label: 'Insurance document renewed', done: false },
      { label: 'Bank payout account linked', done: true },
      { label: 'Emergency contact updated', done: true },
    ],
  },
  owner: {
    label: 'Owner',
    headline: 'Fleet trust and rental oversight',
    subtitle: 'See vehicle utilization, trusted driver approvals, claims signals, and payout health from one operational dashboard.',
    trustScore: '4.87',
    status: 'Fleet confidence performing above market',
    summary: [
      { label: 'Active vehicles', value: '24', change: '+3 onboarded', meta: '4 more in review' },
      { label: 'Utilization rate', value: '81%', change: '+6.4%', meta: 'Weekend demand is strongest' },
      { label: 'Verified revenue', value: '$31.6k', change: '+11.2%', meta: 'Across 3 rental channels' },
      { label: 'Claims alerts', value: '2', change: 'No critical issues', meta: 'Below monthly risk baseline' },
    ],
    pulse: [
      { label: 'Fleet utilization', value: 81, benchmark: 72 },
      { label: 'Driver approval quality', value: 92, benchmark: 85 },
      { label: 'Claims control', value: 89, benchmark: 80 },
      { label: 'Vehicle readiness', value: 93, benchmark: 90 },
    ],
    priorities: [
      { title: 'Approve 18 pending drivers', detail: 'Focus on premium-tier drivers waiting for access to high-value vehicles.', owner: 'Operations', due: 'Today', tone: 'primary' },
      { title: 'Resolve one late-return pattern', detail: 'A compact segment vehicle has repeat overrun incidents from one location.', owner: 'Risk', due: '17 Apr', tone: 'warning' },
      { title: 'Reconcile three outstanding payouts', detail: 'Partner platforms have finalized transactions but not yet released settlement.', owner: 'Finance', due: 'Tomorrow', tone: 'success' },
    ],
    activity: [
      { title: 'Vehicle profile approved', meta: '12 minutes ago', detail: 'A new SUV listing passed image and document validation.', tone: 'success' },
      { title: 'Late return flagged', meta: '47 minutes ago', detail: 'One renter returned a vehicle 56 minutes past the agreed window.', tone: 'warning' },
      { title: 'Driver review submitted', meta: 'Today, 10:30', detail: 'A verified driver was elevated to preferred status for executive bookings.', tone: 'primary' },
      { title: 'Insurance check completed', meta: 'Yesterday', detail: 'All active vehicles passed automated policy checks.', tone: 'success' },
    ],
    benchmarks: [
      { label: 'Booking fill rate', value: '81%', benchmark: '74% target' },
      { label: 'Incident frequency', value: '0.8%', benchmark: '1.5% target' },
      { label: 'Payout delay', value: '1.2 days', benchmark: '2.0 days target' },
    ],
    actions: [
      { label: 'Approve drivers', meta: 'Open the pending approval queue' },
      { label: 'Review fleet health', meta: 'Inspect readiness and downtime signals' },
      { label: 'Export payouts', meta: 'Download current reconciliation report' },
    ],
    spotlight: {
      title: 'Fleet confidence snapshot',
      detail: 'Top-performing vehicles are maintaining stronger ratings with fewer claims and better repeat usage.',
      metrics: [
        { label: 'Top rated cars', value: '9' },
        { label: 'Avg. incident score', value: '0.8%' },
        { label: 'Monthly bookings', value: '214' },
      ],
    },
    checklist: [
      { label: 'Fleet insurance validated', done: true },
      { label: 'Preferred driver rules updated', done: true },
      { label: 'Claims archive reviewed', done: false },
      { label: 'Payout account audit passed', done: true },
    ],
  },
  platform: {
    label: 'Platform',
    headline: 'Platform trust intelligence hub',
    subtitle: 'Coordinate moderation, adoption, reputation portability, and sync reliability across enterprise mobility operations.',
    trustScore: '98.4',
    status: 'Enterprise network within compliance target',
    summary: [
      { label: 'Active partners', value: '56', change: '+8 this quarter', meta: '2 enterprise activations pending' },
      { label: 'Verified users', value: '18.2K', change: '+1.3K', meta: 'Cross-platform trust profiles synced' },
      { label: 'Sync uptime', value: '99.98%', change: 'Stable', meta: 'Latency within SLA across regions' },
      { label: 'Risk escalations', value: '7', change: '-3 this week', meta: 'Backlog below threshold' },
    ],
    pulse: [
      { label: 'API reliability', value: 99, benchmark: 97 },
      { label: 'Moderation efficiency', value: 91, benchmark: 84 },
      { label: 'Partner adoption', value: 88, benchmark: 79 },
      { label: 'Cross-check coverage', value: 92, benchmark: 85 },
    ],
    priorities: [
      { title: 'Review seven escalated trust cases', detail: 'Moderation has already triaged each case. Final action is pending platform policy review.', owner: 'Trust Ops', due: 'Today', tone: 'danger' },
      { title: 'Approve two enterprise API requests', detail: 'New partners are requesting write access to verification endpoints.', owner: 'Platform', due: '16 Apr', tone: 'primary' },
      { title: 'Finalize monthly partner report', detail: 'The latest rollout improved cross-platform checks by 24% across premium accounts.', owner: 'Insights', due: 'Tomorrow', tone: 'success' },
    ],
    activity: [
      { title: 'Partner API synced', meta: '2 minutes ago', detail: 'A regional marketplace completed its latest review import cycle.', tone: 'success' },
      { title: 'Risk case escalated', meta: '29 minutes ago', detail: 'A repeat-offender cluster triggered the enhanced moderation workflow.', tone: 'danger' },
      { title: 'Usage report generated', meta: 'Today, 08:45', detail: 'Monthly portability metrics were delivered to the enterprise dashboard queue.', tone: 'primary' },
      { title: 'Trust model recalibrated', meta: 'Yesterday', detail: 'Confidence weighting for verified behavior patterns was adjusted.', tone: 'success' },
    ],
    benchmarks: [
      { label: 'Cross-check match rate', value: '92%', benchmark: '85% target' },
      { label: 'Moderation cycle time', value: '18 min', benchmark: '25 min target' },
      { label: 'Partner retention', value: '97%', benchmark: '92% target' },
    ],
    actions: [
      { label: 'Review escalations', meta: 'Open unresolved moderation cases' },
      { label: 'Open partner report', meta: 'See performance and adoption trends' },
      { label: 'Manage API access', meta: 'Approve and rotate partner credentials' },
    ],
    spotlight: {
      title: 'Network trust pulse',
      detail: 'Verification quality and partner adoption continue to outperform the operating benchmark.',
      metrics: [
        { label: 'Cross-check matches', value: '92%' },
        { label: 'Connected platforms', value: '14' },
        { label: 'Weekly incidents', value: '31' },
      ],
    },
    checklist: [
      { label: 'Regional sync audits passed', done: true },
      { label: 'Moderation policy review completed', done: false },
      { label: 'Partner SLA report published', done: true },
      { label: 'Key rotation policy enforced', done: true },
    ],
  },
  super_admin: {
    label: 'Super Admin',
    headline: 'System-wide governance and control center',
    subtitle: 'Oversee account governance, cross-role permissions, security posture, and platform-wide performance from one command workspace.',
    trustScore: '99.2',
    status: 'Global operations and compliance are healthy',
    summary: [
      { label: 'Total active accounts', value: '18.9K', change: '+1.6K this month', meta: 'Across all roles and partner nodes' },
      { label: 'Open escalations', value: '11', change: '-5 this week', meta: 'Within governance SLA window' },
      { label: 'Policy compliance', value: '98.7%', change: '+1.4%', meta: 'Audit threshold exceeded' },
      { label: 'Connected platforms', value: '14', change: '+2 new', meta: 'All endpoints verified' },
    ],
    pulse: [
      { label: 'Security health', value: 97, benchmark: 92 },
      { label: 'Moderation quality', value: 94, benchmark: 88 },
      { label: 'Policy adherence', value: 99, benchmark: 95 },
      { label: 'System reliability', value: 99, benchmark: 97 },
    ],
    priorities: [
      { title: 'Review global privilege updates', detail: 'Two new admins were added to tenant-level access lists and need final confirmation.', owner: 'Governance', due: 'Today', tone: 'primary' },
      { title: 'Close high-risk escalation cases', detail: 'Three incidents were flagged by behavior anomaly monitoring for immediate review.', owner: 'Security', due: 'Today', tone: 'danger' },
      { title: 'Publish monthly compliance bulletin', detail: 'Finalize the report for audit partners and regional platform regulators.', owner: 'Compliance', due: 'Tomorrow', tone: 'success' },
    ],
    activity: [
      { title: 'Global policy synced', meta: '8 minutes ago', detail: 'Policy package v2.6 was applied to all connected platform tenants.', tone: 'success' },
      { title: 'Critical risk flagged', meta: '35 minutes ago', detail: 'Unusual access pattern detected and queued for security triage.', tone: 'danger' },
      { title: 'Tenant audit generated', meta: 'Today, 09:20', detail: 'Automated compliance summary is available for executive review.', tone: 'primary' },
      { title: 'Retention policy updated', meta: 'Yesterday', detail: 'Data retention rules were aligned across all jurisdictions.', tone: 'success' },
    ],
    benchmarks: [
      { label: 'Mean incident response', value: '14 min', benchmark: '20 min target' },
      { label: 'Access review completion', value: '99%', benchmark: '95% target' },
      { label: 'Audit closure rate', value: '96%', benchmark: '90% target' },
    ],
    actions: [
      { label: 'Manage tenant roles', meta: 'Open global access control panel' },
      { label: 'Review incident queue', meta: 'Process high-priority escalations' },
      { label: 'Publish governance report', meta: 'Share executive compliance insights' },
    ],
    spotlight: {
      title: 'Governance pulse',
      detail: 'Security controls and role governance continue to exceed baseline targets system-wide.',
      metrics: [
        { label: 'Tenant risk score', value: 'Low' },
        { label: 'Policy packages', value: '32' },
        { label: 'Weekly audits', value: '118' },
      ],
    },
    checklist: [
      { label: 'Quarterly access audit completed', done: true },
      { label: 'Escalation playbook update approved', done: true },
      { label: 'Cross-region policy sync validated', done: true },
      { label: 'Executive compliance sign-off', done: false },
    ],
  },
}

const sidebarLinks = [
  { key: 'overview', label: 'Overview' },
  { key: 'performance', label: 'Performance' },
  { key: 'operations', label: 'Operations' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'settings', label: 'Settings' },
]

function getToneColor(tone) {
  if (tone === 'success') return palette.success
  if (tone === 'warning') return palette.warning
  if (tone === 'danger') return palette.danger
  return palette.primary
}

function getToneBackground(tone) {
  if (tone === 'success') return 'rgba(16, 185, 129, 0.12)'
  if (tone === 'warning') return 'rgba(245, 158, 11, 0.14)'
  if (tone === 'danger') return 'rgba(239, 68, 68, 0.12)'
  return 'rgba(37, 99, 235, 0.12)'
}

function NavIcon({ name, active }) {
  const color = active ? palette.primary : palette.textSecondary

  if (name === 'overview') {
    return (
      <svg className="h-4 w-4" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z" />
      </svg>
    )
  }

  if (name === 'performance') {
    return (
      <svg className="h-4 w-4" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7" />
      </svg>
    )
  }

  if (name === 'operations') {
    return (
      <svg className="h-4 w-4" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  if (name === 'compliance') {
    return (
      <svg className="h-4 w-4" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }

  return (
    <svg className="h-4 w-4" fill="none" stroke={color} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1 1 0 00.95.69h.969c.969 0 1.371 1.24.588 1.81l-.784.57a1 1 0 00-.364 1.118l.3.922c.3.921-.755 1.688-1.54 1.118l-.784-.57a1 1 0 00-1.176 0l-.784.57c-.784.57-1.838-.197-1.539-1.118l.3-.922a1 1 0 00-.364-1.118l-.784-.57c-.783-.57-.38-1.81.588-1.81h.97a1 1 0 00.95-.69z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v7m-4-4h8" />
    </svg>
  )
}

function SummaryCard({ item }) {
  return (
    <div
      className="rounded-[26px] border p-5"
      style={{
        backgroundColor: palette.card,
        borderColor: palette.border,
        boxShadow: '0 16px 34px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium" style={{ color: palette.textSecondary }}>{item.label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight" style={{ color: palette.text }}>{item.value}</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            color: palette.primary,
            backgroundColor: 'rgba(37, 99, 235, 0.12)',
          }}
        >
          {item.change}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6" style={{ color: palette.textSecondary }}>{item.meta}</p>
    </div>
  )
}

function SidebarItem({ active, item, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition"
      style={{
        color: active ? palette.primary : palette.textSecondary,
        backgroundColor: active ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
      }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: active ? 'rgba(37, 99, 235, 0.12)' : 'rgba(148, 163, 184, 0.08)' }}
      >
        <NavIcon name={item.key} active={active} />
      </span>
      <span className="flex-1">{item.label}</span>
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: active ? palette.primary : 'transparent' }}
      />
    </button>
  )
}

function PulseRow({ item }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold" style={{ color: palette.text }}>{item.label}</p>
        <p className="text-sm font-medium" style={{ color: palette.textSecondary }}>{item.value}%</p>
      </div>
      <div className="h-2.5 rounded-full" style={{ backgroundColor: 'rgba(148, 163, 184, 0.12)' }}>
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${item.value}%`,
            background: `linear-gradient(90deg, ${palette.primary} 0%, ${palette.primaryDark} 100%)`,
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs" style={{ color: palette.textSecondary }}>
        <span>Current</span>
        <span>Benchmark: {item.benchmark}%</span>
      </div>
    </div>
  )
}

function ActivityItem({ item }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border p-4" style={{ borderColor: palette.border, backgroundColor: palette.bg }}>
      <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: getToneColor(item.tone) }} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold" style={{ color: palette.text }}>{item.title}</p>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ color: getToneColor(item.tone), backgroundColor: getToneBackground(item.tone) }}
          >
            {item.meta}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6" style={{ color: palette.textSecondary }}>{item.detail}</p>
      </div>
    </div>
  )
}

function ChecklistItem({ item }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border px-4 py-3" style={{ borderColor: palette.border, backgroundColor: palette.bg }}>
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{
            backgroundColor: item.done ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.14)',
            color: item.done ? palette.success : palette.warning,
          }}
        >
          {item.done ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </span>
        <p className="text-sm font-medium" style={{ color: palette.text }}>{item.label}</p>
      </div>
      <span className="text-xs font-semibold" style={{ color: item.done ? palette.success : palette.warning }}>
        {item.done ? 'Done' : 'Pending'}
      </span>
    </div>
  )
}

export default function DashboardShell({ role = 'driver', embedded = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const { theme, toggleTheme } = useTheme()

  const currentRole = roleContent[role] ? role : 'driver'
  const dashboard = useMemo(() => roleContent[currentRole], [currentRole])
  const currentDate = useMemo(
    () => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
    []
  )

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: palette.bg }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(37, 99, 235, 0.12)' }} />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl" style={{ backgroundColor: theme === 'dark' ? 'rgba(124, 58, 237, 0.12)' : 'rgba(59, 130, 246, 0.08)' }} />
      </div>

      <div className="relative flex min-h-screen">
        {!embedded && sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        <aside
          className={`${embedded ? 'hidden' : 'fixed inset-y-0 left-0 z-40'} w-80 transform border-r transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.96)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: palette.border,
            backdropFilter: 'blur(18px)',
          }}
        >
          <div className="flex h-full flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark} 100%)` }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold tracking-tight" style={{ color: palette.text }}>DriveTrust</p>
                  <p className="text-xs uppercase tracking-[0.28em]" style={{ color: palette.textSecondary }}>
                    {dashboard.label} workspace
                  </p>
                </div>
              </Link>

              <button
                type="button"
                className="rounded-xl p-2 lg:hidden"
                style={{ color: palette.textSecondary }}
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="mt-8 rounded-[28px] border p-5"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(17, 24, 39, 0.94) 100%)'
                  : 'linear-gradient(180deg, rgba(37, 99, 235, 0.12) 0%, rgba(255, 255, 255, 0.98) 100%)',
                borderColor: palette.border,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: palette.textSecondary }}>Trust score</p>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-4xl font-bold tracking-tight" style={{ color: palette.text }}>{dashboard.trustScore}</span>
                    <span className="mb-1 rounded-full px-3 py-1 text-xs font-semibold" style={{ color: palette.success, backgroundColor: 'rgba(16, 185, 129, 0.12)' }}>
                      Stable
                    </span>
                  </div>
                </div>
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border"
                  style={{ borderColor: 'rgba(37, 99, 235, 0.18)', backgroundColor: 'rgba(37, 99, 235, 0.08)' }}
                >
                  <span className="text-sm font-bold" style={{ color: palette.primary }}>A+</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6" style={{ color: palette.textSecondary }}>{dashboard.status}</p>
            </div>

            <div className="mt-8">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.26em]" style={{ color: palette.textSecondary }}>
                Navigation
              </p>
              <nav className="space-y-2">
                {sidebarLinks.map((item) => (
                  <SidebarItem
                    key={item.key}
                    item={item}
                    active={activeSection === item.key}
                    onClick={() => {
                      setActiveSection(item.key)
                      setSidebarOpen(false)
                    }}
                  />
                ))}
              </nav>
            </div>

            <div className="mt-8 rounded-2xl border p-4" style={{ borderColor: palette.border, backgroundColor: palette.bg }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: palette.textSecondary }}>
                Access scope
              </p>
              <p className="mt-2 text-sm font-semibold" style={{ color: palette.text }}>
                {dashboard.label} profile is active
              </p>
              <p className="mt-1 text-xs leading-5" style={{ color: palette.textSecondary }}>
                Role switching is restricted. Navigation is limited to links assigned to your authenticated profile.
              </p>
            </div>

            <div className="mt-auto rounded-[28px] border p-5" style={{ borderColor: palette.border, backgroundColor: palette.bg }}>
              <p className="text-sm font-semibold" style={{ color: palette.text }}>Need support?</p>
              <p className="mt-2 text-sm leading-6" style={{ color: palette.textSecondary }}>
                Open security controls, export records, or contact TrustDrive operations for incident support.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: palette.primary }}
              >
                Open support center
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header
            className={`${embedded ? 'hidden' : 'sticky top-0 z-20'} border-b backdrop-blur-xl`}
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(11, 18, 32, 0.8)' : 'rgba(249, 250, 251, 0.82)',
              borderColor: palette.border,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-2xl border p-3 lg:hidden"
                  style={{ borderColor: palette.border, color: palette.text }}
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: palette.primary }}>
                    {dashboard.label} dashboard
                  </p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: palette.text }}>
                    {dashboard.headline}
                  </h1>
                  <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>{currentDate}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
                <div
                  className="flex min-w-[220px] max-w-md flex-1 items-center gap-3 rounded-2xl border px-4 py-3"
                  style={{ backgroundColor: palette.card, borderColor: palette.border }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: palette.textSecondary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search activity, metrics, documents"
                    className="w-full bg-transparent text-sm outline-none"
                    style={{ color: palette.text }}
                  />
                </div>

                <button
                  type="button"
                  className="rounded-2xl border px-4 py-3 text-sm font-semibold transition"
                  style={{ borderColor: palette.border, color: palette.text, backgroundColor: palette.card }}
                >
                  Export report
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-2xl border px-4 py-3 text-sm font-medium transition"
                  style={{ borderColor: palette.border, color: palette.textSecondary, backgroundColor: palette.card }}
                >
                  {theme === 'light' ? 'Dark mode' : 'Light mode'}
                </button>

                <div className="flex items-center gap-3 rounded-2xl border px-4 py-3" style={{ borderColor: palette.border, backgroundColor: palette.card }}>
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryDark} 100%)` }}
                  >
                    AY
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: palette.text }}>Amina Yusuf</p>
                    <p className="text-xs" style={{ color: palette.textSecondary }}>{dashboard.label} account</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(330px,0.95fr)]">
              <section className="space-y-6">
                <div
                  className="overflow-hidden rounded-[32px] border p-6 sm:p-8"
                  style={{
                    borderColor: palette.border,
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 32%), linear-gradient(135deg, rgba(17, 24, 39, 0.96), rgba(11, 18, 32, 1))'
                      : 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.16), transparent 32%), linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(240, 245, 255, 1))',
                    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
                  }}
                >
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.85fr)] lg:items-end">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: palette.primary }}>Command center</p>
                      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: palette.text }}>
                        {dashboard.headline}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: palette.textSecondary }}>
                        {dashboard.subtitle}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          className="rounded-2xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                          style={{ backgroundColor: palette.primary }}
                        >
                          Generate insight report
                        </button>
                        <button
                          type="button"
                          className="rounded-2xl border px-5 py-3 text-sm font-semibold transition"
                          style={{ borderColor: palette.border, color: palette.text, backgroundColor: palette.card }}
                        >
                          Open audit trail
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[28px] border p-5" style={{ borderColor: 'rgba(37, 99, 235, 0.16)', backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.86)' : 'rgba(255, 255, 255, 0.88)' }}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium" style={{ color: palette.textSecondary }}>Trust pulse</p>
                          <p className="mt-2 text-4xl font-bold tracking-tight" style={{ color: palette.text }}>{dashboard.trustScore}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: palette.textSecondary }}>Section</p>
                          <p className="mt-1 text-sm font-semibold" style={{ color: palette.primary }}>{sidebarLinks.find((item) => item.key === activeSection)?.label}</p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        {dashboard.pulse.slice(0, 3).map((item) => (
                          <PulseRow key={item.label} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                  {dashboard.summary.map((item) => (
                    <SummaryCard key={item.label} item={item} />
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
                  <div className="rounded-[30px] border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: palette.text }}>Performance matrix</h3>
                        <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>Current performance against operating benchmarks.</p>
                      </div>
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: palette.primary, backgroundColor: 'rgba(37, 99, 235, 0.12)' }}>
                        Live tracking
                      </span>
                    </div>

                    <div className="mt-6 space-y-5">
                      {dashboard.pulse.map((item) => (
                        <PulseRow key={item.label} item={item} />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[30px] border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                    <h3 className="text-xl font-bold" style={{ color: palette.text }}>Operational benchmarks</h3>
                    <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>How the current account compares to baseline targets.</p>

                    <div className="mt-6 space-y-3">
                      {dashboard.benchmarks.map((item) => (
                        <div key={item.label} className="rounded-3xl border p-4" style={{ borderColor: palette.border, backgroundColor: palette.bg }}>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: palette.textSecondary }}>{item.label}</p>
                          <div className="mt-2 flex items-end justify-between gap-4">
                            <p className="text-2xl font-bold" style={{ color: palette.text }}>{item.value}</p>
                            <p className="text-xs font-semibold" style={{ color: palette.primary }}>{item.benchmark}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.8fr)]">
                  <div className="rounded-[30px] border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: palette.text }}>Priority board</h3>
                        <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>What needs attention next.</p>
                      </div>
                      <button type="button" className="text-sm font-semibold" style={{ color: palette.primary }}>
                        View workflow
                      </button>
                    </div>

                    <div className="mt-6 space-y-4">
                      {dashboard.priorities.map((item, index) => (
                        <div key={item.title} className="rounded-[28px] border p-5" style={{ borderColor: palette.border, backgroundColor: palette.bg }}>
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <span
                                className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-white"
                                style={{ backgroundColor: index === 1 ? palette.warning : getToneColor(item.tone) }}
                              >
                                0{index + 1}
                              </span>
                              <div>
                                <p className="text-base font-semibold" style={{ color: palette.text }}>{item.title}</p>
                                <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: palette.textSecondary }}>{item.detail}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: getToneColor(item.tone), backgroundColor: getToneBackground(item.tone) }}>
                                {item.owner}
                              </span>
                              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: palette.textSecondary, backgroundColor: 'rgba(148, 163, 184, 0.12)' }}>
                                Due {item.due}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[30px] border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                    <h3 className="text-xl font-bold" style={{ color: palette.text }}>Quick actions</h3>
                    <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>High-frequency tasks for this workspace.</p>

                    <div className="mt-6 space-y-3">
                      {dashboard.actions.map((action) => (
                        <button
                          key={action.label}
                          type="button"
                          className="flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition hover:opacity-90"
                          style={{ borderColor: palette.border, backgroundColor: palette.bg }}
                        >
                          <div>
                            <p className="text-sm font-semibold" style={{ color: palette.text }}>{action.label}</p>
                            <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>{action.meta}</p>
                          </div>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: palette.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <aside className="space-y-6">
                <div className="rounded-[30px] border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: palette.text }}>Recent activity</h3>
                      <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>Verified operational events and trust signals.</p>
                    </div>
                    <button type="button" className="text-sm font-semibold" style={{ color: palette.primary }}>
                      View all
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {dashboard.activity.map((item) => (
                      <ActivityItem key={item.title} item={item} />
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                  <h3 className="text-xl font-bold" style={{ color: palette.text }}>{dashboard.spotlight.title}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: palette.textSecondary }}>{dashboard.spotlight.detail}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    {dashboard.spotlight.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-3xl border p-4" style={{ borderColor: palette.border, backgroundColor: palette.bg }}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: palette.textSecondary }}>{metric.label}</p>
                        <p className="mt-2 text-2xl font-bold" style={{ color: palette.text }}>{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: palette.text }}>Readiness checklist</h3>
                      <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>Operational and compliance milestones.</p>
                    </div>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: palette.success, backgroundColor: 'rgba(16, 185, 129, 0.12)' }}>
                      {dashboard.checklist.filter((item) => item.done).length}/{dashboard.checklist.length} complete
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {dashboard.checklist.map((item) => (
                      <ChecklistItem key={item.label} item={item} />
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-[30px] border p-6"
                  style={{
                    borderColor: palette.border,
                    background: theme === 'dark'
                      ? 'linear-gradient(180deg, rgba(17, 24, 39, 1), rgba(30, 64, 175, 0.42))'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(219, 234, 254, 1))',
                  }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: palette.primary }}>Protection</p>
                  <h3 className="mt-3 text-2xl font-bold" style={{ color: palette.text }}>Security and compliance center</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: palette.textSecondary }}>
                    Review permissions, document expiry, API access, and audit controls from a single control surface.
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: palette.border, backgroundColor: 'rgba(255,255,255,0.04)' }}>
                      <span className="text-sm font-medium" style={{ color: palette.text }}>Threat monitoring</span>
                      <span className="text-xs font-semibold" style={{ color: palette.success }}>Normal</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: palette.border, backgroundColor: 'rgba(255,255,255,0.04)' }}>
                      <span className="text-sm font-medium" style={{ color: palette.text }}>Audit log retention</span>
                      <span className="text-xs font-semibold" style={{ color: palette.primary }}>365 days</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: palette.primary }}
                  >
                    Open control center
                  </button>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}