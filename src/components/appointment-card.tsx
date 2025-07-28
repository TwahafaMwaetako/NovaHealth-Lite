import type { Appointment } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { Badge } from './ui/badge';

interface AppointmentCardProps {
  appointment: Appointment;
  userRole: 'Patient' | 'Doctor';
}

export function AppointmentCard({ appointment, userRole }: AppointmentCardProps) {
  const { patient, doctor, dateTime, status } = appointment;
  const date = new Date(dateTime);

  const statusVariant = status === 'Upcoming' ? 'default' : status === 'Completed' ? 'secondary' : 'destructive';

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-center p-2 rounded-md bg-muted w-16">
              <span className="text-sm text-primary font-semibold">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
              <span className="text-2xl font-bold font-headline">{date.getDate()}</span>
            </div>
            <div className="flex-1">
              <div className='flex justify-between items-start'>
                <p className="font-semibold text-lg font-headline">
                  {userRole === 'Patient' ? doctor.specialization : 'Consultation'}
                </p>
                <Badge variant={statusVariant}>{status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              {userRole === 'Patient' ? <Stethoscope className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-primary" />}
              <span>{userRole === 'Patient' ? doctor.name : patient.name}</span>
            </div>
          </div>
        </div>
        <Avatar className="h-12 w-12 hidden sm:flex">
          <AvatarImage src={userRole === 'Patient' ? doctor.avatar : patient.avatar} />
          <AvatarFallback>
            {userRole === 'Patient' ? doctor.name.charAt(0) : patient.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>
  );
}
