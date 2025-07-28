import type { Appointment } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  userRole: 'Patient' | 'Doctor';
}

export function AppointmentCard({ appointment, userRole }: AppointmentCardProps) {
  const { patient, doctor, dateTime, status } = appointment;
  const date = new Date(dateTime);

  const statusConfig = {
    Upcoming: { variant: 'default', className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800' },
    Completed: { variant: 'secondary', className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800' },
    Cancelled: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800' },
  };
  
  const currentStatus = statusConfig[status];

  const person = userRole === 'Patient' ? doctor : patient;
  const personRole = userRole === 'Patient' ? 'Doctor' : 'Patient';
  const PersonIcon = userRole === 'Patient' ? Stethoscope : User;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={person.avatar} />
          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-lg">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{userRole === 'Patient' ? doctor.specialization : `Appointment`}</p>
                </div>
                <Badge variant={currentStatus.variant as any} className={cn('whitespace-nowrap', currentStatus.className)}>{status}</Badge>
            </div>
            <div className="border-t pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
        </div>
        {status === 'Upcoming' && (
          <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-center">
            <Button variant="outline" size="sm">Reschedule</Button>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">Cancel</Button>
          </div>
        )}
         {status === 'Completed' && (
          <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-center">
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
