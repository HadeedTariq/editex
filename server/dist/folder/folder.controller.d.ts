import { FolderService } from './folder.service';
import { CreateFileDto, CreateFolderDto, SaveCodeDto } from './dto/create-folder.dto';
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
    saveCode(saveCode: SaveCodeDto, req: Request): Promise<{
        message: string;
    }>;
    executeCode({ code }: {
        code: string;
    }): Promise<any>;
    getProjectFilesAndFolders(id: string, req: Request): Promise<{
        hierarchy: any[];
        projectName: string;
        projectId: unknown;
    }>;
}
