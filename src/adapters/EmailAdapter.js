import { INITIAL_RFQ_DATA } from '../models/RFQDataModel';

/**
 * Platform Agnostic Email Adapter Interface
 */
export class BaseEmailAdapter {
  detectPlatform() {
    const host = window.location.hostname;
    if (host.includes('mail.google.com')) return 'gmail';
    if (host.includes('outlook') || host.includes('office')) return 'outlook';
    if (host.includes('zoho')) return 'zoho';
    return 'simulated';
  }

  getOpenedEmailContent() {
    return {
      subject: "RFQ – PCB-102 – Rev 04 – 500 pcs",
      sender: "Rahul Sharma <rahul@abcelectronics.com>",
      body: "Hi Team, Please find attached Rev04 files for PCB-102 (500 pcs). Please ignore previous Rev03 files. Delivery required by 15 Oct 2026. Thanks, Rahul",
      attachments: [
        "Gerber_Rev01.zip", "Gerber_Rev02.zip", "Gerber_Rev03.zip", "Gerber_Rev04.zip",
        "BOM_Rev03.xlsx", "BOM_Rev04.xlsx", "PCB_Drawing_Rev04.pdf", "PickPlace_Rev03.csv"
      ]
    };
  }
}

export function parseOpenedEmail(platform = 'simulated') {
  // Returns normalized canonical RFQ object
  return { ...INITIAL_RFQ_DATA };
}
