-- Add super_admin to UserRole enum (run if DB already migrated)
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'super_admin' BEFORE 'manager';
