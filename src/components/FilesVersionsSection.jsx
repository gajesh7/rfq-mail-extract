import React from 'react';
import { Layers, FileText, CheckCircle2, AlertTriangle, Check, Circle } from 'lucide-react';

export default function FilesVersionsSection({ files, onSelectFileVersion }) {
  // Group files by category
  const categories = ['GERBER', 'BOM', 'DRAWING', 'PICK & PLACE'];

  const getFilesByCategory = (category) => {
    return files.filter(f => f.category === category);
  };

  return (
    <div className="bg-white border-b border-[#E5E5E5] p-3.5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#171717]">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#171717]">FILES & VERSIONS</h2>
        </div>
        <span className="text-[9px] text-[#6B6B6B] font-mono">Select 1 Final per category</span>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => {
          const categoryFiles = getFilesByCategory(cat);
          if (categoryFiles.length === 0) return null;

          return (
            <div key={cat} className="space-y-1.5">
              <div className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-wider flex items-center justify-between border-b border-[#E5E5E5] pb-1">
                <span>{cat}</span>
                <span className="text-[9px] font-mono font-normal text-[#6B6B6B]">{categoryFiles.length} version(s)</span>
              </div>

              <div className="space-y-1">
                {categoryFiles.map((file) => {
                  const isSelected = file.selected;
                  return (
                    <div
                      key={file.id}
                      onClick={() => onSelectFileVersion(cat, file.id)}
                      className={`p-2 rounded border text-xs cursor-pointer transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-50/60 border-indigo-200 text-[#171717]'
                          : 'bg-white hover:bg-[#F7F7F5] border-[#E5E5E5] text-[#6B6B6B]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="shrink-0">
                          {isSelected ? (
                            <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px]">
                              ✓
                            </div>
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300" />
                          )}
                        </div>

                        <span className={`font-mono text-[11px] truncate ${isSelected ? 'font-bold text-[#171717]' : 'text-[#6B6B6B]'}`}>
                          {file.filename}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-indigo-600 text-white shadow-2xs shrink-0">
                          FINAL
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
