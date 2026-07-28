'use client';

import { ReactNode } from 'react';
import { AppProvider } from '@/lib/app-context';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { RouteGuard } from '@/components/route-guard';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <RouteGuard>
      <AppProvider>
        <div className="min-h-screen bg-background">
          <Sidebar />
          <div className="lg:pl-64">
            <Header />
            <main className="p-4 lg:p-6 max-w-[1400px] mx-auto pb-24 lg:pb-6">{children}</main>
          </div>
        </div>
      </AppProvider>
    </RouteGuard>
  );
}
