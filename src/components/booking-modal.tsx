'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, CalendarPlus, Clock } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { doctors } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();


  const handleBooking = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${selectedDoctor.name} on ${date?.toLocaleDateString()} at ${selectedTime} is confirmed.`,
    });
    setOpen(false);
    // Reset state for next time
    setSelectedTime(null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] grid-cols-1 md:grid-cols-2">
        <div className='pr-4 border-r'>
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>Select a doctor and a time that works for you.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
             <div>
                <h4 className="font-medium mb-2">1. Select Doctor</h4>
                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                    {doctors.map(doctor => (
                        <button key={doctor.id} onClick={() => setSelectedDoctor(doctor)} className={cn("flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-colors", selectedDoctor.id === doctor.id ? "border-primary bg-secondary" : "border-transparent hover:bg-muted")}>
                           <Avatar className="h-16 w-16">
                                <AvatarImage src={doctor.avatar} />
                                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <p className="text-sm font-medium">{doctor.name}</p>
                                <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Select Date</h4>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-0"
                disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
              />
            </div>
          </div>
        </div>
        <div className="pl-4 flex flex-col">
          <h4 className="font-medium mb-2 mt-4 md:mt-0">3. Select Time Slot</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Available times for <span className="font-semibold text-primary">{selectedDoctor.name}</span> on <span className="font-semibold text-primary">{date?.toLocaleDateString()}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1">
            {timeSlots.map(time => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" /> {time}
              </Button>
            ))}
          </div>
           <DialogFooter className="mt-4">
            <Button onClick={handleBooking} disabled={!date || !selectedTime || !selectedDoctor} className="w-full">
              Confirm Booking
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
