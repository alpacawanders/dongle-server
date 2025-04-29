import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Club, Category, User])],
    controllers: [ClubController],
    providers: [ClubService],
})
export class ClubModule {}
