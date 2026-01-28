import React from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Play, Pause, Square, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const TimeTracker = () => {
  const { timeTrackers, employees } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Time Tracker</h1>
          <p className="text-slate-500 mt-1">Monitor working hours and project time logs</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-sm font-semibold text-slate-700">02:14:32</span>
           <span className="text-xs text-slate-400">Current Session</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Trackers */}
        {timeTrackers.filter(t => t.status === 'Running').map(tracker => {
           const emp = employees.find(e => e.id === tracker.employeeId);
           return (
             <div key={tracker.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                   <img src={emp?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                   <div>
                     <p className="font-bold text-slate-900 text-sm">{emp?.firstName}</p>
                     <p className="text-xs text-slate-500">Working now</p>
                   </div>
                 </div>
                 <div className="px-2.5 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
                   <Clock className="w-3 h-3" /> Running
                 </div>
               </div>
               
               <h3 className="font-bold text-lg text-slate-900 mb-1">{tracker.project}</h3>
               <p className="text-sm text-slate-500 mb-6">{tracker.task}</p>

               <div className="flex items-center justify-between">
                 <span className="text-2xl font-mono font-bold text-slate-900 tracking-tight">01:42:10</span>
                 <button className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                   <Square className="w-4 h-4 fill-current" />
                 </button>
               </div>
             </div>
           );
        })}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-lg text-slate-900 mb-6">Recent Activity Log</h3>
        <div className="space-y-4">
          {timeTrackers.filter(t => t.status === 'Completed').map(tracker => {
             const emp = employees.find(e => e.id === tracker.employeeId);
             return (
               <div key={tracker.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-200">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{tracker.project}</h4>
                      <p className="text-xs text-slate-500">{tracker.task} • by {emp?.firstName}</p>
                    </div>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-slate-900">{tracker.duration}</p>
                   <p className="text-xs text-slate-400">{format(tracker.startTime, 'MMM d, HH:mm')}</p>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};
