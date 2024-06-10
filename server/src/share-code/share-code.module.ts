import { Module } from '@nestjs/common';
import { ShareCodeService } from './share-code.service';
import { ShareCodeController } from './share-code.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ShareCodeController],
  providers: [ShareCodeService],
})
export class ShareCodeModule {}
