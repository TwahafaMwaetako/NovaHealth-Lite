import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { SearchProvider } from '@/context/search-context';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <div className="flex h-screen">
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
      </SidebarProvider>
    </SearchProvider>
  );
}
