'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Role } from './types';
import { currentUser, schools } from './mock-data';

interface AppContextValue {
  role: Role;
  setRole: (r: Role) => void;
  schoolId: string;
  setSchoolId: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(currentUser.role);
  const [schoolId, setSchoolId] = useState<string>(schools[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ role, setRole, schoolId, setSchoolId, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
