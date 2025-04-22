import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './api/v1/v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { envKeys } from './api/v1/common/env';
import { BearerTokenMiddleware } from './api/v1/auth/middleware/bearer-token.middleware';
import { AuthModule } from './api/v1/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                ENV: Joi.string().valid('dev', 'prod').required(),
                DB_TYPE: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_DATABASE: Joi.string().required(),
                HASH_ROUNDS: Joi.number().required(),
                ACCESS_TOKEN_SECRET: Joi.string().required(),
                REFRESH_TOKEN_SECRET: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (env: ConfigService) => ({
                type: env.get<string>(envKeys.dbType) as 'mysql',
                host: env.get<string>(envKeys.dbHost),
                port: env.get<number>(envKeys.dbPort),
                username: env.get<string>(envKeys.dbUsername),
                password: env.get<string>(envKeys.dbPassword),
                database: env.get<string>(envKeys.dbDatabase),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        V1Module,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BearerTokenMiddleware)
            .exclude(
                {
                    path: 'v1/auth/login',
                    method: RequestMethod.POST,
                },
                {
                    path: 'v1/auth/register',
                    method: RequestMethod.POST,
                },
            )
            .forRoutes({ path: 'v1/*', method: RequestMethod.ALL });
    }
}
