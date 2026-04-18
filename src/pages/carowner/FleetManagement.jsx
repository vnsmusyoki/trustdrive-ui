// FleetManagement.jsx - Enterprise Fleet Management Dashboard (Dark-theme aware)
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car, Star, DollarSign, Gauge, Route, Trophy, AlertTriangle, TrendingUp,
  Search, ArrowUpDown, Plus, Download, ChevronDown, ChevronUp, Edit, Wrench,
  UserPlus, Trash2, X, Calendar, Brain, Lightbulb, Bell, History, Users,
  BarChart3, PieChart, Activity, FileText, ChevronRight, Shield, MapPin,
  Fuel, CircleDot, Zap, ArrowDownUp, Navigation2, Clock, Wifi, WifiOff
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

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

// ─── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_VEHICLES = [
  {
    id: 'v1', plate: 'KCD 456M', model: 'Toyota Premio', year: 2021, status: 'Active',
    driverRating: 4.8, revenue: 1240, utilization: 85, driverReports: 12,
    vin: 'JTDBT123456789012', mileage: 45600,
    lastMaintenance: '2024-01-15', nextMaintenance: '2024-04-15', insuranceExpiry: '2024-08-20',
    assignedDriver: 'John Mwangi', driverPhone: '+254712345678', driverSince: '2023-06-01',
    maintenanceHistory: [
      { date: '2024-01-15', type: 'Oil Change', cost: 85, mechanic: 'AutoCare Kenya' },
      { date: '2023-10-10', type: 'Brake Pads', cost: 120, mechanic: 'QuickFix Garage' },
      { date: '2023-07-05', type: 'Tire Rotation', cost: 45, mechanic: 'AutoCare Kenya' },
    ],
    incidents: [],
    weeklyRevenue: [280, 310, 295, 355, 0, 0, 0],
    monthlyRevenue: [1120, 1180, 1240, 1310, 1280, 1350],
    driverFeedback: [
      { rating: 5, comment: 'Well maintained vehicle', date: '2024-02-10' },
      { rating: 4, comment: 'Good fuel efficiency', date: '2024-02-05' },
      { rating: 5, comment: 'Very comfortable', date: '2024-01-28' },
    ],
    location: { lat: -1.2864, lng: 36.8172, speed: 45, heading: 120, address: 'Moi Avenue, Nairobi CBD', lastUpdated: '2024-02-15T14:32:00', online: true },
  },
  {
    id: 'v2', plate: 'KDD 789B', model: 'Honda CRV', year: 2020, status: 'Active',
    driverRating: 4.2, revenue: 980, utilization: 70, driverReports: 8,
    vin: 'JHMRE123456789012', mileage: 78200,
    lastMaintenance: '2024-01-20', nextMaintenance: '2024-04-20', insuranceExpiry: '2024-09-15',
    assignedDriver: 'Peter Ochieng', driverPhone: '+254723456789', driverSince: '2023-08-15',
    maintenanceHistory: [
      { date: '2024-01-20', type: 'Full Service', cost: 250, mechanic: 'Honda Specialist' },
      { date: '2023-11-05', type: 'Battery Replacement', cost: 95, mechanic: 'AutoCare Kenya' },
    ],
    incidents: [{ type: 'Minor Accident', date: '2023-12-10', cost: 450, repaired: true }],
    weeklyRevenue: [220, 245, 230, 285, 0, 0, 0],
    monthlyRevenue: [980, 1010, 980, 1050, 1020, 990],
    driverFeedback: [
      { rating: 4, comment: 'Reliable car', date: '2024-02-08' },
      { rating: 4, comment: 'Good AC', date: '2024-01-30' },
    ],
    location: { lat: -1.3028, lng: 36.7074, speed: 62, heading: 45, address: 'Ngong Road, Kilimani', lastUpdated: '2024-02-15T14:30:00', online: true },
  },
  {
    id: 'v3', plate: 'KBE 234L', model: 'Nissan Note', year: 2022, status: 'Maintenance',
    driverRating: 3.9, revenue: 450, utilization: 32, driverReports: 4,
    vin: 'SJNFDAJ123456789', mileage: 23400,
    lastMaintenance: '2024-02-01', nextMaintenance: '2024-03-01', insuranceExpiry: '2024-10-10',
    assignedDriver: 'Mary Wanjiku', driverPhone: '+254734567890', driverSince: '2023-10-01',
    maintenanceHistory: [
      { date: '2024-02-01', type: 'Engine Check', cost: 180, mechanic: 'Nissan Dealer' },
      { date: '2023-12-15', type: 'Oil Change', cost: 75, mechanic: 'QuickFix Garage' },
    ],
    incidents: [],
    weeklyRevenue: [110, 95, 120, 125, 0, 0, 0],
    monthlyRevenue: [450, 480, 450, 500, 470, 460],
    driverFeedback: [
      { rating: 4, comment: 'Good fuel economy', date: '2024-01-25' },
      { rating: 3, comment: 'Could be more powerful', date: '2024-01-20' },
    ],
    location: { lat: -1.2200, lng: 36.8800, speed: 0, heading: 0, address: 'Ruiru Workshop Bay 3', lastUpdated: '2024-02-14T09:15:00', online: false },
  },
  {
    id: 'v4', plate: 'KAA 111X', model: 'Subaru Outback', year: 2019, status: 'Warning',
    driverRating: 2.5, revenue: 610, utilization: 48, driverReports: 15,
    vin: 'JF1SU9LJ9GH123456', mileage: 125600,
    lastMaintenance: '2024-01-05', nextMaintenance: '2024-03-05', insuranceExpiry: '2024-07-30',
    assignedDriver: 'James Kariuki', driverPhone: '+254745678901', driverSince: '2023-05-20',
    maintenanceHistory: [
      { date: '2024-01-05', type: 'Major Service', cost: 450, mechanic: 'Subaru Specialist' },
      { date: '2023-10-20', type: 'Brake Replacement', cost: 280, mechanic: 'AutoCare Kenya' },
    ],
    incidents: [
      { type: 'Engine Issue', date: '2024-01-15', cost: 800, repaired: true },
      { type: 'Driver Complaint', date: '2024-01-10', cost: 0, repaired: false },
    ],
    weeklyRevenue: [140, 155, 160, 155, 0, 0, 0],
    monthlyRevenue: [610, 580, 620, 590, 600, 610],
    driverFeedback: [
      { rating: 2, comment: 'Frequent breakdowns', date: '2024-02-01' },
      { rating: 3, comment: 'Decent but needs repairs', date: '2024-01-25' },
      { rating: 2, comment: 'Not reliable', date: '2024-01-18' },
    ],
    location: { lat: -1.2700, lng: 36.8100, speed: 18, heading: 200, address: 'Tom Mboya Street, Nairobi', lastUpdated: '2024-02-15T14:28:00', online: true },
  },
  {
    id: 'v5', plate: 'KCF 567Z', model: 'Toyota Hiace', year: 2022, status: 'Active',
    driverRating: 4.9, revenue: 2100, utilization: 92, driverReports: 3,
    vin: 'JTFST123456789012', mileage: 67800,
    lastMaintenance: '2024-02-10', nextMaintenance: '2024-05-10', insuranceExpiry: '2025-01-15',
    assignedDriver: 'David Otieno', driverPhone: '+254756789012', driverSince: '2023-04-10',
    maintenanceHistory: [
      { date: '2024-02-10', type: 'Full Service', cost: 320, mechanic: 'Toyota Dealer' },
      { date: '2023-12-01', type: 'Tire Replacement', cost: 450, mechanic: 'TirePro' },
    ],
    incidents: [],
    weeklyRevenue: [480, 520, 510, 590, 0, 0, 0],
    monthlyRevenue: [1950, 2050, 2100, 2150, 2080, 2100],
    driverFeedback: [
      { rating: 5, comment: 'Excellent van', date: '2024-02-12' },
      { rating: 5, comment: 'Very spacious', date: '2024-02-08' },
      { rating: 4, comment: 'Good for group trips', date: '2024-02-01' },
    ],
    location: { lat: -1.1632, lng: 36.9316, speed: 78, heading: 90, address: 'Thika Road, near Garden City', lastUpdated: '2024-02-15T14:33:00', online: true },
  },
  {
    id: 'v6', plate: 'KDM 890W', model: 'Suzuki Swift', year: 2023, status: 'Active',
    driverRating: 4.5, revenue: 720, utilization: 78, driverReports: 2,
    vin: 'JS3TD123456789012', mileage: 15600,
    lastMaintenance: '2024-02-05', nextMaintenance: '2024-05-05', insuranceExpiry: '2024-11-20',
    assignedDriver: 'Grace Muthoni', driverPhone: '+254767890123', driverSince: '2023-11-01',
    maintenanceHistory: [
      { date: '2024-02-05', type: 'Oil Change', cost: 70, mechanic: 'Suzuki Dealer' },
    ],
    incidents: [],
    weeklyRevenue: [160, 175, 180, 205, 0, 0, 0],
    monthlyRevenue: [680, 710, 720, 740, 710, 720],
    driverFeedback: [
      { rating: 5, comment: 'Great city car', date: '2024-02-09' },
      { rating: 4, comment: 'Fuel efficient', date: '2024-02-03' },
    ],
    location: { lat: -1.3200, lng: 36.8300, speed: 33, heading: 310, address: 'Langata Road, near T-Mall', lastUpdated: '2024-02-15T14:25:00', online: true },
  },
];

const INITIAL_DRIVERS = [
  { id: 'd1', name: 'John Mwangi', phone: '+254712345678', rating: 4.8, experience: 5, verified: true },
  { id: 'd2', name: 'Peter Ochieng', phone: '+254723456789', rating: 4.5, experience: 3, verified: true },
  { id: 'd3', name: 'Mary Wanjiku', phone: '+254734567890', rating: 4.9, experience: 6, verified: true },
  { id: 'd4', name: 'James Kariuki', phone: '+254745678901', rating: 3.8, experience: 2, verified: false },
  { id: 'd5', name: 'David Otieno', phone: '+254756789012', rating: 4.9, experience: 7, verified: true },
  { id: 'd6', name: 'Grace Muthoni', phone: '+254767890123', rating: 4.7, experience: 4, verified: true },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const formatCurrency = (n) => `$${n.toLocaleString()}`;
const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

function statusColor(status) {
  if (status === 'Active') return palette.success;
  if (status === 'Maintenance') return palette.warning;
  return palette.danger;
}
function statusBg(status) {
  if (status === 'Active') return 'rgba(16,185,129,0.12)';
  if (status === 'Maintenance') return 'rgba(245,158,11,0.14)';
  return 'rgba(239,68,68,0.12)';
}
function ratingColor(r) {
  if (r >= 4.5) return palette.success;
  if (r >= 4) return palette.primary;
  if (r >= 3) return palette.warning;
  return palette.danger;
}
function utilBarColor(u) {
  if (u >= 80) return palette.success;
  if (u >= 60) return palette.primary;
  if (u >= 40) return palette.warning;
  return palette.danger;
}

// ─── Leaflet helpers ───────────────────────────────────────────────────────────
function createVehicleIcon(color, isMoving) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
    <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="${color}"/>
    <circle cx="16" cy="15" r="9" fill="white" opacity="0.9"/>
    <text x="16" y="19" text-anchor="middle" font-size="12" font-weight="bold" fill="${color}">🚗</text>
    ${isMoving ? `<circle cx="16" cy="15" r="12" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"><animate attributeName="r" from="12" to="18" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite"/></circle>` : ''}
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [map, positions]);
  return null;
}

// ─── Reusable tiny components ──────────────────────────────────────────────────
function Badge({ label, color, bg }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div
      className="rounded-2xl border p-4 transition hover:shadow-md"
      style={{ backgroundColor: palette.card, borderColor: palette.border }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: palette.textSecondary }}>{label}</span>
        <Icon size={14} style={{ color: accent || palette.primary }} />
      </div>
      <div className="text-2xl font-bold" style={{ color: palette.text }}>{value}</div>
      {sub && <div className="mt-1 text-xs" style={{ color: palette.textSecondary }}>{sub}</div>}
    </div>
  );
}

function ProgressBar({ value, color, height = 6 }) {
  return (
    <div className="w-full rounded-full" style={{ backgroundColor: palette.border, height }}>
      <div className="rounded-full transition-all" style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color, height }} />
    </div>
  );
}

// ─── Vehicle Row Card (expandable) ─────────────────────────────────────────────
function VehicleRow({ vehicle, expanded, onToggle, onEdit, onService, onAssign, onDelete, formatDate }) {
  return (
    <div
      className="rounded-xl border transition"
      style={{ backgroundColor: palette.card, borderColor: expanded ? palette.primary : palette.border }}
    >
      {/* Summary row */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-3 text-left transition hover:opacity-90"
      >
        {/* Status dot */}
        <span className="flex h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: statusColor(vehicle.status) }} />

        {/* Plate + model */}
        <div className="min-w-[140px]">
          <span className="text-sm font-bold" style={{ color: palette.text }}>{vehicle.plate}</span>
          <span className="ml-2 text-xs" style={{ color: palette.textSecondary }}>{vehicle.model} ({vehicle.year})</span>
        </div>

        {/* Status badge */}
        <div className="hidden min-w-[90px] sm:block">
          <Badge label={vehicle.status} color={statusColor(vehicle.status)} bg={statusBg(vehicle.status)} />
        </div>

        {/* Driver */}
        <div className="hidden min-w-[120px] md:block">
          <span className="text-xs" style={{ color: palette.textSecondary }}>{vehicle.assignedDriver || 'Unassigned'}</span>
        </div>

        {/* Rating */}
        <div className="hidden min-w-[70px] lg:flex items-center gap-1">
          <Star size={12} style={{ color: ratingColor(vehicle.driverRating) }} fill={ratingColor(vehicle.driverRating)} />
          <span className="text-sm font-semibold" style={{ color: ratingColor(vehicle.driverRating) }}>{vehicle.driverRating}</span>
        </div>

        {/* Revenue */}
        <div className="hidden min-w-[80px] lg:block">
          <span className="text-sm font-semibold" style={{ color: palette.success }}>${vehicle.revenue}</span>
          <span className="text-[10px] ml-1" style={{ color: palette.textSecondary }}>/mo</span>
        </div>

        {/* Utilization mini bar */}
        <div className="hidden min-w-[100px] xl:flex items-center gap-2">
          <div className="flex-1">
            <ProgressBar value={vehicle.utilization} color={utilBarColor(vehicle.utilization)} height={4} />
          </div>
          <span className="text-xs font-medium" style={{ color: palette.textSecondary }}>{vehicle.utilization}%</span>
        </div>

        {/* Mileage */}
        <div className="hidden min-w-[80px] xl:block">
          <span className="text-xs" style={{ color: palette.textSecondary }}>{vehicle.mileage.toLocaleString()} km</span>
        </div>

        {/* Chevron */}
        <div className="ml-auto shrink-0">
          {expanded
            ? <ChevronUp size={16} style={{ color: palette.primary }} />
            : <ChevronDown size={16} style={{ color: palette.textSecondary }} />}
        </div>
      </button>

      {/* Expanded detail panel */}
      {expanded && (
        <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: palette.border }}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 – Vehicle info */}
            <div className="space-y-2">
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Vehicle Details</h4>
              <InfoLine label="VIN" value={vehicle.vin?.slice(-8) || 'N/A'} mono />
              <InfoLine label="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} />
              <InfoLine label="Insurance Expiry" value={formatDate(vehicle.insuranceExpiry)} />
              <InfoLine label="Next Service" value={formatDate(vehicle.nextMaintenance)} />
            </div>

            {/* Column 2 – Driver */}
            <div className="space-y-2">
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Assigned Driver</h4>
              <InfoLine label="Name" value={vehicle.assignedDriver || 'Unassigned'} />
              <InfoLine label="Phone" value={vehicle.driverPhone || '—'} />
              <InfoLine label="Since" value={vehicle.driverSince ? formatDate(vehicle.driverSince) : '—'} />
              <InfoLine label="Reports" value={vehicle.driverReports} />
            </div>

            {/* Column 3 – Maintenance history */}
            <div className="space-y-2">
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Recent Maintenance</h4>
              {vehicle.maintenanceHistory.slice(0, 3).map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span style={{ color: palette.text }}>{m.type}</span>
                  <span style={{ color: palette.textSecondary }}>${m.cost}</span>
                </div>
              ))}
              {vehicle.maintenanceHistory.length === 0 && (
                <span className="text-xs" style={{ color: palette.textSecondary }}>No records</span>
              )}
            </div>

            {/* Column 4 – Feedback */}
            <div className="space-y-2">
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>Driver Feedback</h4>
              {vehicle.driverFeedback.slice(0, 3).map((f, i) => (
                <div key={i} className="text-xs">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={10} fill={s < f.rating ? '#FBBF24' : 'transparent'} stroke={s < f.rating ? '#FBBF24' : palette.border} />
                    ))}
                  </div>
                  <p className="mt-0.5 italic" style={{ color: palette.textSecondary }}>"{f.comment}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: palette.border }}>
            <ActionBtn icon={Edit} label="Edit" onClick={onEdit} />
            <ActionBtn icon={Wrench} label="Service" onClick={onService} accent={palette.primary} />
            <ActionBtn icon={UserPlus} label="Assign" onClick={onAssign} accent="rgb(139,92,246)" />
            <ActionBtn icon={Trash2} label="Remove" onClick={onDelete} accent={palette.danger} />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoLine({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: palette.textSecondary }}>{label}</span>
      <span className={mono ? 'font-mono' : 'font-medium'} style={{ color: palette.text }}>{value}</span>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, onClick, accent }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
      style={{ borderColor: palette.border, color: accent || palette.text, backgroundColor: 'transparent' }}
    >
      <Icon size={13} />
      {label}
    </button>
  );
}

// ─── Modal shell ───────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6"
        style={{ backgroundColor: palette.card, borderColor: palette.border }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold" style={{ color: palette.text }}>{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 transition hover:opacity-70" style={{ color: palette.textSecondary }}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalInput({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>{label}</label>
      <input
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2"
        style={{
          backgroundColor: palette.bg,
          borderColor: palette.border,
          color: palette.text,
          '--tw-ring-color': palette.primary,
        }}
        {...props}
      />
    </div>
  );
}

function ModalSelect({ label, children, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>{label}</label>
      <select
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2"
        style={{
          backgroundColor: palette.bg,
          borderColor: palette.border,
          color: palette.text,
          '--tw-ring-color': palette.primary,
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

function ModalActions({ onCancel, submitLabel = 'Save' }) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border px-5 py-2 text-sm font-semibold transition hover:opacity-80"
        style={{ borderColor: palette.border, color: palette.text }}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: palette.primary }}
      >
        {submitLabel}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function FleetManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showDriverAssignmentModal, setShowDriverAssignmentModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('weekly');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('plate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedId, setExpandedId] = useState(null);

  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [drivers] = useState(INITIAL_DRIVERS);

  // ── Computed stats ────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === 'Active').length;
    const maintenance = vehicles.filter(v => v.status === 'Maintenance').length;
    const warning = vehicles.filter(v => v.status === 'Warning').length;
    const avgRating = (vehicles.reduce((s, v) => s + v.driverRating, 0) / total || 0).toFixed(1);
    const totalRevenue = vehicles.reduce((s, v) => s + v.revenue, 0);
    const avgUtilization = Math.round(vehicles.reduce((s, v) => s + v.utilization, 0) / total || 0);
    const totalMileage = vehicles.reduce((s, v) => s + v.mileage, 0);
    const highPerforming = vehicles.filter(v => v.driverRating >= 4.5).length;
    const needsAttention = vehicles.filter(v => v.driverRating < 3.5 || v.status === 'Warning').length;
    const projectedRevenue = Math.round(totalRevenue * 1.12);
    const maintenanceCost = vehicles.reduce((s, v) => s + v.maintenanceHistory.reduce((x, m) => x + m.cost, 0), 0);
    const avgMaintenanceCost = Math.round(maintenanceCost / total || 0);
    const revenuePerVehicle = Math.round(totalRevenue / total || 0);
    const lastMonthRevenue = vehicles.reduce((s, v) => s + (v.monthlyRevenue[v.monthlyRevenue.length - 2] || 0), 0);
    const revenueGrowth = (((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 || 0).toFixed(1);
    const ratingDistribution = {
      excellent: vehicles.filter(v => v.driverRating >= 4.5).length,
      good: vehicles.filter(v => v.driverRating >= 4 && v.driverRating < 4.5).length,
      average: vehicles.filter(v => v.driverRating >= 3 && v.driverRating < 4).length,
      poor: vehicles.filter(v => v.driverRating < 3).length,
    };
    return {
      total, active, maintenance, warning, avgRating, totalRevenue, avgUtilization,
      totalMileage, highPerforming, needsAttention, projectedRevenue, maintenanceCost,
      avgMaintenanceCost, revenuePerVehicle, revenueGrowth, ratingDistribution,
    };
  }, [vehicles]);

  // ── Filtered + sorted vehicles ────────────────────────────────────────────
  const filteredVehicles = useMemo(() => {
    let list = [...vehicles];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(v =>
        v.plate.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.assignedDriver?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') list = list.filter(v => v.status === statusFilter);
    list.sort((a, b) => {
      const aVal = sortBy === 'rating' ? a.driverRating : a[sortBy];
      const bVal = sortBy === 'rating' ? b.driverRating : b[sortBy];
      if (typeof aVal === 'string') return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return list;
  }, [vehicles, searchTerm, statusFilter, sortBy, sortOrder]);

  // ── Chart data ────────────────────────────────────────────────────────────
  const revenueChartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const totals = months.map((_, i) => vehicles.reduce((s, v) => s + (v.monthlyRevenue[i] || 0), 0));
    return { months, totals, max: Math.max(...totals) };
  }, [vehicles]);

  const ratingChartData = useMemo(() => ({
    labels: ['Excellent (4.5-5)', 'Good (4-4.4)', 'Average (3-3.9)', 'Poor (<3)'],
    values: [stats.ratingDistribution.excellent, stats.ratingDistribution.good, stats.ratingDistribution.average, stats.ratingDistribution.poor],
    colors: [palette.success, palette.primary, palette.warning, palette.danger],
  }), [stats.ratingDistribution]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleEditVehicle = useCallback((e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setVehicles(prev => prev.map(v =>
      v.id === selectedVehicle.id ? {
        ...v, plate: fd.get('plate'), model: fd.get('model'),
        year: parseInt(fd.get('year')), status: fd.get('status'),
        vin: fd.get('vin'), mileage: parseInt(fd.get('mileage')),
        nextMaintenance: fd.get('nextMaintenance'), insuranceExpiry: fd.get('insuranceExpiry'),
      } : v
    ));
    setShowEditModal(false);
    setSelectedVehicle(null);
  }, [selectedVehicle]);

  const handleDeleteVehicle = useCallback(() => {
    setVehicles(prev => prev.filter(v => v.id !== selectedVehicle.id));
    setShowDeleteConfirm(false);
    setSelectedVehicle(null);
  }, [selectedVehicle]);

  const handleAssignDriver = useCallback((e) => {
    e.preventDefault();
    const driverId = new FormData(e.target).get('driverId');
    const driver = drivers.find(d => d.id === driverId);
    setVehicles(prev => prev.map(v =>
      v.id === selectedVehicle.id ? { ...v, assignedDriver: driver.name, driverPhone: driver.phone, driverSince: new Date().toISOString().split('T')[0] } : v
    ));
    setShowDriverAssignmentModal(false);
    setSelectedVehicle(null);
  }, [selectedVehicle, drivers]);

  const handleScheduleMaintenance = useCallback((e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const entry = { date: fd.get('date'), type: fd.get('type'), cost: parseInt(fd.get('cost')), mechanic: fd.get('mechanic') };
    setVehicles(prev => prev.map(v =>
      v.id === selectedVehicle.id ? {
        ...v, maintenanceHistory: [entry, ...v.maintenanceHistory],
        nextMaintenance: fd.get('nextMaintenance'), lastMaintenance: fd.get('date'),
      } : v
    ));
    setShowMaintenanceModal(false);
    setSelectedVehicle(null);
  }, [selectedVehicle]);

  // ── Tab definitions ───────────────────────────────────────────────────────
  const tabs = [
    { id: 'overview', icon: PieChart, label: 'Overview & Analytics' },
    { id: 'vehicles', icon: Car, label: 'Fleet Inventory' },
    { id: 'performance', icon: BarChart3, label: 'Performance Metrics' },
    { id: 'financial', icon: DollarSign, label: 'Financial Analytics' },
    { id: 'maintenance', icon: Wrench, label: 'Maintenance Schedule' },
    { id: 'drivers', icon: Users, label: 'Driver Management' },
    { id: 'tracking', icon: Navigation2, label: 'Vehicle Tracking' },
    { id: 'insights', icon: Brain, label: 'AI Insights' },
  ];

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.bg }}>
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: palette.primary }}>
                <Car size={20} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold lg:text-4xl" style={{ color: palette.text }}>Fleet Command Center</h1>
            </div>
            <p className="ml-[52px] text-sm" style={{ color: palette.textSecondary }}>
              Real-time reputation intelligence & comprehensive fleet performance analytics
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/fleet-management/add')}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: palette.primary }}
            >
              <Plus size={16} /> Register Vehicle
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
              style={{ borderColor: palette.border, color: palette.text }}
            >
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* ── Quick Stats ─────────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard icon={Car} label="Total Fleet" value={stats.total} sub={`${stats.active} active`} accent={palette.primary} />
          <StatCard icon={Star} label="Avg Rating" value={stats.avgRating} sub={`+${stats.revenueGrowth}%`} accent="#FBBF24" />
          <StatCard icon={DollarSign} label="Revenue" value={formatCurrency(stats.totalRevenue)} sub="+12% vs last month" accent={palette.success} />
          <StatCard icon={Gauge} label="Utilization" value={`${stats.avgUtilization}%`} accent="rgb(139,92,246)" />
          <StatCard icon={Route} label="Mileage" value={`${Math.round(stats.totalMileage / 1000)}k`} sub={`Avg ${Math.round(stats.totalMileage / stats.total / 1000)}k km`} accent="rgb(99,102,241)" />
          <StatCard icon={Trophy} label="High Performers" value={stats.highPerforming} sub={`${Math.round((stats.highPerforming / stats.total) * 100)}% of fleet`} accent="#FBBF24" />
          <StatCard icon={AlertTriangle} label="Needs Attention" value={stats.needsAttention} sub={`${stats.warning} warnings`} accent={palette.danger} />
          <StatCard icon={TrendingUp} label="Projected" value={formatCurrency(stats.projectedRevenue)} sub="Next month" accent={palette.primary} />
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <div className="mb-6 border-b" style={{ borderColor: palette.border }}>
          <div className="flex flex-wrap gap-1">
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition"
                  style={{
                    color: active ? palette.primary : palette.textSecondary,
                    borderBottom: active ? `2px solid ${palette.primary}` : '2px solid transparent',
                    backgroundColor: active ? 'rgba(37,99,235,0.08)' : 'transparent',
                  }}
                >
                  <tab.icon size={14} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            TAB: OVERVIEW
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Revenue chart */}
            <Card title="Revenue Trend Analysis" icon={TrendingUp}>
              <div className="mb-4 flex gap-2">
                {['weekly', 'monthly'].map(p => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className="rounded-lg px-3 py-1 text-xs font-medium transition"
                    style={{
                      backgroundColor: chartPeriod === p ? palette.primary : 'rgba(148,163,184,0.1)',
                      color: chartPeriod === p ? '#fff' : palette.textSecondary,
                    }}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative flex h-64 items-end gap-3 pb-6">
                {revenueChartData.totals.map((rev, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="group relative w-full max-w-[56px] rounded-t-lg transition hover:opacity-80"
                      style={{
                        height: `${(rev / revenueChartData.max) * 100}%`,
                        minHeight: 4,
                        backgroundColor: palette.primary,
                      }}
                    >
                      <span
                        className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium opacity-0 transition group-hover:opacity-100"
                        style={{ backgroundColor: palette.text, color: palette.card }}
                      >
                        ${rev}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: palette.textSecondary }}>{revenueChartData.months[i]}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Rating + Utilization */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Driver Rating Distribution" icon={Star} iconColor="#FBBF24">
                {ratingChartData.labels.map((label, i) => {
                  const pct = (ratingChartData.values[i] / stats.total) * 100;
                  return (
                    <div key={i} className="mb-3">
                      <div className="mb-1 flex justify-between text-xs">
                        <span style={{ color: palette.textSecondary }}>{label}</span>
                        <span className="font-medium" style={{ color: palette.text }}>{ratingChartData.values[i]} ({pct.toFixed(0)}%)</span>
                      </div>
                      <ProgressBar value={pct} color={ratingChartData.colors[i]} />
                    </div>
                  );
                })}
                <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: 'rgba(148,163,184,0.08)' }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: palette.textSecondary }}>Fleet Average</span>
                    <span className="font-bold" style={{ color: palette.text }}>{stats.avgRating} / 5.0</span>
                  </div>
                  <div className="mt-2"><ProgressBar value={(parseFloat(stats.avgRating) / 5) * 100} color="#FBBF24" /></div>
                </div>
              </Card>

              <Card title="Vehicle Utilization" icon={Gauge} iconColor="rgb(139,92,246)">
                <div className="space-y-3">
                  {vehicles.map(v => (
                    <div key={v.id}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium" style={{ color: palette.text }}>{v.plate}</span>
                        <span style={{ color: palette.textSecondary }}>{v.utilization}%</span>
                      </div>
                      <ProgressBar value={v.utilization} color={utilBarColor(v.utilization)} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-3" style={{ borderColor: palette.border }}>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: palette.text }}>{stats.avgUtilization}%</div>
                    <div className="text-xs" style={{ color: palette.textSecondary }}>Average</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: palette.success }}>{stats.highPerforming}</div>
                    <div className="text-xs" style={{ color: palette.textSecondary }}>High Performers</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Fleet Status Breakdown + Revenue per Vehicle */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Fleet Status Breakdown" icon={CircleDot} iconColor="rgb(139,92,246)">
                <div className="flex items-center gap-8">
                  {/* Donut ring */}
                  <div className="relative flex-shrink-0">
                    <svg viewBox="0 0 120 120" width="140" height="140">
                      {(() => {
                        const segments = [
                          { label: 'Active', count: stats.active, color: palette.success },
                          { label: 'Maintenance', count: stats.maintenance, color: palette.warning },
                          { label: 'Warning', count: stats.warning, color: palette.danger },
                        ];
                        const total = stats.total || 1;
                        const r = 48, cx = 60, cy = 60, circumference = 2 * Math.PI * r;
                        let offset = 0;
                        return segments.map((seg, i) => {
                          const pct = seg.count / total;
                          const dash = pct * circumference;
                          const gap = circumference - dash;
                          const el = (
                            <circle
                              key={i}
                              cx={cx} cy={cy} r={r}
                              fill="none"
                              stroke={seg.color}
                              strokeWidth="12"
                              strokeDasharray={`${dash} ${gap}`}
                              strokeDashoffset={-offset}
                              strokeLinecap="round"
                              transform="rotate(-90 60 60)"
                              style={{ transition: 'all 0.5s ease' }}
                            />
                          );
                          offset += dash;
                          return el;
                        });
                      })()}
                      <text x="60" y="55" textAnchor="middle" style={{ fill: palette.text, fontSize: '22px', fontWeight: 700 }}>{stats.total}</text>
                      <text x="60" y="72" textAnchor="middle" style={{ fill: palette.textSecondary, fontSize: '10px' }}>vehicles</text>
                    </svg>
                  </div>
                  {/* Legend */}
                  <div className="flex-1 space-y-3">
                    {[
                      { label: 'Active', count: stats.active, color: palette.success },
                      { label: 'Maintenance', count: stats.maintenance, color: palette.warning },
                      { label: 'Warning', count: stats.warning, color: palette.danger },
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

              <Card title="Revenue per Vehicle" icon={DollarSign} iconColor={palette.success}>
                <div className="space-y-3">
                  {[...vehicles].sort((a, b) => b.revenue - a.revenue).map(v => {
                    const maxRev = Math.max(...vehicles.map(x => x.revenue));
                    return (
                      <div key={v.id}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{v.plate}</span>
                          <span className="font-semibold" style={{ color: palette.success }}>${v.revenue}/mo</span>
                        </div>
                        <ProgressBar value={(v.revenue / maxRev) * 100} color={palette.success} />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Maintenance Cost vs Revenue + Mileage Distribution */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Maintenance Cost vs Revenue" icon={Wrench} iconColor={palette.warning}>
                <div className="space-y-4">
                  {vehicles.map(v => {
                    const mCost = v.maintenanceHistory.reduce((s, m) => s + m.cost, 0);
                    const rev6 = v.revenue * 6;
                    const maxVal = Math.max(...vehicles.map(x => x.revenue * 6));
                    return (
                      <div key={v.id}>
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{v.plate} — {v.model}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-16 text-[10px]" style={{ color: palette.textSecondary }}>Revenue</span>
                            <div className="flex-1"><ProgressBar value={(rev6 / maxVal) * 100} color={palette.success} height={5} /></div>
                            <span className="w-12 text-right text-[10px] font-medium" style={{ color: palette.success }}>${rev6}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-16 text-[10px]" style={{ color: palette.textSecondary }}>Maint.</span>
                            <div className="flex-1"><ProgressBar value={(mCost / maxVal) * 100} color={palette.danger} height={5} /></div>
                            <span className="w-12 text-right text-[10px] font-medium" style={{ color: palette.danger }}>${mCost}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Mileage Distribution" icon={Route} iconColor="rgb(99,102,241)">
                <div className="space-y-3">
                  {[...vehicles].sort((a, b) => b.mileage - a.mileage).map(v => {
                    const maxMi = Math.max(...vehicles.map(x => x.mileage));
                    const pct = (v.mileage / maxMi) * 100;
                    const mileageColor = v.mileage > 100000 ? palette.danger : v.mileage > 60000 ? palette.warning : palette.success;
                    return (
                      <div key={v.id}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{v.plate} — {v.model}</span>
                          <span style={{ color: palette.textSecondary }}>{v.mileage.toLocaleString()} km</span>
                        </div>
                        <ProgressBar value={pct} color={mileageColor} />
                      </div>
                    );
                  })}
                  <div className="mt-3 flex items-center gap-4 text-[10px]" style={{ color: palette.textSecondary }}>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.success }} /> &lt;60k km</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.warning }} /> 60-100k km</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.danger }} /> &gt;100k km</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Weekly Revenue Sparklines + Incident Tracker */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Weekly Revenue Sparklines" icon={Zap} iconColor={palette.primary}>
                <div className="space-y-4">
                  {vehicles.map(v => {
                    const maxW = Math.max(...v.weeklyRevenue.filter(x => x > 0), 1);
                    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                    return (
                      <div key={v.id}>
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{v.plate}</span>
                          <span style={{ color: palette.textSecondary }}>${v.weeklyRevenue.reduce((a, b) => a + b, 0)} this week</span>
                        </div>
                        <div className="flex items-end gap-1" style={{ height: 36 }}>
                          {v.weeklyRevenue.map((w, i) => (
                            <div key={i} className="group relative flex flex-1 flex-col items-center">
                              <div
                                className="w-full rounded-sm transition hover:opacity-80"
                                style={{
                                  height: w > 0 ? `${(w / maxW) * 32}px` : '2px',
                                  backgroundColor: w > 0 ? palette.primary : palette.border,
                                  minHeight: 2,
                                }}
                              />
                              <span className="mt-1 text-[8px]" style={{ color: palette.textSecondary }}>{days[i]}</span>
                              {w > 0 && (
                                <span
                                  className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium opacity-0 transition group-hover:opacity-100"
                                  style={{ backgroundColor: palette.text, color: palette.card }}
                                >
                                  ${w}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Incident Tracker" icon={AlertTriangle} iconColor={palette.danger}>
                {(() => {
                  const allIncidents = vehicles.flatMap(v => v.incidents.map(inc => ({ ...inc, vehicle: v.plate, model: v.model })));
                  if (allIncidents.length === 0) return (
                    <div className="py-8 text-center">
                      <Shield size={32} className="mx-auto mb-2" style={{ color: palette.success, opacity: 0.5 }} />
                      <p className="text-sm font-medium" style={{ color: palette.success }}>No incidents recorded</p>
                      <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Your fleet has a clean incident history</p>
                    </div>
                  );
                  return (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: 'rgba(148,163,184,0.06)' }}>
                          <div className="text-xl font-bold" style={{ color: palette.text }}>{allIncidents.length}</div>
                          <div className="text-[10px]" style={{ color: palette.textSecondary }}>Total</div>
                        </div>
                        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}>
                          <div className="text-xl font-bold" style={{ color: palette.success }}>{allIncidents.filter(i => i.repaired).length}</div>
                          <div className="text-[10px]" style={{ color: palette.textSecondary }}>Resolved</div>
                        </div>
                        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: 'rgba(239,68,68,0.08)' }}>
                          <div className="text-xl font-bold" style={{ color: palette.danger }}>{allIncidents.filter(i => !i.repaired).length}</div>
                          <div className="text-[10px]" style={{ color: palette.textSecondary }}>Open</div>
                        </div>
                      </div>
                      {allIncidents.sort((a, b) => new Date(b.date) - new Date(a.date)).map((inc, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border p-3" style={{ borderColor: palette.border }}>
                          <div className="flex items-center gap-3">
                            <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: inc.repaired ? palette.success : palette.danger }} />
                            <div>
                              <div className="text-xs font-medium" style={{ color: palette.text }}>{inc.vehicle} — {inc.type}</div>
                              <div className="text-[10px]" style={{ color: palette.textSecondary }}>{formatDate(inc.date)}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            {inc.cost > 0 && <div className="text-xs font-semibold" style={{ color: palette.danger }}>${inc.cost}</div>}
                            <Badge label={inc.repaired ? 'Resolved' : 'Open'} color={inc.repaired ? palette.success : palette.danger} bg={inc.repaired ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'} />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </Card>
            </div>

            {/* Alerts + Feedback */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Alerts & Notifications" icon={Bell} iconColor={palette.warning}>
                <div className="space-y-3">
                  {vehicles.filter(v => v.status === 'Warning' || v.status === 'Maintenance').map(v => (
                    <div
                      key={v.id}
                      className="flex items-start gap-3 rounded-lg border p-3"
                      style={{ borderColor: palette.border, backgroundColor: 'rgba(239,68,68,0.06)' }}
                    >
                      <AlertTriangle size={14} style={{ color: palette.danger, marginTop: 2 }} />
                      <div className="flex-1">
                        <div className="text-sm font-medium" style={{ color: palette.text }}>{v.plate} — {v.model}</div>
                        <div className="text-xs" style={{ color: palette.textSecondary }}>
                          {v.status === 'Warning' ? `Low rating (${v.driverRating}★) — ${v.driverReports} reports` : `Under maintenance — next ${formatDate(v.nextMaintenance)}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Recent Driver Feedback" icon={Star} iconColor="#FBBF24">
                <div className="max-h-80 space-y-3 overflow-y-auto">
                  {vehicles
                    .flatMap(v => v.driverFeedback.map(f => ({ ...f, vehicle: v.plate })))
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((f, i) => (
                      <div key={i} className="rounded-lg p-3" style={{ backgroundColor: 'rgba(148,163,184,0.06)' }}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium" style={{ color: palette.text }}>{f.vehicle}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star key={s} size={10} fill={s < f.rating ? '#FBBF24' : 'transparent'} stroke={s < f.rating ? '#FBBF24' : palette.border} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs italic" style={{ color: palette.textSecondary }}>"{f.comment}"</p>
                        <span className="text-[10px]" style={{ color: palette.textSecondary }}>{formatDate(f.date)}</span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB: FLEET INVENTORY (thin expandable rows)
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            {/* Filters bar */}
            <div className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: palette.textSecondary }} />
                <input
                  type="text"
                  placeholder="Search by plate, model, or driver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border py-2 pl-9 pr-4 text-sm outline-none transition focus:ring-2"
                  style={{ backgroundColor: palette.bg, borderColor: palette.border, color: palette.text, '--tw-ring-color': palette.primary }}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: palette.bg, borderColor: palette.border, color: palette.text }}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Warning">Warning</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: palette.bg, borderColor: palette.border, color: palette.text }}
              >
                <option value="plate">Sort by Plate</option>
                <option value="revenue">Sort by Revenue</option>
                <option value="rating">Sort by Rating</option>
                <option value="utilization">Sort by Utilization</option>
              </select>
              <button
                onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
                className="rounded-lg border px-3 py-2 transition hover:opacity-80"
                style={{ borderColor: palette.border, color: palette.textSecondary }}
              >
                <ArrowUpDown size={16} />
              </button>
            </div>

            {/* Column header (desktop) */}
            <div className="hidden items-center gap-4 px-4 text-[10px] font-semibold uppercase tracking-wider lg:flex" style={{ color: palette.textSecondary }}>
              <span className="w-2.5" />
              <span className="min-w-[140px]">Vehicle</span>
              <span className="min-w-[90px] hidden sm:block">Status</span>
              <span className="min-w-[120px] hidden md:block">Driver</span>
              <span className="min-w-[70px] hidden lg:block">Rating</span>
              <span className="min-w-[80px] hidden lg:block">Revenue</span>
              <span className="min-w-[100px] hidden xl:block">Utilization</span>
              <span className="min-w-[80px] hidden xl:block">Mileage</span>
              <span className="ml-auto" />
            </div>

            {/* Vehicle rows */}
            <div className="space-y-2">
              {filteredVehicles.map(v => (
                <VehicleRow
                  key={v.id}
                  vehicle={v}
                  expanded={expandedId === v.id}
                  onToggle={() => setExpandedId(expandedId === v.id ? null : v.id)}
                  onEdit={() => { setSelectedVehicle(v); setShowEditModal(true); }}
                  onService={() => { setSelectedVehicle(v); setShowMaintenanceModal(true); }}
                  onAssign={() => { setSelectedVehicle(v); setShowDriverAssignmentModal(true); }}
                  onDelete={() => { setSelectedVehicle(v); setShowDeleteConfirm(true); }}
                  formatDate={formatDate}
                />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="rounded-2xl border py-16 text-center" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                <Car size={48} className="mx-auto mb-3" style={{ color: palette.textSecondary, opacity: 0.4 }} />
                <h3 className="text-lg font-semibold" style={{ color: palette.textSecondary }}>No vehicles found</h3>
                <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB: PERFORMANCE
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Revenue per Vehicle" icon={TrendingUp}>
                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {[...vehicles].sort((a, b) => b.revenue - a.revenue).map(v => (
                    <div key={v.id}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium" style={{ color: palette.text }}>{v.plate} — {v.model}</span>
                        <span className="font-semibold" style={{ color: palette.success }}>${v.revenue}</span>
                      </div>
                      <ProgressBar value={(v.revenue / Math.max(...vehicles.map(x => x.revenue))) * 100} color={palette.success} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Driver Rating Rankings" icon={Activity} iconColor="rgb(139,92,246)">
                <div className="max-h-96 space-y-3 overflow-y-auto">
                  {[...vehicles].sort((a, b) => b.driverRating - a.driverRating).map(v => (
                    <div key={v.id} className="flex items-center justify-between rounded-lg p-2" style={{ backgroundColor: 'rgba(148,163,184,0.06)' }}>
                      <div>
                        <span className="text-sm font-medium" style={{ color: palette.text }}>{v.plate}</span>
                        <span className="ml-2 text-xs" style={{ color: palette.textSecondary }}>{v.model}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: ratingColor(v.driverRating) }}>{v.driverRating}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={10} fill={i < Math.floor(v.driverRating) ? '#FBBF24' : 'transparent'} stroke={i < Math.floor(v.driverRating) ? '#FBBF24' : palette.border} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card title="Monthly Revenue Trend by Vehicle" icon={BarChart3} iconColor="rgb(99,102,241)">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${palette.border}` }}>
                      {['Vehicle', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Trend'].map(h => (
                        <th key={h} className="p-3 text-left text-xs font-semibold" style={{ color: palette.textSecondary }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map(v => {
                      const trend = v.monthlyRevenue[5] - v.monthlyRevenue[0];
                      return (
                        <tr key={v.id} style={{ borderBottom: `1px solid ${palette.border}` }}>
                          <td className="p-3 font-medium" style={{ color: palette.text }}>{v.plate}</td>
                          {v.monthlyRevenue.map((r, i) => (
                            <td key={i} className="p-3" style={{ color: palette.textSecondary }}>${r}</td>
                          ))}
                          <td className="p-3">
                            <span className="text-xs font-medium" style={{ color: trend >= 0 ? palette.success : palette.danger }}>
                              {trend >= 0 ? '+' : ''}{trend}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB: FINANCIAL
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={DollarSign} label="Total Revenue (YTD)" value={formatCurrency(stats.totalRevenue * 6)} sub="+18% vs last year" accent={palette.success} />
              <StatCard icon={DollarSign} label="Avg Revenue/Vehicle" value={formatCurrency(stats.revenuePerVehicle)} sub="per month" accent={palette.primary} />
              <StatCard icon={Wrench} label="Maintenance Cost" value={formatCurrency(stats.maintenanceCost)} sub="YTD total" accent={palette.warning} />
              <StatCard icon={Wrench} label="Avg Maintenance/Vehicle" value={formatCurrency(stats.avgMaintenanceCost)} sub="per vehicle" accent={palette.danger} />
            </div>

            <Card title="Revenue vs Maintenance Cost" icon={PieChart}>
              <div className="space-y-4">
                {vehicles.map(v => {
                  const mCost = v.maintenanceHistory.reduce((s, m) => s + m.cost, 0);
                  const margin = ((v.revenue * 6 - mCost) / (v.revenue * 6) * 100).toFixed(1);
                  return (
                    <div key={v.id}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium" style={{ color: palette.text }}>{v.plate} — {v.model}</span>
                        <span style={{ color: palette.textSecondary }}>Revenue: ${v.revenue * 6} | Maint: ${mCost}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <ProgressBar value={(v.revenue * 6) / Math.max(...vehicles.map(x => x.revenue * 6)) * 100} color={palette.success} />
                        </div>
                        <span className="w-20 text-right text-xs font-medium" style={{ color: parseFloat(margin) >= 50 ? palette.success : parseFloat(margin) >= 30 ? palette.warning : palette.danger }}>
                          {margin}% margin
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${palette.primary}, rgb(99,102,241))` }}>
              <h3 className="mb-2 text-lg font-bold">Financial Summary</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div><div className="text-sm opacity-80">Total Assets Value</div><div className="text-2xl font-bold">~$245,000</div></div>
                <div><div className="text-sm opacity-80">Monthly Operating Cost</div><div className="text-2xl font-bold">~$3,200</div></div>
                <div><div className="text-sm opacity-80">Net Profit (YTD)</div><div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue * 6 - stats.maintenanceCost - 3200 * 6)}</div></div>
                <div><div className="text-sm opacity-80">ROI</div><div className="text-2xl font-bold">34%</div></div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB: MAINTENANCE
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <Card title="Upcoming Maintenance Schedule" icon={Calendar} iconColor={palette.warning}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${palette.border}` }}>
                      {['Vehicle', 'Last Service', 'Next Service', 'Days Left', 'Status', 'Action'].map(h => (
                        <th key={h} className="p-3 text-left text-xs font-semibold" style={{ color: palette.textSecondary }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map(v => {
                      const days = Math.ceil((new Date(v.nextMaintenance) - new Date()) / 86400000);
                      const st = days <= 0 ? 'Overdue' : days <= 7 ? 'Urgent' : days <= 30 ? 'Soon' : 'On Track';
                      const stColor = st === 'Overdue' ? palette.danger : st === 'Urgent' ? palette.warning : st === 'Soon' ? palette.warning : palette.success;
                      const stBg = st === 'Overdue' ? 'rgba(239,68,68,0.12)' : st === 'Urgent' ? 'rgba(245,158,11,0.12)' : st === 'Soon' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.12)';
                      return (
                        <tr key={v.id} style={{ borderBottom: `1px solid ${palette.border}` }}>
                          <td className="p-3 font-medium" style={{ color: palette.text }}>{v.plate}</td>
                          <td className="p-3" style={{ color: palette.textSecondary }}>{formatDate(v.lastMaintenance)}</td>
                          <td className="p-3" style={{ color: palette.textSecondary }}>{formatDate(v.nextMaintenance)}</td>
                          <td className="p-3 font-medium" style={{ color: palette.text }}>{days > 0 ? `${days} days` : 'Overdue'}</td>
                          <td className="p-3"><Badge label={st} color={stColor} bg={stBg} /></td>
                          <td className="p-3">
                            <button
                              onClick={() => { setSelectedVehicle(v); setShowMaintenanceModal(true); }}
                              className="text-sm font-medium transition hover:opacity-80"
                              style={{ color: palette.primary }}
                            >
                              Schedule
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Maintenance History" icon={History} iconColor={palette.primary}>
              <div className="max-h-96 space-y-3 overflow-y-auto">
                {vehicles
                  .flatMap(v => v.maintenanceHistory.map(m => ({ ...m, vehicle: v.plate })))
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 10)
                  .map((r, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: 'rgba(148,163,184,0.06)' }}>
                      <div>
                        <div className="text-sm font-medium" style={{ color: palette.text }}>{r.vehicle}</div>
                        <div className="text-xs" style={{ color: palette.textSecondary }}>{r.type} — {r.mechanic}</div>
                        <div className="text-[10px]" style={{ color: palette.textSecondary }}>{formatDate(r.date)}</div>
                      </div>
                      <div className="text-sm font-semibold" style={{ color: palette.text }}>${r.cost}</div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB: DRIVERS
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'drivers' && (
          <div className="space-y-6">
            <Card title="Driver Directory" icon={Users} extra={
              <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: palette.primary }}>
                <UserPlus size={14} /> Add Driver
              </button>
            }>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {drivers.map(d => {
                  const assigned = vehicles.find(v => v.assignedDriver === d.name);
                  return (
                    <div key={d.id} className="rounded-xl border p-4 transition hover:shadow-md" style={{ borderColor: palette.border }}>
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: palette.primary }}>
                            {d.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold" style={{ color: palette.text }}>{d.name}</div>
                            <div className="text-xs" style={{ color: palette.textSecondary }}>{d.phone}</div>
                          </div>
                        </div>
                        {d.verified && <Shield size={14} style={{ color: palette.success }} />}
                      </div>
                      <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span style={{ color: palette.textSecondary }}>Rating</span>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold" style={{ color: palette.text }}>{d.rating}</span>
                            <Star size={10} fill="#FBBF24" stroke="#FBBF24" />
                          </div>
                        </div>
                        <div>
                          <span style={{ color: palette.textSecondary }}>Experience</span>
                          <div className="font-semibold" style={{ color: palette.text }}>{d.experience} years</div>
                        </div>
                      </div>
                      {assigned && (
                        <div className="rounded-lg p-2 text-xs" style={{ backgroundColor: 'rgba(148,163,184,0.08)', color: palette.textSecondary }}>
                          <Car size={10} className="mr-1 inline" /> {assigned.plate} ({assigned.model})
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB: AI INSIGHTS
        ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            {/* Map area */}
            <Card title="Live Fleet Map" icon={Navigation2} iconColor={palette.primary}>
              <div className="overflow-hidden rounded-xl border" style={{ borderColor: palette.border, height: 500 }}>
                <MapContainer
                  center={[-1.2864, 36.8172]}
                  zoom={12}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <FitBounds
                    positions={vehicles
                      .filter(v => v.location)
                      .map(v => [v.location.lat, v.location.lng])}
                  />
                  {vehicles.map(v => {
                    if (!v.location) return null;
                    const color = v.status === 'Active' ? '#10b981' : v.status === 'Maintenance' ? '#f59e0b' : '#ef4444';
                    return (
                      <Marker
                        key={v.id}
                        position={[v.location.lat, v.location.lng]}
                        icon={createVehicleIcon(color, v.location.speed > 0)}
                      >
                        <Popup>
                          <div style={{ minWidth: 200, fontFamily: 'inherit' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                              <strong style={{ fontSize: 14 }}>{v.plate}</strong>
                              <span style={{
                                fontSize: 10, fontWeight: 600, padding: '2px 8px',
                                borderRadius: 9999, color, backgroundColor: `${color}20`,
                              }}>{v.status}</span>
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{v.model} · {v.assignedDriver}</div>
                            <hr style={{ margin: '6px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                            <div style={{ fontSize: 11, lineHeight: 1.8, color: '#475569' }}>
                              <div>📍 {v.location.address}</div>
                              <div>🚀 Speed: <strong>{v.location.speed} km/h</strong></div>
                              <div>🧭 Heading: {v.location.heading}°</div>
                              <div>📊 Utilization: {v.utilization}%</div>
                              <div>⭐ Rating: {v.driverRating}/5</div>
                              <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
                                {v.location.lat.toFixed(4)}°, {v.location.lng.toFixed(4)}°
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </Card>

            {/* Fleet status summary row */}
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { label: 'Online', value: vehicles.filter(v => v.location?.online).length, icon: Wifi, color: palette.success },
                { label: 'Offline', value: vehicles.filter(v => !v.location?.online).length, icon: WifiOff, color: palette.danger },
                { label: 'Moving', value: vehicles.filter(v => v.location?.speed > 0).length, icon: Navigation2, color: palette.primary },
                { label: 'Parked', value: vehicles.filter(v => v.location?.speed === 0).length, icon: CircleDot, color: palette.warning },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${s.color}15` }}>
                    <s.icon size={18} style={{ color: s.color }} />
                  </div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: palette.text }}>{s.value}</div>
                    <div className="text-xs" style={{ color: palette.textSecondary }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vehicle list with location details */}
            <Card title="Vehicle Positions" icon={MapPin} iconColor={palette.primary}>
              <div className="space-y-3">
                {vehicles.map(v => {
                  const loc = v.location;
                  if (!loc) return null;
                  const updatedAgo = loc.lastUpdated
                    ? (() => {
                        const diffMs = new Date('2024-02-15T14:35:00') - new Date(loc.lastUpdated);
                        const mins = Math.round(diffMs / 60000);
                        if (mins < 1) return 'just now';
                        if (mins < 60) return `${mins}m ago`;
                        const hrs = Math.round(mins / 60);
                        if (hrs < 24) return `${hrs}h ago`;
                        return `${Math.round(hrs / 24)}d ago`;
                      })()
                    : '—';

                  return (
                    <div
                      key={v.id}
                      className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                      style={{ backgroundColor: palette.card, borderColor: palette.border }}
                    >
                      {/* Left — vehicle info */}
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ backgroundColor: statusBg(v.status) }}
                        >
                          <Car size={18} style={{ color: statusColor(v.status) }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: palette.text }}>{v.plate}</span>
                            <Badge label={v.status} color={statusColor(v.status)} bg={statusBg(v.status)} />
                            <span
                              className="flex h-2 w-2 rounded-full"
                              style={{ backgroundColor: loc.online ? palette.success : palette.danger }}
                              title={loc.online ? 'Online' : 'Offline'}
                            />
                          </div>
                          <div className="text-xs" style={{ color: palette.textSecondary }}>{v.model} · {v.assignedDriver}</div>
                        </div>
                      </div>

                      {/* Center — location */}
                      <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: palette.textSecondary }}>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          <span style={{ color: palette.text }}>{loc.address}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Navigation2 size={11} />
                          {loc.speed > 0
                            ? <span style={{ color: palette.success }}>{loc.speed} km/h</span>
                            : <span>Parked</span>
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {updatedAgo}
                        </span>
                      </div>

                      {/* Right — coordinates */}
                      <div className="text-right">
                        <div className="font-mono text-[10px]" style={{ color: palette.textSecondary }}>
                          {loc.lat.toFixed(4)}°, {loc.lng.toFixed(4)}°
                        </div>
                        <div className="text-[10px]" style={{ color: palette.textSecondary }}>Heading {loc.heading}°</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Speed overview + Trip activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Current Speed Overview" icon={Gauge} iconColor={palette.primary}>
                <div className="space-y-4">
                  {vehicles.map(v => {
                    const speed = v.location?.speed ?? 0;
                    const maxSpeed = 120;
                    const speedColor = speed === 0 ? palette.textSecondary : speed > 80 ? palette.danger : speed > 50 ? palette.warning : palette.success;
                    return (
                      <div key={v.id}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{v.plate}</span>
                          <span className="font-semibold" style={{ color: speedColor }}>{speed} km/h</span>
                        </div>
                        <ProgressBar value={(speed / maxSpeed) * 100} color={speedColor} />
                      </div>
                    );
                  })}
                  <div className="mt-3 flex items-center gap-4 text-[10px]" style={{ color: palette.textSecondary }}>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.success }} /> 0-50 km/h</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.warning }} /> 50-80 km/h</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.danger }} /> &gt;80 km/h</span>
                  </div>
                </div>
              </Card>

              <Card title="Daily Distance Traveled" icon={Route} iconColor="rgb(99,102,241)">
                <div className="space-y-3">
                  {vehicles.map(v => {
                    // Simulated daily distance from speed & utilization
                    const dailyKm = Math.round((v.location?.speed ?? 0) * (v.utilization / 100) * 8);
                    const maxKm = 600;
                    return (
                      <div key={v.id}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium" style={{ color: palette.text }}>{v.plate}</span>
                          <span style={{ color: palette.textSecondary }}>{dailyKm} km today</span>
                        </div>
                        <ProgressBar value={(dailyKm / maxKm) * 100} color="rgb(99,102,241)" />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, rgb(139,92,246), rgb(99,102,241))` }}>
              <div className="mb-4 flex items-center gap-3">
                <Brain size={28} />
                <h3 className="text-xl font-bold">AI-Powered Fleet Intelligence</h3>
              </div>
              <p className="mb-4 opacity-80">Based on your fleet data, our AI has generated the following insights and recommendations:</p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: TrendingUp, title: 'Revenue Optimization', desc: 'Vehicle KCD 456M shows highest ROI. Consider replicating this model across fleet.' },
                  { icon: AlertTriangle, title: 'Risk Alert', desc: 'KAA 111X has declining rating trend. Schedule inspection and driver retraining.' },
                  { icon: BarChart3, title: 'Utilization Insight', desc: 'Weekend utilization drops 35%. Consider weekend promotions to increase revenue.' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <item.icon size={16} className="mb-2" />
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-1 text-sm opacity-80">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card title="Predictive Analytics" icon={Brain} iconColor="rgb(139,92,246)">
                <div className="space-y-4">
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(148,163,184,0.06)' }}>
                    <div className="text-sm font-medium" style={{ color: palette.text }}>Next Month Revenue Forecast</div>
                    <div className="mt-1 text-2xl font-bold" style={{ color: 'rgb(139,92,246)' }}>{formatCurrency(stats.projectedRevenue)}</div>
                    <div className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Based on 12% growth trend</div>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(148,163,184,0.06)' }}>
                    <div className="text-sm font-medium" style={{ color: palette.text }}>Maintenance Prediction</div>
                    <div className="mt-1 text-xs" style={{ color: palette.textSecondary }}>KBE 234L predicted to need service in 12 days based on mileage patterns</div>
                    <div className="mt-2"><ProgressBar value={65} color={palette.warning} /></div>
                  </div>
                </div>
              </Card>

              <Card title="Recommendations" icon={Lightbulb} iconColor="#FBBF24">
                <div className="space-y-3">
                  {[
                    { color: palette.success, title: 'Replace KAA 111X', desc: 'High maintenance costs and low ratings suggest replacement would improve fleet ROI by 15%' },
                    { color: palette.primary, title: 'Expand Toyota Fleet', desc: 'Toyota vehicles show 28% higher profitability than other brands' },
                    { color: 'rgb(139,92,246)', title: 'Driver Training Program', desc: 'Implement training for drivers of low-rated vehicles to improve passenger experience' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: palette.border }}>
                      <ChevronRight size={14} style={{ color: r.color, marginTop: 2 }} />
                      <div>
                        <div className="text-sm font-medium" style={{ color: palette.text }}>{r.title}</div>
                        <div className="text-xs" style={{ color: palette.textSecondary }}>{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            MODALS
        ════════════════════════════════════════════════════════════════════ */}

        {/* Edit Vehicle */}
        <Modal open={showEditModal && !!selectedVehicle} onClose={() => setShowEditModal(false)} title={`Edit Vehicle — ${selectedVehicle?.plate || ''}`}>
          <form onSubmit={handleEditVehicle}>
            <div className="grid gap-4 md:grid-cols-2">
              <ModalInput label="License Plate" name="plate" defaultValue={selectedVehicle?.plate} required />
              <ModalInput label="Model" name="model" defaultValue={selectedVehicle?.model} required />
              <ModalInput label="Year" name="year" type="number" defaultValue={selectedVehicle?.year} />
              <ModalInput label="VIN" name="vin" defaultValue={selectedVehicle?.vin} />
              <ModalInput label="Mileage (km)" name="mileage" type="number" defaultValue={selectedVehicle?.mileage} />
              <ModalSelect label="Status" name="status" defaultValue={selectedVehicle?.status}>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Warning">Warning</option>
              </ModalSelect>
              <ModalInput label="Next Maintenance" name="nextMaintenance" type="date" defaultValue={selectedVehicle?.nextMaintenance} />
              <ModalInput label="Insurance Expiry" name="insuranceExpiry" type="date" defaultValue={selectedVehicle?.insuranceExpiry} />
            </div>
            <ModalActions onCancel={() => setShowEditModal(false)} submitLabel="Save Changes" />
          </form>
        </Modal>

        {/* Delete Confirmation */}
        <Modal open={showDeleteConfirm && !!selectedVehicle} onClose={() => setShowDeleteConfirm(false)} title="Remove Vehicle">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.12)' }}>
              <Trash2 size={28} style={{ color: palette.danger }} />
            </div>
            <p className="mb-4 text-sm" style={{ color: palette.textSecondary }}>
              Are you sure you want to remove <strong style={{ color: palette.text }}>{selectedVehicle?.plate}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 rounded-lg border px-4 py-2 text-sm font-semibold" style={{ borderColor: palette.border, color: palette.text }}>Cancel</button>
              <button onClick={handleDeleteVehicle} className="flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: palette.danger }}>Remove</button>
            </div>
          </div>
        </Modal>

        {/* Maintenance */}
        <Modal open={showMaintenanceModal && !!selectedVehicle} onClose={() => setShowMaintenanceModal(false)} title={`Schedule Maintenance — ${selectedVehicle?.plate || ''}`}>
          <form onSubmit={handleScheduleMaintenance}>
            <div className="space-y-4">
              <ModalInput label="Service Date" name="date" type="date" required />
              <ModalSelect label="Service Type" name="type" required>
                <option value="Oil Change">Oil Change</option>
                <option value="Full Service">Full Service</option>
                <option value="Brake Replacement">Brake Replacement</option>
                <option value="Tire Rotation">Tire Rotation</option>
                <option value="Engine Check">Engine Check</option>
              </ModalSelect>
              <ModalInput label="Cost ($)" name="cost" type="number" required />
              <ModalInput label="Mechanic/Garage" name="mechanic" required />
              <ModalInput label="Next Service Date" name="nextMaintenance" type="date" required />
            </div>
            <ModalActions onCancel={() => setShowMaintenanceModal(false)} submitLabel="Schedule" />
          </form>
        </Modal>

        {/* Assign Driver */}
        <Modal open={showDriverAssignmentModal && !!selectedVehicle} onClose={() => setShowDriverAssignmentModal(false)} title={`Assign Driver — ${selectedVehicle?.plate || ''}`}>
          <form onSubmit={handleAssignDriver}>
            <ModalSelect label="Select Driver" name="driverId" required>
              <option value="">Choose a driver...</option>
              {drivers.map(d => <option key={d.id} value={d.id}>{d.name} — {d.rating}★ ({d.experience} yrs)</option>)}
            </ModalSelect>
            <ModalActions onCancel={() => setShowDriverAssignmentModal(false)} submitLabel="Assign" />
          </form>
        </Modal>

      </div>
    </div>
  );
}

// ─── Generic Card wrapper ──────────────────────────────────────────────────────
function Card({ title, icon: Icon, iconColor, extra, children }) {
  return (
    <div className="rounded-2xl border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold" style={{ color: palette.text }}>
          {Icon && <Icon size={16} style={{ color: iconColor || palette.primary }} />}
          {title}
        </h3>
        {extra}
      </div>
      {children}
    </div>
  );
}
