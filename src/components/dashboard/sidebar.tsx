'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Calendar,
  Home,
  Users,
  BookUser,
  Clock,
  ClipboardPen,
  Settings,
  LogOut,
  CalendarPlus
} from 'lucide-react';
import { Logo } from '../logo';
import { usePathname } from 'next/navigation';
import { UserNav } from '../user-nav';

export function DashboardSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Logo />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard" isActive={isActive('/dashboard')} icon={Home}>
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator />
          <p className="px-4 py-2 text-xs text-muted-foreground">Admin</p>

          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard/users" isActive={isActive('/dashboard/users')} icon={Users}>
              Manage Users
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard/calendar" isActive={isActive('/dashboard/calendar')} icon={Calendar}>
              Appointment Calendar
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <UserNav />
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
