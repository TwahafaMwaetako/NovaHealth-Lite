export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Patient' | 'Doctor' | 'Admin';
  avatar: string;
  lastLogin: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
};

export type Appointment = {
  id: string;
  patient: User;
  doctor: Doctor;
  dateTime: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  notes?: string;
  diagnosis?: string;
  prescription?: string;
};

export const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Patient', avatar: 'https://placehold.co/40x40', lastLogin: '2024-05-20T10:00:00Z' },
  { id: 'user-2', name: 'Dr. Bob Williams', email: 'bob@example.com', role: 'Doctor', avatar: 'https://placehold.co/40x40', lastLogin: '2024-05-21T08:30:00Z' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Patient', avatar: 'https://placehold.co/40x40', lastLogin: '2024-05-19T15:45:00Z' },
  { id: 'user-4', name: 'Diana Miller', email: 'diana@example.com', role: 'Admin', avatar: 'https://placehold.co/40x40', lastLogin: '2024-05-21T09:00:00Z' },
  { id: 'user-5', name: 'Dr. Emily Clark', email: 'emily@example.com', role: 'Doctor', avatar: 'https://placehold.co/40x40', lastLogin: '2024-05-20T18:00:00Z' },
  { id: 'user-6', name: 'Frank White', email: 'frank@example.com', role: 'Patient', avatar: 'https://placehold.co/40x40', lastLogin: '2024-05-21T11:00:00Z' },
];

export const doctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Bob Williams', specialization: 'Cardiology', avatar: 'https://placehold.co/40x40' },
  { id: 'doc-2', name: 'Dr. Emily Clark', specialization: 'Dermatology', avatar: 'https://placehold.co/40x40' },
  { id: 'doc-3', name: 'Dr. Sarah Lee', specialization: 'Pediatrics', avatar: 'https://placehold.co/40x40' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);


export const appointments: Appointment[] = [
  {
    id: 'appt-1',
    patient: users[0],
    doctor: doctors[0],
    dateTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    status: 'Upcoming',
  },
  {
    id: 'appt-2',
    patient: users[2],
    doctor: doctors[1],
    dateTime: tomorrow.toISOString(),
    status: 'Upcoming',
  },
  {
    id: 'appt-3',
    patient: users[5],
    doctor: doctors[0],
    dateTime: nextWeek.toISOString(),
    status: 'Upcoming',
  },
  {
    id: 'appt-4',
    patient: users[0],
    doctor: doctors[2],
    dateTime: yesterday.toISOString(),
    status: 'Completed',
    diagnosis: 'Common Cold',
    prescription: 'Rest and fluids',
  },
  {
    id: 'appt-5',
    patient: users[2],
    doctor: doctors[1],
    dateTime: lastWeek.toISOString(),
    status: 'Completed',
    diagnosis: 'Allergic Reaction',
    prescription: 'Antihistamines',
  },
];
