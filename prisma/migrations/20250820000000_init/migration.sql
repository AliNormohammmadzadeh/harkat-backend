-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('super_admin', 'manager', 'facilitator', 'supporter');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "initials" TEXT,
    "role" "UserRole" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "case_number" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "full_name" TEXT,
    "gender" TEXT,
    "nat_id" TEXT,
    "is_foreign" BOOLEAN NOT NULL DEFAULT false,
    "foreign_id" TEXT,
    "phone" TEXT,
    "student_status" TEXT,
    "student_status_reason" TEXT,
    "grade" TEXT,
    "grade_level" TEXT,
    "major" TEXT,
    "school" TEXT,
    "school_type" TEXT,
    "overall_avg" DECIMAL(4,2),
    "economic_status" SMALLINT,
    "decile" SMALLINT,
    "father_edu" SMALLINT,
    "mother_edu" SMALLINT,
    "parent_involvement" SMALLINT,
    "digital_access" SMALLINT,
    "facilitator_id" UUID,
    "supporter_id" UUID,
    "registered_by" TEXT,
    "mental_health_note" TEXT,
    "evaluator_suggestion" TEXT,
    "interest_in_elite_school" TEXT,
    "needs_supplementary_books" TEXT,
    "is_custom" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profiles" (
    "student_id" TEXT NOT NULL,
    "photo_url" TEXT,
    "birth_y" SMALLINT,
    "birth_m" SMALLINT,
    "birth_d" SMALLINT,
    "enroll_y" SMALLINT,
    "enroll_m" SMALLINT,
    "enroll_d" SMALLINT,
    "father_phone" TEXT,
    "mother_phone" TEXT,
    "landline" TEXT,
    "district" TEXT,
    "address" TEXT,
    "intro_method" TEXT,
    "referrer" TEXT,
    "referrer_note" TEXT,
    "father_name" TEXT,
    "father_job" TEXT,
    "mother_name" TEXT,
    "mother_job" TEXT,
    "family_size" SMALLINT,
    "household_head" TEXT,
    "consent_y" SMALLINT,
    "consent_m" SMALLINT,
    "consent_d" SMALLINT,
    "consent_status" TEXT,
    "father_income" DECIMAL(65,30),
    "mother_income" DECIMAL(65,30),
    "deprived_area" TEXT,
    "housing_type" TEXT,
    "housing_area" DECIMAL(65,30),
    "housing_condition" SMALLINT,
    "housing_deposit" DECIMAL(65,30),
    "housing_rent" DECIMAL(65,30),
    "family_leisure" SMALLINT,
    "education_view" SMALLINT,
    "external_aid_other" TEXT,
    "dep_analysis" TEXT,
    "dep_recommend" TEXT,
    "school_distance_km" DECIMAL(65,30),
    "interest_level" SMALLINT,
    "preferred_major" TEXT,
    "needs_supplementary_books_field" TEXT,
    "interest_in_elite_school_field" TEXT,
    "barriers_other" TEXT,
    "soft_note" TEXT,
    "financial_code" TEXT,
    "iban_number" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "household_members" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "name" TEXT,
    "relation" TEXT,
    "age" TEXT,
    "note" TEXT,

    CONSTRAINT "household_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_health_records" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "name" TEXT,
    "health_type" TEXT,
    "description" TEXT,
    "cost" TEXT,

    CONSTRAINT "family_health_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_family_circumstances" (
    "student_id" TEXT NOT NULL,
    "circumstance_key" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "student_family_circumstances_pkey" PRIMARY KEY ("student_id","circumstance_key")
);

-- CreateTable
CREATE TABLE "student_mpi_flags" (
    "student_id" TEXT NOT NULL,
    "dep_index" SMALLINT NOT NULL,
    "is_deprived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "student_mpi_flags_pkey" PRIMARY KEY ("student_id","dep_index")
);

-- CreateTable
CREATE TABLE "student_tag_selections" (
    "student_id" TEXT NOT NULL,
    "tag_group" TEXT NOT NULL,
    "tag_value" TEXT NOT NULL,

    CONSTRAINT "student_tag_selections_pkey" PRIMARY KEY ("student_id","tag_group","tag_value")
);

-- CreateTable
CREATE TABLE "report_cards" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "term" TEXT,
    "year" TEXT,
    "sort_order" INTEGER,

    CONSTRAINT "report_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_card_grades" (
    "id" UUID NOT NULL,
    "report_card_id" UUID NOT NULL,
    "subject" TEXT,
    "score" DECIMAL(65,30),
    "weight" DECIMAL(65,30) NOT NULL DEFAULT 1,

    CONSTRAINT "report_card_grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soft_skill_assessments" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "assessed_y" SMALLINT,
    "assessed_m" SMALLINT,
    "assessed_d" SMALLINT,
    "note" TEXT,

    CONSTRAINT "soft_skill_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soft_skill_scores" (
    "assessment_id" UUID NOT NULL,
    "skill_key" TEXT NOT NULL,
    "score" DECIMAL(65,30),

    CONSTRAINT "soft_skill_scores_pkey" PRIMARY KEY ("assessment_id","skill_key")
);

-- CreateTable
CREATE TABLE "finance_entries" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "program_id" TEXT,
    "entry_date" TEXT,
    "category" TEXT,
    "amount" DECIMAL(65,30),
    "description" TEXT,

    CONSTRAINT "finance_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "service_date" TEXT,
    "service_type" TEXT,
    "description" TEXT,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "ref_date" TEXT,
    "organization" TEXT,
    "status" TEXT,
    "description" TEXT,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholarships" (
    "id" UUID NOT NULL,
    "student_id" TEXT NOT NULL,
    "source" TEXT,
    "amount" TEXT,
    "period" TEXT,
    "description" TEXT,

    CONSTRAINT "scholarships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "total_cost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "created_at_jalali" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_members" (
    "program_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "program_members_pkey" PRIMARY KEY ("program_id","student_id")
);

-- CreateTable
CREATE TABLE "program_attendance" (
    "program_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "is_present" BOOLEAN NOT NULL DEFAULT false,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_attendance_pkey" PRIMARY KEY ("program_id","student_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "students_case_number_key" ON "students"("case_number");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_facilitator_id_fkey" FOREIGN KEY ("facilitator_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_supporter_id_fkey" FOREIGN KEY ("supporter_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "household_members" ADD CONSTRAINT "household_members_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_health_records" ADD CONSTRAINT "family_health_records_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_family_circumstances" ADD CONSTRAINT "student_family_circumstances_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_mpi_flags" ADD CONSTRAINT "student_mpi_flags_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_tag_selections" ADD CONSTRAINT "student_tag_selections_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_cards" ADD CONSTRAINT "report_cards_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_card_grades" ADD CONSTRAINT "report_card_grades_report_card_id_fkey" FOREIGN KEY ("report_card_id") REFERENCES "report_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soft_skill_assessments" ADD CONSTRAINT "soft_skill_assessments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soft_skill_scores" ADD CONSTRAINT "soft_skill_scores_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "soft_skill_assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_entries" ADD CONSTRAINT "finance_entries_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_entries" ADD CONSTRAINT "finance_entries_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholarships" ADD CONSTRAINT "scholarships_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_members" ADD CONSTRAINT "program_members_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_members" ADD CONSTRAINT "program_members_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_attendance" ADD CONSTRAINT "program_attendance_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_attendance" ADD CONSTRAINT "program_attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

