-- CareSync Database Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS policies CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS hospitals CASCADE;

-- Hospitals table
CREATE TABLE hospitals (
    hospital_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    hpn_id VARCHAR(100),
    establishment_num VARCHAR(100),
    logo_url TEXT,
    theme_color VARCHAR(7) DEFAULT '#0284c7',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table - use VARCHAR for department_id to support predefined string IDs
CREATE TABLE departments (
    department_id VARCHAR(100) PRIMARY KEY,
    hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50) DEFAULT 'Folder',
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Policies table
CREATE TABLE policies (
    policy_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
    department_id VARCHAR(100) NOT NULL REFERENCES departments(department_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL,
    content TEXT,
    version INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published')),
    author VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_policies_hospital_id ON policies(hospital_id);
CREATE INDEX IF NOT EXISTS idx_policies_department_id ON policies(department_id);
CREATE INDEX IF NOT EXISTS idx_departments_hospital_id ON departments(hospital_id);

-- Insert default hospital
INSERT INTO hospitals (hospital_id, name, hpn_id, establishment_num, theme_color)
VALUES ('00000000-0000-0000-0000-000000000001', 'Apex Cardio Hospital', 'HPN-77192-DEL', 'REG-2026-MED', '#0284c7');

-- Insert default departments with predefined string IDs (matching frontend SPECIALIZED_DEPTS)
INSERT INTO departments (department_id, hospital_id, name, icon_name, is_custom)
VALUES 
    ('radiology', '00000000-0000-0000-0000-000000000001', 'Radiology', 'Activity', FALSE),
    ('safety', '00000000-0000-0000-0000-000000000001', 'Safety', 'Shield', FALSE),
    ('cssd', '00000000-0000-0000-0000-000000000001', 'CSSD', 'Award', FALSE),
    ('feedback', '00000000-0000-0000-0000-000000000001', 'Feedback & Complaints', 'Users', FALSE),
    ('pharmacy', '00000000-0000-0000-0000-000000000001', 'Pharmacy', 'Activity', FALSE),
    ('lab', '00000000-0000-0000-0000-000000000001', 'Laboratory', 'Activity', FALSE),
    ('female-ward', '00000000-0000-0000-0000-000000000001', 'Female Ward', 'Layers', FALSE),
    ('ot', '00000000-0000-0000-0000-000000000001', 'Operation Theatre', 'Activity', FALSE),
    ('male-ward', '00000000-0000-0000-0000-000000000001', 'Male Ward', 'Layers', FALSE),
    ('fire-risk', '00000000-0000-0000-0000-000000000001', 'Fire Risk Management', 'Shield', FALSE),
    ('cath-lab', '00000000-0000-0000-0000-000000000001', 'Cath Lab', 'Activity', FALSE),
    ('nursing', '00000000-0000-0000-0000-000000000001', 'Nursing Operations', 'Users', FALSE),
    ('endoscopy', '00000000-0000-0000-0000-000000000001', 'Endoscopy', 'Activity', FALSE),
    ('micu', '00000000-0000-0000-0000-000000000001', 'MICU', 'Activity', FALSE),
    ('admission', '00000000-0000-0000-0000-000000000001', 'Admission & Discharge', 'FileText', FALSE),
    ('sicu', '00000000-0000-0000-0000-000000000001', 'SICU', 'Activity', FALSE),
    ('delux', '00000000-0000-0000-0000-000000000001', 'Delux Ward', 'Layers', FALSE),
    ('emergency', '00000000-0000-0000-0000-000000000001', 'Emergency', 'Activity', FALSE),
    ('manpower', '00000000-0000-0000-0000-000000000001', 'Manpower / HR Protocols', 'Users', FALSE)
ON CONFLICT (department_id) DO NOTHING;

-- Insert default policies
INSERT INTO policies (policy_id, hospital_id, department_id, title, code, content, version, status, author)
VALUES 
    ('00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001', 'radiology', 'X-Ray Radiation Safety Guidelines', 'POL-RAD-001', 'This policy outlines standard safety measures during radiography procedures to minimize radiation exposure to staff and patients.', 1, 'Published', 'Dr. A. Verma'),
    ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'radiology', 'MRI Access & Safety Protocols', 'POL-RAD-002', 'Detailed access procedures for magnetic resonance imaging suites, specifying guidelines for screening patients with metallic implants.', 2, 'Published', 'Dr. A. Verma'),
    ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'safety', 'Patient Safety Identification Standards', 'POL-SF-001', 'Mandatory patient barcode wristbands verification protocols to avoid medical errors during active treatments.', 1, 'Published', 'Dr. A. Verma')
ON CONFLICT (policy_id) DO NOTHING;