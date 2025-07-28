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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Calendar,
  Home,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { Logo } from '../logo';
import { usePathname } from 'next/navigation';
import { UserNav } from '../user-nav';
import Link from 'next/link';

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
             <SidebarMenuButton href="#" icon={Settings}>
                Settings
              </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/login" className="w-full">
              <SidebarMenuButton icon={LogOut} className="w-full text-red-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400">
                Log out
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
