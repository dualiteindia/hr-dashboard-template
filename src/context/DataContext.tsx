import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Attendance, Applicant, Payroll, Task, DayOffRequest, TimeTracker } from '../lib/types';
import { mockData } from '../lib/mockData';
import { faker } from '@faker-js/faker';
import { addDays } from 'date-fns';

interface DataContextType {
  employees: Employee[];
  attendance: Attendance[];
  applicants: Applicant[];
  payrolls: Payroll[];
  tasks: Task[];
  dayOffRequests: DayOffRequest[];
  timeTrackers: TimeTracker[];
  
  // Actions
  addEmployee: (employee: Omit<Employee, 'id' | 'avatar'>) => void;
  deleteApplicant: (id: string) => void;
  updateApplicantStage: (id: string, stage: Applicant['stage']) => void;
  addPayroll: (payroll: Omit<Payroll, 'id' | 'netPay'>) => void;
  addTask: (title: string, daysUntilDue: number) => void;
  addDayOffRequest: (request: Omit<DayOffRequest, 'id' | 'status'>) => void;
  addTimeTracker: (tracker: Omit<TimeTracker, 'id' | 'status'>) => void;
  searchApplicants: (query: string) => Applicant[];
  searchEmployees: (query: string) => Employee[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [dayOffRequests, setDayOffRequests] = useState<DayOffRequest[]>([]);
  const [timeTrackers, setTimeTrackers] = useState<TimeTracker[]>([]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: "Creating new broadcast message for new Employee", dueDate: addDays(new Date(), 2), status: 'Pending' },
    { id: '2', title: "Creating campaign task for Digital Marketing", dueDate: addDays(new Date(), 6), status: 'In-Progress' },
    { id: '3', title: "Creating conference meet with stakeholders", dueDate: addDays(new Date(), 9), status: 'Pending' },
    { id: '4', title: "Move all finance files to new directory", dueDate: addDays(new Date(), 24), status: 'Pending' },
  ]);

  // Initialize with mock data
  useEffect(() => {
    setEmployees(mockData.employees);
    setAttendance(mockData.attendance);
    setApplicants(mockData.applicants);
    setPayrolls(mockData.payrolls);
    setDayOffRequests(mockData.dayOffRequests);
    setTimeTrackers(mockData.timeTrackers);
  }, []);

  const addEmployee = (data: Omit<Employee, 'id' | 'avatar'>) => {
    const newEmployee: Employee = {
      ...data,
      id: faker.string.uuid(), // Updated to use UUID
      avatar: faker.image.avatar(),
    };
    setEmployees([newEmployee, ...employees]);
  };

  const deleteApplicant = (id: string) => {
    setApplicants(prev => prev.filter(app => app.id !== id));
  };

  const updateApplicantStage = (id: string, stage: Applicant['stage']) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, stage } : app
    ));
  };

  const addPayroll = (data: Omit<Payroll, 'id' | 'netPay'>) => {
    const newPayroll: Payroll = {
      ...data,
      id: faker.string.uuid(),
      netPay: data.baseSalary + data.overtime - data.deductions
    };
    setPayrolls([newPayroll, ...payrolls]);
  };

  const addTask = (title: string, daysUntilDue: number) => {
    const newTask: Task = {
      id: faker.string.uuid(),
      title,
      dueDate: addDays(new Date(), daysUntilDue),
      status: 'Pending'
    };
    setTasks([newTask, ...tasks]);
  };

  const addDayOffRequest = (request: Omit<DayOffRequest, 'id' | 'status'>) => {
    const newRequest: DayOffRequest = {
      ...request,
      id: faker.string.uuid(),
      status: 'Pending'
    };
    setDayOffRequests([newRequest, ...dayOffRequests]);
  };

  const addTimeTracker = (tracker: Omit<TimeTracker, 'id' | 'status'>) => {
    const newTracker: TimeTracker = {
      ...tracker,
      id: faker.string.uuid(),
      status: 'Running'
    };
    setTimeTrackers([newTracker, ...timeTrackers]);
  };

  const searchApplicants = (query: string) => {
    if (!query) return applicants;
    const lowerQuery = query.toLowerCase();
    return applicants.filter(app => 
      app.name.toLowerCase().includes(lowerQuery) || 
      app.role.toLowerCase().includes(lowerQuery)
    );
  };

  const searchEmployees = (query: string) => {
    if (!query) return employees;
    const lowerQuery = query.toLowerCase();
    return employees.filter(emp => 
      emp.firstName.toLowerCase().includes(lowerQuery) || 
      emp.lastName.toLowerCase().includes(lowerQuery) ||
      emp.role.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <DataContext.Provider value={{
      employees,
      attendance,
      applicants,
      payrolls,
      tasks,
      dayOffRequests,
      timeTrackers,
      addEmployee,
      deleteApplicant,
      updateApplicantStage,
      addPayroll,
      addTask,
      addDayOffRequest,
      addTimeTracker,
      searchApplicants,
      searchEmployees
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
