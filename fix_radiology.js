const fs = require('fs');
const path = 'C:/Users/user/Desktop/hospital/frontend/src/pages/RadiologyWorkspace.jsx';

let content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Step 1: Fix the CAPA map - remove misplaced hooks and add return
// Lines 1578-1652 contain the bad code
const capaFixStart = 1577; // 0-indexed
const capaFixEnd = 1651;   // 0-indexed (inclusive)

const newCapaMapLines = [
  "                        return (",
  "                        <div key={item.id} onClick={() => setSelectedCapa(selectedCapa?.id === item.id ? null : item)}",
  "                          className={`bg-white rounded-xl p-3 shadow-sm border border-slate-200 cursor-pointer transition-all hover:shadow-md ${selectedCapa?.id === item.id ? 'ring-2 ring-sky-400' : ''}`}>",
  "                          <div className=\"flex items-center justify-between mb-1.5\">",
  "                            <span className=\"text-[8px] font-bold text-slate-400 font-mono\">{item.source}</span>",
  "                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${isOverdue ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>Due: {item.dueDate}</span>",
  "                          </div>",
  "                          <h4 className=\"text-[10px] font-bold text-slate-800 leading-snug mb-2\">{item.issue}</h4>",
  "                          <div className=\"flex items-center justify-between\">",
  "                            <span className=\"text-[8px] text-slate-500\">Owner: {item.responsible}</span>",
  "                            {item.status === 'Closed' ? (",
  "                              <CheckCircle className=\"w-3.5 h-3.5 text-emerald-600\" />",
  "                            ) : (",
  "                              <Clock className=\"w-3.5 h-3.5 text-slate-400\" />",
  "                            )}",
  "                          </div>",
  "                        </div>",
  "                      );})}"
];

lines.splice(capaFixStart, capaFixEnd - capaFixStart + 1, ...newCapaMapLines);

// Step 2: Remove duplicate block that starts after the capa JSX closes
// Find the second occurrence of "const [aerLicenses" 
const firstAerLicenses = lines.findIndex(l => l.includes('const [aerLicenses, setAerLicenses] = useState'));
const secondAerLicenses = lines.findIndex((l, i) => i > firstAerLicenses + 10 && l.includes('const [aerLicenses, setAerLicenses] = useState'));

if (secondAerLicenses > 0) {
  // Find where the duplicate ends - just before evidenceFiles or the second activeTab === 'statutory'
  let duplicateEnd = secondAerLicenses;
  for (let i = secondAerLicenses; i < lines.length; i++) {
    if (lines[i].includes('const [evidenceFiles, setEvidenceFiles] = useState')) {
      duplicateEnd = i - 1;
      break;
    }
  }
  
  // Find the end of the duplicate block (including the closing of the second statutory section)
  for (let i = duplicateEnd; i < lines.length; i++) {
    if (lines[i].includes(');') && lines[i].includes('</div>')) {
      duplicateEnd = i;
      break;
    }
  }
  
  // Remove the entire duplicate block
  lines.splice(secondAerLicenses, duplicateEnd - secondAerLicenses + 1);
}

// Step 3: Now find where to insert statutory JSX
// It should be after the capa block closes (line with "         )}" after selectedCapa details)
let capaBlockEndIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{activeTab === \'capa\'') && lines[i].includes(')')) {
    // Look for the closing of this block
    for (let j = i; j < Math.min(i + 200, lines.length); j++) {
      if (lines[j].trim() === ')}' && lines[j].includes('activeTab')) {
        capaBlockEndIdx = j;
        break;
      }
    }
    if (capaBlockEndIdx > 0) break;
  }
}

if (capaBlockEndIdx > 0) {
  const statutoryJSX = [
    "",
    "         {activeTab === 'statutory' && (",
    "           <div className=\"space-y-5\">",
    "             <div className=\"grid grid-cols-2 lg:grid-cols-4 gap-4\">",
    "               {[",
    "                 { label: 'AERB Valid', value: statutoryKpiData.validLicenses, color: 'text-emerald-600' },",
    "                 { label: 'AERB Expiring Soon', value: statutoryKpiData.expiringLicenses, color: 'text-amber-600' },",
    "                 { label: 'AERB Overdue', value: statutoryKpiData.overdueLicenses, color: 'text-rose-600' },",
    "                 { label: 'PCPNDT Compliant', value: `${statutoryKpiData.compliantPCPNDT}/${statutoryKpiData.totalPCPNDT}`, color: 'text-blue-600' }",
    "               ].map((kpi, idx) => (",
    "                 <div key={idx} className=\"bg-white border border-slate-200 rounded-2xl p-4 shadow-sm\">",
    "                   <div className=\"flex items-center justify-between\">",
    "                     <div>",
    "                       <p className=\"text-[9px] font-bold uppercase tracking-wider text-slate-400\">{kpi.label}</p>",
    "                       <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>",
    "                     </div>",
    "                     <div className=\"p-2 rounded-xl bg-slate-50 border border-slate-100\">",
    "                       <span className=\"text-lg\">{(idx === 0 ? '' : idx === 1 ? '' : idx === 2 ? '' : '')}</span>",
    "                     </div>",
    "                   </div>",
    "                 </div>",
    "               ))}",
    "             </div>",
    "",
    "             <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-5\">",
    "               <div className=\"bg-white border border-slate-200 rounded-2xl p-5 shadow-sm\">",
    "                 <div className=\"flex items-center justify-between mb-4\">",
    "                   <h3 className=\"text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3\">AERB License & Certificates</h3>",
    "                   <button style={{ backgroundColor: hospital.themeColor }} className=\"px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1\"><Plus className=\"w-3 h-3\" /> Add</button>",
    "                 </div>",
    "                 <div className=\"space-y-3\">",
    "                   {aerLicenses.map(lic => (",
    "                     <div key={lic.id} className=\"bg-slate-50 border border-slate-200 rounded-xl p-3\">",
    "                       <div className=\"flex items-center justify-between mb-1\">",
    "                         <h4 className=\"text-xs font-bold text-slate-800\">{lic.name}</h4>",
    "                         <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(lic.status)}`}>{lic.status}</span>",
    "                       </div>",
    "                       <p className=\"text-[9px] text-slate-500\">No: {lic.no}</p>",
    "                       <div className=\"flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60\">",
    "                         <div>",
    "                           <span className=\"text-[8px] font-bold text-slate-400\">ISSUED: </span>",
    "                           <span className=\"text-[9px] text-slate-600 font-medium\">{lic.issued}</span>",
    "                         </div>",
    "                         <div className=\"flex items-center gap-2\">",
    "                           <div>",
    "                             <span className=\"text-[8px] font-bold text-slate-400\">EXPIRY: </span>",
    "                             <span className={`text-[9px] font-bold ${lic.status === 'Overdue' ? 'text-rose-600' : lic.status === 'Expiring Soon' ? 'text-amber-600' : 'text-slate-700'}`}>{lic.expiry}</span>",
    "                           </div>",
    "                           {lic.status !== 'Valid' && (",
    "                             <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${lic.status === 'Overdue' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>",
    "                               {lic.status === 'Overdue' ? ' EXPIRED' : 'Expiring Soon'}",
    "                             </span>",
    "                           )}",
    "                         </div>",
    "                       </div>",
    "                       {lic.status !== 'Valid' && (",
    "                         <button onClick={() => setAerLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, status: 'Valid', expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } : l))} className=\"mt-2 w-full px-2 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-700 text-[8px] font-bold hover:bg-emerald-50 cursor-pointer transition-colors\">",
    "                            Mark Renewed",
    "                         </button>",
    "                       )}",
    "                     </div>",
    "                   ))}",
    "                 </div>",
    "               </div>",
    "",
    "               <div className=\"bg-white border border-slate-200 rounded-2xl p-5 shadow-sm\">",
    "                 <div className=\"flex items-center justify-between mb-4\">",
    "                   <h3 className=\"text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3\">PCPNDT Compliance</h3>",
    "                   <button style={{ backgroundColor: hospital.themeColor }} className=\"px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1\"><Plus className=\"w-3 h-3\" /> Add</button>",
    "                 </div>",
    "                 <div className=\"space-y-3\">",
    "                   {pcpndtRegs.map(pcp => (",
    "                     <div key={pcp.id} className=\"bg-slate-50 border border-slate-200 rounded-xl p-3\">",
    "                       <div className=\"flex items-center justify-between mb-1\">",
    "                         <h4 className=\"text-xs font-bold text-slate-800\">{pcp.center}</h4>",
    "                         <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(pcp.status)}`}>{pcp.status}</span>",
    "                       </div>",
    "                       <p className=\"text-[9px] text-slate-500\">Reg: {pcp.registration}</p>",
    "                       <div className=\"flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60\">",
    "                         <span className=\"text-[9px] text-slate-500\">Issued: {pcp.issued}</span>",
    "                         <span className={`text-[9px] font-bold ${pcp.status === 'Expiring Soon' ? 'text-amber-600' : 'text-slate-700'}`}>Expiry: {pcp.expiry}</span>",
    "                       </div>",
    "                     </div>",
    "                   ))}",
    "                 </div>",
    "               </div>",
    "             </div>",
    "",
    "             <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-5\">",
    "               <div className=\"bg-white border border-slate-200 rounded-2xl p-5 shadow-sm\">",
    "                 <div className=\"flex items-center justify-between mb-4\">",
    "                   <h3 className=\"text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3\">Vendor Agreements & Contracts</h3>",
    "                   <button style={{ backgroundColor: hospital.themeColor }} className=\"px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1\"><Plus className=\"w-3 h-3\" /> Add</button>",
    "                 </div>",
    "                 <div className=\"space-y-3\">",
    "                   {vendorAgreements.map(v => (",
    "                     <div key={v.id} className=\"bg-slate-50 border border-slate-200 rounded-xl p-3\">",
    "                       <div className=\"flex items-center justify-between mb-1\">",
    "                         <div className=\"flex items-center gap-2\">",
    "                           <h4 className=\"text-xs font-bold text-slate-800\">{v.type}</h4>",
    "                           <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(v.status)}`}>{v.status}</span>",
    "                         </div>",
    "                       </div>",
    "                       <p className=\"text-[9px] text-slate-500\">Vendor: {v.vendor}  Equipment: {v.equipment}</p>",
    "                       <div className=\"flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60\">",
    "                         <span className=\"text-[9px] text-slate-500\">From: {v.start}</span>",
    "                         <span className={`text-[9px] font-bold ${v.status === 'Expiring Soon' || v.status === 'Overdue' ? 'text-amber-600' : 'text-slate-700'}`}>Expires: {v.expiry}</span>",
    "                       </div>",
    "                     </div>",
    "                   ))}",
    "                 </div>",
    "               </div>",
    "",
    "               <div className=\"bg-white border border-slate-200 rounded-2xl p-5 shadow-sm\">",
    "                 <div className=\"flex items-center justify-between mb-4\">",
    "                   <h3 className=\"text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3\">Regulatory Documents</h3>",
    "                   <button style={{ backgroundColor: hospital.themeColor }} className=\"px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1\"><Upload className=\"w-3 h-3\" /> Upload</button>",
    "                 </div>",
    "                 <div className=\"grid grid-cols-1 sm:grid-cols-2 gap-3\">",
    "                   {regDocuments.map(doc => (",
    "                     <div key={doc.id} className=\"bg-slate-50 border border-slate-200 rounded-xl p-3\">",
    "                       <div className=\"flex items-start gap-2\">",
    "                         <div className=\"p-1.5 rounded-lg bg-white border border-slate-100 shrink-0\"><FileText className=\"w-3.5 h-3.5 text-slate-500\" /></div>",
    "                         <div className=\"min-w-0\">",
    "                           <h4 className=\"text-[10px] font-bold text-slate-800 leading-snug\">{doc.name}</h4>",
    "                           <p className=\"text-[8px] text-slate-400 font-mono mt-0.5\">{doc.no}</p>",
    "                           <div className=\"flex items-center justify-between mt-2\">",
    "                             <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(doc.status)}`}>{doc.status}</span>",
    "                             <span className=\"text-[8px] text-slate-400\">Exp: {doc.expiry}</span>",
    "                           </div>",
    "                         </div>",
    "                       </div>",
    "                     </div>",
    "                   ))}",
    "                 </div>",
    "               </div>",
    "             </div>",
    "",
    "             {[",
    "               ...aerLicenses.filter(l => l.status !== 'Valid').map(l => ({ kind: 'AERB', title: l.name, date: l.expiry, status: l.status })),",
    "               ...pcpndtRegs.filter(p => p.status !== 'Valid').map(p => ({ kind: 'PCPNDT', title: p.center, date: p.expiry, status: p.status })),",
    "               ...vendorAgreements.filter(v => v.status !== 'Valid').map(v => ({ kind: 'Vendor', title: `${v.type} - ${v.equipment}`, date: v.expiry, status: v.status }))",
    "             ].filter(Boolean).length > 0 && (",
    "               <div className=\"bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-sm\">",
    "                 <div className=\"flex items-center gap-2 mb-3\">",
    "                   <AlertTriangle className=\"w-4 h-4 text-rose-600\" />",
    "                   <h3 className=\"text-xs font-extrabold text-rose-800\">Compliance Alerts</h3>",
    "                 </div>",
    "                 <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3\">",
    "                   {[",
    "                     ...aerLicenses.filter(l => l.status !== 'Valid').map(l => ({ kind: 'AERB', title: l.name, date: l.expiry, status: l.status })),",
    "                     ...pcpndtRegs.filter(p => p.status !== 'Valid').map(p => ({ kind: 'PCPNDT', title: p.center, date: p.expiry, status: p.status })),",
    "                     ...vendorAgreements.filter(v => v.status !== 'Valid').map(v => ({ kind: 'Vendor', title: `${v.type} - ${v.equipment}`, date: v.expiry, status: v.status }))",
    "                   ].map((alert, i) => (",
    "                     <div key={i} className=\"bg-white border border-rose-100 rounded-xl p-3\">",
    "                       <div className=\"flex items-center justify-between mb-1\">",
    "                         <span className=\"text-[8px] font-black uppercase tracking-wider text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded\">{alert.kind}</span>",
    "                         <span className={`px-2 py-1 rounded-full text-[7px] font-bold ${alert.status === 'Overdue' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{alert.status}</span>",
    "                       </div>",
    "                       <p className=\"text-[10px] font-bold text-slate-800\">{alert.title}</p>",
    "                       <p className=\"text-[9px] text-slate-500 mt-1\">Due: {alert.date}</p>",
    "                     </div>",
    "                   ))}",
    "                 </div>",
    "               </div>",
    "             )}",
    "           </div>",
    "         )}"
  ];
  
  lines.splice(capaBlockEndIdx + 1, 0, ...statutoryJSX);
}

// Write back
fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed RadiologyWorkspace.jsx');

// Verify the fix
const newContent = fs.readFileSync(path, 'utf8');
const newLines = newContent.split('\n');
console.log('Total lines:', newLines.length);

// Check for remaining issues
const hasHookInJSX = newLines.some((l, i) => {
  const prevLines = newLines.slice(Math.max(0, i-5), i).join('\n');
  const inJSX = prevLines.includes('return (') && !prevLines.includes('});\n        )}');
  return inJSX && l.includes('useState(') && l.includes('const [');
});
console.log('Has hook in JSX:', hasHookInJSX);
