'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Copy,
  Check,
  Trash2,
  User,
  Mail,
  Phone,
  CreditCard,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
  ChevronDown,
  ArrowUpDown,
  ExternalLink,
  PlusCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import type { OrderRecord, OrderStatus, PaymentMethod } from '@/lib/types';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; badgeClass: string; borderClass: string; dotClass: string }
> = {
  PENDING_REVIEW: {
    label: 'Pending Review',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderClass: 'border-amber-500/30',
    dotClass: 'bg-amber-400 animate-pulse',
  },
  PAYMENT_CONFIRMED: {
    label: 'Payment Confirmed',
    badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    borderClass: 'border-cyan-500/30',
    dotClass: 'bg-cyan-400',
  },
  FULFILLMENT_IN_PROGRESS: {
    label: 'Fulfilling Invite',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    borderClass: 'border-purple-500/30',
    dotClass: 'bg-purple-400 animate-pulse',
  },
  COMPLETED: {
    label: 'Completed / Active',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderClass: 'border-emerald-500/30',
    dotClass: 'bg-emerald-400',
  },
  REJECTED: {
    label: 'Rejected / Invalid',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    borderClass: 'border-rose-500/30',
    dotClass: 'bg-rose-400',
  },
  REFUND_REQUESTED: {
    label: 'Refund Requested',
    badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    borderClass: 'border-orange-500/30',
    dotClass: 'bg-orange-400',
  },
  REFUNDED: {
    label: 'Refunded',
    badgeClass: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    borderClass: 'border-slate-500/30',
    dotClass: 'bg-slate-400',
  },
};

const PAYMENT_BADGES: Record<PaymentMethod, { label: string; class: string }> = {
  bKash: { label: 'bKash', class: 'bg-[#E2136E]/15 text-[#E2136E] border-[#E2136E]/30' },
  Nagad: { label: 'Nagad', class: 'bg-[#F6921E]/15 text-[#F6921E] border-[#F6921E]/30' },
  Rocket: { label: 'Rocket', class: 'bg-[#8C338C]/15 text-[#D88FD8] border-[#8C338C]/30' },
};

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [methodFilter, setMethodFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Modals / Inspector
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  // Check stored passcode on mount (Only if previously verified and saved)
  useEffect(() => {
    const savedPin =
      sessionStorage.getItem('subscrypto_admin_pin') ||
      localStorage.getItem('subscrypto_admin_pin');
    if (savedPin) {
      setPasscode(savedPin);
      fetchOrders(savedPin, false);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = passcode.trim();
    if (!cleanPin) {
      setAuthError('Please enter the admin password.');
      return;
    }
    fetchOrders(cleanPin, true);
  };

  const fetchOrders = async (pin: string, savePin = false) => {
    setLoading(true);
    setAuthError(null);
    setError(null);

    try {
      const response = await fetch(`/api/admin/orders?key=${encodeURIComponent(pin)}`, {
        headers: {
          'x-admin-key': pin,
        },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setIsAuthenticated(false);
        setAuthError(result.error || 'Access denied. Incorrect admin password.');
        sessionStorage.removeItem('subscrypto_admin_pin');
        localStorage.removeItem('subscrypto_admin_pin');
        return;
      }

      setIsAuthenticated(true);
      if (savePin) {
        if (rememberDevice) {
          localStorage.setItem('subscrypto_admin_pin', pin);
        } else {
          sessionStorage.setItem('subscrypto_admin_pin', pin);
        }
      }
      setOrders(result.data.orders || []);
    } catch {
      setError('Network error connecting to SubsCrypto admin service.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders(passcode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('subscrypto_admin_pin');
    localStorage.removeItem('subscrypto_admin_pin');
    setIsAuthenticated(false);
    setPasscode('');
    setOrders([]);
    setSelectedOrder(null);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus, notes?: string) => {
    setUpdatingStatusId(orderId);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}?key=${encodeURIComponent(passcode)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: notes !== undefined ? notes : selectedOrder?.admin_notes,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        alert(result.error || 'Failed to update order status.');
        return;
      }

      // Update state locally
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId || ord.order_reference === orderId ? result.data : ord))
      );
      if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.order_reference === orderId)) {
        setSelectedOrder(result.data);
      }
    } catch {
      alert('Error updating status.');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSeedOrders = async () => {
    if (!confirm('Add sample verified student orders for testing?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?key=${encodeURIComponent(passcode)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders(passcode);
      }
    } catch {
      alert('Failed to seed orders.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered & Sorted orders list
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter !== 'ALL' && order.status !== statusFilter) {
        return false;
      }
      // Method filter
      if (methodFilter !== 'ALL' && order.payment_method !== methodFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchRef = order.order_reference?.toLowerCase().includes(q);
        const matchName = order.customer_name?.toLowerCase().includes(q);
        const matchEmail = order.customer_email?.toLowerCase().includes(q);
        const matchPhone = order.customer_phone?.toLowerCase().includes(q);
        const matchTrx = order.transaction_id?.toLowerCase().includes(q);
        return matchRef || matchName || matchEmail || matchPhone || matchTrx;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }, [orders, statusFilter, methodFilter, searchQuery, sortBy]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === 'PENDING_REVIEW').length;
    const confirmed = orders.filter((o) => o.status === 'PAYMENT_CONFIRMED').length;
    const completed = orders.filter((o) => o.status === 'COMPLETED').length;
    const rejected = orders.filter((o) => o.status === 'REJECTED').length;
    const revenue = orders
      .filter((o) => o.status !== 'REJECTED' && o.status !== 'REFUNDED')
      .reduce((acc, o) => acc + (o.amount_bdt || 349), 0);

    return { total, pending, confirmed, completed, rejected, revenue };
  }, [orders]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredOrders.length === 0) {
      alert('No orders to export.');
      return;
    }

    const headers = [
      'Order Reference',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Payment Method',
      'Transaction ID',
      'Amount BDT',
      'Status',
      'Created At',
      'Admin Notes',
    ];

    const rows = filteredOrders.map((o) => [
      `"${o.order_reference}"`,
      `"${o.customer_name}"`,
      `"${o.customer_email}"`,
      `"${o.customer_phone}"`,
      `"${o.payment_method}"`,
      `"${o.transaction_id}"`,
      o.amount_bdt || 349,
      `"${o.status}"`,
      `"${new Date(o.created_at).toLocaleString()}"`,
      `"${(o.admin_notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `subscrypto_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --------------------------------------------------------------------------
  // RENDER: Passcode Gate Screen
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/3 w-[360px] h-[360px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[320px] h-[320px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md glass-panel-elevated p-6 sm:p-10 rounded-3xl border border-white/[0.12] relative z-10 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-600 to-violet-500 p-0.5 shadow-[0_0_30px_rgba(99,102,241,0.5)] mb-4">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span>Restricted · Staff Only</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">SubsCrypto Management Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Protected operations console for student order reviews and Family Account fulfillment.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-fade-in shadow-md">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span className="font-medium">{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="adminPin" className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Admin Master Password
              </label>
              <div className="relative">
                <input
                  id="adminPin"
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-600 text-sm font-mono tracking-wider transition-colors"
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-navy-950 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Remember on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] transition-transform"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Master Credentials...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Admin Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
              <span>← Return to Public Student Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: Authenticated Admin Dashboard
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-indigo-500/30">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-600 to-violet-500 p-0.5 shadow-md flex-shrink-0">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm sm:text-base tracking-tight font-sans">
                    SubsCrypto
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    Admin Desk
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono hidden xs:block">
                  Gemini 3 Pro + 5TB Family Orders Engine
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title="Export to CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleSeedOrders}
              className="hidden md:flex px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white transition-all items-center gap-1.5 cursor-pointer"
              title="Seed Mock Data"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Seed Demos</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Lock Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* KPI Metrics Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Card 1: Total Orders */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Orders</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                <FileSpreadsheet className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{metrics.total}</span>
              <span className="text-[10px] text-slate-400 font-mono">records</span>
            </div>
          </div>

          {/* Card 2: Pending Review (Urgent) */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-950/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-semibold">
                Needs Review
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">{metrics.pending}</span>
              <span className="text-[10px] text-amber-300/80 font-mono">awaiting invite</span>
            </div>
          </div>

          {/* Card 3: Payment Confirmed */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">Confirmed</span>
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">{metrics.confirmed}</span>
              <span className="text-[10px] text-cyan-300/80 font-mono">in queue</span>
            </div>
          </div>

          {/* Card 4: Fulfilled / Completed */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider">Fulfilled</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{metrics.completed}</span>
              <span className="text-[10px] text-emerald-300/80 font-mono">active users</span>
            </div>
          </div>

          {/* Card 5: Total Revenue */}
          <div className="col-span-2 lg:col-span-1 glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Inflow</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">৳{metrics.revenue.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400 font-mono">BDT</span>
            </div>
          </div>

        </div>

        {/* Search, Filter & Control Toolbar */}
        <div className="glass-panel-elevated p-4 sm:p-5 rounded-2xl border border-white/[0.08] space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order Ref, Name, Email, Phone, or TrxID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Payment Method Selector & Sort */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-navy-950 text-white">All MFS</option>
                  <option value="bKash" className="bg-navy-950 text-white">bKash</option>
                  <option value="Nagad" className="bg-navy-950 text-white">Nagad</option>
                  <option value="Rocket" className="bg-navy-950 text-white">Rocket</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-navy-950 text-white">Newest First</option>
                  <option value="oldest" className="bg-navy-950 text-white">Oldest First</option>
                </select>
              </div>
            </div>

          </div>

          {/* Status Filter Tab Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              { id: 'ALL', label: 'All Orders', count: metrics.total },
              { id: 'PENDING_REVIEW', label: 'Pending Review', count: metrics.pending },
              { id: 'PAYMENT_CONFIRMED', label: 'Confirmed', count: metrics.confirmed },
              { id: 'COMPLETED', label: 'Completed', count: metrics.completed },
              { id: 'REJECTED', label: 'Rejected', count: metrics.rejected },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    statusFilter === tab.id
                      ? 'bg-cyan-400/20 text-cyan-200'
                      : 'bg-white/[0.06] text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="glass-panel-elevated rounded-2xl border border-white/[0.08] overflow-hidden shadow-xl">
          
          {loading ? (
            <div className="p-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-sm text-slate-400 font-mono">Loading orders database...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">No Matching Orders Found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  {searchQuery || statusFilter !== 'ALL' || methodFilter !== 'ALL'
                    ? 'Try adjusting your search criteria or filter tabs.'
                    : 'No student orders submitted yet. Click "Seed Demos" to load test orders.'}
                </p>
              </div>
              <button
                onClick={handleSeedOrders}
                className="btn-primary text-xs py-2 px-4 rounded-xl cursor-pointer"
              >
                Seed Sample Student Orders
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Card List View (Visible on < md screens) */}
              <div className="md:hidden divide-y divide-white/[0.08]">
                {filteredOrders.map((order) => {
                  const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING_REVIEW;
                  const paymentBadge = PAYMENT_BADGES[order.payment_method] || PAYMENT_BADGES.bKash;

                  return (
                    <div key={order.order_reference} className="p-4 space-y-3 hover:bg-white/[0.02] transition-colors">
                      {/* Top Row: Ref, Status & Amount */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <button
                            onClick={() => handleCopy(order.order_reference, order.order_reference)}
                            className="inline-flex items-center gap-1.5 font-mono font-bold text-white hover:text-cyan-400 text-sm"
                            title="Click to copy order ref"
                          >
                            <span>{order.order_reference}</span>
                            {copiedKey === order.order_reference ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500" />
                            )}
                          </button>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {new Date(order.created_at).toLocaleDateString()} · {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold border ${statusInfo.badgeClass}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                            <span>{statusInfo.label}</span>
                          </span>
                          <span className="font-mono font-bold text-cyan-300 text-xs">
                            ৳{order.amount_bdt || 349} BDT
                          </span>
                        </div>
                      </div>

                      {/* Middle: Student Details */}
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{order.customer_name}</span>
                          <span className={`px-2 py-0.2 rounded text-[10px] font-bold border ${paymentBadge.class}`}>
                            {paymentBadge.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300 gap-2">
                          <span className="truncate text-[11px] font-mono text-slate-400">{order.customer_email}</span>
                          <button
                            onClick={() => handleCopy(order.customer_email, `email-${order.order_reference}`)}
                            className="text-slate-400 hover:text-cyan-400 flex-shrink-0 p-1"
                            title="Copy email"
                          >
                            {copiedKey === `email-${order.order_reference}` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-white/[0.04] text-[11px]">
                          <span className="text-slate-500 font-mono">TrxID:</span>
                          <button
                            onClick={() => handleCopy(order.transaction_id, `trx-${order.order_reference}`)}
                            className="inline-flex items-center gap-1 font-mono font-bold text-cyan-300 hover:text-white bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]"
                            title="Click to copy Transaction ID"
                          >
                            <span>{order.transaction_id}</span>
                            {copiedKey === `trx-${order.order_reference}` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Bottom Action Row */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1.5">
                          {order.status === 'PENDING_REVIEW' && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, 'PAYMENT_CONFIRMED')}
                              disabled={updatingStatusId === order.id}
                              className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                            >
                              Confirm
                            </button>
                          )}
                          {order.status === 'PAYMENT_CONFIRMED' && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, 'COMPLETED')}
                              disabled={updatingStatusId === order.id}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                            >
                              Complete
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setEditNotes(order.admin_notes || '');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                        >
                          Inspect & Fulfill
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Table View (Visible on >= md screens) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Order Ref</th>
                    <th className="py-3.5 px-4">Student Info</th>
                    <th className="py-3.5 px-4">Payment & TrxID</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Submitted</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filteredOrders.map((order) => {
                    const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING_REVIEW;
                    const paymentBadge = PAYMENT_BADGES[order.payment_method] || PAYMENT_BADGES.bKash;

                    return (
                      <tr
                        key={order.order_reference}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        {/* Order Reference */}
                        <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                          <button
                            onClick={() => handleCopy(order.order_reference, order.order_reference)}
                            className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors group/ref text-xs"
                            title="Click to copy order ref"
                          >
                            <span>{order.order_reference}</span>
                            {copiedKey === order.order_reference ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500 group-hover/ref:text-slate-300 opacity-60" />
                            )}
                          </button>
                        </td>

                        {/* Customer Info */}
                        <td className="py-4 px-4 min-w-[200px]">
                          <div className="font-semibold text-white truncate max-w-[220px]">
                            {order.customer_name}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5 truncate">
                            <Mail className="w-3 h-3 text-slate-500 flex-shrink-0" />
                            <span className="truncate">{order.customer_email}</span>
                            <button
                              onClick={() => handleCopy(order.customer_email, `email-${order.order_reference}`)}
                              className="text-slate-500 hover:text-cyan-400 ml-1"
                              title="Copy student email"
                            >
                              {copiedKey === `email-${order.order_reference}` ? (
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-2.5 h-2.5" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono mt-0.5">
                            <Phone className="w-2.5 h-2.5" />
                            <span>{order.customer_phone}</span>
                          </div>
                        </td>

                        {/* Payment & TrxID */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${paymentBadge.class}`}>
                              {paymentBadge.label}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopy(order.transaction_id, `trx-${order.order_reference}`)}
                            className="inline-flex items-center gap-1 font-mono text-xs text-slate-300 hover:text-white bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.08]"
                            title="Click to copy Transaction ID"
                          >
                            <span>{order.transaction_id}</span>
                            {copiedKey === `trx-${order.order_reference}` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500" />
                            )}
                          </button>
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                          ৳{order.amount_bdt || 349}{' '}
                          <span className="text-[10px] text-slate-500 font-normal">BDT</span>
                        </td>

                        {/* Status Pill */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeClass}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                            <span>{statusInfo.label}</span>
                          </span>
                        </td>

                        {/* Submitted At */}
                        <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                          <div>{new Date(order.created_at).toLocaleDateString()}</div>
                          <div className="text-[10px] text-slate-500">
                            {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {order.status === 'PENDING_REVIEW' && (
                              <button
                                onClick={() => handleStatusUpdate(order.id, 'PAYMENT_CONFIRMED')}
                                disabled={updatingStatusId === order.id}
                                className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold cursor-pointer transition-colors"
                                title="Confirm payment verified"
                              >
                                Confirm
                              </button>
                            )}

                            {order.status === 'PAYMENT_CONFIRMED' && (
                              <button
                                onClick={() => handleStatusUpdate(order.id, 'COMPLETED')}
                                disabled={updatingStatusId === order.id}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold cursor-pointer transition-colors"
                                title="Mark Family Account invite sent & active"
                              >
                                Complete
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setEditNotes(order.admin_notes || '');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 hover:text-white text-xs font-medium cursor-pointer transition-colors"
                            >
                              Inspect
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        </div>

      </main>

      {/* ----------------------------------------------------------------------
          Order Detail Inspection Drawer / Modal
          ---------------------------------------------------------------------- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-white/[0.15] max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block mb-0.5">
                  Order Inspection & Fulfillment
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{selectedOrder.order_reference}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      (STATUS_CONFIG[selectedOrder.status] || STATUS_CONFIG.PENDING_REVIEW).badgeClass
                    }`}
                  >
                    {(STATUS_CONFIG[selectedOrder.status] || STATUS_CONFIG.PENDING_REVIEW).label}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Google Family Account Operator Workflow Banner */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Google Family Account Fulfillment Action</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add this student’s Google account to your Google Family Group to activate Gemini 3 Pro + 5TB Cloud Storage without needing their password:
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedOrder.customer_email}
                  className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/[0.1] text-xs font-mono text-white select-all"
                />
                <button
                  onClick={() => handleCopy(selectedOrder.customer_email, 'modal-email')}
                  className="btn-primary text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'modal-email' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email for Family Invite</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Order Specification Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06]">
              <div>
                <span className="text-slate-500 block mb-0.5">Student Name</span>
                <span className="font-bold text-white text-sm">{selectedOrder.customer_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Contact Phone</span>
                <a
                  href={`tel:${selectedOrder.customer_phone}`}
                  className="font-mono text-cyan-400 hover:underline"
                >
                  {selectedOrder.customer_phone}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Payment Method</span>
                <span className="font-bold text-white">{selectedOrder.payment_method}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Transaction ID</span>
                <span className="font-mono text-slate-200 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                  {selectedOrder.transaction_id}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Subscription Plan</span>
                <span className="font-medium text-white">Gemini 3 Pro + 5TB (Family Account)</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Duration & Amount</span>
                <span className="font-bold text-emerald-400">18 Months · ৳{selectedOrder.amount_bdt || 349} BDT</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block mb-0.5">Order Placed</span>
                <span className="font-mono text-slate-300">
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Status Transition Action Buttons */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Update Order Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { status: 'PENDING_REVIEW' as OrderStatus, label: 'Pending', color: 'hover:border-amber-500/50' },
                  { status: 'PAYMENT_CONFIRMED' as OrderStatus, label: 'Confirmed', color: 'hover:border-cyan-500/50' },
                  { status: 'COMPLETED' as OrderStatus, label: 'Completed', color: 'hover:border-emerald-500/50' },
                  { status: 'REJECTED' as OrderStatus, label: 'Rejected', color: 'hover:border-rose-500/50' },
                ].map((item) => (
                  <button
                    key={item.status}
                    onClick={() => handleStatusUpdate(selectedOrder.id, item.status, editNotes)}
                    disabled={updatingStatusId === selectedOrder.id}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedOrder.status === item.status
                        ? 'bg-white/[0.1] text-white border-cyan-400 shadow-sm'
                        : `bg-white/[0.03] text-slate-400 hover:text-white border-white/[0.08] ${item.color}`
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Notes */}
            <div>
              <label htmlFor="adminNotes" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Fulfillment & Verification Notes
              </label>
              <textarea
                id="adminNotes"
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="e.g. bKash payment verified on 13 Oct. Added to Family Pool Group #3."
                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleStatusUpdate(selectedOrder.id, selectedOrder.status, editNotes)}
                  disabled={updatingStatusId === selectedOrder.id}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-slate-200 cursor-pointer"
                >
                  Save Notes
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-500">
              <span>Order ID: <code className="font-mono text-slate-400">{selectedOrder.id}</code></span>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
