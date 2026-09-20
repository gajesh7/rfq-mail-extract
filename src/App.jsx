import React, { useState } from 'react';
import ExtensionHeader from './components/ExtensionHeader';
import ClientInfoSection from './components/ClientInfoSection';
import RFQDetailsSection from './components/RFQDetailsSection';
import VersionInsightCard from './components/VersionInsightCard';
import FilesVersionsSection from './components/FilesVersionsSection';
import ValidationWarnings from './components/ValidationWarnings';
import StickyBottomBar from './components/StickyBottomBar';
import { INITIAL_RFQ_DATA } from './models/RFQDataModel';
import { Mail, AlertCircle, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [rfqData, setRfqData] = useState(INITIAL_RFQ_DATA);
  const [platform, setPlatform] = useState('gmail');
  const [demoState, setDemoState] = useState('normal'); // 'normal' | 'empty' | 'no_attachments' | 'loading'
  const [toastMessage, setToastMessage] = useState(null);

  // Show temporary toast message
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Inline Client Field Updater
  const handleUpdateClient = (key, value) => {
    setRfqData(prev => ({
      ...prev,
      customer: { ...prev.customer, [key]: value }
    }));
    showToast(`Updated ${key}`);
  };

  // Inline RFQ Details Updater
  const handleUpdateRFQ = (key, value) => {
    setRfqData(prev => ({
      ...prev,
      rfq: { ...prev.rfq, [key]: value }
    }));
    showToast(`Updated ${key}`);
  };

  // File Version Selection (Only 1 FINAL per category)
  const handleSelectFileVersion = (category, fileId) => {
    setRfqData(prev => {
      const updatedFiles = prev.files.map(f => {
        if (f.category === category) {
          return {
            ...f,
            selected: f.id === fileId,
            status: f.id === fileId ? 'final' : 'available'
          };
        }
        return f;
      });

      return {
        ...prev,
        files: updatedFiles
      };
    });
  };

  // Copy RFQ Markdown Summary to Clipboard
  const handleCopyRFQ = () => {
    const selectedFiles = rfqData.files.filter(f => f.selected);
    const summaryText = 
      `RFQ Number: ${rfqData.rfq.rfq_number}\n` +
      `Customer: ${rfqData.customer.company}\n` +
      `Contact: ${rfqData.customer.contact_name}\n` +
      `Email: ${rfqData.customer.email}\n` +
      `PCB Part: ${rfqData.rfq.pcb_part_number}\n` +
      `Revision: ${rfqData.rfq.revision}\n` +
      `Quantity: ${rfqData.rfq.quantity}\n` +
      `Delivery: ${rfqData.rfq.delivery_date}\n` +
      `Material: ${rfqData.rfq.material}\n` +
      `Thickness: ${rfqData.rfq.board_thickness}\n` +
      `Finish: ${rfqData.rfq.surface_finish}\n` +
      `Files:\n` +
      selectedFiles.map(f => `  - ${f.filename} (${f.version})`).join('\n');

    navigator.clipboard.writeText(summaryText);
    showToast("RFQ copied to clipboard");
  };

  const handleResetDemo = () => {
    setRfqData(INITIAL_RFQ_DATA);
    setDemoState('normal');
    showToast("Demo data reset");
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] font-sans antialiased flex flex-col justify-between relative max-w-[420px] mx-auto border-x border-[#E5E5E5] shadow-lg">
      
      {/* Extension Header */}
      <div>
        <ExtensionHeader
          subject={rfqData.rfq.description ? `${rfqData.rfq.pcb_part_number} – ${rfqData.rfq.revision} – ${rfqData.rfq.quantity}` : "RFQ Email Opened"}
          platform={platform}
          onPlatformChange={setPlatform}
          onResetDemo={handleResetDemo}
        />

        {/* Demo State Switcher Bar */}
        <div className="bg-[#F7F7F5] border-b border-[#E5E5E5] px-3 py-1 flex items-center justify-between text-[10px] font-mono text-[#6B6B6B]">
          <span>State:</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setDemoState('normal')} 
              className={`px-1.5 py-0.2 rounded ${demoState === 'normal' ? 'bg-[#171717] text-white' : 'hover:bg-slate-200'}`}
            >
              Normal
            </button>
            <button 
              onClick={() => setDemoState('empty')} 
              className={`px-1.5 py-0.2 rounded ${demoState === 'empty' ? 'bg-[#171717] text-white' : 'hover:bg-slate-200'}`}
            >
              No Email
            </button>
            <button 
              onClick={() => setDemoState('no_attachments')} 
              className={`px-1.5 py-0.2 rounded ${demoState === 'no_attachments' ? 'bg-[#171717] text-white' : 'hover:bg-slate-200'}`}
            >
              No Attach
            </button>
          </div>
        </div>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="bg-[#171717] text-white text-xs px-3 py-2 text-center font-medium shadow-md animate-in fade-in slide-in-from-top-2 duration-150 sticky top-12 z-40">
            {toastMessage}
          </div>
        )}

        {/* STATE 1: NO EMAIL DETECTED */}
        {demoState === 'empty' && (
          <div className="p-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-[#171717]">No email detected</h3>
            <p className="text-[11px] text-[#6B6B6B] max-w-xs mx-auto">
              Please open a customer RFQ email in Gmail, Outlook, or Zoho Mail to capture details.
            </p>
            <button 
              onClick={() => setDemoState('normal')}
              className="mt-2 px-3 py-1.5 bg-[#4F46E5] text-white text-xs font-semibold rounded"
            >
              Simulate Opened RFQ Email
            </button>
          </div>
        )}

        {/* STATE 2: NORMAL OR NO ATTACHMENTS STATE */}
        {demoState !== 'empty' && (
          <div>
            {/* Section 1: Client Information */}
            <ClientInfoSection 
              client={rfqData.customer}
              onUpdateClient={handleUpdateClient}
            />

            {/* Section 2: RFQ Details */}
            <RFQDetailsSection 
              rfq={rfqData.rfq}
              onUpdateRFQ={handleUpdateRFQ}
            />

            {/* Section 3: AI Version Insights Card */}
            <VersionInsightCard 
              ai={rfqData.ai}
            />

            {/* Section 4: Files & Versions */}
            {demoState === 'no_attachments' ? (
              <div className="p-4 bg-amber-50/60 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>No attachments found in this email. RFQ text parameters extracted.</span>
              </div>
            ) : (
              <FilesVersionsSection 
                files={rfqData.files}
                onSelectFileVersion={handleSelectFileVersion}
              />
            )}

            {/* Section 5: Validation Warnings */}
            <ValidationWarnings 
              files={demoState === 'no_attachments' ? [] : rfqData.files}
              rfq={rfqData.rfq}
            />
          </div>
        )}
      </div>

      {/* Section 6: Sticky Bottom Action Bar */}
      {demoState !== 'empty' && (
        <StickyBottomBar 
          rfqData={rfqData}
          onCopyRFQ={handleCopyRFQ}
          onSendToTool={() => showToast("Sending payload...")}
        />
      )}

    </div>
  );
}

