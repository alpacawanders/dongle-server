import { Module } from '@nestjs/common';
import { ClubModule } from './club/club.module';
import { NoticeModule } from './notice/notice.module';
import { ReportModule } from './report/report.module';
import { BannerModule } from './banner/banner.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ClubModule,
        NoticeModule,
        ReportModule,
        BannerModule,
        UserModule,
        CategoryModule,
        AuthModule,
    ],
})
export class V1Module {}
