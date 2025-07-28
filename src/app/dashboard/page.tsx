import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarPlus, User, Stethoscope, Users } from 'lucide-react';
import { AppointmentCard } from '@/components/appointment-card';
import { BookingModal } from '@/components/booking-modal';
import { appointments, doctors } from '@/lib/mock-data';

export default function DashboardPage() {
  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming');
  const pastAppointments = appointments.filter(a => a.status === 'Completed');
  
  const today = new Date();
  const todayAppointments = appointments.filter(a => new Date(a.dateTime).toDateString() === today.toDateString());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patient">Patient View</TabsTrigger>
          <TabsTrigger value="doctor">Doctor View</TabsTrigger>
          <TabsTrigger value="admin">Admin View</TabsTrigger>
        </TabsList>
        
        {/* Patient Dashboard */}
        <TabsContent value="patient">
          <div className="grid gap-6 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Here are your scheduled visits.</CardDescription>
                </div>
                <BookingModal />
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map(app => (
                      <AppointmentCard key={app.id} appointment={app} userRole="Patient" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming appointments. Ready to book one?</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Visits</CardTitle>
                <CardDescription>Review your visit history and summaries.</CardDescription>
              </CardHeader>
              <CardContent>
                {pastAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pastAppointments.map(app => (
                      <AppointmentCard key={app.id} appointment={app} userRole="Patient" />
                    ))}
                  </div>
                ) : (
                   <div className="text-center py-8">
                    <p className="text-muted-foreground">You have no past visits.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Doctor Dashboard */}
        <TabsContent value="doctor">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your appointments for {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</CardDescription>
            </CardHeader>
            <CardContent>
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map(app => (
                    <AppointmentCard key={app.id} appointment={app} userRole="Doctor" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You have a free day! No appointments scheduled.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Admin Dashboard */}
        <TabsContent value="admin">
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,254</div>
                <p className="text-xs text-muted-foreground">+3.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">All staff are available today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                <CalendarPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayAppointments.length}</div>
                <p className="text-xs text-muted-foreground">{upcomingAppointments.length - todayAppointments.length} more upcoming</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
