import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { StudentsService } from '../students/students.service';
import { StudentFilterQuery } from '../students/student-query.util';
export declare class ProgramsService {
    private prisma;
    private studentsService;
    constructor(prisma: PrismaService, studentsService: StudentsService);
    findAll(search?: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        createdAt: string | null;
        memberCount: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        members: {
            id: string;
            fullName: string | null;
            caseNumber: string | null;
            grade: string | null;
        }[];
        attendance: Record<string, boolean>;
        createdAt: string | null;
    }>;
    create(dto: {
        name: string;
        description?: string;
        cost?: number;
        ids?: string[];
        createdAt?: string;
    }, user: AuthUser): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        members: {
            id: string;
            fullName: string | null;
            caseNumber: string | null;
            grade: string | null;
        }[];
        attendance: Record<string, boolean>;
        createdAt: string | null;
    }>;
    update(id: string, dto: {
        name?: string;
        description?: string;
        cost?: number;
        ids?: string[];
    }, user: AuthUser): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        members: {
            id: string;
            fullName: string | null;
            caseNumber: string | null;
            grade: string | null;
        }[];
        attendance: Record<string, boolean>;
        createdAt: string | null;
    }>;
    delete(id: string, user: AuthUser): Promise<{
        ok: boolean;
    }>;
    getMembers(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        members: {
            id: string;
            fullName: string | null;
            caseNumber: string | null;
            grade: string | null;
        }[];
        attendance: Record<string, boolean>;
        createdAt: string | null;
    }>;
    setMembers(id: string, ids: string[], user: AuthUser): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        members: {
            id: string;
            fullName: string | null;
            caseNumber: string | null;
            grade: string | null;
        }[];
        attendance: Record<string, boolean>;
        createdAt: string | null;
    }>;
    toggleAttendance(programId: string, studentId: string, user: AuthUser): Promise<{
        programId: string;
        studentId: string;
        isPresent: boolean;
    }>;
    createFromFilter(query: StudentFilterQuery, dto: {
        name: string;
        description?: string;
        cost?: number;
    }, user: AuthUser): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        members: {
            id: string;
            fullName: string | null;
            caseNumber: string | null;
            grade: string | null;
        }[];
        attendance: Record<string, boolean>;
        createdAt: string | null;
    }>;
    exportMembers(id: string): Promise<{
        id: string;
        fullName: string | null;
        caseNumber: string | null;
        grade: string | null;
    }[]>;
    private removeProgramFinanceEntries;
    private applyProgramFinance;
}
