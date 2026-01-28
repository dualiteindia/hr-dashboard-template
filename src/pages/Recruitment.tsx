import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PageTransition } from '../components/ui/PageTransition';
import { Search, ChevronRight, FileText, Users, Activity, Paperclip, ArrowUpRight, CheckCircle2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Recruitment = () => {
  const { applicants, deleteApplicant, updateApplicantStage, searchApplicants } = useData();
  // Fix: Store ID instead of object to prevent stale state
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Derived state: Always get the latest version of the applicant from context
  const selectedApplicant = applicants.find(a => a.id === selectedApplicantId) || null;
  const filteredApplicants = searchApplicants(searchQuery);

  useEffect(() => {
    // Initialize selection or reset if selected applicant is deleted
    if (applicants.length > 0) {
      if (!selectedApplicantId) {
        setSelectedApplicantId(applicants[0].id);
      } else {
        const exists = applicants.find(a => a.id === selectedApplicantId);
        if (!exists) setSelectedApplicantId(applicants[0].id);
      }
    } else {
      setSelectedApplicantId(null);
    }
  }, [applicants, selectedApplicantId]);

  const handleDelete = () => {
    if (selectedApplicant && confirm(`Are you sure you want to delete ${selectedApplicant.name}?`)) {
      deleteApplicant(selectedApplicant.id);
    }
  };

  const handleAccept = () => {
    if (selectedApplicant) {
      updateApplicantStage(selectedApplicant.id, 'Hired');
      // No need to manually update state; selectedApplicant will re-derive with new stage
    }
  };

  return (
    <PageTransition>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
        {/* Left Sidebar List */}
        <Card className="lg:col-span-4 p-0 flex flex-col h-full overflow-hidden border-0 shadow-medium">
          <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-lg text-slate-900">Applicant Profile</h2>
              <div className="relative group">
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-32 focus:w-40 transition-all outline-none focus:ring-2 focus:ring-primary-100"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary-500" />
              </div>
            </div>
            <p className="text-xs text-slate-400">Job applicant profiles on your vacancies</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {filteredApplicants.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">No applicants found</div>
            ) : (
              filteredApplicants.map((applicant) => (
                <motion.div 
                  key={applicant.id}
                  layoutId={applicant.id}
                  onClick={() => setSelectedApplicantId(applicant.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all group ${
                    selectedApplicantId === applicant.id 
                      ? 'border-primary-200 bg-primary-50/50 shadow-sm' 
                      : 'border-slate-100 hover:border-primary-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                     <div className="flex gap-3">
                        <img src={applicant.avatar} alt={applicant.name} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary-700 transition-colors">{applicant.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{applicant.role}</p>
                        </div>
                     </div>
                     {selectedApplicantId === applicant.id && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-glow"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </motion.div>
                     )}
                  </div>

                  <div className="flex justify-between bg-white/60 p-2.5 rounded-xl border border-slate-100/50">
                     <div className="text-center">
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Hard Skills</p>
                        <p className="font-bold text-slate-900 text-xs tabular-nums">{applicant.stats.hardSkills}</p>
                     </div>
                     <div className="w-px bg-slate-100"></div>
                     <div className="text-center">
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Soft Skills</p>
                        <p className="font-bold text-slate-900 text-xs tabular-nums">{applicant.stats.softSkills}</p>
                     </div>
                     <div className="w-px bg-slate-100"></div>
                     <div className="text-center">
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Ovr. Score</p>
                        <p className="font-bold text-slate-900 text-xs tabular-nums">{applicant.stats.ovrScore}</p>
                     </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Card>

        {/* Right Detail View */}
        <div className="lg:col-span-8 space-y-6 overflow-y-auto h-full pr-2 pb-6 custom-scrollbar">
          <AnimatePresence mode="wait">
          {selectedApplicant ? (
            <motion.div 
              key={selectedApplicant.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-6"
            >
              {/* Header Card */}
              <Card className="p-8">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="font-bold text-lg text-slate-900">Applicant Information Details</h2>
                   <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-100"><ArrowUpRight className="w-4 h-4 text-slate-400" /></button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                   <div className="flex gap-5 items-center">
                      <img src={selectedApplicant.avatar} alt="" className="w-20 h-20 rounded-2xl object-cover shadow-soft" />
                      <div>
                        <div className="flex items-center gap-3">
                          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedApplicant.name}</h1>
                          {selectedApplicant.stage === 'Hired' && (
                            <motion.span 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="bg-green-50 text-green-700 border border-green-100 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Hired
                            </motion.span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm mt-1">Candidate ID <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded ml-1">#{selectedApplicant.id.slice(0, 8)}</span></p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <Button variant="secondary">Move To Scouting</Button>
                     <Button variant="danger" onClick={handleDelete}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
                     {selectedApplicant.stage !== 'Hired' && (
                       <Button onClick={handleAccept}>Accept Applicant</Button>
                     )}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                  {[
                    { label: 'Job Applied', value: selectedApplicant.role },
                    { label: 'Experience', value: `${selectedApplicant.experience} Years` },
                    { label: 'Skills', value: selectedApplicant.skills.map(s => s.name).join(', ') || 'UI, UX' },
                    { label: 'Email', value: selectedApplicant.email },
                    { label: 'Phone', value: selectedApplicant.phone },
                    { label: 'Address', value: selectedApplicant.address }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="font-semibold text-slate-900 text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-slate-900">Recruitment Progress</h3>
                      <p className="text-xs text-slate-400 mt-1">Current stage status</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { icon: FileText, label: "Take home test", date: "12 June 2024" },
                       { icon: Users, label: "Interview with HR", date: "14 June 2024" },
                       { icon: Activity, label: "Health forms", date: "15 June 2024" },
                       { icon: Paperclip, label: "File collection", date: "16 June 2024" }
                     ].map((step, i) => (
                       <div key={i} className="p-4 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group cursor-default">
                          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                            <step.icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 mb-1 leading-tight">{step.label}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">{step.date}</p>
                       </div>
                     ))}
                  </div>
                </Card>

                <Card className="p-6">
                   <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-slate-900">Past Experience</h3>
                      <p className="text-xs text-slate-400 mt-1">Work history overview</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {selectedApplicant.pastExperience.length > 0 ? (
                      selectedApplicant.pastExperience.map((exp, i) => (
                        <div key={i} className="flex gap-4 items-start group">
                          <div className="w-12 h-12 bg-white border border-slate-100 rounded-full flex items-center justify-center p-2 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                            <img src={exp.logo} alt="" className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900">{exp.company}</h4>
                            <p className="text-xs text-slate-500 mb-3 font-medium">{exp.role} • {exp.duration}</p>
                            
                            {exp.description && (
                              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <h5 className="text-[10px] font-bold text-slate-900 mb-2 uppercase tracking-wide">Short Resume</h5>
                                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                  {exp.description}
                                </p>
                                <div className="pt-3 border-t border-slate-200 flex gap-6">
                                  {['Hard Skills', 'Soft Skills', 'Ovr. Score'].map((label, idx) => (
                                    <div key={idx}>
                                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wide">{label}</p>
                                      <p className="font-bold text-slate-900 text-sm mt-0.5 tabular-nums">
                                        {idx === 0 ? selectedApplicant.stats.hardSkills : idx === 1 ? selectedApplicant.stats.softSkills : selectedApplicant.stats.ovrScore}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 text-center py-8">No past experience recorded.</p>
                    )}
                  </div>
                </Card>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 font-medium">
              Select an applicant to view details
            </div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};
