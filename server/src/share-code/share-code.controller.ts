import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ShareCodeService } from './share-code.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('share-code')
export class ShareCodeController {
  constructor(private readonly shareCodeService: ShareCodeService) {}
  @UseGuards(AuthGuard)
  @Get('getAllUsers')
  getAllUsers(@Req() req: Request) {
    return this.shareCodeService.getAllUsers(req);
  }

  @UseGuards(AuthGuard)
  @Put('setContributors')
  setProjectContributors(
    @Req() req: Request,
    @Body()
    { allowUserIds, projectId }: { allowUserIds: string[]; projectId: string },
  ) {
    return this.shareCodeService.setProjectContributors(
      req,
      allowUserIds,
      projectId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('getMyNotifications')
  getMyNotifications(@Req() req: Request) {
    return this.shareCodeService.getMyNotifications(req);
  }

  @UseGuards(AuthGuard)
  @Put('readNotification')
  readNotification(
    @Body() { notificationId }: { notificationId: string },
    @Req() req: Request,
  ) {
    return this.shareCodeService.readNotification(notificationId, req);
  }
}
