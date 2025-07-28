'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { appointments } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, format, startOfWeek, isSameDay, isSameMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1; // Monday
  const startOfTheWeek = startOfWeek(currentDate, { weekStartsOn });
  
  const week = Array.from({ length: 7 }).map((_, i) => addDays(startOfTheWeek, i));

  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const goToToday = () => setCurrentDate(new Date());

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(app => isSameDay(new Date(app.dateTime), day));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline">Appointment Calendar</h1>
          <p className="text-muted-foreground">A weekly overview of all scheduled appointments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday}>Today</Button>
          <Button variant="outline" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-2 md:p-4">
          <div className="grid grid-cols-7 border rounded-lg overflow-hidden">
            {week.map(day => (
              <div key={day.toString()} className="flex flex-col border-r last:border-r-0">
                <div className={cn(
                  "p-2 text-center border-b",
                  isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
                )}>
                  <p className="font-semibold text-sm">{format(day, 'EEE')}</p>
                  <p className="text-2xl font-bold font-headline">{format(day, 'd')}</p>
                </div>
                <div className="flex-1 p-2 bg-muted/50 min-h-[200px] space-y-2">
                  {getAppointmentsForDay(day).map(app => (
                     <TooltipProvider key={app.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <div className="bg-background p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                              <p className="text-xs font-semibold truncate">{app.patient.name}</p>
                              <p className="text-xs text-muted-foreground">w/ {app.doctor.name}</p>
                              <p className="text-xs text-muted-foreground">{format(new Date(app.dateTime), 'h:mm a')}</p>
                           </div>
                        </TooltipTrigger>
                        <TooltipContent>
                           <div className="flex items-center gap-2">
                             <Avatar className="h-8 w-8">
                               <AvatarImage src={app.patient.avatar} />
                               <AvatarFallback>{app.patient.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div>
                                <p className="font-bold">{app.patient.name}</p>
                                <p className="text-sm">{app.doctor.name} ({app.doctor.specialization})</p>
                             </div>
                           </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
