import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './api/v1/v1.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

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
            }),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (env: ConfigService) => ({
                type: env.get<string>('DB_TYPE') as 'mysql',
                host: env.get<string>('DB_HOST'),
                port: env.get<number>('DB_PORT'),
                username: env.get<string>('DB_USERNAME'),
                password: env.get<string>('DB_PASSWORD'),
                database: env.get<string>('DB_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        V1Module,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
