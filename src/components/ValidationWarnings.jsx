import React from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function ValidationWarnings({ files, rfq }) {
  const selectedCount = files.filter(f => f.selected).length;
  const hasGerber = files.some(f => f.category === 'GERBER' && f.selected);
  const hasBOM = files.some(f => f.category === 'BOM' && f.selected);

  const warnings = [];
  if (!hasGerber) warnings.push("Final Gerber version not selected");
  if (!hasBOM) warnings.push("BOM version not selected");
  if (!rfq.quantity) warnings.push("Quantity not specified");

  return (
    <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] p-3 space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold text-[#171717] flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{selectedCount} files selected for RFQ</span>
        </span>
        <span className="text-[10px] text-[#6B6B6B] font-mono">Traceability Preserved</span>
      </div>

      {warnings.length > 0 && (
        <div className="space-y-1">
          {warnings.map((warn, index) => (
            <div key={index} className="p-1.5 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
              <span>⚠ {warn}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

