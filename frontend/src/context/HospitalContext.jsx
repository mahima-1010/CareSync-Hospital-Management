import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const HospitalContext = createContext();

const API_BASE = 'http://localhost:5000/api';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const defaultModules = [
  { id: 'policies', label: 'Policies', desc: 'SOPs, clinical guidelines, and documentation audits.', iconName: 'BookOpen', to: '/policies', isCustom: false },
  { id: 'committee', label: 'Committee MOM', desc: 'Minutes of meetings, agenda items, and action registers.', iconName: 'Award', to: '/committee-mom', isCustom: false },
  { id: 'hr', label: 'HR Records', desc: 'Credential files, training matrices, and staffing plans.', iconName: 'Users', to: '/hr-records', isCustom: false },
  { id: 'licenses', label: 'Licenses Registry', desc: 'NOC documents, state registrations, and renewal logs.', iconName: 'Shield', to: '/licenses-registry', isCustom: false },
  { id: 'permissions', label: 'Medical Records', desc: 'Audit clearance levels and department sign-off controls.', iconName: 'Activity', to: '/policies', isCustom: false }
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [policyRes, hospRes] = await Promise.all([
          axios.get(`${API_BASE}/policies`),
          axios.get(`${API_BASE}/hospitals`)
        ]);
        
        const hospitalData = hospRes.data[0] || {};
        setHospital(prev => ({
          ...prev,
          name: hospitalData.name || prev.name,
          hpnId: hospitalData.hpn_id || prev.hpnId,
          establishmentNum: hospitalData.establishment_num || prev.establishmentNum,
          themeColor: hospitalData.theme_color || prev.themeColor,
          policies: policyRes.data.map(p => ({
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
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addDepartment = async (name, iconName) => {
    try {
      const res = await axios.post(`${API_BASE}/departments`, { name, iconName });
      setHospital(prev => ({
        ...prev,
        departments: [...prev.departments, { id: res.data.department_id, name: res.data.name, iconName: res.data.icon_name, isCustom: true }]
      }));
    } catch (err) {
      console.error('Failed to add department:', err);
      setError('Failed to add department');
    }
  };

  const deleteDepartment = async (id) => {
    if (!predefinedDepartments.some(d => d.id === id)) {
      try {
        await axios.delete(`${API_BASE}/departments/${id}`);
        setHospital(prev => ({
          ...prev,
          departments: prev.departments.filter(d => d.id !== id),
          policies: prev.policies.filter(p => p.deptId !== id)
        }));
      } catch (err) {
        console.error('Failed to delete department:', err);
        setError('Failed to delete department');
      }
    }
  };

  const addPolicy = async (deptId, title, code, content, status) => {
    try {
      const res = await axios.post(`${API_BASE}/policies`, { departmentId: deptId, title, code, content, status });
      setHospital(prev => ({
        ...prev,
        policies: [...prev.policies, {
          id: res.data.policy_id,
          deptId: res.data.department_id,
          title: res.data.title,
          code: res.data.code,
          content: res.data.content,
          version: res.data.version,
          status: res.data.status,
          author: res.data.author
        }]
      }));
    } catch (err) {
      console.error('Failed to add policy:', err);
      setError('Failed to add policy');
    }
  };

  const updatePolicy = async (id, title, code, content, status) => {
    try {
      const res = await axios.put(`${API_BASE}/policies/${id}`, { title, code, content, status });
      setHospital(prev => ({
        ...prev,
        policies: prev.policies.map(p => p.id === id ? { ...p, title: res.data.title, code: res.data.code, content: res.data.content, status: res.data.status, version: res.data.version } : p)
      }));
    } catch (err) {
      console.error('Failed to update policy:', err);
      setError('Failed to update policy');
    }
  };

  const deletePolicy = async (id) => {
    try {
      await axios.delete(`${API_BASE}/policies/${id}`);
      setHospital(prev => ({ ...prev, policies: prev.policies.filter(p => p.id !== id) }));
    } catch (err) {
      console.error('Failed to delete policy:', err);
      setError('Failed to delete policy');
    }
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
      error,
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