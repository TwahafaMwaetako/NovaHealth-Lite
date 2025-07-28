import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarPlus, User, Stethoscope, Users, Briefcase, FileText } from 'lucide-react';
import { AppointmentCard } from '@/components/appointment-card';
import { BookingModal } from '@/components/booking-modal';
import { appointments, doctors } from '@/lib/mock-data';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function DashboardPage() {
  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming');
  const pastAppointments = appointments.filter(a => a.status === 'Completed');
  
  const today = new Date();
  const todayAppointments = appointments.filter(a => new Date(a.dateTime).toDateString() === today.toDateString());

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome, Admin User!</h1>
          <p className="text-muted-foreground">Here's your overview of the clinic's activities.</p>
        </div>
        <BookingModal />
      </div>

      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="patient">
            <User className="mr-2" />
            Patient View
          </TabsTrigger>
          <TabsTrigger value="doctor">
            <Stethoscope className="mr-2"/>
            Doctor View
            </TabsTrigger>
          <TabsTrigger value="admin">
            <Briefcase className="mr-2" />
            Admin View
          </TabsTrigger>
        </TabsList>
        
        {/* Patient Dashboard */}
        <TabsContent value="patient" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>You have {upcomingAppointments.length} upcoming appointments.</CardDescription>
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
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Doctors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doctors.map(doctor => (
                    <div key={doctor.id} className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Doctor Dashboard */}
        <TabsContent value="doctor" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>You have {todayAppointments.length} appointments for {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</CardDescription>
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
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">You have a free day! No appointments scheduled.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Admin Dashboard */}
        <TabsContent value="admin" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <div className="text-2xl font-bold">{doctors.length}</div>
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
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Manage core functionalities of the application.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                     <Button asChild>
                        <Link href="/dashboard/users">
                            <Users className="mr-2"/>
                            Manage Users
                        </Link>
                    </Button>
                     <Button asChild variant="secondary">
                        <Link href="/dashboard/calendar">
                           <CalendarPlus className="mr-2"/>
                            View Full Calendar
                        </Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="#">
                           <FileText className="mr-2"/>
                            Generate Reports
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
