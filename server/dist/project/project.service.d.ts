/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { CreateProjectDto, MergeRequestDto } from './dto/create-project.dto';
import { Request } from 'express';
import mongoose from 'mongoose';
export declare class ProjectService {
    create(createProjectDto: CreateProjectDto, req: Request): Promise<{
        message: string;
    }>;
    getMyProjects(req: Request): Promise<(mongoose.Document<unknown, {}, import("./schemas/project.model").ProjectDocument> & import("./schemas/project.model").ProjectDocument & Required<{
        _id: unknown;
    }>)[]>;
    getProjectById(id: string, req: Request): Promise<mongoose.Document<unknown, {}, import("./schemas/project.model").ProjectDocument> & import("./schemas/project.model").ProjectDocument & Required<{
        _id: unknown;
    }>>;
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
