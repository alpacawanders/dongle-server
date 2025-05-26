import { Module } from '@nestjs/common';
import { ClubModule } from './club/club.module';
import { NoticeModule } from './notice/notice.module';
import { ReportModule } from './report/report.module';
import { BannerModule } from './banner/banner.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthGuard } from './auth/guard/auth.guard';
import { RBACGuard } from './auth/guard/rbac.guard';
import { ResponseTimeInterceptor } from './common/interceptor/response-time.interceptor';
import { ForbiddenExceptionFilter } from './common/filter/forbidden.filter';
import { QueryFailedExceptionFilter } from './common/filter/query-failed.filter';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        ClubModule,
        NoticeModule,
        ReportModule,
        BannerModule,
        UserModule,
        CategoryModule,
        CommonModule,
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
        {
            provide: 'APP_INTERCEPTOR',
            useClass: ResponseTimeInterceptor,
        },
        {
            provide: 'APP_FILTER',
            useClass: ForbiddenExceptionFilter,
        },
        {
            provide: 'APP_FILTER',
            useClass: QueryFailedExceptionFilter,
        },
    ],
})
export class V1Module {}
