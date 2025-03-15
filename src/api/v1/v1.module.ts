import { Module } from '@nestjs/common';
import { ClubModule } from './club/club.module';
import { NoticeModule } from './notice/notice.module';
import { ReportModule } from './report/report.module';
import { BannerModule } from './banner/banner.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [ClubModule, NoticeModule, ReportModule, BannerModule, UserModule],
})
export class V1Module {}
