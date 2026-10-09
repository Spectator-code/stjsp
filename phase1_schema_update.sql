-- ==========================================
-- PHASE 1 ALIGNMENT: SCHEMA UPDATES
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vehicle_name TEXT NOT NULL,
    vehicle_type TEXT NOT NULL, -- e.g., 'Motorcycle', 'Light Vehicle'
    plate_number TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Maintenance', 'Retired')),
    availability TEXT NOT NULL DEFAULT 'Available' CHECK (availability IN ('Available', 'In Use', 'Unavailable')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Staff can manage vehicles" ON public.vehicles FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin', 'dispatcher', 'fleet'))
);

-- 2. Create Training Progress Table
CREATE TABLE IF NOT EXISTS public.training_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    instructor_name TEXT NOT NULL, -- using name since instructors are staff accounts
    schedule_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
    training_date TIMESTAMP WITH TIME ZONE NOT NULL,
    skills_covered TEXT,
    remarks TEXT,
    progress_status TEXT NOT NULL DEFAULT 'Incomplete' CHECK (progress_status IN ('Incomplete', 'Satisfactory', 'Needs Improvement', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.training_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own progress" ON public.training_progress FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Staff can manage progress" ON public.training_progress FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin', 'instructor', 'dispatcher'))
);

-- 3. Align Payments Table with Research Manuscript
-- Adding reference_number and student_id
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS reference_number TEXT;

-- Update existing payments to backfill student_id based on enrollment_id
UPDATE public.payments p
SET student_id = e.student_id
FROM public.enrollments e
WHERE p.enrollment_id = e.id AND p.student_id IS NULL;

-- 4. Align Courses Table Terminology with Research Manuscript
-- Update names of default courses to match "Theoretical Driving Course", etc.
UPDATE public.courses SET name = 'Theoretical Driving Course (TDC)' WHERE id = 'TDC';
UPDATE public.courses SET name = 'Practical Driving Course (PDC) - Light Vehicle MT' WHERE id = 'PDC-Car-MT';
UPDATE public.courses SET name = 'Practical Driving Course (PDC) - Light Vehicle AT' WHERE id = 'PDC-Car-AT';
UPDATE public.courses SET name = 'Practical Driving Course (PDC) - Motorcycle' WHERE id = 'PDC-MC';
UPDATE public.courses SET name = 'Comprehensive Driver''s Education (CDE)' WHERE id = 'CDE';

-- Insert CDE if it doesn't exist
INSERT INTO public.courses (id, name, price, required_hours)
SELECT 'CDE', 'Comprehensive Driver''s Education (CDE)', 1000.00, 5
WHERE NOT EXISTS (SELECT 1 FROM public.courses WHERE id = 'CDE');
