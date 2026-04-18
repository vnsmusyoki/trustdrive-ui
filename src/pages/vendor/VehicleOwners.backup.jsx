import React, { useState, useMemo } from 'react';
import {
  Users, Search, Car, Star, TrendingUp, AlertTriangle, Shield,
  Phone, Mail, MapPin, ChevronDown, ChevronUp, DollarSign,
  BadgeCheck, Clock, Filter, BarChart3, Eye, Ban, MoreVertical,
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
    monthlyRevenue: 47300, disputes: 0, pendingPayouts: 12500,
    businessType: 'Fleet Management Company', avatar: null,
  },
  {
    id: 'o2', name: 'Grace Wanjiru', email: 'grace.wanjiru@email.com', phone: '+254723456789',
    location: 'Mombasa', joinedDate: '2023-05-20', status: 'Verified',
    vehicles: 4, activeVehicles: 4, rating: 4.9, totalRevenue: 156000,
    monthlyRevenue: 26000, disputes: 0, pendingPayouts: 8200,
    businessType: 'Individual Owner', avatar: null,
  },
  {
    id: 'o3', name: 'Peter Odhiambo', email: 'peter.odhiambo@email.com', phone: '+254734567890',
    location: 'Kisumu', joinedDate: '2023-08-10', status: 'Pending',
    vehicles: 2, activeVehicles: 1, rating: 3.8, totalRevenue: 42000,
    monthlyRevenue: 7000, disputes: 1, pendingPayouts: 3500,
    businessType: 'Individual Owner', avatar: null,
  },
  {
    id: 'o4', name: 'Janet Muthoni', email: 'janet.muthoni@email.com', phone: '+254745678901',
    location: 'Nairobi', joinedDate: '2022-11-05', status: 'Verified',
    vehicles: 12, activeVehicles: 10, rating: 4.5, totalRevenue: 520000,
    monthlyRevenue: 86600, disputes: 2, pendingPayouts: 22000,
    businessType: 'Limited Company', avatar: null,
  },
  {
    id: 'o5', name: 'David Kipchoge', email: 'david.kip@email.com', phone: '+254756789012',
    location: 'Eldoret', joinedDate: '2024-01-12', status: 'Suspended',
    vehicles: 3, activeVehicles: 0, rating: 2.1, totalRevenue: 18000,
    monthlyRevenue: 0, disputes: 5, pendingPayouts: 0,
    businessType: 'Individual Owner', avatar: null,
  },
  {
    id: 'o6', name: 'Anne Nyambura', email: 'anne.nyambura@email.com', phone: '+254767890123',
    location: 'Nakuru', joinedDate: '2023-09-25', status: 'Verified',
    vehicles: 6, activeVehicles: 5, rating: 4.3, totalRevenue: 198000,
    monthlyRevenue: 33000, disputes: 1, pendingPayouts: 9800,
    businessType: 'Sole Proprietorship', avatar: null,
  },
  {
    id: 'o7', name: 'Francis Muriuki', email: 'francis.m@email.com', phone: '+254778901234',
    location: 'Thika', joinedDate: '2024-03-01', status: 'Pending',
    vehicles: 1, activeVehicles: 0, rating: 0, totalRevenue: 0,
    monthlyRevenue: 0, disputes: 0, pendingPayouts: 0,
    businessType: 'Individual Owner', avatar: null,
  },
  {
    id: 'o8', name: 'Mercy Achieng', email: 'mercy.achieng@email.com', phone: '+254789012345',
    location: 'Nairobi', joinedDate: '2023-06-18', status: 'Verified',
    vehicles: 5, activeVehicles: 5, rating: 4.6, totalRevenue: 175000,
    monthlyRevenue: 29200, disputes: 0, pendingPayouts: 7600,
    businessType: 'Partnership', avatar: null,
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

function Badge({ label, color, bg }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}15` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xl font-bold" style={{ color: palette.text }}>{value}</div>
        <div className="text-xs" style={{ color: palette.textSecondary }}>{label}</div>
        {sub && <div className="text-[10px]" style={{ color }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function VehicleOwners() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedId, setExpandedId] = useState(null);

  // Computed stats
  const stats = useMemo(() => {
    const total = OWNERS.length;
    const verified = OWNERS.filter(o => o.status === 'Verified').length;
    const pending = OWNERS.filter(o => o.status === 'Pending').length;
    const suspended = OWNERS.filter(o => o.status === 'Suspended').length;
    const totalVehicles = OWNERS.reduce((s, o) => s + o.vehicles, 0);
    const activeVehicles = OWNERS.reduce((s, o) => s + o.activeVehicles, 0);
    const totalRevenue = OWNERS.reduce((s, o) => s + o.totalRevenue, 0);
    const monthlyRevenue = OWNERS.reduce((s, o) => s + o.monthlyRevenue, 0);
    const totalDisputes = OWNERS.reduce((s, o) => s + o.disputes, 0);
    const pendingPayouts = OWNERS.reduce((s, o) => s + o.pendingPayouts, 0);
    const avgRating = (OWNERS.filter(o => o.rating > 0).reduce((s, o) => s + o.rating, 0) / (OWNERS.filter(o => o.rating > 0).length || 1)).toFixed(1);
    return { total, verified, pending, suspended, totalVehicles, activeVehicles, totalRevenue, monthlyRevenue, totalDisputes, pendingPayouts, avgRating };
  }, []);

  // Filtered & sorted
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
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard icon={Users} label="Total Owners" value={stats.total} color={palette.primary} />
          <StatCard icon={BadgeCheck} label="Verified" value={stats.verified} sub={`${Math.round((stats.verified / stats.total) * 100)}% of total`} color={palette.success} />
          <StatCard icon={Clock} label="Pending" value={stats.pending} color={palette.warning} />
          <StatCard icon={Car} label="Total Vehicles" value={stats.totalVehicles} sub={`${stats.activeVehicles} active`} color="rgb(99,102,241)" />
          <StatCard icon={DollarSign} label="Monthly Revenue" value={`KES ${(stats.monthlyRevenue / 1000).toFixed(0)}K`} sub={`KES ${(stats.pendingPayouts / 1000).toFixed(0)}K pending`} color={palette.success} />
        </div>

        {/* Filters bar */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
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
        <div className="mb-3 text-xs" style={{ color: palette.textSecondary }}>
          Showing {filteredOwners.length} of {OWNERS.length} owners
        </div>

        {/* Owner list */}
        <div className="space-y-3">
          {/* Sort header */}
          <div
            className="hidden items-center gap-4 rounded-xl border px-4 py-2 text-[10px] font-semibold uppercase tracking-wider md:flex"
            style={{ backgroundColor: palette.card, borderColor: palette.border, color: palette.textSecondary }}
          >
            <button className="flex min-w-[180px] items-center gap-1" onClick={() => toggleSort('name')}>
              Owner {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <span className="min-w-[100px]">Status</span>
            <button className="flex min-w-[80px] items-center gap-1" onClick={() => toggleSort('vehicles')}>
              Vehicles {sortBy === 'vehicles' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button className="flex min-w-[80px] items-center gap-1" onClick={() => toggleSort('rating')}>
              Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button className="flex min-w-[120px] items-center gap-1" onClick={() => toggleSort('monthlyRevenue')}>
              Monthly Rev. {sortBy === 'monthlyRevenue' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <span className="min-w-[100px]">Location</span>
            <span className="ml-auto">Actions</span>
          </div>

          {filteredOwners.map(owner => {
            const expanded = expandedId === owner.id;
            return (
              <div key={owner.id} className="overflow-hidden rounded-xl border transition" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                {/* Row */}
                <button
                  className="flex w-full items-center gap-4 px-4 py-3 text-left transition hover:opacity-90"
                  onClick={() => setExpandedId(expanded ? null : owner.id)}
                >
                  {/* Avatar + Name */}
                  <div className="flex min-w-[180px] items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: palette.primary }}
                    >
                      {owner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold" style={{ color: palette.text }}>{owner.name}</div>
                      <div className="truncate text-[10px]" style={{ color: palette.textSecondary }}>{owner.businessType}</div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="min-w-[100px]">
                    <Badge label={owner.status} color={statusColor(owner.status)} bg={statusBg(owner.status)} />
                  </div>

                  {/* Vehicles */}
                  <div className="hidden min-w-[80px] md:block">
                    <span className="text-sm font-semibold" style={{ color: palette.text }}>{owner.activeVehicles}</span>
                    <span className="text-xs" style={{ color: palette.textSecondary }}>/{owner.vehicles}</span>
                  </div>

                  {/* Rating */}
                  <div className="hidden min-w-[80px] md:flex items-center gap-1">
                    <Star size={12} fill={owner.rating >= 4 ? '#FBBF24' : 'transparent'} stroke="#FBBF24" />
                    <span className="text-sm font-medium" style={{ color: palette.text }}>
                      {owner.rating > 0 ? owner.rating.toFixed(1) : '—'}
                    </span>
                  </div>

                  {/* Monthly Revenue */}
                  <div className="hidden min-w-[120px] lg:block">
                    <span className="text-sm font-semibold" style={{ color: palette.success }}>
                      KES {owner.monthlyRevenue.toLocaleString()}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="hidden min-w-[100px] lg:flex items-center gap-1 text-xs" style={{ color: palette.textSecondary }}>
                    <MapPin size={11} />
                    {owner.location}
                  </div>

                  {/* Chevron */}
                  <div className="ml-auto shrink-0">
                    {expanded
                      ? <ChevronUp size={16} style={{ color: palette.primary }} />
                      : <ChevronDown size={16} style={{ color: palette.textSecondary }} />
                    }
                  </div>
                </button>

                {/* Expanded detail panel */}
                {expanded && (
                  <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: palette.border }}>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {/* Contact Info */}
                      <div className="space-y-2">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Contact Info</h4>
                        <div className="flex items-center gap-2 text-xs">
                          <Mail size={11} style={{ color: palette.textSecondary }} />
                          <span style={{ color: palette.text }}>{owner.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Phone size={11} style={{ color: palette.textSecondary }} />
                          <span style={{ color: palette.text }}>{owner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin size={11} style={{ color: palette.textSecondary }} />
                          <span style={{ color: palette.text }}>{owner.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Clock size={11} style={{ color: palette.textSecondary }} />
                          <span style={{ color: palette.textSecondary }}>
                            Joined {new Date(owner.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Fleet Summary */}
                      <div className="space-y-2">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Fleet Summary</h4>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Total Vehicles</span>
                          <span className="font-medium" style={{ color: palette.text }}>{owner.vehicles}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Active</span>
                          <span className="font-medium" style={{ color: palette.success }}>{owner.activeVehicles}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Inactive</span>
                          <span className="font-medium" style={{ color: palette.warning }}>{owner.vehicles - owner.activeVehicles}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Utilization</span>
                          <span className="font-medium" style={{ color: palette.text }}>
                            {owner.vehicles > 0 ? Math.round((owner.activeVehicles / owner.vehicles) * 100) : 0}%
                          </span>
                        </div>
                      </div>

                      {/* Financial */}
                      <div className="space-y-2">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Financial</h4>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Total Revenue</span>
                          <span className="font-medium" style={{ color: palette.success }}>KES {owner.totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Monthly Revenue</span>
                          <span className="font-medium" style={{ color: palette.text }}>KES {owner.monthlyRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Pending Payouts</span>
                          <span className="font-medium" style={{ color: palette.warning }}>KES {owner.pendingPayouts.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Rev / Vehicle</span>
                          <span className="font-medium" style={{ color: palette.text }}>
                            KES {owner.vehicles > 0 ? Math.round(owner.monthlyRevenue / owner.vehicles).toLocaleString() : 0}
                          </span>
                        </div>
                      </div>

                      {/* Compliance */}
                      <div className="space-y-2">
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Compliance</h4>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Verification</span>
                          <Badge label={owner.status} color={statusColor(owner.status)} bg={statusBg(owner.status)} />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Rating</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={10} fill={i < Math.round(owner.rating) ? '#FBBF24' : 'transparent'} stroke="#FBBF24" />
                            ))}
                            <span className="ml-1 font-medium" style={{ color: palette.text }}>{owner.rating > 0 ? owner.rating.toFixed(1) : '—'}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Open Disputes</span>
                          <span className="font-medium" style={{ color: owner.disputes > 0 ? palette.danger : palette.success }}>
                            {owner.disputes}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span style={{ color: palette.textSecondary }}>Business Type</span>
                          <span className="font-medium" style={{ color: palette.text }}>{owner.businessType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="mt-4 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: palette.border }}>
                      <button
                        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
                        style={{ borderColor: palette.border, color: palette.primary }}
                      >
                        <Eye size={13} /> View Profile
                      </button>
                      <button
                        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
                        style={{ borderColor: palette.border, color: palette.success }}
                      >
                        <Car size={13} /> View Vehicles
                      </button>
                      <button
                        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
                        style={{ borderColor: palette.border, color: palette.warning }}
                      >
                        <DollarSign size={13} /> Process Payout
                      </button>
                      {owner.status !== 'Suspended' && (
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
                          style={{ borderColor: palette.border, color: palette.danger }}
                        >
                          <Ban size={13} /> Suspend
                        </button>
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

        {/* Overview section — top performers & risk */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Top Performers */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp size={16} style={{ color: palette.success }} />
              <h3 className="text-sm font-bold" style={{ color: palette.text }}>Top Performing Owners</h3>
            </div>
            <div className="space-y-3">
              {[...OWNERS]
                .filter(o => o.rating > 0)
                .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
                .slice(0, 5)
                .map((o, i) => (
                  <div key={o.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: i === 0 ? '#FBBF2420' : i === 1 ? '#94A3B820' : i === 2 ? '#CD7F3220' : 'rgba(148,163,184,0.08)',
                          color: i === 0 ? '#FBBF24' : i === 1 ? '#94A3B8' : i === 2 ? '#CD7F32' : palette.textSecondary,
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-xs font-medium" style={{ color: palette.text }}>{o.name}</div>
                        <div className="text-[10px]" style={{ color: palette.textSecondary }}>{o.vehicles} vehicles · {o.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold" style={{ color: palette.success }}>KES {o.monthlyRevenue.toLocaleString()}</div>
                      <div className="flex items-center gap-0.5">
                        <Star size={9} fill="#FBBF24" stroke="#FBBF24" />
                        <span className="text-[10px]" style={{ color: palette.textSecondary }}>{o.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Attention Required */}
          <div className="rounded-2xl border p-5" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle size={16} style={{ color: palette.danger }} />
              <h3 className="text-sm font-bold" style={{ color: palette.text }}>Attention Required</h3>
            </div>
            <div className="space-y-3">
              {OWNERS.filter(o => o.status === 'Pending' || o.status === 'Suspended' || o.disputes > 0)
                .map(o => {
                  const reasons = [];
                  if (o.status === 'Pending') reasons.push('Pending verification');
                  if (o.status === 'Suspended') reasons.push('Account suspended');
                  if (o.disputes > 0) reasons.push(`${o.disputes} open dispute${o.disputes > 1 ? 's' : ''}`);
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
          </div>
        </div>
      </div>
    </div>
  );
}
