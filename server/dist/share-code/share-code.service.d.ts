import { Request } from 'express';
export declare class ShareCodeService {
    getAllUsers(req: Request): Promise<any[]>;
    setProjectContributors(req: Request, allowUserIds: string[], projectId: string): Promise<{
        message: string;
    }>;
    getMyNotifications(req: Request): Promise<any[]>;
    readNotification(notificationId: string, req: Request): Promise<{
        message: string;
    }>;
}
