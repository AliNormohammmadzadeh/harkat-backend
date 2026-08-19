import { Response } from 'express';
import { ProgramsService } from './programs.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterDto } from '../common/dto/student-filter.dto';
import { CreateProgramDto, CreateProgramFromFilterDto, SetProgramMembersDto, UpdateProgramDto } from './dto/programs.dto';
export declare class ProgramsController {
    private programsService;
    constructor(programsService: ProgramsService);
    findAll(search?: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        cost: number;
        ids: string[];
        createdAt: string | null;
        memberCount: number;
    }[]>;
    createFromFilter(query: StudentFilterDto, dto: CreateProgramFromFilterDto, user: AuthUser): Promise<{
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
    create(dto: CreateProgramDto, user: AuthUser): Promise<{
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
    export(id: string, res: Response): Promise<void>;
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
    update(id: string, dto: UpdateProgramDto, user: AuthUser): Promise<{
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
    remove(id: string, user: AuthUser): Promise<{
        ok: boolean;
    }>;
    setMembers(id: string, body: SetProgramMembersDto, user: AuthUser): Promise<{
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
    toggleAttendance(id: string, studentId: string, user: AuthUser): Promise<{
        programId: string;
        studentId: string;
        isPresent: boolean;
    }>;
}
