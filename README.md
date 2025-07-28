```markdown
# 🩺 NovaHealth

NovaHealth is a **modern, beautifully designed web-based healthcare management platform**, built entirely with **Next.js (App Router)**, **Tailwind CSS**, **Supabase**, and **shadcn/ui**.

It serves **patients**, **doctors**, and **clinic administrators** with clean, role-based dashboards for managing appointments, records, and schedules.

---

## ✨ Features

- ✅ Role-based authentication (Patients, Doctors, Admins)
- 📅 Appointment booking and calendar management
- 🧑‍⚕️ Doctor availability scheduling
- 📖 Patient visit history and records
- 🔐 Secure Supabase Auth
- 🎨 Beautiful UI with Tailwind CSS + shadcn/ui
- 🚀 Instant deployment via Vercel

---

## 🧱 Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | Next.js (App Router), Tailwind CSS, shadcn/ui |
| Backend       | Supabase (Postgres, Edge Functions) |
| Auth          | Supabase Auth (Email + Google)      |
| UI Components | shadcn/ui + Lucide Icons            |
| Notifications | Resend (email), optional Twilio (SMS) |
| Deployment    | Vercel                              |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/novahealth.git
cd novahealth
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

* Go to [https://app.supabase.com](https://app.supabase.com)
* Create a new project
* Import the schema from `supabase/schema.sql`
* Enable **email auth** and optionally **Google OAuth**

### 4. Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication & Middleware

NovaHealth uses **Supabase Auth** and protects routes by user role.

### `/middleware.ts` handles:

* Redirecting unauthenticated users
* Ensuring only patients access `/patient/*`
* Ensuring only doctors access `/doctor/*`
* Ensuring only admins access `/admin/*`

---

## 🧪 Supabase Schema Overview

### Tables

#### `users`

| Field | Type   | Notes                  |
| ----- | ------ | ---------------------- |
| id    | UUID   | PK                     |
| email | String | Auth-linked            |
| role  | Enum   | patient, doctor, admin |
| name  | String |                        |

#### `appointments`

| Field       | Type      | Notes                |
| ----------- | --------- | -------------------- |
| id          | UUID      | PK                   |
| patient\_id | UUID      | FK → users           |
| doctor\_id  | UUID      | FK → users           |
| start\_time | Timestamp |                      |
| end\_time   | Timestamp |                      |
| status      | Enum      | scheduled, completed |
| notes       | Text      | Visit summary        |

#### `patient_records`

| Field        | Type      | Notes      |
| ------------ | --------- | ---------- |
| id           | UUID      | PK         |
| patient\_id  | UUID      | FK → users |
| doctor\_id   | UUID      | FK → users |
| visit\_date  | Timestamp |            |
| diagnosis    | Text      |            |
| prescription | Text      |            |

#### `availability`

| Field       | Type    | Notes             |
| ----------- | ------- | ----------------- |
| doctor\_id  | UUID    | FK → users        |
| weekday     | Integer | 0 (Sun) – 6 (Sat) |
| start\_time | Time    |                   |
| end\_time   | Time    |                   |

---

## 🧱 Pages & Routes

| Route                  | Description                          |
| ---------------------- | ------------------------------------ |
| `/login`               | Auth form (email + Google)           |
| `/signup`              | Select user role and register        |
| `/patient/dashboard`   | View upcoming appointment            |
| `/patient/book`        | Book appointment flow                |
| `/patient/records`     | Visit history timeline               |
| `/doctor/dashboard`    | Daily schedule                       |
| `/doctor/patients/:id` | Patient profile with record timeline |
| `/doctor/availability` | Weekly availability editor           |
| `/admin/dashboard`     | Admin stats                          |
| `/admin/users`         | Manage all users                     |
| `/admin/calendar`      | Clinic-wide calendar                 |

---

## 📦 UI Components

* `AppointmentCard`
* `CalendarBlock`
* `DoctorScheduleGrid`
* `PatientTimeline`
* `PrescriptionCard`
* `RoleBasedLayout`
* `shadcn/ui` buttons, modals, inputs

---

## 📧 Notifications

* **Resend Email**: For booking confirmations and reminders
* **Twilio (Optional)**: SMS reminders for patients

---

## 🧠 Future Features (Post-MVP)

* 📹 Video consults via WebRTC
* 💬 In-app chat
* 🧾 Payment/invoicing system
* 🧬 Lab test integrations
* 🤖 AI-generated visit summaries

---

## 🧪 Testing

* Unit tests with `vitest`
* E2E tests with `playwright`

```bash
npm run test
npm run test:e2e
```

---

## 🧼 Lint & Format

```bash
npm run lint
npm run format
```

---

## 📤 Deployment

* **Platform:** [Vercel](https://vercel.com)
* Auto-deploys on push to `main`
* Setup Supabase keys as environment variables in Vercel dashboard

---

## 🙌 Credits

* [Next.js](https://nextjs.org)
* [Supabase](https://supabase.com)
* [Tailwind CSS](https://tailwindcss.com)
* [shadcn/ui](https://ui.shadcn.com)
* [Lucide Icons](https://lucide.dev)
* [Resend](https://resend.com)

---

## 📄 License

MIT License — free to use and extend for clinical or educational purposes.

---

## 🤝 Contributing

Open to PRs for feature improvements or accessibility refinements. Run `npm run dev` locally and push to a feature branch.
```
