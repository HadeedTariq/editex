import { FolderService } from './folder.service';
import { CreateFileDto, CreateFolderDto } from './dto/create-folder.dto';
import { Request } from 'express';
export declare class FolderController {
    private readonly folderService;
    constructor(folderService: FolderService);
    createFolder(createFolderDto: CreateFolderDto, req: Request): Promise<{
        message: string;
    }>;
    createFile(createFile: CreateFileDto, req: Request): Promise<{
        message: string;
    }>;
    saveCode({ code, fileId }: {
        code: string;
        fileId: string;
    }): Promise<{
        message: string;
    }>;
    getProjectFilesAndFolders(id: string): Promise<any[]>;
}
