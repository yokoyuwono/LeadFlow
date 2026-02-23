import { Bell, Search, UserCircle, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 md:hidden">
        <button onClick={onMenuClick} className="text-slate-400 hover:text-slate-100">
          <Menu size={24} />
        </button>
        <span className="text-xl font-bold text-emerald-400">LeadsFlow</span>
      </div>

      <div className="hidden md:flex items-center bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700 w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search leads..." 
          className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-200 placeholder-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-200">Admin User</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400">
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
