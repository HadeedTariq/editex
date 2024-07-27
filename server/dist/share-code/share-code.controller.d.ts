import { ShareCodeService } from './share-code.service';
import { Request } from 'express';
export declare class ShareCodeController {
    private readonly shareCodeService;
    constructor(shareCodeService: ShareCodeService);
    getAllUsers(req: Request): Promise<any[]>;
    setProjectContributors(req: Request, { allowUserIds, projectId }: {
        allowUserIds: string[];
        projectId: string;
    }): Promise<{
        message: string;
    }>;
    getMyNotifications(req: Request): Promise<any[]>;
    readNotification({ notificationId }: {
        notificationId: string;
    }, req: Request): Promise<{
        message: string;
    }>;
}
