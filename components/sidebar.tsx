'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LogOut } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { useAuth } from '@/lib/auth-context';
import { navItemsByRole, roleLabels } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { fetchSchools } from '@/lib/api';

interface SchoolOption { id: string; nom: string; }

export function Sidebar() {
  const { role, schoolId, sidebarOpen, setSidebarOpen } = useApp();
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  const items = navItemsByRole[role] ?? navItemsByRole.parent;
  const [schools, setSchools] = useState<SchoolOption[]>([]);

  useEffect(() => {
    fetchSchools().then(s => setSchools(s.map(x => ({ id: x.id, nom: x.nom })))).catch(() => {});
  }, []);

  const userInitials = (profile?.nom ?? '?')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200',
          'w-64 lg:translate-x-0 max-md:hidden',
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
          <button className="lg:hidden text-sidebar-foreground/60 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* School switcher (display only) */}
        {role !== 'super_admin' && schools.length > 0 && (
          <div className="border-b border-white/[0.06] px-4 py-3">
            <label className="text-[11px] text-sidebar-foreground/40 mb-1.5 block uppercase tracking-wider hidden lg:block">Établissement</label>
            <p className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-2 text-sm text-white truncate">
              {schools.find(s => s.id === schoolId)?.nom ?? schools[0]?.nom ?? '—'}
            </p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-3">
          <ul className="space-y-1">
            {items.map(item => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[item.icon] || Icons.Circle;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors group relative',
                      isActive
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20'
                        : 'text-sidebar-foreground/70 hover:bg-white/[0.06] hover:text-white'
                    )}
                    title={item.label}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="hidden lg:block">{item.label}</span>
                    {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary hidden lg:block" />}
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
              {userInitials}
            </div>
            <div className="min-w-0 flex-1 hidden lg:block">
              <p className="text-sm font-medium text-white truncate">{profile?.nom ?? 'Utilisateur'}</p>
              <p className="text-[11px] text-sidebar-foreground/50">{roleLabels[role]}</p>
            </div>
            <button onClick={() => signOut()} className="text-sidebar-foreground/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/[0.06]" title="Déconnexion">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border glass px-2 py-2 lg:hidden safe-area-inset-bottom">
        {items.slice(0, 5).map(item => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[item.icon] || Icons.Circle;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 transition-colors',
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
