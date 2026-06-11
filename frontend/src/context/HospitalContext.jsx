import React, { createContext, useContext, useState, useEffect } from 'react';

const HospitalContext = createContext();

const defaultModules = [
  { id: 'policies', label: 'Policies', desc: 'SOPs, clinical guidelines, and documentation audits.', iconName: 'BookOpen', to: '/policies', isCustom: false },
  { id: 'committee', label: 'Committee MOM', desc: 'Minutes of meetings, agenda items, and action registers.', iconName: 'Award', to: '/policies', isCustom: false },
  { id: 'hr', label: 'HR Records', desc: 'Credential files, training matrices, and staffing plans.', iconName: 'Users', to: '/policies', isCustom: false },
  { id: 'licenses', label: 'Licenses Registry', desc: 'NOC documents, state registrations, and renewal logs.', iconName: 'Shield', to: '/policies', isCustom: false },
  { id: 'permissions', label: 'Clinical Permissions', desc: 'Audit clearance levels and department sign-off controls.', iconName: 'Activity', to: '/policies', isCustom: false }
];

const predefinedDepartments = [
  { id: 'radiology', name: 'Radiology', iconName: 'Activity', isCustom: false },
  { id: 'safety', name: 'Safety', iconName: 'Shield', isCustom: false },
  { id: 'cssd', name: 'CSSD', iconName: 'Award', isCustom: false },
  { id: 'feedback', name: 'Feedback & Complaints', iconName: 'Users', isCustom: false },
  { id: 'pharmacy', name: 'Pharmacy', iconName: 'Activity', isCustom: false },
  { id: 'lab', name: 'Laboratory', iconName: 'Activity', isCustom: false },
  { id: 'female-ward', name: 'Female Ward', iconName: 'Layers', isCustom: false },
  { id: 'ot', name: 'Operation Theatre', iconName: 'Activity', isCustom: false },
  { id: 'male-ward', name: 'Male Ward', iconName: 'Layers', isCustom: false },
  { id: 'fire-risk', name: 'Fire Risk Management', iconName: 'Shield', isCustom: false },
  { id: 'cath-lab', name: 'Cath Lab', iconName: 'Activity', isCustom: false },
  { id: 'nursing', name: 'Nursing Operations', iconName: 'Users', isCustom: false },
  { id: 'endoscopy', name: 'Endoscopy', iconName: 'Activity', isCustom: false },
  { id: 'micu', name: 'MICU', iconName: 'Activity', isCustom: false },
  { id: 'admission', name: 'Admission & Discharge', iconName: 'FileText', isCustom: false },
  { id: 'sicu', name: 'SICU', iconName: 'Activity', isCustom: false },
  { id: 'delux', name: 'Delux Ward', iconName: 'Layers', isCustom: false },
  { id: 'emergency', name: 'Emergency', iconName: 'Activity', isCustom: false },
  { id: 'manpower', name: 'Manpower / HR Protocols', iconName: 'Users', isCustom: false }
];

const API_BASE = 'http://localhost:5000/api';

export const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState({
    name: "Apex Cardio Hospital",
    logoUrl: "", 
    hpnId: "HPN-77192-DEL",
    establishmentNum: "REG-2026-MED",
    themeColor: "#0284c7",
    departments: predefinedDepartments,
    policies: [],
    modules: defaultModules
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [policyRes, hospRes] = await Promise.all([
          fetch(`${API_BASE}/policies`).then(r => r.json()),
          fetch(`${API_BASE}/hospitals`).then(r => r.json())
        ]);
        
        const hospitalData = hospRes[0] || {};
        setHospital(prev => ({
          ...prev,
          name: hospitalData.name || prev.name,
          hpnId: hospitalData.hpn_id || prev.hpnId,
          establishmentNum: hospitalData.establishment_num || prev.establishmentNum,
          themeColor: hospitalData.theme_color || prev.themeColor,
          policies: policyRes.map(p => ({
            id: p.policy_id,
            deptId: p.department_id,
            title: p.title,
            code: p.code,
            content: p.content,
            version: p.version,
            status: p.status,
            author: p.author
          }))
        }));
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addDepartment = async (name, iconName) => {
    const res = await fetch(`${API_BASE}/departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, iconName })
    });
    const newDept = await res.json();
    setHospital(prev => ({
      ...prev,
      departments: [...prev.departments, { id: newDept.department_id, name: newDept.name, iconName: newDept.icon_name, isCustom: true }]
    }));
  };

  const deleteDepartment = async (id) => {
    if (!predefinedDepartments.some(d => d.id === id)) {
      await fetch(`${API_BASE}/departments/${id}`, { method: 'DELETE' });
      setHospital(prev => ({
        ...prev,
        departments: prev.departments.filter(d => d.id !== id),
        policies: prev.policies.filter(p => p.deptId !== id)
      }));
    }
  };

  const addPolicy = async (deptId, title, code, content, status) => {
    const res = await fetch(`${API_BASE}/policies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ departmentId: deptId, title, code, content, status })
    });
    const newPolicy = await res.json();
    setHospital(prev => ({
      ...prev,
      policies: [...prev.policies, {
        id: newPolicy.policy_id,
        deptId: newPolicy.department_id,
        title: newPolicy.title,
        code: newPolicy.code,
        content: newPolicy.content,
        version: newPolicy.version,
        status: newPolicy.status,
        author: newPolicy.author
      }]
    }));
  };

  const updatePolicy = async (id, title, code, content, status) => {
    const res = await fetch(`${API_BASE}/policies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, code, content, status })
    });
    const updated = await res.json();
    setHospital(prev => ({
      ...prev,
      policies: prev.policies.map(p => p.id === id ? { ...p, title: updated.title, code: updated.code, content: updated.content, status: updated.status, version: updated.version } : p)
    }));
  };

  const deletePolicy = async (id) => {
    await fetch(`${API_BASE}/policies/${id}`, { method: 'DELETE' });
    setHospital(prev => ({ ...prev, policies: prev.policies.filter(p => p.id !== id) }));
  };

  const updateHospital = (data) => {
    setHospital(prev => ({ ...prev, ...data }));
  };

  const addModule = (name, desc, iconName) => {
    const newModule = { id: `custom-${Date.now()}`, label: name, desc: desc || 'Custom clinical workspace module.', iconName: iconName || 'Folder', to: '/policies', isCustom: true };
    setHospital(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const deleteModule = (id) => {
    setHospital(prev => ({ ...prev, modules: prev.modules.filter(m => m.id !== id) }));
  };

  return (
    <HospitalContext.Provider value={{ 
      hospital, 
      loading,
      updateHospital, 
      addModule, 
      deleteModule, 
      addDepartment, 
      deleteDepartment,
      addPolicy,
      updatePolicy,
      deletePolicy 
    }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) throw new Error('useHospital must be used within a HospitalProvider');
  return context;
};