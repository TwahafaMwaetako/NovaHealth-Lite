'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  Calendar,
  Home,
  Users,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { Logo } from '../logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function DashboardSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard" isActive={isActive('/dashboard')} icon={<Home />} tooltip="Dashboard">
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarSeparator className="my-2" />

          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/users" isActive={isActive('/dashboard/users')} icon={<Users />} tooltip="Manage Users">
                Manage Users
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/calendar" isActive={isActive('/dashboard/calendar')} icon={<Calendar />} tooltip="Appointment Calendar">
                Appointment Calendar
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>

        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter>
         <SidebarSeparator className="my-2" />
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton href="#" icon={<Settings />} tooltip="Settings">
                  Settings
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/login" className="w-full">
                <SidebarMenuButton icon={<LogOut />} className="w-full text-red-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400" tooltip="Log out">
                  Log out
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarSeparator className="my-2" />
             <SidebarMenuButton
                href="#"
                className="h-auto"
                variant="outline"
                size="lg"
                tooltip="User Profile"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40" alt="Admin User" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Admin User</span>
                    <span className="text-xs text-muted-foreground">admin@novahealth.com</span>
                  </div>
                </div>
            </SidebarMenuButton>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
