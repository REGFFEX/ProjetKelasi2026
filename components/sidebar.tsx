'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { navItemsByRole, roleLabels } from '@/lib/navigation';
import { schools, currentUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { role, schoolId, setSchoolId, sidebarOpen, setSidebarOpen } = useApp();
  const pathname = usePathname();
  const items = navItemsByRole[role];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar — full width on lg, icon-only on md */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300',
          'w-64 lg:translate-x-0',
          'max-md:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-info text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20">
              K
            </div>
            <div className="hidden lg:block">
              <p className="font-semibold text-white text-sm leading-tight">Kelasi</p>
              <p className="text-[11px] text-sidebar-foreground/50">Gestion Scolaire</p>
            </div>
          </Link>
          <button
            className="lg:hidden text-sidebar-foreground/60 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* School switcher */}
        {role !== 'super_admin' && (
          <div className="border-b border-white/[0.06] px-4 py-3">
            <label className="text-[11px] text-sidebar-foreground/40 mb-1.5 block uppercase tracking-wider hidden lg:block">Établissement</label>
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 text-sm text-white focus:border-primary focus:outline-none transition-colors"
            >
              {schools.map(s => (
                <option key={s.id} value={s.id} className="bg-sidebar text-white">
                  {s.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-3">
          <ul className="space-y-1">
            {items.map(item => {
              const Icon = (Icons as any)[item.icon] || Icons.Circle;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 group relative',
                      isActive
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20'
                        : 'text-sidebar-foreground/70 hover:bg-white/[0.06] hover:text-white'
                    )}
                    title={item.label}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="hidden lg:block">{item.label}</span>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary hidden lg:block" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User */}
        <div className="border-t border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-info/20 text-primary text-sm font-semibold shrink-0 ring-2 ring-white/10">
              {currentUser.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1 hidden lg:block">
              <p className="text-sm font-medium text-white truncate">{currentUser.nom}</p>
              <p className="text-[11px] text-sidebar-foreground/50">{roleLabels[role]}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav — icon-only, fixed */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border glass px-2 py-2 lg:hidden safe-area-inset-bottom">
        {items.slice(0, 5).map(item => {
          const Icon = (Icons as any)[item.icon] || Icons.Circle;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 transition-all duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'scale-110')} />
              <span className="text-[10px] font-medium truncate max-w-[60px]">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
