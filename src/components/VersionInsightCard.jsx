import React from 'react';
import { Sparkles, Info, CheckCircle2 } from 'lucide-react';

export default function VersionInsightCard({ ai }) {
  if (!ai) return null;

  return (
    <div className="bg-indigo-50/70 border-b border-indigo-100 p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-indigo-950 font-bold text-[11px] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>VERSION INSIGHT</span>
        </div>
        <span className="text-[9px] bg-indigo-100 text-indigo-800 font-semibold px-1.5 py-0.2 rounded font-mono">
          AI Suggestion
        </span>
      </div>

      <div className="space-y-1 text-xs">
        <div className="font-semibold text-indigo-950 text-[11px] flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>{ai.version_recommendation}</span>
        </div>

        <p className="text-[11px] text-indigo-900/80 leading-relaxed font-sans bg-white/70 p-2 rounded border border-indigo-100/80">
          <strong className="text-indigo-950">Reason:</strong> {ai.version_reason}
        </p>
      </div>

      <div className="text-[9px] text-indigo-800/70 italic">
        * AI suggests latest files based on email context. Human approval required before sending.
      </div>
    </div>
  );
}

