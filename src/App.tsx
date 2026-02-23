/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { LeadsTable, Lead } from './components/LeadsTable';
import { LeadModal } from './components/LeadModal';
import { Users, PhoneOutgoing, CheckCircle2, Plus } from 'lucide-react';

// Mock initial data
const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'Sarah Wilson', phone: '+6281234567890', status: 'New', date: '2024-02-20' },
  { id: '2', name: 'Michael Chen', phone: '+6281987654321', status: 'Follow Up', date: '2024-02-19' },
  { id: '3', name: 'Jessica Taylor', phone: '+6281345678901', status: 'Closing', date: '2024-02-18' },
  { id: '4', name: 'David Miller', phone: '+6281567890123', status: 'New', date: '2024-02-18' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'date'>) => {
    const lead: Lead = {
      ...newLead,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
    };
    setLeads([lead, ...leads]);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const handleStatusChange = (id: string, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  // Calculate stats
  const totalLeads = leads.length;
  const followUpCount = leads.filter(l => l.status === 'Follow Up').length;
  const closingCount = leads.filter(l => l.status === 'Closing').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              title="Total Leads" 
              value={totalLeads} 
              icon={Users} 
              trend="+12% this week"
              color="blue"
            />
            <StatsCard 
              title="Follow Up" 
              value={followUpCount} 
              icon={PhoneOutgoing} 
              color="orange"
            />
            <StatsCard 
              title="Closing" 
              value={closingCount} 
              icon={CheckCircle2} 
              trend="+5% this week"
              color="emerald"
            />
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            <LeadsTable 
              leads={leads} 
              onDelete={handleDeleteLead}
              onStatusChange={handleStatusChange}
            />
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 p-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-lg shadow-emerald-500/30 transition-all hover:scale-110 active:scale-95 z-40 group"
      >
        <Plus size={28} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 text-slate-200 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700">
          Add New Lead
        </span>
      </button>

      {/* Modal */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddLead}
      />
    </div>
  );
}
