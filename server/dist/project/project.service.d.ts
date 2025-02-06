import { CreateProjectDto, MergeRequestDto } from './dto/create-project.dto';
import { Request } from 'express';
import mongoose from 'mongoose';
export declare class ProjectService {
    create(createProjectDto: CreateProjectDto, req: Request): Promise<{
        message: string;
    }>;
    getMyProjects(req: Request): Promise<(mongoose.Document<unknown, {}, import("./schemas/project.model").ProjectDocument> & import("./schemas/project.model").ProjectDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProjectById(id: string, req: Request): Promise<mongoose.Document<unknown, {}, import("./schemas/project.model").ProjectDocument> & import("./schemas/project.model").ProjectDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteMyProject(id: string, req: Request): Promise<{
        message: string;
    }>;
    editProject(id: string, req: Request): Promise<{
        message: string;
    }>;
    getAllPublicProjects(): Promise<any[]>;
    checkUserInContributors(req: Request, projectId: string): Promise<{
        message: string;
    }>;
    mergeRequest(mergeRequest: MergeRequestDto, req: Request): Promise<{
        message: string;
    }>;
    getMyProjectsNotifications(req: Request): Promise<any[]>;
}
