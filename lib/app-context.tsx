'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Role } from './types';
import { useAuth } from './auth-context';

interface AppContextValue {
  role: Role;
  schoolId: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Role is locked from the auth profile — never client-side mutable
  const role = profile?.role ?? 'parent';
  const schoolId = profile?.school_id ?? '';

  const value = useMemo(() => ({ role, schoolId, sidebarOpen, setSidebarOpen }), [role, schoolId, sidebarOpen]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
