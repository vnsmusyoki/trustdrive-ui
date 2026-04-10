import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

// -----------------------------------------------------------------------------
// Role-based menu configuration (fully scoped to DriveTrust proposal)
// -----------------------------------------------------------------------------
const roleMenus = { 
  driver: [
    {
      id: 'main',
      category: 'Main',
      icon: 'LayoutDashboard',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/home' },
        { id: 'overview', label: 'Overview', icon: 'Activity', path: '/home?section=overview' },
        { id: 'alerts', label: 'Smart Alerts', icon: 'Bell', path: '/home?section=alerts' },
      ],
    },

    {
      id: 'reputation',
      category: 'Reputation & History',
      icon: 'Shield',
      items: [
        { id: 'verified-history', label: 'Verified History', icon: 'BadgeCheck', path: '/home?section=verified-history' },
        { id: 'reputation-passport', label: 'Reputation Passport (PDF)', icon: 'FileText', path: '/home?section=reputation-passport' },
        { id: 'my-ratings', label: 'My Ratings & Reviews', icon: 'Star', path: '/home?section=my-ratings' },
        { id: 'upload-csv', label: 'Upload Uber/Bolt CSV', icon: 'Upload', path: '/home?section=upload-csv' },
      ],
    },

    {
      id: 'intelligence',
      category: 'Owner Intelligence',
      icon: 'Search',
      items: [
        { id: 'owner-lookup', label: 'Search Car Owners', icon: 'Search', path: '/home?section=owner-lookup' },
        { id: 'owner-risk', label: 'Owner Risk Score', icon: 'AlertTriangle', path: '/home?section=owner-risk' },
      ],
    },

    {
      id: 'safety',
      category: 'Safety & Feedback',
      icon: 'ShieldAlert',
      items: [
        { id: 'rate-owners', label: 'Rate Car Owners', icon: 'Building2', path: '/home?section=rate-owners' },
        { id: 'area-safety', label: 'Submit Area Safety Review', icon: 'MapPin', path: '/home?section=area-safety' },
        { id: 'report-incident', label: 'Report Incident', icon: 'AlertOctagon', path: '/home?section=incident' },
      ],
    },

    {
      id: 'financial',
      category: 'Financial Management',
      icon: 'Wallet',
      items: [
        { id: 'earnings', label: 'Earnings Overview', icon: 'DollarSign', path: '/home?section=earnings' },
        { id: 'expenses', label: 'Expenses Tracker', icon: 'Receipt', path: '/home?section=expenses' },
        { id: 'profit', label: 'Profit & Loss', icon: 'BarChart', path: '/home?section=profit' },
        { id: 'payments', label: 'Payment Tracker', icon: 'CreditCard', path: '/home?section=payments' },
      ],
    },

    {
      id: 'performance',
      category: 'Performance & Insights',
      icon: 'TrendingUp',
      items: [
        { id: 'trip-analytics', label: 'Trip Analytics', icon: 'BarChart3', path: '/home?section=trip-analytics' },
        { id: 'ai-insights', label: 'AI Performance Insights', icon: 'Brain', path: '/home?section=ai-insights', badge: 'AI', badgeColor: 'purple' },
      ],
    },

    {
      id: 'work',
      category: 'Work & Agreements',
      icon: 'Briefcase',
      items: [
        { id: 'contracts', label: 'My Agreements', icon: 'FileSignature', path: '/home?section=contracts' },
        { id: 'disputes', label: 'Disputes & Claims', icon: 'Scale', path: '/home?section=disputes' },
        { id: 'availability', label: 'Availability Status', icon: 'ToggleRight', path: '/home?section=availability' },
      ],
    },

    {
      id: 'profile',
      category: 'Profile',
      icon: 'User',
      items: [
        { id: 'profile', label: 'Public Profile', icon: 'User', path: '/home?section=profile' },
        { id: 'documents', label: 'Documents', icon: 'Folder', path: '/home?section=documents' },
      ],
    },
  ],


   owner: [
  {
    id: 'main',
    category: 'Main',
    icon: 'LayoutDashboard',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/home' },
      { id: 'overview', label: 'Overview', icon: 'Activity', path: '/home?section=overview' },
      { id: 'alerts', label: 'Risk Alerts', icon: 'Bell', path: '/home?section=alerts' },
    ],
  },

  {
    id: 'driver-management',
    category: 'Driver Management',
    icon: 'Users',
    items: [
      { id: 'search-drivers', label: 'Search Drivers', icon: 'Search', path: '/home?section=search-drivers' },
      { id: 'ai-hiring', label: 'AI Hiring Assistant', icon: 'Brain', path: '/home?section=ai-hiring', badge: 'AI', badgeColor: 'purple' },
      { id: 'bulk-search', label: 'Bulk Driver Search', icon: 'Database', path: '/home?section=bulk-search' },
      { id: 'driver-requests', label: 'Driver Requests', icon: 'UserCheck', path: '/home?section=requests' },
      { id: 'driver-performance', label: 'Driver Performance', icon: 'BarChart3', path: '/home?section=driver-performance' },
    ],
  },

  {
    id: 'fleet',
    category: 'Fleet & Operations',
    icon: 'Truck',
    items: [
      { id: 'my-fleet', label: 'My Fleet', icon: 'Car', path: '/home?section=fleet' },
      { id: 'maintenance', label: 'Maintenance Tracker', icon: 'Wrench', path: '/home?section=maintenance' },
      { id: 'utilization', label: 'Vehicle Utilization', icon: 'Activity', path: '/home?section=utilization' },
    ],
  },

  {
    id: 'financial',
    category: 'Financial',
    icon: 'Wallet',
    items: [
      { id: 'payouts', label: 'Payouts', icon: 'CreditCard', path: '/home?section=payouts' },
      { id: 'expenses', label: 'Fleet Expenses', icon: 'Receipt', path: '/home?section=fleet-expenses' },
      { id: 'profit', label: 'Profit & Loss', icon: 'DollarSign', path: '/home?section=fleet-profit' },
      { id: 'fleet-analytics', label: 'Fleet Analytics', icon: 'TrendingUp', path: '/home?section=fleet-analytics' },
    ],
  },

  {
    id: 'risk',
    category: 'Risk & Compliance',
    icon: 'Shield',
    items: [
      { id: 'claims', label: 'Claims & Deposits', icon: 'FileWarning', path: '/home?section=claims' },
      { id: 'disputes', label: 'Disputes & Cases', icon: 'Scale', path: '/home?section=disputes' },
      { id: 'contracts', label: 'Driver Contracts', icon: 'FileSignature', path: '/home?section=contracts' },
    ],
  },

  {
    id: 'reviews',
    category: 'Reviews & Reputation',
    icon: 'MessageCircle',
    items: [
      { id: 'respond-reviews', label: 'Respond to Reviews', icon: 'Reply', path: '/home?section=respond-reviews' },
      { id: 'my-reputation', label: 'My Reputation', icon: 'Star', path: '/home?section=my-reputation' },
    ],
  },

  {
    id: 'insights',
    category: 'AI Insights',
    icon: 'Brain',
    items: [
      { id: 'ai-insights', label: 'AI Fleet Insights', icon: 'Brain', path: '/home?section=ai-insights', badge: 'AI', badgeColor: 'purple' },
    ],
  },
],

  passenger: [
    {
      id: 'main',
      category: 'Main',
      icon: 'LayoutDashboard',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/home' },
        { id: 'overview', label: 'Overview', icon: 'Activity', path: '/home?section=overview' },
      ],
    },
    {
      id: 'safety',
      category: 'Safety Tools',
      icon: 'ShieldAlert',
      items: [
        { id: 'plate-lookup', label: 'License Plate Lookup', icon: 'Search', path: '/home?section=plate-lookup' },
        { id: 'safety-score', label: 'Driver Safety Score', icon: 'Gauge', path: '/home?section=safety-score' },
        { id: 'area-map', label: 'Area Safety Map', icon: 'Map', path: '/home?section=area-map' },
        { id: 'safety-alerts', label: 'Real-Time Safety Alerts', icon: 'BellRing', path: '/home?section=safety-alerts' },
      ],
    },
    {
      id: 'trips',
      category: 'Trips',
      icon: 'Navigation',
      items: [
        { id: 'post-review', label: 'Post-Trip Review', icon: 'Edit3', path: '/home?section=post-review' },
        { id: 'trip-history', label: 'My Trip History', icon: 'Clock', path: '/home?section=trip-history' },
      ],
    },
  ],

  platform: [
  {
    id: 'main',
    category: 'Main',
    icon: 'LayoutDashboard',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/home' },
      { id: 'overview', label: 'Overview', icon: 'Activity', path: '/home?section=overview' },
    ],
  },

  {
    id: 'tracking',
    category: 'Tracking & Operations',
    icon: 'Map',
    items: [
      { id: 'live-map', label: 'Live Vehicle Map', icon: 'Map', path: '/home?section=live-map' },
      { id: 'vehicle-locations', label: 'Vehicle Locations', icon: 'Navigation', path: '/home?section=vehicle-locations' },
      { id: 'trip-monitoring', label: 'Trip Monitoring', icon: 'Route', path: '/home?section=trip-monitoring' },
    ],
  },

  {
    id: 'partnership',
    category: 'Partnership',
    icon: 'Handshake',
    items: [
      { id: 'partners', label: 'Partner Analytics', icon: 'BarChart3', path: '/home?section=partners' },
      { id: 'fleet-performance', label: 'Fleet Performance', icon: 'BarChart3', path: '/home?section=fleet-performance' },
      { id: 'utilization', label: 'Fleet Utilization', icon: 'Activity', path: '/home?section=utilization' },
      { id: 'revenue-insights', label: 'Revenue Insights', icon: 'DollarSign', path: '/home?section=revenue-insights' },
    ],
  },

  {
    id: 'risk',
    category: 'Risk & Safety',
    icon: 'ShieldAlert',
    items: [
      { id: 'incident-feed', label: 'Incident Feed', icon: 'AlertTriangle', path: '/home?section=incident-feed' },
      { id: 'risk-alerts', label: 'Risk Alerts', icon: 'Bell', path: '/home?section=risk-alerts' },
      { id: 'blacklist', label: 'Driver & Owner Blacklist', icon: 'UserX', path: '/home?section=blacklist' },
    ],
  },

  {
    id: 'governance',
    category: 'Governance',
    icon: 'Gavel',
    items: [
      { id: 'moderation', label: 'Review Moderation', icon: 'Flag', path: '/home?section=moderation' },
      { id: 'disputes', label: 'Dispute Resolution', icon: 'Scale', path: '/home?section=disputes' },
    ],
  },

  {
    id: 'ai',
    category: 'AI Intelligence',
    icon: 'Brain',
    items: [
      { id: 'ai-insights', label: 'Platform Insights', icon: 'Brain', path: '/home?section=ai-insights', badge: 'AI', badgeColor: 'purple' },
      { id: 'risk-predictions', label: 'Risk Predictions', icon: 'TrendingDown', path: '/home?section=risk-predictions' },
      { id: 'anomalies', label: 'Anomaly Detection', icon: 'Radar', path: '/home?section=anomalies' },
    ],
  },

  {
    id: 'integrations',
    category: 'Integrations & API',
    icon: 'Plug',
    items: [
      { id: 'api-health', label: 'API Health & Usage', icon: 'Activity', path: '/home?section=api-health' },
      { id: 'webhooks', label: 'Webhooks', icon: 'Webhook', path: '/home?section=webhooks' },
      { id: 'integrations', label: '3rd Party Integrations', icon: 'Link', path: '/home?section=integrations' },
    ],
  },

  {
    id: 'data',
    category: 'Data & Compliance',
    icon: 'Database',
    items: [
      { id: 'data-export', label: 'Bulk Data Export', icon: 'Download', path: '/home?section=data-export' },
      { id: 'data-import', label: 'Bulk Data Import', icon: 'Upload', path: '/home?section=data-import' },
      { id: 'compliance', label: 'Compliance Reports', icon: 'FileCheck', path: '/home?section=compliance' },
    ],
  },
],
  super_admin: [
  {
    id: 'main',
    category: 'Main',
    icon: 'LayoutDashboard',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/home' },
      { id: 'overview', label: 'Overview', icon: 'Activity', path: '/home?section=overview' },
    ],
  },

  {
    id: 'analytics',
    category: 'Platform Analytics',
    icon: 'BarChart3',
    items: [
      { id: 'platform-analytics', label: 'Platform Analytics', icon: 'BarChart3', path: '/home?section=platform-analytics' },
      { id: 'revenue', label: 'Revenue & Billing', icon: 'DollarSign', path: '/home?section=revenue' },
    ],
  },

  {
    id: 'users',
    category: 'User Management',
    icon: 'Users',
    items: [
      { id: 'user-management', label: 'All Users & Roles', icon: 'UserCog', path: '/home?section=user-management' },
      { id: 'user-lifecycle', label: 'User Lifecycle', icon: 'Users', path: '/home?section=user-lifecycle' },
    ],
  },

  {
    id: 'risk',
    category: 'Risk & Monitoring',
    icon: 'ShieldAlert',
    items: [
      { id: 'risk-overview', label: 'Global Risk Overview', icon: 'AlertTriangle', path: '/home?section=risk-overview' },
    ],
  },

  {
    id: 'governance',
    category: 'Governance',
    icon: 'Gavel',
    items: [
      { id: 'governance', label: 'User Governance', icon: 'Users', path: '/home?section=governance' },
      { id: 'compliance', label: 'Compliance & Legal', icon: 'FileCheck', path: '/home?section=compliance' },
      { id: 'data-requests', label: 'Data Requests (GDPR/DPA)', icon: 'ShieldCheck', path: '/home?section=data-requests' },
    ],
  },

  {
    id: 'system',
    category: 'System Administration',
    icon: 'Server',
    items: [
      { id: 'system-health', label: 'System Health', icon: 'Server', path: '/home?section=system-health' },
      { id: 'audit', label: 'System Audit Log', icon: 'FileSearch', path: '/home?section=audit' },
      { id: 'activity', label: 'User Activity Logs', icon: 'Activity', path: '/home?section=activity' },
      { id: 'settings', label: 'Platform Settings', icon: 'Settings', path: '/home?section=settings' },
      { id: 'security', label: 'Security Center', icon: 'Lock', path: '/home?section=security' },
      { id: 'rate-limits', label: 'Rate Limits & Throttling', icon: 'Gauge', path: '/home?section=rate-limits' },
      { id: 'feature-flags', label: 'Feature Flags', icon: 'ToggleLeft', path: '/home?section=feature-flags' },
    ],
  },

  {
    id: 'ai',
    category: 'AI Governance',
    icon: 'Brain',
    items: [
      { id: 'ai-models', label: 'AI Model Management', icon: 'Brain', path: '/home?section=ai-models' },
      { id: 'ai-governance', label: 'AI Governance', icon: 'Shield', path: '/home?section=ai-governance' },
    ],
  },

  {
    id: 'communication',
    category: 'Communication',
    icon: 'Megaphone',
    items: [
      { id: 'announcements', label: 'Announcements', icon: 'Megaphone', path: '/home?section=announcements' },
    ],
  },
],
};

// Role labels for display
const roleLabels = {
  driver: 'Driver Portal',
  owner: 'Owner Portal',
  passenger: 'Passenger Portal',
  platform: 'Platform Partner',
  super_admin: 'Super Admin',
};

// Theme management
const THEME_STORAGE_KEY = 'trustdrive-theme';
const VALID_THEMES = ['light', 'dark', 'system'];

const resolveTheme = (pref) => {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return pref;
};

const applyThemeToDOM = (pref) => {
  const resolved = resolveTheme(pref);
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  document.documentElement.setAttribute('data-theme', resolved);
};

const getStoredThemePreference = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return VALID_THEMES.includes(stored) ? stored : 'light';
};

// Dynamic icon component
const DynamicIcon = ({ name, size = 20, className = '' }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle size={size} className={className} />;
  return <IconComponent size={size} className={className} />;
};

// Helper to check if a path is active
const isPathActive = (path, currentPath, currentSearch) => {
  if (!path) return false;
  const [pathname, search] = path.split('?');
  if (currentPath !== pathname) return false;
  if (!search) return currentSearch === '';
  return currentSearch === `?${search}`;
};

// Recursive menu item renderer
const MenuItemRenderer = ({ item, currentPath, currentSearch, level = 0, collapsed, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = isPathActive(item.path, currentPath, currentSearch);
  const childIsActive = hasChildren && !collapsed && (item.children?.some(
    (child) => isPathActive(child.path, currentPath, currentSearch)
  ) ?? false);
  const isExpanded = isOpen || childIsActive;

  if (collapsed) {
    // Collapsed view - show icon only with tooltip on hover
    return (
      <div className="relative group">
        {item.path ? (
          <button
            onClick={() => onNavigate(item.path)}
            className="w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 app-hover"
            style={isActive
              ? { backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--color-primary-main)' }
              : { color: 'var(--color-text-secondary)' }
            }
            title={item.label}
          >
            <DynamicIcon name={item.icon} size={20} />
          </button>
        ) : (
          <div className="w-full flex items-center justify-center p-3 rounded-xl text-gray-400 cursor-default">
            <DynamicIcon name={item.icon} size={20} />
          </div>
        )}
        {/* Tooltip */}
        <div
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap"
          style={{ backgroundColor: 'var(--color-text-primary)', color: 'var(--color-bg-main)' }}
        >
          {item.label}
          {item.badge && <span className="ml-1 text-xs opacity-75">({item.badge})</span>}
        </div>
      </div>
    );
  }

  return (
    <div>
        <button
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isExpanded);
          } else if (item.path) {
            onNavigate(item.path);
          }
        }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 app-hover ${
          hasChildren && !item.path ? 'cursor-pointer' : ''
        }`}
        style={{
          paddingLeft: `${12 + level * 16}px`,
          ...(isActive
            ? { backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--color-primary-main)', fontWeight: 500 }
            : { color: 'var(--color-text-primary)' }
          ),
        }}
      >
        <DynamicIcon name={item.icon} size={18} />
        <span className="flex-1 text-left text-sm truncate">{item.label}</span>
        {item.badge && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              item.badgeColor === 'purple'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}
          >
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <DynamicIcon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size={14} className="text-gray-400" />
        )}
      </button>
      {hasChildren && isExpanded && (
        <div
          className="ml-2 mt-1 space-y-1 border-l"
          style={{ borderColor: 'var(--color-bg-border)' }}
        >
          {item.children.map((child) => (
            <MenuItemRenderer
              key={child.id}
              item={child}
              currentPath={currentPath}
              currentSearch={currentSearch}
              level={level + 1}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Layout Component
export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [theme, setTheme] = useState(() => {
    const pref = getStoredThemePreference();
    // Apply immediately — before first render paint
    applyThemeToDOM(pref);
    return pref;
  });

  // Get user role from localStorage (in real app, this would come from auth context)
  const [role] = useState(() => localStorage.getItem('trustdrive-user-role') || 'driver');
  const [user] = useState(() => {
    try {
      const raw = localStorage.getItem('trustdrive-auth-user');
      return raw ? JSON.parse(raw) : { name: 'John Driver', email: 'john@example.com' };
    } catch {
      return { name: 'User', email: 'user@drivetrust.com' };
    }
  });

  // Get current menus based on role
  const menus = roleMenus[role] || roleMenus.driver;

  // Filter menus based on search
  const filteredMenus = useMemo(() => {
    if (!menuSearch.trim()) return menus;
    const query = menuSearch.toLowerCase();
    return menus
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const matchesItem = item.label.toLowerCase().includes(query);
          const matchesChild = item.children?.some((child) => child.label.toLowerCase().includes(query));
          return matchesItem || matchesChild;
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [menus, menuSearch]);

  // Apply theme to DOM synchronously before paint whenever preference changes
  useLayoutEffect(() => {
    applyThemeToDOM(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyThemeToDOM('system');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && window.innerWidth < 1024) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setSidebarOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Navigation handler
  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('trustdrive-user-role');
    localStorage.removeItem('trustdrive-auth-user');
    window.location.href = '/login';
  };

  // Get current page title for header
  const getPageTitle = () => {
    const search = location.search;
    for (const category of menus) {
      for (const item of category.items) {
        if (isPathActive(item.path, location.pathname, search)) return item.label;
        if (item.children) {
          const childMatch = item.children.find((child) => isPathActive(child.path, location.pathname, search));
          if (childMatch) return childMatch.label;
        }
      }
    }
    return 'Dashboard';
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--color-bg-main)' }}
    >
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl shadow-lg border"
        style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-primary)', borderColor: 'var(--color-bg-border)' }}
      >
        <Icons.Menu size={22} />
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 border-r transition-all duration-300 ease-in-out flex flex-col h-full shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarCollapsed ? 'w-20' : 'w-72'}`}
        style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-bg-border)' }}
      >
        {/* Logo Header */}
        <div
          className={`p-5 border-b ${sidebarCollapsed ? 'px-2' : ''}`}
          style={{ borderColor: 'var(--color-bg-border)' }}
        >
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!sidebarCollapsed ? (
              <>
                <Link to="/home" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">DT</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>DriveTrust</div>
                    <div className="text-[10px] font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {roleLabels[role] || 'Portal'}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-2 app-hover rounded-lg transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Icons.ChevronLeft size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 app-hover rounded-lg transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Icons.ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* User Profile Card (expanded only) */}
        {!sidebarCollapsed && (
          <div
            className="m-4 p-3 rounded-xl border"
            style={{
              backgroundColor: 'rgba(37, 99, 235, 0.07)',
              borderColor: 'var(--color-bg-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{user?.name || 'User'}</p>
                <p className="text-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>{user?.email || 'user@drivetrust.com'}</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-bg-border)' }}>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--color-text-secondary)' }}>Role</span>
                <span className="font-medium text-blue-600 capitalize">{role}</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed user avatar */}
        {sidebarCollapsed && (
          <div className="my-4 flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>
        )}

        {/* Search (expanded only) */}
        {!sidebarCollapsed && (
          <div className="px-4 mt-2">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search menu..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-transparent focus:border-blue-500 rounded-xl outline-none transition-colors"
                style={{ backgroundColor: 'var(--color-bg-hover)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {filteredMenus.map((category) => (
            <div key={category.id}>
              {!sidebarCollapsed && (
                <div className="flex items-center gap-2 px-3 mb-2">
                  <DynamicIcon name={category.icon} size={14} className="text-gray-400" />
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {category.category}
                  </span>
                </div>
              )}
              <div className="space-y-1">
                {category.items.map((item) => (
                  <MenuItemRenderer
                    key={item.id}
                    item={item}
                    currentPath={location.pathname}
                    currentSearch={location.search}
                    collapsed={sidebarCollapsed}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            </div>
          ))}

          {filteredMenus.length === 0 && !sidebarCollapsed && (
            <div className="text-center py-8">
              <Icons.Search className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-500">No menu items found</p>
              <button onClick={() => setMenuSearch('')} className="text-xs text-blue-600 mt-1">
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className={`p-4 border-t ${sidebarCollapsed ? 'px-2' : ''}`}
          style={{ borderColor: 'var(--color-bg-border)' }}
        >
          <div className={`flex ${sidebarCollapsed ? 'flex-col gap-2' : 'gap-2'}`}>
            <button
              onClick={() => setTheme(resolveTheme(theme) === 'dark' ? 'light' : 'dark')}
              className={`flex items-center justify-center gap-2 rounded-xl border app-hover transition-all ${
                sidebarCollapsed ? 'p-3' : 'px-3 py-2 text-sm'
              }`}
              style={{ borderColor: 'var(--color-bg-border)', color: 'var(--color-text-primary)' }}
              title={resolveTheme(theme) === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {resolveTheme(theme) === 'dark' ? <Icons.Sun size={16} /> : <Icons.Moon size={16} />}
              {!sidebarCollapsed && <span>{resolveTheme(theme) === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
            </button>

            <button
              onClick={handleLogout}
              className={`flex items-center justify-center gap-2 rounded-xl border text-red-600 hover:bg-red-50 transition-all ${
                sidebarCollapsed ? 'p-3' : 'px-3 py-2 text-sm'
              }`}
              style={{ borderColor: 'var(--color-bg-border)' }}
              title="Sign out"
            >
              <Icons.LogOut size={16} />
              {!sidebarCollapsed && <span>Sign out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        {/* Top Navigation Bar */}
        <header
          className="sticky top-0 z-30 backdrop-blur-md border-b"
          style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-bg-border)' }}
        >
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              {sidebarCollapsed && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Icons.Menu size={20} />
                </button>
              )}
              <div>
                <h1 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{getPageTitle()}</h1>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {roleLabels[role]} • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="hidden sm:flex items-center gap-1 p-1 rounded-lg"
                style={{ backgroundColor: 'var(--color-bg-hover)' }}
              >
                <button
                  onClick={() => setTheme('light')}
                  className="p-1.5 rounded-md transition"
                  style={resolveTheme(theme) === 'light' ? { backgroundColor: 'var(--color-bg-card)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)' } : { color: 'var(--color-text-secondary)' }}
                  title="Light mode"
                >
                  <Icons.Sun size={14} />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className="p-1.5 rounded-md transition"
                  style={resolveTheme(theme) === 'dark' ? { backgroundColor: 'var(--color-bg-card)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)' } : { color: 'var(--color-text-secondary)' }}
                  title="Dark mode"
                >
                  <Icons.Moon size={14} />
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className="p-1.5 rounded-md transition"
                  style={theme === 'system' ? { backgroundColor: 'var(--color-bg-card)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)' } : { color: 'var(--color-text-secondary)' }}
                  title="System default"
                >
                  <Icons.Monitor size={14} />
                </button>
              </div>

              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Icons.Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg app-hover sm:hidden"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Icons.LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  );
}