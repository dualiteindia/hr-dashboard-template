import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { PageTransition } from '../components/ui/PageTransition';
import { Search, DollarSign } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { format } from 'date-fns';

const cashflowData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const inventoryOrders = [
  {
    id: "Inv-31982",
    product: "Logitech MX Master 2",
    division: "Inv. Design & Research Division",
    price: 40.89,
    date: "24 September 2023",
    orderedBy: "Cameron Williamson",
    paymentType: "Reimbursement",
    status: "Delivered",
    image: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-2s/gallery/mx-master-2s-graphite-gallery-1.png?v=1"
  },
  {
    id: "Inv-8269",
    product: "DBE DJ200",
    division: "Inv. Design & Research Division",
    price: 128.70,
    date: "20 September 2023",
    orderedBy: "Robert Fox",
    paymentType: "Cash",
    status: "Waiting Approval",
    image: "https://m.media-amazon.com/images/I/61WqF7Y0aLL._AC_UF1000,1000_QL80_.jpg"
  }
];

export const Payroll = () => {
  const { payrolls, employees, addPayroll } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [overtime, setOvertime] = useState('');
  const [deductions, setDeductions] = useState('');

  const payrollTableData = payrolls
    .map(p => ({ ...p, employee: employees.find(e => e.id === p.employeeId) }))
    .filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return item.employee?.firstName.toLowerCase().includes(q) || item.employee?.lastName.toLowerCase().includes(q);
    });

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

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Payroll & Expenses</h1>
            <p className="text-slate-500 mt-1 font-medium">Financial overview for {format(new Date(), 'MMMM yyyy')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Add Reimbursement</Button>
            <Button variant="primary" onClick={() => setIsPayrollModalOpen(true)}>New Payroll</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-4 space-y-8">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Cashflow Report</h3>
                  <p className="text-xs text-slate-400 mt-1">Monthly cash flow</p>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-lg">
                  <button className="px-3 py-1.5 rounded-md text-xs font-semibold bg-primary-500 text-white shadow-sm">This Month</button>
                  <button className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-400 hover:text-slate-600">Last Month</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Inventory Valuation', value: '$53,427' },
                  { label: 'Payroll Expenses', value: '$53,427' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-glow">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight">{stat.value}</p>
                    <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashflowData}>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#10b981', strokeWidth: 4, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Inventory Orders</h3>
                  <p className="text-xs text-slate-400 mt-1">Recent procurement</p>
                </div>
              </div>

              <div className="space-y-4">
                {inventoryOrders.map((order, idx) => (
                  <div key={idx} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100">{order.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center border border-slate-100 shadow-sm">
                        <img src={order.image} alt={order.product} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-slate-900">{order.product}</h4>
                          <span className="font-bold text-sm text-slate-900 tabular-nums">${order.price}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{order.division}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="xl:col-span-8">
            <Card className="h-full p-0 border-0 shadow-medium">
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Employee Monthly Payroll</h3>
                  <p className="text-xs text-slate-400 mt-1">Active payroll records</p>
                </div>
                <div className="relative group">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search Employee"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-64 focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-200 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-slate-50/50">
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee ID</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Payroll</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Overtime</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {payrollTableData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5 text-xs font-mono text-slate-500">EM-{item.employee?.id.slice(0, 4).toUpperCase()}</td>
                        <td className="px-6 py-5 text-sm font-semibold text-slate-900">{item.employee?.firstName} {item.employee?.lastName}</td>
                        <td className="px-6 py-5 text-sm text-slate-500">{item.employee?.role}</td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-900 tabular-nums">{formatCurrency(item.baseSalary)}</td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-600 tabular-nums">{formatCurrency(item.overtime)}</td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.status === 'Paid' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-red-50 text-red-600 border border-red-100'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

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
      </div>
    </PageTransition>
  );
};
