import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { format } from 'date-fns';
import { Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const DayOffRequests = () => {
  const { dayOffRequests, employees, addDayOffRequest } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [type, setType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmpId && startDate && endDate) {
      addDayOffRequest({
        employeeId: selectedEmpId,
        type: type as any,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason
      });
      setIsModalOpen(false);
      // Reset
      setReason('');
      setStartDate('');
      setEndDate('');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Day-Off Requests</h1>
          <p className="text-slate-500 mt-1">Manage employee leave and time-off requests</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>New Request</Button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-left">
                <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {dayOffRequests.map((req) => {
                const emp = employees.find(e => e.id === req.employeeId);
                return (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={emp?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{emp?.firstName} {emp?.lastName}</p>
                          <p className="text-xs text-slate-500">{emp?.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">{req.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{format(req.startDate, 'MMM d')} - {format(req.endDate, 'MMM d, yyyy')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">{req.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${getStatusColor(req.status)}`}>
                        {req.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                        {req.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                        {req.status === 'Pending' && <Clock className="w-3 h-3" />}
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors">Approve</button>
                        <button className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Reject</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit Leave Request">
        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Employee</label>
            <select 
              className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</label>
            <select 
              className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal">Personal</option>
              <option value="Remote Work">Remote Work</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
          <Input label="Reason" placeholder="Brief description..." value={reason} onChange={(e) => setReason(e.target.value)} required />
          
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
