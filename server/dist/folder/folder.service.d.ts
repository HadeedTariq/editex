import { CreateFolderDto } from './dto/create-folder.dto';
import { Request } from 'express';
export declare class FolderService {
    createFolder(createFolderDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    createFile(createFileDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    getProjectFilesAndFolders(projectId: string): Promise<any[]>;
    saveCode(code: string, fileId: string): Promise<{
        message: string;
    }>;
}
