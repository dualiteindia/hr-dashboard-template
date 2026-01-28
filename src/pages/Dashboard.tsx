import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, MessageSquareText, Plus, Clock, Calendar } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { PageTransition } from '../components/ui/PageTransition';
import { format, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const performanceData = [
  { subject: 'Diversity', A: 120, fullMark: 150 },
  { subject: 'Investment', A: 98, fullMark: 150 },
  { subject: 'Campaign', A: 86, fullMark: 150 },
  { subject: 'Sustainability', A: 99, fullMark: 150 },
  { subject: 'Workload', A: 85, fullMark: 150 },
  { subject: 'Salary', A: 65, fullMark: 150 },
  { subject: 'Satisfaction', A: 85, fullMark: 150 },
  { subject: 'Ovr. Performance', A: 100, fullMark: 150 },
];

const jobLevelData = [
  { name: 'Internship and Contract', value: 789, color: '#34D399', percent: 34 },
  { name: 'Staff', value: 2110, color: '#3B82F6', percent: 53 },
  { name: 'CEO and Director', value: 382, color: '#60A5FA', percent: 13 },
];

export const Dashboard = () => {
  const { employees, attendance, tasks, addTask, addPayroll, addTimeTracker, dayOffRequests, timeTrackers } = useData();
  const [activeTab, setActiveTab] = useState<'attendance' | 'requests' | 'tracker'>('attendance');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);

  // Forms State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDays, setNewTaskDays] = useState('2');
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [overtime, setOvertime] = useState('');
  const [deductions, setDeductions] = useState('');
  const [trackerProject, setTrackerProject] = useState('');
  const [trackerTask, setTrackerTask] = useState('');

  const todayAttendance = attendance.filter(a => format(a.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'));
  const displayList = employees.slice(0, 6).map(emp => {
    const att = todayAttendance.find(a => a.employeeId === emp.id);
    return { ...emp, attendance: att };
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle) {
      addTask(newTaskTitle, parseInt(newTaskDays) || 1);
      setNewTaskTitle('');
      setNewTaskDays('2');
      setIsTaskModalOpen(false);
    }
  };

  const handleCreatePayroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmpId && baseSalary) {
      addPayroll({
        employeeId: selectedEmpId,
        month: new Date(),
        baseSalary: Number(baseSalary),
        overtime: Number(overtime) || 0,
        deductions: Number(deductions) || 0,
        status: 'Pending'
      });
      setIsPayrollModalOpen(false);
      setBaseSalary(''); setOvertime(''); setDeductions('');
    }
  };

  const handleCreateTracker = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackerProject && trackerTask) {
      addTimeTracker({
        employeeId: employees[0]?.id || '1',
        project: trackerProject,
        task: trackerTask,
        startTime: new Date(),
        duration: '0h 0m'
      });
      setIsTrackerModalOpen(false);
      setTrackerProject(''); setTrackerTask('');
    }
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Hello, Arthur Sjorgen</h1>
            <p className="text-slate-500 mt-1 font-medium">It's {format(new Date(), 'EEEE, d MMMM yyyy')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => setIsTaskModalOpen(true)}>Create New Task</Button>
            <Button variant="secondary" onClick={() => setIsTrackerModalOpen(true)}>New Tracker</Button>
            <Button variant="secondary" onClick={() => setIsPayrollModalOpen(true)}>Add Payroll</Button>
          </div>
        </div>

        {/* Top Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Company Performance</h3>
                <p className="text-xs text-slate-400 mt-1">Monthly analyzed performance</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="flex-1 min-h-[250px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Mike" dataKey="A" stroke="#3b82f6" strokeWidth={2.5} fill="#3b82f6" fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Company Job Levels</h3>
                <p className="text-xs text-slate-400 mt-1">Distribution across company</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5 text-slate-400" /></button>
            </div>
            
            <div className="space-y-8">
              <div className="flex h-10 w-full gap-1 rounded-xl overflow-hidden">
                {jobLevelData.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                    style={{ backgroundColor: item.color }}
                    className="h-full relative group hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
              
              <div>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight tabular-nums">
                  {employees.length + 3200} 
                  <span className="text-sm font-normal text-slate-400 ml-2 tracking-normal">Total employees</span>
                </h2>
              </div>

              <div className="space-y-3">
                {jobLevelData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 tabular-nums">{item.value}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-50 text-xs font-semibold text-slate-600 min-w-[3rem] text-center tabular-nums">
                        {item.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Attendance Report</h3>
                <p className="text-xs text-slate-400 mt-1">Real-time arrival heatmap</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5 text-slate-400" /></button>
            </div>
            
            <div className="flex gap-4 flex-1">
               <div className="flex flex-col justify-between py-2 text-xs text-slate-400 font-medium h-full">
                 <span>11:00</span>
                 <span>10:00</span>
                 <span>09:30</span>
                 <span>09:00</span>
                 <span>08:30</span>
               </div>

               <div className="flex-1 grid grid-cols-5 gap-2.5">
                 {Array.from({ length: 5 }).map((_, colIndex) => (
                   <div key={colIndex} className="flex flex-col gap-2.5 h-full">
                     {Array.from({ length: 5 }).map((_, rowIndex) => {
                       const opacity = [0.05, 0.1, 0.3, 0.5, 0.7, 0.9][Math.floor(Math.random() * 6)];
                       return (
                         <motion.div 
                           key={rowIndex} 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: rowIndex * 0.05 + colIndex * 0.05 }}
                           className="flex-1 rounded-lg bg-primary-500 transition-all hover:scale-110 hover:shadow-glow"
                           style={{ opacity }}
                         />
                       );
                     })}
                     <span className="text-center text-xs text-slate-400 font-medium mt-1">
                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][colIndex]}
                     </span>
                   </div>
                 ))}
               </div>
            </div>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Task Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {tasks.slice(0, 4).map((task, i) => {
               const daysLeft = differenceInDays(task.dueDate, new Date());
               return (
                <Card key={task.id} className="p-5 flex flex-col justify-between h-[180px] group" onClick={() => {}}>
                  <h4 className="font-semibold text-slate-800 text-sm leading-relaxed line-clamp-3 group-hover:text-primary-600 transition-colors">
                    {task.title}
                  </h4>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 mb-1 font-bold uppercase tracking-wider">Due In</p>
                      <p className="text-xl font-bold text-slate-900 tabular-nums">{daysLeft} Days</p>
                    </div>
                    <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              );
            })}
            {tasks.length < 4 && (
               <motion.button 
                 whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 246, 255, 0.5)" }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => setIsTaskModalOpen(true)}
                 className="bg-slate-50 border-2 border-dashed border-slate-200 p-5 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:text-primary-500 hover:border-primary-200 transition-all h-[180px]"
               >
                 <Plus className="w-8 h-8 mb-2" />
                 <span className="text-sm font-medium">Add New Task</span>
               </motion.button>
            )}
          </div>

          {/* Table Section */}
          <Card className="lg:col-span-8 p-0 overflow-hidden border-0 shadow-medium">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <motion.h3 
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bold text-lg text-slate-900"
                >
                  {activeTab === 'attendance' && 'Employer Attendance'}
                  {activeTab === 'requests' && 'Day-Off Requests'}
                  {activeTab === 'tracker' && 'Time Tracker Log'}
                </motion.h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {activeTab === 'attendance' && 'Employee arrival details on this day'}
                  {activeTab === 'requests' && 'Recent leave requests from employees'}
                  {activeTab === 'tracker' && 'Real-time project time tracking'}
                </p>
              </div>
              <div className="flex bg-slate-50/80 p-1 rounded-xl backdrop-blur-sm">
                {(['attendance', 'requests', 'tracker'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all z-10 ${
                      activeTab === tab ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="tab-bg"
                        className="absolute inset-0 bg-white shadow-sm rounded-lg border border-slate-200/50 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {tab === 'attendance' ? 'Late Attendance' : tab === 'requests' ? 'Day-Off Request' : 'Time Tracker'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 text-left border-b border-slate-100">
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                    {activeTab === 'attendance' && (
                      <>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Check In</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Check Out</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      </>
                    )}
                    {activeTab === 'requests' && (
                      <>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      </>
                    )}
                    {activeTab === 'tracker' && (
                      <>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Task</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                        <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      </>
                    )}
                    <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activeTab === 'attendance' && displayList.map((emp) => (
                    <tr key={emp.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                         <div className="flex flex-col">
                           <span className="font-semibold text-slate-900 text-sm">{emp.firstName} {emp.lastName}</span>
                           <span className="text-xs text-slate-400 font-mono mt-0.5">EM-{emp.id.slice(0, 4).toUpperCase()}</span>
                         </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 text-sm">{format(new Date(), 'MMM dd, yyyy')}</td>
                      <td className="py-4 px-6 text-slate-900 font-medium text-sm tabular-nums">09:30 AM</td>
                      <td className="py-4 px-6 text-slate-900 font-medium text-sm tabular-nums">05:00 PM</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          emp.attendance?.status === 'Late' 
                            ? 'bg-red-50 text-red-600 border border-red-100' 
                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                           <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                             emp.attendance?.status === 'Late' ? 'bg-red-500' : 'bg-blue-500'
                           }`}></span>
                           {emp.attendance?.status || 'On-Time'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                          <MessageSquareText className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {activeTab === 'requests' && dayOffRequests.slice(0, 6).map(req => {
                    const emp = employees.find(e => e.id === req.employeeId);
                    return (
                      <tr key={req.id} className="group hover:bg-slate-50/50 transition-colors">
                         <td className="py-4 px-6">
                           <div className="flex flex-col">
                             <span className="font-semibold text-slate-900 text-sm">{emp?.firstName} {emp?.lastName}</span>
                             <span className="text-xs text-slate-400">{emp?.role}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 text-slate-900 font-medium text-sm">{req.type}</td>
                        <td className="py-4 px-6 text-slate-500 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {format(req.startDate, 'MMM d')} - {format(req.endDate, 'MMM d')}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-xs max-w-[150px] truncate">{req.reason}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            req.status === 'Approved' ? 'bg-green-50 text-green-600 border border-green-100' :
                            req.status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-100' :
                            'bg-yellow-50 text-yellow-600 border border-yellow-100'
                          }`}>
                             {req.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}

                  {activeTab === 'tracker' && timeTrackers.slice(0, 6).map(tracker => {
                    const emp = employees.find(e => e.id === tracker.employeeId);
                    return (
                      <tr key={tracker.id} className="group hover:bg-slate-50/50 transition-colors">
                         <td className="py-4 px-6">
                           <div className="flex flex-col">
                             <span className="font-semibold text-slate-900 text-sm">{emp?.firstName} {emp?.lastName}</span>
                             <span className="text-xs text-slate-400">{emp?.role}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 text-slate-900 font-medium text-sm">{tracker.project}</td>
                        <td className="py-4 px-6 text-slate-500 text-xs">{tracker.task}</td>
                        <td className="py-4 px-6 text-slate-900 font-mono font-medium text-sm tabular-nums">{tracker.duration}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            tracker.status === 'Running' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                          }`}>
                             {tracker.status === 'Running' && <Clock className="w-3 h-3 mr-1.5 animate-pulse" />}
                             {tracker.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Modals */}
        <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Create New Task">
          <form onSubmit={handleCreateTask} className="space-y-4">
            <Input label="Task Title" placeholder="e.g. Review Q3 Financials" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} required />
            <Input label="Days until due" type="number" min="1" value={newTaskDays} onChange={(e) => setNewTaskDays(e.target.value)} required />
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsTaskModalOpen(false)}>Cancel</Button>
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isPayrollModalOpen} onClose={() => setIsPayrollModalOpen(false)} title="New Payroll Entry">
          <form onSubmit={handleCreatePayroll} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Employee</label>
              <select className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" value={selectedEmpId} onChange={(e) => setSelectedEmpId(e.target.value)} required>
                <option value="">Select Employee</option>
                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>)}
              </select>
            </div>
            <Input label="Base Salary ($)" type="number" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} required />
            <Input label="Overtime ($)" type="number" value={overtime} onChange={(e) => setOvertime(e.target.value)} />
            <Input label="Deductions ($)" type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsPayrollModalOpen(false)}>Cancel</Button>
              <Button type="submit">Create Payroll</Button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isTrackerModalOpen} onClose={() => setIsTrackerModalOpen(false)} title="Start New Time Tracker">
          <form onSubmit={handleCreateTracker} className="space-y-4">
            <Input label="Project Name" placeholder="e.g. Website Redesign" value={trackerProject} onChange={(e) => setTrackerProject(e.target.value)} required />
            <Input label="Task Description" placeholder="e.g. Homepage Hero Section" value={trackerTask} onChange={(e) => setTrackerTask(e.target.value)} required />
            <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3 border border-blue-100">
               <Clock className="w-5 h-5 text-primary-500" />
               <p className="text-sm text-primary-700">Timer will start automatically upon creation.</p>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsTrackerModalOpen(false)}>Cancel</Button>
              <Button type="submit">Start Timer</Button>
            </div>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};
