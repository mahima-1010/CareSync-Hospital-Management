import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import RadiologyWorkspace from './RadiologyWorkspace';
import SafetyWorkspace from './SafetyWorkspace';
import CSSDWorkspace from './CSSDWorkspace';
import FeedbackWorkspace from './FeedbackWorkspace';
import PharmacyWorkspace from './PharmacyWorkspace';
import LaboratoryQualityWorkspace from './LaboratoryQualityWorkspace';
import FemaleWardWorkspace from './FemaleWardWorkspace';
import { 
  BookOpen, 
  Award, 
  Users, 
  Shield, 
  Activity, 
  Wrench, 
  Folder, 
  FileText, 
  Calendar, 
  Layers,
  Edit3, 
  Trash2, 
  Save, 
  Search, 
  Plus, 
  ChevronLeft, 
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  BookOpen,
  Award,
  Users,
  Shield,
  Activity,
  Wrench,
  Folder,
  FileText,
  Calendar,
  Layers
};

const Policies = () => {
  const { hospital, addDepartment, deleteDepartment, addPolicy, updatePolicy, deletePolicy } = useHospital();
  
  // Navigation States
  const [selectedDeptId, setSelectedDeptId] = useState(null); // Tracks active department folder
  const [isEditing, setIsEditing] = useState(false); // Rich Text Canvas toggle
  const [editingPolicy, setEditingPolicy] = useState(null); // Active document for editing

  // Special workspace routing — dedicated pages for specific departments
  const SPECIALIZED_DEPTS = ['radiology', 'cssd', 'safety', 'feedback', 'pharmacy', 'lab', 'female-ward'];
  
  // Search queries
  const [searchQuery, setSearchQuery] = useState('');

  // Department modal states
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [deptName, setDeptName] = useState('');
  const [deptIcon, setDeptIcon] = useState('Folder');
  const [deptError, setDeptError] = useState('');

  // Policy Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formStatus, setFormStatus] = useState('Draft');

  // Handle department creation
  const handleOpenDeptModal = () => {
    setDeptName('');
    setDeptIcon('Folder');
    setDeptError('');
    setIsDeptModalOpen(true);
  };

  const handleCreateDept = (e) => {
    e.preventDefault();
    if (!deptName.trim()) {
      setDeptError('Please enter a department name.');
      return;
    }
    addDepartment(deptName.trim(), deptIcon);
    setIsDeptModalOpen(false);
  };

  const handleDeleteDept = (id, name, e) => {
    e.stopPropagation(); // Avoid entering the folder
    if (window.confirm(`Are you sure you want to permanently delete the "${name}" folder and all its linked policy files?`)) {
      deleteDepartment(id);
    }
  };

  // Handle policy edit/creation
  const handleEditClick = (policy) => {
    setEditingPolicy(policy);
    setFormTitle(policy.title);
    setFormCode(policy.code);
    setFormContent(policy.content);
    setFormStatus(policy.status);
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    setEditingPolicy(null);
    setFormTitle('');
    setFormCode(`POL-${selectedDeptId.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
    setFormContent('');
    setFormStatus('Draft');
    setIsEditing(true);
  };

  const handleSavePolicy = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingPolicy) {
      updatePolicy(editingPolicy.id, formTitle, formCode, formContent, formStatus);
    } else {
      addPolicy(selectedDeptId, formTitle, formCode, formContent, formStatus);
    }
    setIsEditing(false);
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this policy document?")) {
      deletePolicy(id);
    }
  };

  // Current active department metadata
  const activeDept = (hospital.departments || []).find(d => d.id === selectedDeptId);

  // Filtered Lists
  const filteredDepartments = (hospital.departments || []).filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const folderPolicies = (hospital.policies || []).filter(p => p.deptId === selectedDeptId);
  const filteredPolicies = folderPolicies.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render specialized workspaces for dedicated departments
  if (selectedDeptId === 'radiology') {
    return <RadiologyWorkspace onBack={() => setSelectedDeptId(null)} />;
  }
  if (selectedDeptId === 'safety') {
    return <SafetyWorkspace onBack={() => setSelectedDeptId(null)} />;
  }
  if (selectedDeptId === 'cssd') {
    return <CSSDWorkspace onBack={() => setSelectedDeptId(null)} />;
  }
  if (selectedDeptId === 'feedback') {
    return <FeedbackWorkspace onBack={() => setSelectedDeptId(null)} />;
  }
  if (selectedDeptId === 'pharmacy') {
    return <PharmacyWorkspace onBack={() => setSelectedDeptId(null)} />;
  }
  if (selectedDeptId === 'lab') {
    return <LaboratoryQualityWorkspace onBack={() => setSelectedDeptId(null)} />;
  }
  if (selectedDeptId === 'female-ward') {
    return <FemaleWardWorkspace onBack={() => setSelectedDeptId(null)} />;
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header Breadcrumbs Bar */}
      <div className="flex items-center justify-between border-b border-slate-150 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span 
            onClick={() => { setSelectedDeptId(null); setIsEditing(false); setSearchQuery(''); }}
            className={`cursor-pointer hover:text-slate-800 ${!selectedDeptId ? 'text-slate-900 font-bold' : ''}`}
          >
            Policies Registry
          </span>
          
          {selectedDeptId && (
            <>
              <span className="text-slate-300">/</span>
              <span 
                onClick={() => { setIsEditing(false); }}
                className={`cursor-pointer hover:text-slate-800 ${!isEditing ? 'text-slate-900 font-bold' : ''}`}
              >
                {activeDept?.name}
              </span>
            </>
          )}

          {isEditing && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-slate-950 font-bold">
                {editingPolicy ? `Edit Policy (${editingPolicy.code})` : "New Document"}
              </span>
            </>
          )}
        </div>

        {/* Back navigation buttons */}
        {selectedDeptId && !isEditing && (
          <button
            onClick={() => { setSelectedDeptId(null); setSearchQuery(''); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-600 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Directory
          </button>
        )}
      </div>

      {/* SEARCH AND CONTROLS */}
      {!isEditing && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={selectedDeptId ? `Search policies inside ${activeDept?.name}...` : "Search clinical folders by name..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-slate-800 text-xs bg-white border border-slate-350 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            {selectedDeptId ? (
              <button
                onClick={handleCreateClick}
                style={{ backgroundColor: hospital.themeColor }}
                className="py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all btn-primary shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Create Policy Document
              </button>
            ) : (
              <button
                onClick={handleOpenDeptModal}
                style={{ backgroundColor: hospital.themeColor }}
                className="py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all btn-primary shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Department Card
              </button>
            )}
          </div>
        </div>
      )}

      {/* SCREEN 1: Dynamic Department folders grid list */}
      {!selectedDeptId && !isEditing && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredDepartments.map((dept) => {
            const FolderIcon = ICON_MAP[dept.iconName] || Folder;
            const policyCount = (hospital.policies || []).filter(p => p.deptId === dept.id).length;
            
            return (
              <div
                key={dept.id}
                onClick={() => { setSelectedDeptId(dept.id); setSearchQuery(''); }}
                className={`glass-panel p-4 rounded-xl bg-white border shadow-sm flex flex-col justify-between min-h-[120px] relative group cursor-pointer transition-all duration-150 ${
                  SPECIALIZED_DEPTS.includes(dept.id)
                    ? 'border-sky-100 hover:border-sky-300'
                    : 'border-slate-200 hover:border-slate-350'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div 
                      style={{ backgroundColor: `${hospital.themeColor}0d`, color: hospital.themeColor }}
                      className="p-2 rounded-lg border border-slate-100 shadow-inner"
                    >
                      <FolderIcon className="w-4 h-4" />
                    </div>

                    {/* Delete Option for Custom folders */}
                    {dept.isCustom && (
                      <button
                        onClick={(e) => handleDeleteDept(dept.id, dept.name, e)}
                        className="p-1 rounded bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                        title="Remove Folder"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight">
                    {dept.name}
                  </h3>
                </div>

                <div className="border-t border-slate-50 pt-2.5 mt-3.5 flex items-center justify-between text-[9px] font-bold text-slate-400 tracking-wider">
                  <span>{policyCount} Documents</span>
                  <ChevronRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" style={{ color: hospital.themeColor }} />
                </div>
              </div>
            );
          })}

          {/* Add custom department placeholder */}
          <div 
            onClick={handleOpenDeptModal}
            className="rounded-xl border border-dashed border-slate-200 hover:border-slate-350 bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center gap-2 p-4 min-h-[120px] cursor-pointer transition-all duration-150 group"
          >
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-slate-600 transition-all">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-center">
              <span className="block text-[10px] font-bold text-slate-700">Add Department Card</span>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: Drill-down Policies Listing inside selected department */}
      {selectedDeptId && !isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPolicies.map((policy) => (
            <div 
              key={policy.id} 
              className="glass-panel p-5 rounded-2xl flex flex-col justify-between gap-4 bg-white border border-slate-200 shadow-sm group hover:border-slate-300 transition-all duration-150"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-semibold">{policy.code}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${
                    policy.status === 'Published' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    {policy.status}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-850 group-hover:text-sky-600 transition-colors">
                  {policy.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                  {policy.content || "Empty document draft. Select Edit to draft policy protocols."}
                </p>
              </div>

              {/* Operations */}
              <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Revision Level</span>
                  <span className="text-xs font-bold text-slate-700 mt-0.5">Version {policy.version}.0</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEditClick(policy)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                    title="Edit Draft"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-all cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => alert(`Compiling controlled branded PDF:\nFolder: ${activeDept?.name}\nFile: ${policy.title}\nHospital: ${hospital.name}`)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-slate-500 hover:text-sky-600 transition-all cursor-pointer"
                    title="Export branded PDF"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPolicies.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 text-xs font-semibold bg-white border border-slate-200 rounded-xl shadow-sm">
              No clinical policy files found in this folder. Click "Create Policy Document" to write one!
            </div>
          )}
        </div>
      )}

      {/* SCREEN 3: Rich Text Editor Canvas */}
      {isEditing && (
        <div className="glass-panel p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-slate-500" />
                {editingPolicy ? `Edit Policy Document: ${editingPolicy.code}` : "Create Policy Record"}
              </h2>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">NABH Controlled Registry Canvas • {activeDept?.name}</p>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="text-xs text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all font-semibold cursor-pointer"
            >
              Cancel Edit
            </button>
          </div>

          <form onSubmit={handleSavePolicy} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Policy Official Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. ICU Hand Wash Cleanliness Standards"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-900 text-xs font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Document Code</label>
                <input
                  type="text"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-900 text-xs font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Document Content Editor</label>
              <div className="bg-slate-50 border border-slate-200 rounded-t-xl px-4 py-1.5 flex items-center gap-2 border-b-0">
                <span className="text-[9px] font-bold text-slate-400 mr-2 uppercase tracking-wider">Format Options:</span>
                <button type="button" className="w-6 h-6 rounded text-xs font-bold hover:bg-slate-200 text-slate-500 hover:text-slate-850 transition-all cursor-pointer">B</button>
                <button type="button" className="w-6 h-6 rounded text-xs italic font-serif hover:bg-slate-200 text-slate-500 hover:text-slate-850 transition-all cursor-pointer">I</button>
                <button type="button" className="w-6 h-6 rounded text-xs underline hover:bg-slate-200 text-slate-500 hover:text-slate-850 transition-all cursor-pointer">U</button>
                <div className="w-px h-4 bg-slate-200 mx-1" />
                <button type="button" className="px-1.5 h-6 rounded text-[10px] font-bold hover:bg-slate-200 text-slate-500 hover:text-slate-850 transition-all cursor-pointer">H1</button>
                <button type="button" className="px-1.5 h-6 rounded text-[10px] font-bold hover:bg-slate-200 text-slate-500 hover:text-slate-850 transition-all cursor-pointer">H2</button>
                <div className="w-px h-4 bg-slate-200 mx-1" />
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Headless editor active</span>
              </div>

              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Start drafting hospital policies, clinical procedures, or guidelines here..."
                rows={8}
                className="w-full px-4 py-4 rounded-b-xl glass-input text-slate-900 text-xs border-t-0 focus:border-t font-sans leading-relaxed custom-scroll"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Release Status:</span>
                <div className="flex rounded-lg bg-slate-50 border border-slate-200 p-0.5">
                  <button
                    type="button"
                    onClick={() => setFormStatus('Draft')}
                    className={`px-3 py-1 rounded text-[9px] font-bold transition-all cursor-pointer ${
                      formStatus === 'Draft' ? 'bg-amber-500/10 text-amber-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormStatus('Published')}
                    className={`px-3 py-1 rounded text-[9px] font-bold transition-all cursor-pointer ${
                      formStatus === 'Published' ? 'bg-emerald-500/10 text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Publish
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: hospital.themeColor }}
                className="py-2.5 px-6 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all btn-primary shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save & Update Policy Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL DIALOG: Create department folder */}
      {isDeptModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-lg p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Add Department Card
              </h3>
              <button 
                onClick={() => setIsDeptModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDept} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Department / Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Critical Care ICU"
                  value={deptName}
                  onChange={(e) => { setDeptName(e.target.value); setDeptError(''); }}
                  className="w-full px-3 py-2 rounded-xl glass-input text-slate-900 text-xs font-semibold"
                  required
                />
                {deptError && <p className="text-[10px] text-rose-500 mt-1.5 font-medium">{deptError}</p>}
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2">Folder Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Activity', label: 'Pulse' },
                    { name: 'Shield', label: 'Safety' },
                    { name: 'Users', label: 'Staff' },
                    { name: 'Layers', label: 'Wards' },
                    { name: 'FileText', label: 'Docs' },
                    { name: 'Award', label: 'Medal' },
                    { name: 'Folder', label: 'Folder' },
                    { name: 'BookOpen', label: 'SOPs' }
                  ].map((iconItem) => {
                    const TargetIcon = ICON_MAP[iconItem.name] || Folder;
                    const isSelected = deptIcon === iconItem.name;
                    return (
                      <button
                        key={iconItem.name}
                        type="button"
                        onClick={() => setDeptIcon(iconItem.name)}
                        className={`py-1.5 rounded-lg border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-50 border-sky-500 text-sky-950 font-bold' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-350'
                        }`}
                      >
                        <TargetIcon className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[7.5px] tracking-tight">{iconItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDeptModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-4 py-2 rounded-xl text-white font-bold text-xs hover:brightness-95 active:scale-[0.98] transition-all cursor-pointer shadow-sm btn-primary"
                >
                  Create Card
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Policies;
