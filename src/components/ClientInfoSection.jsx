import React, { useState } from 'react';
import { User, Edit2, Check, X, AlertCircle } from 'lucide-react';

export default function ClientInfoSection({ client, onUpdateClient }) {
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const fields = [
    { key: 'company', label: 'Company', value: client.company },
    { key: 'contact_name', label: 'Contact', value: client.contact_name },
    { key: 'email', label: 'Email', value: client.email },
    { key: 'phone', label: 'Phone', value: client.phone }
  ];

  const handleStartEdit = (key, value) => {
    setEditingField(key);
    setTempValue(value || '');
  };

  const handleSave = (key) => {
    onUpdateClient(key, tempValue);
    setEditingField(null);
  };

  return (
    <div className="bg-white border-b border-[#E5E5E5] p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#171717]">
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#171717]">CLIENT INFORMATION</h2>
        </div>
        <span className="text-[9px] text-[#6B6B6B] font-mono">Editable</span>
      </div>

      <div className="space-y-1.5 text-xs font-sans">
        {fields.map((field) => (
          <div key={field.key} className="flex items-center justify-between py-1 border-b border-[#F7F7F5] last:border-0">
            <span className="text-[#6B6B6B] w-20 shrink-0 text-[11px]">{field.label}</span>

            <div className="flex-1 min-w-0 flex items-center justify-end gap-1.5">
              {editingField === field.key ? (
                <div className="flex items-center gap-1 w-full">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="flex-1 px-2 py-0.5 border border-indigo-500 rounded bg-white text-xs text-[#171717] focus:outline-none font-mono"
                    autoFocus
                  />
                  <button 
                    onClick={() => handleSave(field.key)}
                    className="p-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setEditingField(null)}
                    className="p-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  {field.value ? (
                    <span className="font-semibold text-[#171717] truncate font-mono text-[11px]">
                      {field.value}
                    </span>
                  ) : (
                    <span className="text-amber-600 italic text-[11px] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Not found</span>
                    </span>
                  )}
                  <button 
                    onClick={() => handleStartEdit(field.key, field.value)}
                    className="text-[#6B6B6B] hover:text-indigo-600 p-0.5 rounded transition-colors"
                    title="Edit field"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

