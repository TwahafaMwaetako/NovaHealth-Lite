import type { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { SearchProvider } from '@/context/search-context';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-8">
            <div className="w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
