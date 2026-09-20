import React, { useState } from 'react';
import { Copy, Send, Check, ArrowRight, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StickyBottomBar({ rfqData, onCopyRFQ, onSendToTool }) {
  const [copied, setCopied] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [createdRFQId, setCreatedRFQId] = useState('');

  const selectedFiles = rfqData.files.filter(f => f.selected);

  const handleCopy = () => {
    onCopyRFQ();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setCreatedRFQId(rfqData.rfq.rfq_number || 'RFQ-1024');
    }, 1000);
  };

  return (
    <>
      {/* Sticky Action Footer */}
      <div className="sticky bottom-0 bg-white border-t border-[#E5E5E5] p-3 shadow-panel z-20 space-y-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold text-emerald-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>✓ RFQ ready</span>
          </span>
          <span className="text-[#6B6B6B] font-mono">{selectedFiles.length} files selected</span>
        </div>

        {sendSuccess ? (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>✓ RFQ Created Successfully</span>
            </div>
            <div className="text-[11px] font-mono text-indigo-700 font-bold">
              ID: {createdRFQId}
            </div>
            <button
              onClick={() => window.open('http://localhost:3000', '_blank')}
              className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded transition-colors"
            >
              Open RFQ in Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {/* Copy RFQ Button */}
            <button
              onClick={handleCopy}
              className={`py-2 px-2.5 rounded text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                copied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white hover:bg-[#F7F7F5] border-[#E5E5E5] text-[#171717]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>✓ Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B6B6B]" />
                  <span>Copy RFQ</span>
                </>
              )}
            </button>

            {/* Send to Tool Button */}
            <button
              onClick={() => setShowConfirmModal(true)}
              className="py-2 px-2.5 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center justify-center gap-1"
            >
              <span>Send to Tool</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal (Requirement #11) */}
      {showConfirmModal && !sendSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3">
          <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#E5E5E5] flex items-center justify-between">
              <span className="font-bold text-[#171717] uppercase tracking-wider text-[11px]">Ready to Create RFQ</span>
              <button onClick={() => setShowConfirmModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 font-sans">
              <div className="space-y-1.5 border-b border-[#F7F7F5] pb-2">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Customer:</span>
                  <span className="font-bold text-[#171717]">{rfqData.customer.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">RFQ Part:</span>
                  <span className="font-mono font-bold text-indigo-600">{rfqData.rfq.pcb_part_number} / {rfqData.rfq.revision}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Selected Files:</span>
                  <span className="font-mono font-semibold text-[#171717]">{selectedFiles.length} files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Warnings:</span>
                  <span className="text-emerald-600 font-medium">None</span>
                </div>
              </div>

              <p className="text-[11px] text-[#6B6B6B]">
                This will dispatch the RFQ payload directly to your manufacturing dashboard and Genesis CAM.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-3 py-1.5 border border-[#E5E5E5] rounded text-xs font-medium text-[#6B6B6B] hover:bg-[#F7F7F5]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSend}
                  disabled={isSending}
                  className="px-4 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5"
                >
                  {isSending ? 'Sending...' : 'Send to Tool →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

