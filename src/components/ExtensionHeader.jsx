import React from 'react';
import { Sparkles, Settings, X, Check, Mail, ChevronDown } from 'lucide-react';

export default function ExtensionHeader({ 
  subject = "RFQ – PCB-102 – Rev 04 – 500 pcs", 
  platform = "gmail", 
  onPlatformChange,
  onResetDemo
}) {
  return (
    <header className="bg-[#171717] text-white px-3.5 py-3 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Row: Brand, Title, Utility Icons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-xs">
            R
          </div>
          <div>
            <span className="font-bold text-xs tracking-tight block leading-none text-white">RFQ Bridge</span>
            <span className="text-[9px] text-slate-400 font-mono">Review Email</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={onResetDemo}
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
            title="Settings & Reset Demo Data"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button 
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
            title="Close Side Panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Second Row: Status Indicator */}
      <div className="mt-2.5 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>✓ Email captured</span>
        </div>

        {/* Platform Selector Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
          <span className="text-[9px] text-slate-400 font-mono">Mail:</span>
          <select 
            value={platform} 
            onChange={(e) => onPlatformChange(e.target.value)}
            className="bg-transparent text-[10px] font-medium text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="gmail" className="bg-slate-900 text-white">Gmail</option>
            <option value="outlook" className="bg-slate-900 text-white">Outlook</option>
            <option value="zoho" className="bg-slate-900 text-white">Zoho Mail</option>
            <option value="simulated" className="bg-slate-900 text-white">Simulated API</option>
          </select>
        </div>
      </div>

      {/* Third Row: Captured Email Subject Box */}
      <div className="mt-2.5 bg-slate-800/80 border border-slate-700/80 rounded px-2.5 py-1.5 flex items-center gap-2">
        <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span className="text-[11px] font-mono font-medium text-slate-200 truncate">
          {subject}
        </span>
      </div>
    </header>
  );
}

