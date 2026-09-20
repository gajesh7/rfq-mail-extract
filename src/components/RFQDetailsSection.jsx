import React, { useState } from 'react';
import { FileText, Edit2, Check, X, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function RFQDetailsSection({ rfq, onUpdateRFQ }) {
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showAllFields, setShowAllFields] = useState(false);

  const primaryFields = [
    { key: 'rfq_number', label: 'RFQ Number', value: rfq.rfq_number },
    { key: 'pcb_part_number', label: 'PCB Part No.', value: rfq.pcb_part_number, isMono: true, isBold: true },
    { key: 'revision', label: 'Revision', value: rfq.revision, isMono: true },
    { key: 'quantity', label: 'Quantity', value: rfq.quantity, isBold: true },
    { key: 'delivery_date', label: 'Delivery', value: rfq.delivery_date },
    { key: 'material', label: 'Material', value: rfq.material },
    { key: 'board_thickness', label: 'Thickness', value: rfq.board_thickness },
    { key: 'surface_finish', label: 'Surface Finish', value: rfq.surface_finish }
  ];

  const secondaryFields = [
    { key: 'layer_count', label: 'Layer Count', value: rfq.layer_count },
    { key: 'board_dimensions', label: 'Board Size', value: rfq.board_dimensions },
    { key: 'copper_thickness', label: 'Copper Weight', value: rfq.copper_thickness },
    { key: 'solder_mask', label: 'Solder Mask', value: rfq.solder_mask },
    { key: 'technology', label: 'Technology', value: rfq.technology },
    { key: 'annual_volume', label: 'Annual Volume', value: rfq.annual_volume },
    { key: 'special_requirements', label: 'Special Specs', value: rfq.special_requirements }
  ];

  const fields = showAllFields ? [...primaryFields, ...secondaryFields] : primaryFields;

  const handleStartEdit = (key, value) => {
    setEditingField(key);
    setTempValue(value || '');
  };

  const handleSave = (key) => {
    onUpdateRFQ(key, tempValue);
    setEditingField(null);
  };

  return (
    <div className="bg-white border-b border-[#E5E5E5] p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#171717]">
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#171717]">RFQ DETAILS</h2>
        </div>

        <button
          onClick={() => setShowAllFields(!showAllFields)}
          className="text-[10px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
        >
          <span>{showAllFields ? 'Fewer Specs' : 'More Specs'}</span>
          {showAllFields ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      <div className="space-y-1.5 text-xs font-sans">
        {fields.map((field) => (
          <div key={field.key} className="flex items-center justify-between py-1 border-b border-[#F7F7F5] last:border-0">
            <span className="text-[#6B6B6B] w-24 shrink-0 text-[11px]">{field.label}</span>

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
                    <span className={`text-[11px] truncate ${field.isMono ? 'font-mono' : ''} ${field.isBold ? 'font-bold text-indigo-600' : 'text-[#171717]'}`}>
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

