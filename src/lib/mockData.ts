import { faker } from '@faker-js/faker';
import { Employee, Attendance, Applicant, Payroll, DayOffRequest, TimeTracker } from './types';
import { subDays, setHours, setMinutes, addDays } from 'date-fns';

export const generateMockData = () => {
  const employees: Employee[] = Array.from({ length: 50 }).map(() => ({
    id: faker.string.uuid(), // Changed from numeric(4) to uuid() for uniqueness
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    role: faker.person.jobTitle(),
    department: faker.helpers.arrayElement(['Engineering', 'Design', 'Marketing', 'HR', 'Sales']),
    status: faker.helpers.arrayElement(['Active', 'Active', 'Active', 'Inactive']),
    joinDate: faker.date.past(),
    avatar: faker.image.avatar(),
  }));

  const attendance: Attendance[] = employees.flatMap((emp) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const date = subDays(new Date(), i);
      const isLate = Math.random() > 0.8;
      const checkIn = setMinutes(setHours(date, isLate ? 9 : 8), faker.number.int({ min: 0, max: 59 }));
      const checkOut = setMinutes(setHours(date, 17), faker.number.int({ min: 0, max: 30 }));

      return {
        id: faker.string.uuid(),
        employeeId: emp.id,
        date,
        checkIn,
        checkOut,
        status: isLate ? 'Late' : 'On-Time',
      };
    });
  });

  const applicants: Applicant[] = [
    {
      id: "APL002",
      name: "Jonathan Baker",
      role: "UIUX Designer",
      email: "jonbaker@gmail.com",
      phone: "(406) 555-0120",
      address: "74C Aaliyah River, Bayerhaven",
      experience: 4,
      stage: 'Interview',
      skills: [{ name: "UI", score: 90 }],
      stats: { hardSkills: 1029, softSkills: 1352, ovrScore: 1174 },
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=compress&fit=facearea&facepad=2&w=256&h=256&q=80",
      appliedDate: new Date(),
      pastExperience: [
        {
          company: "Drupal, Inc.",
          role: "UIUX Designer",
          duration: "2022 - 2024 • 2 Years 3 Month",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Drupal_icon_vector.svg/1200px-Drupal_icon_vector.svg.png",
          description: "In Drupal I worked on interfaces and did a lot of interviews with stakeholders and users which allowed us to get feedback and also insight into the project we were working on."
        },
        {
          company: "Slack, Inc.",
          role: "Product Designer",
          duration: "2020 - 2022 • 2 Years 8 Month",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
        }
      ]
    },
    {
      id: "APL003",
      name: "Floyd Miles",
      role: "UIUX Designer",
      email: "floyd.miles@example.com",
      phone: "(205) 555-0100",
      address: "2464 Royal Ln. Mesa, New Jersey",
      experience: 6,
      stage: 'Applied',
      skills: [{ name: "UI", score: 85 }],
      stats: { hardSkills: 2394, softSkills: 982, ovrScore: 1082 },
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=compress&fit=facearea&facepad=2&w=256&h=256&q=80",
      appliedDate: new Date(),
      pastExperience: [
        {
          company: "Github, Inc.",
          role: "Frontend Dev",
          duration: "2019 - 2024 • 5 Years 3 Month",
          logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        },
        {
          company: "Spotify Technology SA",
          role: "UI Designer",
          duration: "2018 - 2019 • 1 Years 2 Month",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        }
      ]
    },
    {
      id: "APL004",
      name: "Jenny Wilson",
      role: "UIUX Designer",
      email: "jenny.wilson@example.com",
      phone: "(303) 555-0105",
      address: "2972 Westheimer Rd. Santa Ana, Illinois",
      experience: 4,
      stage: 'Offer',
      skills: [{ name: "UI", score: 92 }],
      stats: { hardSkills: 1100, softSkills: 1200, ovrScore: 1150 },
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=compress&fit=facearea&facepad=2&w=256&h=256&q=80",
      appliedDate: new Date(),
      pastExperience: []
    }
  ];

  const payrolls: Payroll[] = employees.map((emp) => ({
    id: faker.string.uuid(),
    employeeId: emp.id,
    month: new Date(),
    baseSalary: faker.number.int({ min: 3000, max: 9000 }),
    overtime: faker.number.int({ min: 0, max: 500 }),
    deductions: faker.number.int({ min: 100, max: 1000 }),
    netPay: 0,
    status: faker.helpers.arrayElement(['Paid', 'Pending']),
  })).map(p => ({ ...p, netPay: p.baseSalary + p.overtime - p.deductions }));

  const dayOffRequests: DayOffRequest[] = employees.slice(0, 8).map(emp => ({
    id: faker.string.uuid(),
    employeeId: emp.id,
    type: faker.helpers.arrayElement(['Sick Leave', 'Annual Leave', 'Personal']),
    startDate: faker.date.future(),
    endDate: faker.date.future(),
    reason: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected'])
  }));

  const timeTrackers: TimeTracker[] = employees.slice(0, 10).map(emp => ({
    id: faker.string.uuid(),
    employeeId: emp.id,
    project: faker.helpers.arrayElement(['Website Redesign', 'Mobile App', 'Marketing Campaign', 'Internal Tools']),
    task: faker.hacker.verb() + ' ' + faker.hacker.noun(),
    startTime: faker.date.recent(),
    duration: `${faker.number.int({ min: 1, max: 8 })}h ${faker.number.int({ min: 0, max: 59 })}m`,
    status: 'Completed'
  }));

  return { employees, attendance, applicants, payrolls, dayOffRequests, timeTrackers };
};

export const mockData = generateMockData();
