'use client';

import { UserNav } from '@/components/user-nav';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useSearch } from '@/context/search-context';
import { SidebarTrigger } from '../ui/sidebar';

export function DashboardHeader() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-8">
       <SidebarTrigger />
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search appointments, patients..."
          className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[336px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <UserNav />
    </header>
  );
}
