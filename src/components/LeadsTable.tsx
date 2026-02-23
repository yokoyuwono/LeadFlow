import { MoreHorizontal, Phone, MessageCircle, Trash2, Edit } from 'lucide-react';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  status: 'New' | 'Follow Up' | 'Closing';
  date: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Lead['status']) => void;
}

export function LeadsTable({ leads, onDelete, onStatusChange }: LeadsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Follow Up': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Closing': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-100">Recent Leads</h2>
        <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium border-b border-slate-800">Name</th>
              <th className="p-4 font-medium border-b border-slate-800">Contact</th>
              <th className="p-4 font-medium border-b border-slate-800">Status</th>
              <th className="p-4 font-medium border-b border-slate-800">Date</th>
              <th className="p-4 font-medium border-b border-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {leads.map((lead) => (
              <tr key={lead.id} className="group hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-slate-200">{lead.name}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone size={14} />
                    <span>{lead.phone}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500 text-sm">
                  {lead.date}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '').replace(/^08/, '628')}?text=${encodeURIComponent(`Halo ${lead.name}, saya dari tim LeadsFlow AI, ingin menindaklanjuti permintaan Anda...`)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>
                    <button 
                      onClick={() => onDelete(lead.id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {leads.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          No leads found. Click the + button to add one.
        </div>
      )}
    </div>
  );
}
