import { CreateFolderDto } from './dto/create-folder.dto';
import { Request } from 'express';
export declare class FolderService {
    createFolder(createFolderDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    createFile(createFileDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    getProjectFilesAndFolders(projectId: string, req: Request): Promise<{
        hierarchy: any[];
        projectName: string;
        projectId: unknown;
    }>;
    saveCode(code: string, fileId: string): Promise<{
        message: string;
    }>;
}
