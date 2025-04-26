import { Module } from '@nestjs/common';
import { ClubModule } from './club/club.module';
import { NoticeModule } from './notice/notice.module';
import { ReportModule } from './report/report.module';
import { BannerModule } from './banner/banner.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthGuard } from './auth/guard/auth.guard';
import { RBACGuard } from './auth/guard/rbac.guard';

@Module({
    imports: [
        ClubModule,
        NoticeModule,
        ReportModule,
        BannerModule,
        UserModule,
        CategoryModule,
    ],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
        {
            provide: 'APP_GUARD',
            useClass: RBACGuard,
        },
    ],
})
export class V1Module {}
