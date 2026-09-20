export const INITIAL_RFQ_DATA = {
  customer: {
    company: "ABC Electronics Pvt. Ltd.",
    contact_name: "Rahul Sharma",
    email: "rahul@abcelectronics.com",
    phone: "+91 98765 43210"
  },
  rfq: {
    rfq_number: "RFQ-1024",
    pcb_part_number: "PCB-102",
    description: "Controller Board with USB-C",
    revision: "Rev 04",
    quantity: "500 pcs",
    delivery_date: "15 Oct 2026",
    layer_count: "4 Layer",
    board_dimensions: "120.0 x 85.0 mm",
    board_thickness: "1.6 mm",
    material: "FR-4",
    copper_thickness: "2 oz",
    surface_finish: "ENIG",
    solder_mask: "Green",
    technology: "High Speed / Impedance Control",
    annual_volume: "5,000 pcs/year",
    special_requirements: "50Ω single / 100Ω diff impedance control on USB-C lines."
  },
  files: [
    { id: "g1", filename: "Gerber_Rev01.zip", category: "GERBER", type: "Gerber Package", version: "Rev 01", date: "2026-09-10", selected: false, status: "available" },
    { id: "g2", filename: "Gerber_Rev02.zip", category: "GERBER", type: "Gerber Package", version: "Rev 02", date: "2026-09-12", selected: false, status: "available" },
    { id: "g3", filename: "Gerber_Rev03.zip", category: "GERBER", type: "Gerber Package", version: "Rev 03", date: "2026-09-15", selected: false, status: "available" },
    { id: "g4", filename: "Gerber_Rev04.zip", category: "GERBER", type: "Gerber Package", version: "Rev 04", date: "2026-09-20", selected: true, status: "final" },
    
    { id: "b1", filename: "BOM_Rev03.xlsx", category: "BOM", type: "BOM Spreadsheet", version: "Rev 03", date: "2026-09-15", selected: false, status: "available" },
    { id: "b2", filename: "BOM_Rev04.xlsx", category: "BOM", type: "BOM Spreadsheet", version: "Rev 04", date: "2026-09-20", selected: true, status: "final" },
    
    { id: "d1", filename: "PCB_Drawing_Rev04.pdf", category: "DRAWING", type: "Fabrication Drawing", version: "Rev 04", date: "2026-09-20", selected: true, status: "final" },
    
    { id: "p1", filename: "PickPlace_Rev03.csv", category: "PICK & PLACE", type: "Centroid File", version: "Rev 03", date: "2026-09-15", selected: true, status: "selected" }
  ],
  ai: {
    confidence: 0.96,
    extraction_notes: "High confidence match across email body and file revision tags.",
    version_recommendation: "Rev04 appears to be the latest requested version.",
    version_reason: "Client explicitly asked in email body: 'Please ignore the previous Gerber/BOM files and use Rev04 attached here.'"
  },
  validation: {
    warnings: [],
    missing_fields: [],
    ready_to_send: true
  }
};

