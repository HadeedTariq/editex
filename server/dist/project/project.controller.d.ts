import { ProjectService } from './project.service';
import { CreateProjectDto, MergeRequestDto } from './dto/create-project.dto';
import { Request } from 'express';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(createProjectDto: CreateProjectDto, req: Request): Promise<{
        message: string;
    }>;
    mergeRequest(mergeRequestDto: MergeRequestDto, req: Request): Promise<{
        message: string;
    }>;
    checkUserInContributors(req: Request, { projectId }: {
        projectId: string;
    }): Promise<{
        message: string;
    }>;
    getMyProjects(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/project.model").ProjectDocument> & import("./schemas/project.model").ProjectDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getMyProjectsNotifications(req: Request): Promise<any[]>;
    deleteMyProject(req: Request, id: string): Promise<{
        message: string;
    }>;
    getAllPublicProjects(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/project.model").ProjectDocument> & import("./schemas/project.model").ProjectDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProjectById(id: string, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./schemas/project.model").ProjectDocument> & import("./schemas/project.model").ProjectDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    editProject(id: string, req: Request): Promise<{
        message: string;
    }>;
}
