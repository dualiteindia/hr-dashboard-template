export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  joinDate: Date;
  avatar: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  status: 'On-Time' | 'Late' | 'Absent';
}

export interface PastExperience {
  company: string;
  role: string;
  duration: string;
  logo: string; // URL or icon identifier
  description?: string;
}

export interface Applicant {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  experience: number;
  stage: 'Applied' | 'Interview' | 'Offer' | 'Hired';
  skills: { name: string; score: number }[];
  stats: {
    hardSkills: number;
    softSkills: number;
    ovrScore: number;
  };
  pastExperience: PastExperience[];
  avatar: string;
  appliedDate: Date;
}

export interface Payroll {
  id: string;
  employeeId: string;
  month: Date;
  baseSalary: number;
  overtime: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Pending';
}

export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  status: 'Pending' | 'In-Progress' | 'Completed';
}

export interface DayOffRequest {
  id: string;
  employeeId: string;
  type: 'Sick Leave' | 'Annual Leave' | 'Remote Work' | 'Personal';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface TimeTracker {
  id: string;
  employeeId: string;
  project: string;
  task: string;
  startTime: Date;
  endTime?: Date;
  duration: string; // e.g., "4h 30m"
  status: 'Running' | 'Completed';
}
