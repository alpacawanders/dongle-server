import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
import { GetClubDto } from './dto/get-club.dto';

@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(Club)
        private readonly clubRepository: Repository<Club>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(dto: GetClubDto) {
        const { page, take } = dto;

        const club = await this.clubRepository
            .createQueryBuilder('club')
            .leftJoinAndSelect('club.category', 'category')
            .leftJoinAndSelect('club.owner', 'owner')
            .select([
                'club.id',
                'club.name',
                'category.name',
                'club.isRecruiting',
            ]);

        if (take && page) {
            const skip = (page - 1) * take;

            club.take(take);
            club.skip(skip);
        }

        return await club.getManyAndCount();
    }

    async findOne(id: number) {
        const club = await this.clubRepository
            .createQueryBuilder('club')
            .leftJoinAndSelect('club.category', 'category')
            .leftJoinAndSelect('club.owner', 'owner')
            .leftJoinAndSelect('club.reports', 'reports')
            .where('club.id = :id', { id })
            .select([
                'club.name',
                'club.detail',
                'club.thumbnail',
                'club.contact',
                'club.location',
                'club.isRecruiting',
                'club.recruit_start',
                'club.recruit_end',
                'club.youtube_url',
                'club.instagram_url',
                'category.name',
                'owner.id',
                'reports.id',
            ])
            .getOne();

        if (!club) {
            throw new NotFoundException('해당 동아리가 존재하지 않습니다');
        }

        return club;
    }

    async createClub(createClubDto: CreateClubDto): Promise<Club> {
        const { category_id, owner_id, ...rest } = createClubDto;

        const category = await this.categoryRepository.findOneBy({
            id: category_id,
        });

        if (!category) {
            throw new NotFoundException('존재하지 않는 카테고리 입니다.');
        }

        const owner = await this.userRepository.findOneBy({
            id: owner_id,
        });

        if (!owner) {
            throw new NotFoundException('존재하지 않는 사용자입니다');
        }

        const club = this.clubRepository.create({
            ...rest,
            category,
            owner,
        });

        return await this.clubRepository.save(club);
    }

    async updateClub(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
        const club = await this.clubRepository.findOneBy({ id });

        if (!club) {
            throw new NotFoundException('해당 클럽이 존재하지 않습니다.');
        }

        await this.clubRepository.update(id, updateClubDto);

        return await this.clubRepository.findOne({
            where: { id },
            relations: ['category', 'owner'],
        });
    }

    async deleteClub(id: number) {
        const club = await this.clubRepository.findOneBy({ id });

        if (!club) {
            throw new NotFoundException('해당 클럽이 존재하지 않습니다.');
        }
        await this.clubRepository.softDelete(id);
    }
}
