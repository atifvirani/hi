import React from 'react';
import { IndianRupee, Calendar, Armchair, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`p-4 rounded-full ${color} text-white`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Welcome back, Atif.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Calendar size={16} /> Today: {new Date().toLocaleDateString()}
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Today's Revenue" 
          value="₹ 12,450" 
          icon={IndianRupee} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Active Sessions" 
          value="4 / 8 Chairs" 
          icon={Armchair} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Appointments" 
          value="12 Remaining" 
          icon={Calendar} 
          color="bg-purple-500" 
        />
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" />
            Live Chair Status
          </h3>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Chair</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time Elapsed</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* DUMMY DATA FOR NOW */}
            {[1, 2, 3].map((chair) => (
              <tr key={chair} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">Chair {chair}</td>
                <td className="px-6 py-4">Waiting...</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                    Available
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">--:--</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 font-medium hover:underline">Assign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
