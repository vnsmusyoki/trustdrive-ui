import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Search, Car, Star, TrendingUp, AlertTriangle, Shield,
  Phone, Mail, MapPin, ChevronDown, ChevronUp, DollarSign,
  BadgeCheck, Clock, Filter, BarChart3, Eye, Ban, PieChart,
  Activity, Wallet, Scale, UserCheck, UserX, Calendar,
  ArrowUpRight, ArrowDownRight, Gauge, Plus, Target,
} from 'lucide-react';

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
};

// ─── Mock owner data ───────────────────────────────────────────────────────────
const OWNERS = [
  {
    id: 'o1', name: 'Samuel Kamau', email: 'samuel.kamau@email.com', phone: '+254712345678',
    location: 'Nairobi', joinedDate: '2023-02-15', status: 'Verified',
    vehicles: 8, activeVehicles: 7, rating: 4.7, totalRevenue: 284000,
    monthlyRevenue: 47300, lastMonthRevenue: 44100, disputes: 0, pendingPayouts: 12500,
    businessType: 'Fleet Management Company', avatar: null,
    monthlyRevenueHistory: [38000, 40200, 42500, 44100, 47300, 49000],
    vehicleTypes: { sedan: 4, suv: 2, van: 1, other: 1 },
    complianceScore: 96,
  },
  {
    id: 'o2', name: 'Grace Wanjiru', email: 'grace.wanjiru@email.com', phone: '+254723456789',
    location: 'Mombasa', joinedDate: '2023-05-20', status: 'Verified',
    vehicles: 4, activeVehicles: 4, rating: 4.9, totalRevenue: 156000,
    monthlyRevenue: 26000, lastMonthRevenue: 24800, disputes: 0, pendingPayouts: 8200,
    businessType: 'Individual Owner', avatar: null,
    monthlyRevenueHistory: [21000, 22500, 23800, 24800, 26000, 27200],
    vehicleTypes: { sedan: 3, suv: 1, van: 0, other: 0 },
    complianceScore: 100,
  },
  {
    id: 'o3', name: 'Peter Odhiambo', email: 'peter.odhiambo@email.com', phone: '+254734567890',
    location: 'Kisumu', joinedDate: '2023-08-10', status: 'Pending',
    vehicles: 2, activeVehicles: 1, rating: 3.8, totalRevenue: 42000,
    monthlyRevenue: 7000, lastMonthRevenue: 6800, disputes: 1, pendingPayouts: 3500,
    businessType: 'Individual Owner', avatar: null,
    monthlyRevenueHistory: [5500, 6000, 6200, 6800, 7000, 7200],
    vehicleTypes: { sedan: 1, suv: 1, van: 0, other: 0 },
    complianceScore: 62,
  },
  {
    id: 'o4', name: 'Janet Muthoni', email: 'janet.muthoni@email.com', phone: '+254745678901',
    location: 'Nairobi', joinedDate: '2022-11-05', status: 'Verified',
    vehicles: 12, activeVehicles: 10, rating: 4.5, totalRevenue: 520000,
    monthlyRevenue: 86600, lastMonthRevenue: 82000, disputes: 2, pendingPayouts: 22000,
    businessType: 'Limited Company', avatar: null,
    monthlyRevenueHistory: [72000, 75000, 78500, 82000, 86600, 90000],
    vehicleTypes: { sedan: 5, suv: 3, van: 3, other: 1 },
    complianceScore: 88,
  },
  {
    id: 'o5', name: 'David Kipchoge', email: 'david.kip@email.com', phone: '+254756789012',
    location: 'Eldoret', joinedDate: '2024-01-12', status: 'Suspended',
    vehicles: 3, activeVehicles: 0, rating: 2.1, totalRevenue: 18000,
    monthlyRevenue: 0, lastMonthRevenue: 3200, disputes: 5, pendingPayouts: 0,
    businessType: 'Individual Owner', avatar: null,
    monthlyRevenueHistory: [4500, 4200, 3800, 3200, 0, 0],
    vehicleTypes: { sedan: 2, suv: 0, van: 1, other: 0 },
    complianceScore: 18,
  },
  {
    id: 'o6', name: 'Anne Nyambura', email: 'anne.nyambura@email.com', phone: '+254767890123',
    location: 'Nakuru', joinedDate: '2023-09-25', status: 'Verified',
    vehicles: 6, activeVehicles: 5, rating: 4.3, totalRevenue: 198000,
    monthlyRevenue: 33000, lastMonthRevenue: 31000, disputes: 1, pendingPayouts: 9800,
    businessType: 'Sole Proprietorship', avatar: null,
    monthlyRevenueHistory: [26000, 28000, 29500, 31000, 33000, 34500],
    vehicleTypes: { sedan: 3, suv: 2, van: 1, other: 0 },
    complianceScore: 85,
  },
  {
    id: 'o7', name: 'Francis Muriuki', email: 'francis.m@email.com', phone: '+254778901234',
    location: 'Thika', joinedDate: '2024-03-01', status: 'Pending',
    vehicles: 1, activeVehicles: 0, rating: 0, totalRevenue: 0,
    monthlyRevenue: 0, lastMonthRevenue: 0, disputes: 0, pendingPayouts: 0,
    businessType: 'Individual Owner', avatar: null,
    monthlyRevenueHistory: [0, 0, 0, 0, 0, 0],
    vehicleTypes: { sedan: 1, suv: 0, van: 0, other: 0 },
    complianceScore: 45,
  },
  {
    id: 'o8', name: 'Mercy Achieng', email: 'mercy.achieng@email.com', phone: '+254789012345',
    location: 'Nairobi', joinedDate: '2023-06-18', status: 'Verified',
    vehicles: 5, activeVehicles: 5, rating: 4.6, totalRevenue: 175000,
    monthlyRevenue: 29200, lastMonthRevenue: 27500, disputes: 0, pendingPayouts: 7600,
    businessType: 'Partnership', avatar: null,
    monthlyRevenueHistory: [23000, 24500, 26000, 27500, 29200, 30800],
    vehicleTypes: { sedan: 2, suv: 2, van: 1, other: 0 },
    complianceScore: 94,
  },
];

// ─── Mock leads data ──────────────────────────────────────────────────────────
const LEADS = [
  {
    id: 'l1', name: 'James Mwangi', email: 'james.mwangi@email.com', phone: '+254711223344',
    location: 'Nairobi', source: 'Website', status: 'New',
    interestedVehicles: 3, estimatedRevenue: 15000, notes: 'Interested in sedan fleet management',
    submittedDate: '2024-04-10', followUpDate: '2024-04-15', assignedTo: 'Anne K.',
    businessType: 'Fleet Management Company', priority: 'High',
  },
  {
    id: 'l2', name: 'Sarah Njeri', email: 'sarah.njeri@email.com', phone: '+254722334455',
    location: 'Mombasa', source: 'Referral', status: 'Contacted',
    interestedVehicles: 1, estimatedRevenue: 5000, notes: 'Referred by Grace Wanjiru, owns 1 SUV',
    submittedDate: '2024-04-05', followUpDate: '2024-04-12', assignedTo: 'Peter M.',
    businessType: 'Individual Owner', priority: 'Medium',
  },
  {
    id: 'l3', name: 'Michael Ouma', email: 'michael.ouma@email.com', phone: '+254733445566',
    location: 'Kisumu', source: 'Social Media', status: 'Qualified',
    interestedVehicles: 5, estimatedRevenue: 25000, notes: 'Runs a transport company, wants full platform onboarding',
    submittedDate: '2024-03-28', followUpDate: '2024-04-08', assignedTo: 'Anne K.',
    businessType: 'Limited Company', priority: 'High',
  },
  {
    id: 'l4', name: 'Lucy Wambui', email: 'lucy.w@email.com', phone: '+254744556677',
    location: 'Nakuru', source: 'Website', status: 'Proposal Sent',
    interestedVehicles: 2, estimatedRevenue: 10000, notes: 'Interested in partnership model for her 2 vans',
    submittedDate: '2024-03-20', followUpDate: '2024-04-05', assignedTo: 'Peter M.',
    businessType: 'Sole Proprietorship', priority: 'Medium',
  },
  {
    id: 'l5', name: 'Robert Kiptoo', email: 'robert.k@email.com', phone: '+254755667788',
    location: 'Eldoret', source: 'Cold Call', status: 'New',
    interestedVehicles: 1, estimatedRevenue: 4000, notes: 'First-time car owner, needs education on platform',
    submittedDate: '2024-04-12', followUpDate: '2024-04-18', assignedTo: null,
    businessType: 'Individual Owner', priority: 'Low',
  },
  {
    id: 'l6', name: 'Esther Mumbi', email: 'esther.m@email.com', phone: '+254766778899',
    location: 'Nairobi', source: 'Referral', status: 'Negotiation',
    interestedVehicles: 8, estimatedRevenue: 40000, notes: 'Large fleet, negotiating commission rates',
    submittedDate: '2024-03-15', followUpDate: '2024-04-02', assignedTo: 'Anne K.',
    businessType: 'Fleet Management Company', priority: 'High',
  },
  {
    id: 'l7', name: 'Patrick Otieno', email: 'patrick.o@email.com', phone: '+254777889900',
    location: 'Thika', source: 'Website', status: 'Lost',
    interestedVehicles: 2, estimatedRevenue: 8000, notes: 'Chose competitor platform. Cited pricing.',
    submittedDate: '2024-02-20', followUpDate: null, assignedTo: 'Peter M.',
    businessType: 'Individual Owner', priority: 'Medium',
  },
  {
    id: 'l8', name: 'Faith Chebet', email: 'faith.c@email.com', phone: '+254788990011',
    location: 'Nairobi', source: 'Social Media', status: 'Converted',
    interestedVehicles: 4, estimatedRevenue: 20000, notes: 'Successfully onboarded as owner o8 (Mercy Achieng referral)',
    submittedDate: '2024-01-10', followUpDate: null, assignedTo: 'Anne K.',
    businessType: 'Partnership', priority: 'High',
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function statusColor(s) {
  if (s === 'Verified') return palette.success;
  if (s === 'Pending') return palette.warning;
  return palette.danger;
}
function statusBg(s) {
  if (s === 'Verified') return 'rgba(16,185,129,0.12)';
  if (s === 'Pending') return 'rgba(245,158,11,0.14)';
  return 'rgba(239,68,68,0.12)';
}

function leadStatusColor(s) {
  const map = {
    New: palette.primary, Contacted: '#6366F1', Qualified: palette.warning,
    'Proposal Sent': '#8B5CF6', Negotiation: '#D97706', Converted: palette.success, Lost: palette.danger,
  };
  return map[s] || palette.textSecondary;
}
function leadStatusBg(s) {
  const map = {
    New: 'rgba(37,99,235,0.12)', Contacted: 'rgba(99,102,241,0.12)', Qualified: 'rgba(217,119,6,0.12)',
    'Proposal Sent': 'rgba(139,92,246,0.12)', Negotiation: 'rgba(217,119,6,0.15)', Converted: 'rgba(5,150,105,0.12)', Lost: 'rgba(220,38,38,0.12)',
  };
  return map[s] || 'rgba(148,163,184,0.1)';
}
function priorityColor(p) {
  if (p === 'High') return palette.danger;
  if (p === 'Medium') return palette.warning;
  return palette.textSecondary;
}
function priorityBg(p) {
  if (p === 'High') return 'rgba(220,38,38,0.1)';
  if (p === 'Medium') return 'rgba(217,119,6,0.1)';
  return 'rgba(148,163,184,0.08)';
}

function Badge({ label, color, bg }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color, backgroundColor: bg }}>
      {label}
    </span>
  );
}

function Card({ title, icon: Icon, iconColor, children }) {
  return (
    <div className="rounded-2xl border p-5" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
      {title && (
        <div className="mb-4 flex items-center gap-2">
          {Icon && <Icon size={16} style={{ color: iconColor || palette.primary }} />}
          <h3 className="text-sm font-bold" style={{ color: palette.text }}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

function ProgressBar({ value, color, height = 6 }) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(148,163,184,0.15)', height }}>
      <div className="rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: '100%', backgroundColor: color }} />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xl font-bold" style={{ color: palette.text }}>{value}</div>
        <div className="text-xs" style={{ color: palette.textSecondary }}>{label}</div>
        {sub && <div className="text-[10px]" style={{ color }}>{sub}</div>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-0.5 text-[10px] font-semibold" style={{ color: trend >= 0 ? palette.success : palette.danger }}>
          {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}

// ─── Leads Tab Component ───────────────────────────────────────────────────────
function LeadsTab({ palette, leadSearch, setLeadSearch, leadFilter, setLeadFilter, navigate }) {
  const [expandedLead, setExpandedLead] = useState(null);

  const leadStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost'];

  const leadStats = useMemo(() => {
    const total = LEADS.length;
    const byStatus = {};
    leadStatuses.forEach(s => { byStatus[s] = LEADS.filter(l => l.status === s).length; });
    const totalEstimatedRev = LEADS.filter(l => l.status !== 'Lost').reduce((s, l) => s + l.estimatedRevenue, 0);
    const totalVehicles = LEADS.filter(l => l.status !== 'Lost').reduce((s, l) => s + l.interestedVehicles, 0);
    const conversionRate = total > 0 ? ((byStatus['Converted'] || 0) / total * 100).toFixed(0) : 0;
    const activeLeads = total - (byStatus['Converted'] || 0) - (byStatus['Lost'] || 0);
    const highPriority = LEADS.filter(l => l.priority === 'High' && l.status !== 'Converted' && l.status !== 'Lost').length;
    return { total, byStatus, totalEstimatedRev, totalVehicles, conversionRate, activeLeads, highPriority };
  }, []);

  const filteredLeads = useMemo(() => {
    let list = [...LEADS];
    if (leadSearch) {
      const q = leadSearch.toLowerCase();
      list = list.filter(l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.location.toLowerCase().includes(q));
    }
    if (leadFilter !== 'all') list = list.filter(l => l.status === leadFilter);
    return list;
  }, [leadSearch, leadFilter]);

  return (
    <div className="space-y-6">
      {/* Lead KPIs */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={Target} label="Total Leads" value={leadStats.total} color={palette.primary} />
        <StatCard icon={Activity} label="Active Pipeline" value={leadStats.activeLeads} color="rgb(99,102,241)" />
        <StatCard icon={AlertTriangle} label="High Priority" value={leadStats.highPriority} color={palette.danger} />
        <StatCard icon={BadgeCheck} label="Conversion Rate" value={`${leadStats.conversionRate}%`} color={palette.success} />
        <StatCard icon={DollarSign} label="Pipeline Value" value={`KES ${(leadStats.totalEstimatedRev / 1000).toFixed(0)}K`} sub={`${leadStats.totalVehicles} vehicles`} color={palette.success} />
      </div>

      {/* Pipeline funnel */}
      <Card title="Lead Pipeline" icon={BarChart3} iconColor={palette.primary}>
        <div className="flex items-end gap-2">
          {leadStatuses.map(status => {
            const count = leadStats.byStatus[status] || 0;
            const max = Math.max(...Object.values(leadStats.byStatus), 1);
            return (
              <div key={status} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-sm font-bold" style={{ color: leadStatusColor(status) }}>{count}</span>
                <div
                  className="w-full rounded-t-lg transition"
                  style={{ height: `${Math.max((count / max) * 120, 8)}px`, backgroundColor: leadStatusColor(status), opacity: 0.8 }}
                />
                <span className="text-[9px] text-center leading-tight" style={{ color: palette.textSecondary }}>{status}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center" style={{ backgroundColor: palette.card, borderColor: palette.border, boxShadow: 'var(--color-shadow, none)' }}>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: palette.textSecondary }} />
          <input
            placeholder="Search leads by name, email, location..."
            value={leadSearch}
            onChange={(e) => setLeadSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition focus:ring-2"
            style={{ backgroundColor: palette.bg, borderColor: palette.border, color: palette.text, '--tw-ring-color': palette.primary }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter size={14} style={{ color: palette.textSecondary }} />
          {['all', ...leadStatuses].map(s => (
            <button key={s} onClick={() => setLeadFilter(s)}
              className="rounded-lg px-2.5 py-1 text-[10px] font-medium transition"
              style={{
                backgroundColor: leadFilter === s ? palette.primary : 'rgba(148,163,184,0.1)',
                color: leadFilter === s ? '#fff' : palette.textSecondary,
              }}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs" style={{ color: palette.textSecondary }}>
        Showing {filteredLeads.length} of {LEADS.length} leads
      </div>

      {/* Lead list — grid aligned */}
      <div className="space-y-2">
        <div
          className="hidden rounded-xl border px-5 py-3 text-[10px] font-semibold uppercase tracking-wider md:grid"
          style={{
            backgroundColor: palette.card, borderColor: palette.border, color: palette.textSecondary,
            gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr 1.2fr 60px',
            gap: '12px', alignItems: 'center',
          }}
        >
          <span>Lead</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Vehicles</span>
          <span>Est. Revenue</span>
          <span>Source</span>
          <span className="text-right">Details</span>
        </div>

        {filteredLeads.map(lead => {
          const expanded = expandedLead === lead.id;
          return (
            <div key={lead.id} className="overflow-hidden rounded-xl border transition" style={{ backgroundColor: palette.card, borderColor: palette.border, boxShadow: 'var(--color-shadow, none)' }}>
              <button
                className="w-full px-5 py-3.5 text-left md:grid"
                style={{
                  gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr 1.2fr 60px',
                  gap: '12px', alignItems: 'center', display: 'grid',
                }}
                onClick={() => setExpandedLead(expanded ? null : lead.id)}
              >
                {/* Lead name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: `${leadStatusColor(lead.status)}15`, color: leadStatusColor(lead.status) }}>
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold" style={{ color: palette.text }}>{lead.name}</div>
                    <div className="truncate text-[10px]" style={{ color: palette.textSecondary }}>{lead.businessType}</div>
                  </div>
                </div>
                {/* Status */}
                <div><Badge label={lead.status} color={leadStatusColor(lead.status)} bg={leadStatusBg(lead.status)} /></div>
                {/* Priority */}
                <div className="hidden md:block"><Badge label={lead.priority} color={priorityColor(lead.priority)} bg={priorityBg(lead.priority)} /></div>
                {/* Vehicles */}
                <div className="hidden md:block text-sm font-medium" style={{ color: palette.text }}>{lead.interestedVehicles}</div>
                {/* Est Revenue */}
                <div className="hidden md:block text-sm font-semibold" style={{ color: palette.success }}>KES {lead.estimatedRevenue.toLocaleString()}</div>
                {/* Source */}
                <div className="hidden md:block text-xs" style={{ color: palette.textSecondary }}>{lead.source}</div>
                {/* Chevron */}
                <div className="flex justify-end">
                  {expanded ? <ChevronUp size={16} style={{ color: palette.primary }} /> : <ChevronDown size={16} style={{ color: palette.textSecondary }} />}
                </div>
              </button>

              {expanded && (
                <div className="border-t px-5 pb-4 pt-3" style={{ borderColor: palette.border }}>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Contact Info</h4>
                      <div className="flex items-center gap-2 text-xs"><Mail size={11} style={{ color: palette.textSecondary }} /><span style={{ color: palette.text }}>{lead.email}</span></div>
                      <div className="flex items-center gap-2 text-xs"><Phone size={11} style={{ color: palette.textSecondary }} /><span style={{ color: palette.text }}>{lead.phone}</span></div>
                      <div className="flex items-center gap-2 text-xs"><MapPin size={11} style={{ color: palette.textSecondary }} /><span style={{ color: palette.text }}>{lead.location}</span></div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Lead Details</h4>
                      <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Submitted</span><span className="font-medium" style={{ color: palette.text }}>{new Date(lead.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                      <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Follow Up</span><span className="font-medium" style={{ color: lead.followUpDate ? palette.warning : palette.textSecondary }}>{lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</span></div>
                      <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Assigned To</span><span className="font-medium" style={{ color: palette.text }}>{lead.assignedTo || 'Unassigned'}</span></div>
                      <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Source</span><span className="font-medium" style={{ color: palette.text }}>{lead.source}</span></div>
                    </div>
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Notes</h4>
                      <p className="rounded-lg p-3 text-xs leading-relaxed" style={{ color: palette.text, backgroundColor: 'rgba(148,163,184,0.06)' }}>{lead.notes}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: palette.border }}>
                    <button className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80" style={{ borderColor: palette.border, color: palette.primary }}><Phone size={13} /> Call</button>
                    <button className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80" style={{ borderColor: palette.border, color: 'rgb(99,102,241)' }}><Mail size={13} /> Email</button>
                    {lead.status !== 'Converted' && lead.status !== 'Lost' && (
                      <button
                        onClick={() => navigate('/vehicle-owners/add')}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-80"
                        style={{ backgroundColor: palette.success }}
                      >
                        <UserCheck size={13} /> Convert to Owner
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredLeads.length === 0 && (
          <div className="rounded-xl border py-16 text-center" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <Target size={40} className="mx-auto mb-3" style={{ color: palette.textSecondary, opacity: 0.4 }} />
            <p className="text-sm font-medium" style={{ color: palette.text }}>No leads found</p>
            <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function VehicleOwners() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedId, setExpandedId] = useState(null);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilter, setLeadFilter] = useState('all');

  const tabs = [
    { id: 'overview', icon: PieChart, label: 'Overview & Analytics' },
    { id: 'listing', icon: Users, label: 'Owner Listing' },
    { id: 'leads', icon: Target, label: 'Leads' },
  ];

  // ── Computed stats ──────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = OWNERS.length;
    const verified = OWNERS.filter(o => o.status === 'Verified').length;
    const pending = OWNERS.filter(o => o.status === 'Pending').length;
    const suspended = OWNERS.filter(o => o.status === 'Suspended').length;
    const totalVehicles = OWNERS.reduce((s, o) => s + o.vehicles, 0);
    const activeVehicles = OWNERS.reduce((s, o) => s + o.activeVehicles, 0);
    const inactiveVehicles = totalVehicles - activeVehicles;
    const totalRevenue = OWNERS.reduce((s, o) => s + o.totalRevenue, 0);
    const monthlyRevenue = OWNERS.reduce((s, o) => s + o.monthlyRevenue, 0);
    const lastMonthRevenue = OWNERS.reduce((s, o) => s + o.lastMonthRevenue, 0);
    const revenueGrowth = lastMonthRevenue > 0 ? (((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1) : 0;
    const totalDisputes = OWNERS.reduce((s, o) => s + o.disputes, 0);
    const pendingPayouts = OWNERS.reduce((s, o) => s + o.pendingPayouts, 0);
    const ratedOwners = OWNERS.filter(o => o.rating > 0);
    const avgRating = ratedOwners.length > 0 ? (ratedOwners.reduce((s, o) => s + o.rating, 0) / ratedOwners.length).toFixed(1) : '0.0';
    const avgVehiclesPerOwner = (totalVehicles / total).toFixed(1);
    const avgRevenuePerOwner = Math.round(monthlyRevenue / total);
    const avgRevenuePerVehicle = totalVehicles > 0 ? Math.round(monthlyRevenue / totalVehicles) : 0;
    const fleetUtilization = totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 100) : 0;
    const avgComplianceScore = Math.round(OWNERS.reduce((s, o) => s + o.complianceScore, 0) / total);

    // Location distribution
    const locationCounts = {};
    OWNERS.forEach(o => { locationCounts[o.location] = (locationCounts[o.location] || 0) + 1; });

    // Business type distribution
    const businessTypeCounts = {};
    OWNERS.forEach(o => { businessTypeCounts[o.businessType] = (businessTypeCounts[o.businessType] || 0) + 1; });

    // Vehicle type totals
    const vehicleTypeTotals = { sedan: 0, suv: 0, van: 0, other: 0 };
    OWNERS.forEach(o => {
      vehicleTypeTotals.sedan += o.vehicleTypes.sedan;
      vehicleTypeTotals.suv += o.vehicleTypes.suv;
      vehicleTypeTotals.van += o.vehicleTypes.van;
      vehicleTypeTotals.other += o.vehicleTypes.other;
    });

    // Revenue months aggregate
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyRevenueTrend = months.map((_, i) => OWNERS.reduce((s, o) => s + (o.monthlyRevenueHistory[i] || 0), 0));

    // Rating distribution
    const ratingDist = {
      excellent: OWNERS.filter(o => o.rating >= 4.5).length,
      good: OWNERS.filter(o => o.rating >= 4 && o.rating < 4.5).length,
      average: OWNERS.filter(o => o.rating >= 3 && o.rating < 4).length,
      poor: OWNERS.filter(o => o.rating > 0 && o.rating < 3).length,
      unrated: OWNERS.filter(o => o.rating === 0).length,
    };

    // Onboarding trend (owners joined per quarter)
    const joinTrend = [
      { label: 'Q4 2022', count: OWNERS.filter(o => { const d = new Date(o.joinedDate); return d.getFullYear() === 2022 && d.getMonth() >= 9; }).length },
      { label: 'Q1 2023', count: OWNERS.filter(o => { const d = new Date(o.joinedDate); return d.getFullYear() === 2023 && d.getMonth() < 3; }).length },
      { label: 'Q2 2023', count: OWNERS.filter(o => { const d = new Date(o.joinedDate); return d.getFullYear() === 2023 && d.getMonth() >= 3 && d.getMonth() < 6; }).length },
      { label: 'Q3 2023', count: OWNERS.filter(o => { const d = new Date(o.joinedDate); return d.getFullYear() === 2023 && d.getMonth() >= 6 && d.getMonth() < 9; }).length },
      { label: 'Q4 2023', count: OWNERS.filter(o => { const d = new Date(o.joinedDate); return d.getFullYear() === 2023 && d.getMonth() >= 9; }).length },
      { label: 'Q1 2024', count: OWNERS.filter(o => { const d = new Date(o.joinedDate); return d.getFullYear() === 2024 && d.getMonth() < 3; }).length },
    ];

    return {
      total, verified, pending, suspended, totalVehicles, activeVehicles, inactiveVehicles,
      totalRevenue, monthlyRevenue, lastMonthRevenue, revenueGrowth, totalDisputes,
      pendingPayouts, avgRating, avgVehiclesPerOwner, avgRevenuePerOwner,
      avgRevenuePerVehicle, fleetUtilization, avgComplianceScore,
      locationCounts, businessTypeCounts, vehicleTypeTotals,
      monthlyRevenueTrend, ratingDist, joinTrend,
    };
  }, []);

  // ── Filtered & sorted for listing tab ───────────────────────────────────────
  const filteredOwners = useMemo(() => {
    let list = [...OWNERS];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(o =>
        o.name.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q) ||
        o.businessType.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') list = list.filter(o => o.status === statusFilter);
    list.sort((a, b) => {
      let aVal = a[sortBy], bVal = b[sortBy];
      if (typeof aVal === 'string') return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return list;
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortOrder('asc'); }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.bg }}>
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: palette.primary }}>
                <Users size={20} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold" style={{ color: palette.text }}>Vehicle Owners</h1>
            </div>
            <p className="ml-[52px] text-sm" style={{ color: palette.textSecondary }}>
              Manage and monitor all vehicle owners on the platform
            </p>
          </div>
          <button
            onClick={() => navigate('/vehicle-owners/add')}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            style={{ backgroundColor: palette.primary, boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}
          >
            <Plus size={16} />
            Add Vehicle Owner
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border p-1" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition"
                style={{
                  backgroundColor: active ? palette.primary : 'transparent',
                  color: active ? '#fff' : palette.textSecondary,
                }}
              >
                <TabIcon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            TAB 1: OVERVIEW & ANALYTICS
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* KPI Stats Row */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              <StatCard icon={Users} label="Total Owners" value={stats.total} color={palette.primary} />
              <StatCard icon={BadgeCheck} label="Verified" value={stats.verified} sub={`${Math.round((stats.verified / stats.total) * 100)}% verified`} color={palette.success} />
              <StatCard icon={Clock} label="Pending Approval" value={stats.pending} color={palette.warning} />
              <StatCard icon={UserX} label="Suspended" value={stats.suspended} color={palette.danger} />
              <StatCard icon={Car} label="Total Vehicles" value={stats.totalVehicles} sub={`${stats.activeVehicles} active`} color="rgb(99,102,241)" />
              <StatCard icon={DollarSign} label="Monthly Revenue" value={`KES ${(stats.monthlyRevenue / 1000).toFixed(0)}K`} trend={parseFloat(stats.revenueGrowth)} color={palette.success} />
              <StatCard icon={Wallet} label="Pending Payouts" value={`KES ${(stats.pendingPayouts / 1000).toFixed(0)}K`} color={palette.warning} />
              <StatCard icon={Scale} label="Open Disputes" value={stats.totalDisputes} color={stats.totalDisputes > 0 ? palette.danger : palette.success} />
            </div>

            {/* Key Averages */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { label: 'Avg Rating', value: `${stats.avgRating}/5`, icon: Star, color: '#FBBF24' },
                { label: 'Avg Vehicles/Owner', value: stats.avgVehiclesPerOwner, icon: Car, color: 'rgb(99,102,241)' },
                { label: 'Avg Rev/Owner', value: `KES ${(stats.avgRevenuePerOwner / 1000).toFixed(0)}K`, icon: DollarSign, color: palette.success },
                { label: 'Avg Rev/Vehicle', value: `KES ${(stats.avgRevenuePerVehicle / 1000).toFixed(1)}K`, icon: BarChart3, color: palette.primary },
                { label: 'Fleet Utilization', value: `${stats.fleetUtilization}%`, icon: Gauge, color: stats.fleetUtilization >= 80 ? palette.success : palette.warning },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border p-3" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                  <item.icon size={16} style={{ color: item.color }} />
                  <div>
                    <div className="text-sm font-bold" style={{ color: palette.text }}>{item.value}</div>
                    <div className="text-[10px]" style={{ color: palette.textSecondary }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Trend + Owner Status Breakdown */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Revenue Trend (6 Months)" icon={TrendingUp} iconColor={palette.success}>
                <div className="relative flex h-56 items-end gap-3 pb-6">
                  {stats.monthlyRevenueTrend.map((rev, i) => {
                    const max = Math.max(...stats.monthlyRevenueTrend);
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="group relative w-full max-w-[56px] rounded-t-lg transition hover:opacity-80"
                          style={{ height: `${(rev / max) * 100}%`, minHeight: 4, backgroundColor: palette.primary }}
                        >
                          <span
                            className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium opacity-0 transition group-hover:opacity-100"
                            style={{ backgroundColor: palette.text, color: palette.card }}
                          >
                            KES {(rev / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <span className="text-xs" style={{ color: palette.textSecondary }}>{months[i]}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Owner Status Breakdown" icon={Shield} iconColor="rgb(139,92,246)">
                <div className="flex items-center gap-8">
                  {/* Donut */}
                  <div className="relative flex-shrink-0">
                    <svg viewBox="0 0 120 120" width="140" height="140">
                      {(() => {
                        const segments = [
                          { label: 'Verified', count: stats.verified, color: palette.success },
                          { label: 'Pending', count: stats.pending, color: palette.warning },
                          { label: 'Suspended', count: stats.suspended, color: palette.danger },
                        ];
                        const total = stats.total || 1;
                        const r = 48, circumference = 2 * Math.PI * r;
                        let offset = 0;
                        return segments.map((seg, i) => {
                          const pct = seg.count / total;
                          const dash = pct * circumference;
                          const gap = circumference - dash;
                          const el = (
                            <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={seg.color} strokeWidth="12"
                              strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} strokeLinecap="round"
                              transform="rotate(-90 60 60)" style={{ transition: 'all 0.5s ease' }} />
                          );
                          offset += dash;
                          return el;
                        });
                      })()}
                      <text x="60" y="55" textAnchor="middle" style={{ fill: palette.text, fontSize: '22px', fontWeight: 700 }}>{stats.total}</text>
                      <text x="60" y="72" textAnchor="middle" style={{ fill: palette.textSecondary, fontSize: '10px' }}>owners</text>
                    </svg>
                  </div>
                  <div className="flex-1 space-y-3">
                    {[
                      { label: 'Verified', count: stats.verified, color: palette.success },
                      { label: 'Pending', count: stats.pending, color: palette.warning },
                      { label: 'Suspended', count: stats.suspended, color: palette.danger },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-sm" style={{ color: palette.text }}>{s.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: palette.text }}>{s.count}</span>
                          <span className="text-xs" style={{ color: palette.textSecondary }}>{((s.count / (stats.total || 1)) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Revenue per Owner + Rating Distribution */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Revenue per Owner" icon={DollarSign} iconColor={palette.success}>
                <div className="space-y-3">
                  {[...OWNERS].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue).map(o => {
                    const maxRev = Math.max(...OWNERS.map(x => x.monthlyRevenue));
                    const growth = o.lastMonthRevenue > 0 ? (((o.monthlyRevenue - o.lastMonthRevenue) / o.lastMonthRevenue) * 100).toFixed(0) : 0;
                    return (
                      <div key={o.id}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{o.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold" style={{ color: palette.success }}>KES {o.monthlyRevenue.toLocaleString()}</span>
                            {growth > 0 && <span className="text-[9px] font-semibold" style={{ color: palette.success }}>+{growth}%</span>}
                          </div>
                        </div>
                        <ProgressBar value={maxRev > 0 ? (o.monthlyRevenue / maxRev) * 100 : 0} color={palette.success} />
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Owner Rating Distribution" icon={Star} iconColor="#FBBF24">
                {[
                  { label: 'Excellent (4.5-5.0)', value: stats.ratingDist.excellent, color: palette.success },
                  { label: 'Good (4.0-4.4)', value: stats.ratingDist.good, color: palette.primary },
                  { label: 'Average (3.0-3.9)', value: stats.ratingDist.average, color: palette.warning },
                  { label: 'Poor (<3.0)', value: stats.ratingDist.poor, color: palette.danger },
                  { label: 'Unrated', value: stats.ratingDist.unrated, color: palette.textSecondary },
                ].map((cat, i) => {
                  const pct = (cat.value / stats.total) * 100;
                  return (
                    <div key={i} className="mb-3">
                      <div className="mb-1 flex justify-between text-xs">
                        <span style={{ color: palette.textSecondary }}>{cat.label}</span>
                        <span className="font-medium" style={{ color: palette.text }}>{cat.value} ({pct.toFixed(0)}%)</span>
                      </div>
                      <ProgressBar value={pct} color={cat.color} />
                    </div>
                  );
                })}
                <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: 'rgba(148,163,184,0.08)' }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: palette.textSecondary }}>Platform Average</span>
                    <span className="font-bold" style={{ color: palette.text }}>{stats.avgRating} / 5.0</span>
                  </div>
                  <div className="mt-2"><ProgressBar value={(parseFloat(stats.avgRating) / 5) * 100} color="#FBBF24" /></div>
                </div>
              </Card>
            </div>

            {/* Location Distribution + Business Type + Vehicle Types */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card title="Owners by Location" icon={MapPin} iconColor="rgb(99,102,241)">
                <div className="space-y-3">
                  {Object.entries(stats.locationCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([loc, count]) => (
                      <div key={loc}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{loc}</span>
                          <span style={{ color: palette.textSecondary }}>{count} owner{count > 1 ? 's' : ''}</span>
                        </div>
                        <ProgressBar value={(count / stats.total) * 100} color="rgb(99,102,241)" />
                      </div>
                    ))}
                </div>
              </Card>

              <Card title="Business Types" icon={Activity} iconColor="rgb(139,92,246)">
                <div className="space-y-3">
                  {Object.entries(stats.businessTypeCounts)
                    .sort(([, a], [, b]) => b - a)
                    .map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between rounded-lg p-2" style={{ backgroundColor: 'rgba(148,163,184,0.06)' }}>
                        <span className="text-xs font-medium" style={{ color: palette.text }}>{type}</span>
                        <Badge label={`${count}`} color="rgb(139,92,246)" bg="rgba(139,92,246,0.12)" />
                      </div>
                    ))}
                </div>
              </Card>

              <Card title="Vehicle Fleet Composition" icon={Car} iconColor={palette.primary}>
                <div className="space-y-3">
                  {[
                    { label: 'Sedans', count: stats.vehicleTypeTotals.sedan, color: palette.primary },
                    { label: 'SUVs', count: stats.vehicleTypeTotals.suv, color: palette.success },
                    { label: 'Vans', count: stats.vehicleTypeTotals.van, color: palette.warning },
                    { label: 'Other', count: stats.vehicleTypeTotals.other, color: 'rgb(139,92,246)' },
                  ].map((vt, i) => (
                    <div key={i}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium" style={{ color: palette.text }}>{vt.label}</span>
                        <span style={{ color: palette.textSecondary }}>{vt.count} ({stats.totalVehicles > 0 ? ((vt.count / stats.totalVehicles) * 100).toFixed(0) : 0}%)</span>
                      </div>
                      <ProgressBar value={stats.totalVehicles > 0 ? (vt.count / stats.totalVehicles) * 100 : 0} color={vt.color} />
                    </div>
                  ))}
                  <div className="mt-3 rounded-lg p-3 text-center" style={{ backgroundColor: 'rgba(148,163,184,0.08)' }}>
                    <div className="text-xl font-bold" style={{ color: palette.text }}>{stats.totalVehicles}</div>
                    <div className="text-[10px]" style={{ color: palette.textSecondary }}>Total Fleet Size</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Onboarding Trend + Compliance Overview */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Owner Onboarding Trend" icon={Calendar} iconColor={palette.primary}>
                <div className="relative flex h-48 items-end gap-3 pb-6">
                  {stats.joinTrend.map((q, i) => {
                    const max = Math.max(...stats.joinTrend.map(x => x.count), 1);
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="group relative w-full max-w-[48px] rounded-t-lg transition hover:opacity-80"
                          style={{ height: `${(q.count / max) * 100}%`, minHeight: 4, backgroundColor: 'rgb(99,102,241)' }}
                        >
                          <span
                            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-medium opacity-0 transition group-hover:opacity-100"
                            style={{ backgroundColor: palette.text, color: palette.card }}
                          >
                            {q.count} owners
                          </span>
                        </div>
                        <span className="text-[10px]" style={{ color: palette.textSecondary }}>{q.label}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Compliance Scores" icon={Shield} iconColor={palette.success}>
                <div className="space-y-3">
                  {[...OWNERS].sort((a, b) => b.complianceScore - a.complianceScore).map(o => {
                    const scoreColor = o.complianceScore >= 90 ? palette.success : o.complianceScore >= 70 ? palette.primary : o.complianceScore >= 50 ? palette.warning : palette.danger;
                    return (
                      <div key={o.id}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{o.name}</span>
                          <span className="font-semibold" style={{ color: scoreColor }}>{o.complianceScore}%</span>
                        </div>
                        <ProgressBar value={o.complianceScore} color={scoreColor} />
                      </div>
                    );
                  })}
                  <div className="mt-3 flex items-center gap-4 text-[10px]" style={{ color: palette.textSecondary }}>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.success }} /> 90%+</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.primary }} /> 70-89%</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.warning }} /> 50-69%</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.danger }} /> &lt;50%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Top Performers + Attention Required */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Top Performing Owners" icon={TrendingUp} iconColor={palette.success}>
                <div className="space-y-3">
                  {[...OWNERS]
                    .filter(o => o.rating > 0)
                    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
                    .slice(0, 5)
                    .map((o, i) => (
                      <div key={o.id} className="flex items-center justify-between rounded-lg p-2" style={{ backgroundColor: 'rgba(148,163,184,0.04)' }}>
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                            style={{
                              backgroundColor: i === 0 ? '#FBBF2420' : i === 1 ? '#94A3B820' : i === 2 ? '#CD7F3220' : 'rgba(148,163,184,0.08)',
                              color: i === 0 ? '#FBBF24' : i === 1 ? '#94A3B8' : i === 2 ? '#CD7F32' : palette.textSecondary,
                            }}
                          >
                            {i + 1}
                          </span>
                          <div>
                            <div className="text-xs font-medium" style={{ color: palette.text }}>{o.name}</div>
                            <div className="text-[10px]" style={{ color: palette.textSecondary }}>{o.vehicles} vehicles · {o.location} · {o.businessType}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold" style={{ color: palette.success }}>KES {o.monthlyRevenue.toLocaleString()}</div>
                          <div className="flex items-center justify-end gap-0.5">
                            <Star size={9} fill="#FBBF24" stroke="#FBBF24" />
                            <span className="text-[10px]" style={{ color: palette.textSecondary }}>{o.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>

              <Card title="Attention Required" icon={AlertTriangle} iconColor={palette.danger}>
                <div className="space-y-3">
                  {OWNERS.filter(o => o.status === 'Pending' || o.status === 'Suspended' || o.disputes > 0)
                    .map(o => {
                      const reasons = [];
                      if (o.status === 'Pending') reasons.push('Pending verification');
                      if (o.status === 'Suspended') reasons.push('Account suspended');
                      if (o.disputes > 0) reasons.push(`${o.disputes} open dispute${o.disputes > 1 ? 's' : ''}`);
                      if (o.complianceScore < 50) reasons.push(`Low compliance (${o.complianceScore}%)`);
                      return (
                        <div key={o.id} className="flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: palette.border, backgroundColor: 'rgba(239,68,68,0.04)' }}>
                          <AlertTriangle size={14} style={{ color: palette.danger, marginTop: 2 }} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium" style={{ color: palette.text }}>{o.name}</span>
                              <Badge label={o.status} color={statusColor(o.status)} bg={statusBg(o.status)} />
                            </div>
                            <div className="mt-1 text-[10px]" style={{ color: palette.textSecondary }}>
                              {reasons.join(' · ')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {OWNERS.filter(o => o.status === 'Pending' || o.status === 'Suspended' || o.disputes > 0).length === 0 && (
                    <div className="py-6 text-center">
                      <Shield size={28} className="mx-auto mb-2" style={{ color: palette.success, opacity: 0.5 }} />
                      <p className="text-xs" style={{ color: palette.success }}>All owners in good standing</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Payout Summary + Revenue vs Vehicles */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Pending Payout Breakdown" icon={Wallet} iconColor={palette.warning}>
                <div className="space-y-3">
                  {OWNERS.filter(o => o.pendingPayouts > 0)
                    .sort((a, b) => b.pendingPayouts - a.pendingPayouts)
                    .map(o => {
                      const maxPayout = Math.max(...OWNERS.map(x => x.pendingPayouts));
                      return (
                        <div key={o.id}>
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="font-medium" style={{ color: palette.text }}>{o.name}</span>
                            <span className="font-semibold" style={{ color: palette.warning }}>KES {o.pendingPayouts.toLocaleString()}</span>
                          </div>
                          <ProgressBar value={(o.pendingPayouts / maxPayout) * 100} color={palette.warning} />
                        </div>
                      );
                    })}
                  <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: palette.textSecondary }}>Total Pending</span>
                      <span className="font-bold" style={{ color: palette.warning }}>KES {stats.pendingPayouts.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Revenue Efficiency (Rev / Vehicle)" icon={BarChart3} iconColor={palette.primary}>
                <div className="space-y-3">
                  {[...OWNERS]
                    .filter(o => o.vehicles > 0 && o.monthlyRevenue > 0)
                    .map(o => ({ ...o, revPerVehicle: Math.round(o.monthlyRevenue / o.vehicles) }))
                    .sort((a, b) => b.revPerVehicle - a.revPerVehicle)
                    .map(o => {
                      const maxRevPV = Math.max(...OWNERS.filter(x => x.vehicles > 0).map(x => Math.round(x.monthlyRevenue / x.vehicles)));
                      return (
                        <div key={o.id}>
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="font-medium" style={{ color: palette.text }}>{o.name} <span style={{ color: palette.textSecondary }}>({o.vehicles} vehicles)</span></span>
                            <span className="font-semibold" style={{ color: palette.primary }}>KES {o.revPerVehicle.toLocaleString()}</span>
                          </div>
                          <ProgressBar value={(o.revPerVehicle / maxRevPV) * 100} color={palette.primary} />
                        </div>
                      );
                    })}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB 2: OWNER LISTING
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'listing' && (
          <div className="space-y-4">

            {/* Quick stats for listing context */}
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <StatCard icon={Users} label="Total Owners" value={stats.total} color={palette.primary} />
              <StatCard icon={BadgeCheck} label="Verified" value={stats.verified} sub={`${Math.round((stats.verified / stats.total) * 100)}% of total`} color={palette.success} />
              <StatCard icon={Clock} label="Pending" value={stats.pending} color={palette.warning} />
              <StatCard icon={Car} label="Total Vehicles" value={stats.totalVehicles} sub={`${stats.activeVehicles} active`} color="rgb(99,102,241)" />
              <StatCard icon={DollarSign} label="Monthly Revenue" value={`KES ${(stats.monthlyRevenue / 1000).toFixed(0)}K`} sub={`KES ${(stats.pendingPayouts / 1000).toFixed(0)}K pending`} color={palette.success} />
            </div>

            {/* Filters bar */}
            <div className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: palette.textSecondary }} />
                <input
                  placeholder="Search by name, email, location, business type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition focus:ring-2"
                  style={{ backgroundColor: palette.bg, borderColor: palette.border, color: palette.text, '--tw-ring-color': palette.primary }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={14} style={{ color: palette.textSecondary }} />
                {['all', 'Verified', 'Pending', 'Suspended'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium transition"
                    style={{
                      backgroundColor: statusFilter === s ? palette.primary : 'rgba(148,163,184,0.1)',
                      color: statusFilter === s ? '#fff' : palette.textSecondary,
                    }}
                  >
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-xs" style={{ color: palette.textSecondary }}>
              Showing {filteredOwners.length} of {OWNERS.length} owners
            </div>

            {/* Owner list */}
            <div className="space-y-2">
              {/* Sort header — grid for perfect alignment */}
              <div
                className="hidden rounded-xl border px-5 py-3 text-[10px] font-semibold uppercase tracking-wider md:grid"
                style={{
                  backgroundColor: palette.card, borderColor: palette.border, color: palette.textSecondary,
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr 1.2fr 60px',
                  gap: '12px', alignItems: 'center',
                }}
              >
                <button className="flex items-center gap-1 text-left" onClick={() => toggleSort('name')}>
                  Owner {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <span>Status</span>
                <button className="flex items-center gap-1" onClick={() => toggleSort('vehicles')}>
                  Vehicles {sortBy === 'vehicles' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button className="flex items-center gap-1" onClick={() => toggleSort('rating')}>
                  Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button className="flex items-center gap-1" onClick={() => toggleSort('monthlyRevenue')}>
                  Monthly Rev. {sortBy === 'monthlyRevenue' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <span>Location</span>
                <span className="text-right">Actions</span>
              </div>

              {filteredOwners.map(owner => {
                const expanded = expandedId === owner.id;
                return (
                  <div key={owner.id} className="overflow-hidden rounded-xl border transition" style={{ backgroundColor: palette.card, borderColor: palette.border, boxShadow: 'var(--color-shadow, none)' }}>
                    <button
                      className="w-full px-5 py-3.5 text-left transition hover:opacity-90 md:grid"
                      style={{
                        gridTemplateColumns: '2fr 1fr 1fr 1fr 1.2fr 1.2fr 60px',
                        gap: '12px', alignItems: 'center',
                        display: 'grid',
                      }}
                      onClick={() => setExpandedId(expanded ? null : owner.id)}
                    >
                      {/* Owner */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: palette.primary }}>
                          {owner.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold" style={{ color: palette.text }}>{owner.name}</div>
                          <div className="truncate text-[10px]" style={{ color: palette.textSecondary }}>{owner.businessType}</div>
                        </div>
                      </div>
                      {/* Status */}
                      <div>
                        <Badge label={owner.status} color={statusColor(owner.status)} bg={statusBg(owner.status)} />
                      </div>
                      {/* Vehicles */}
                      <div className="hidden md:block">
                        <span className="text-sm font-semibold" style={{ color: palette.text }}>{owner.activeVehicles}</span>
                        <span className="text-xs" style={{ color: palette.textSecondary }}> / {owner.vehicles}</span>
                      </div>
                      {/* Rating */}
                      <div className="hidden md:flex items-center gap-1">
                        <Star size={12} fill={owner.rating >= 4 ? '#FBBF24' : 'transparent'} stroke="#FBBF24" />
                        <span className="text-sm font-medium" style={{ color: palette.text }}>
                          {owner.rating > 0 ? owner.rating.toFixed(1) : '—'}
                        </span>
                      </div>
                      {/* Monthly Revenue */}
                      <div className="hidden md:block">
                        <span className="text-sm font-semibold" style={{ color: palette.success }}>KES {owner.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      {/* Location */}
                      <div className="hidden md:flex items-center gap-1 text-xs" style={{ color: palette.textSecondary }}>
                        <MapPin size={11} />{owner.location}
                      </div>
                      {/* Chevron */}
                      <div className="flex justify-end">
                        {expanded ? <ChevronUp size={16} style={{ color: palette.primary }} /> : <ChevronDown size={16} style={{ color: palette.textSecondary }} />}
                      </div>
                    </button>

                    {expanded && (
                      <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: palette.border }}>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                          <div className="space-y-2">
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Contact Info</h4>
                            <div className="flex items-center gap-2 text-xs"><Mail size={11} style={{ color: palette.textSecondary }} /><span style={{ color: palette.text }}>{owner.email}</span></div>
                            <div className="flex items-center gap-2 text-xs"><Phone size={11} style={{ color: palette.textSecondary }} /><span style={{ color: palette.text }}>{owner.phone}</span></div>
                            <div className="flex items-center gap-2 text-xs"><MapPin size={11} style={{ color: palette.textSecondary }} /><span style={{ color: palette.text }}>{owner.location}</span></div>
                            <div className="flex items-center gap-2 text-xs"><Clock size={11} style={{ color: palette.textSecondary }} /><span style={{ color: palette.textSecondary }}>Joined {new Date(owner.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Fleet Summary</h4>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Total Vehicles</span><span className="font-medium" style={{ color: palette.text }}>{owner.vehicles}</span></div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Active</span><span className="font-medium" style={{ color: palette.success }}>{owner.activeVehicles}</span></div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Inactive</span><span className="font-medium" style={{ color: palette.warning }}>{owner.vehicles - owner.activeVehicles}</span></div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Utilization</span><span className="font-medium" style={{ color: palette.text }}>{owner.vehicles > 0 ? Math.round((owner.activeVehicles / owner.vehicles) * 100) : 0}%</span></div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Financial</h4>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Total Revenue</span><span className="font-medium" style={{ color: palette.success }}>KES {owner.totalRevenue.toLocaleString()}</span></div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Monthly Revenue</span><span className="font-medium" style={{ color: palette.text }}>KES {owner.monthlyRevenue.toLocaleString()}</span></div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Pending Payouts</span><span className="font-medium" style={{ color: palette.warning }}>KES {owner.pendingPayouts.toLocaleString()}</span></div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Rev / Vehicle</span><span className="font-medium" style={{ color: palette.text }}>KES {owner.vehicles > 0 ? Math.round(owner.monthlyRevenue / owner.vehicles).toLocaleString() : 0}</span></div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Compliance</h4>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Verification</span><Badge label={owner.status} color={statusColor(owner.status)} bg={statusBg(owner.status)} /></div>
                            <div className="flex items-center justify-between text-xs">
                              <span style={{ color: palette.textSecondary }}>Rating</span>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={10} fill={i < Math.round(owner.rating) ? '#FBBF24' : 'transparent'} stroke="#FBBF24" />))}
                                <span className="ml-1 font-medium" style={{ color: palette.text }}>{owner.rating > 0 ? owner.rating.toFixed(1) : '—'}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Open Disputes</span><span className="font-medium" style={{ color: owner.disputes > 0 ? palette.danger : palette.success }}>{owner.disputes}</span></div>
                            <div className="flex items-center justify-between text-xs"><span style={{ color: palette.textSecondary }}>Compliance</span><span className="font-medium" style={{ color: owner.complianceScore >= 80 ? palette.success : owner.complianceScore >= 50 ? palette.warning : palette.danger }}>{owner.complianceScore}%</span></div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: palette.border }}>
                          <button className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80" style={{ borderColor: palette.border, color: palette.primary }}><Eye size={13} /> View Profile</button>
                          <button className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80" style={{ borderColor: palette.border, color: palette.success }}><Car size={13} /> View Vehicles</button>
                          <button className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80" style={{ borderColor: palette.border, color: palette.warning }}><DollarSign size={13} /> Process Payout</button>
                          {owner.status !== 'Suspended' && (
                            <button className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80" style={{ borderColor: palette.border, color: palette.danger }}><Ban size={13} /> Suspend</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredOwners.length === 0 && (
                <div className="rounded-xl border py-16 text-center" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                  <Users size={40} className="mx-auto mb-3" style={{ color: palette.textSecondary, opacity: 0.4 }} />
                  <p className="text-sm font-medium" style={{ color: palette.text }}>No owners found</p>
                  <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB 3: LEADS
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'leads' && (
          <LeadsTab
            palette={palette}
            leadSearch={leadSearch}
            setLeadSearch={setLeadSearch}
            leadFilter={leadFilter}
            setLeadFilter={setLeadFilter}
            navigate={navigate}
          />
        )}
      </div>
    </div>
  );
}
