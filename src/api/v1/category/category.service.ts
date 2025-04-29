import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { GetCategoryDto } from './dto/get-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findAll(dto: GetCategoryDto) {
        const { page, take } = dto;

        if (take && page) {
            return [
                await this.categoryRepository.find({
                    skip: (page - 1) * take,
                    take: take,
                }),
                await this.categoryRepository.count(),
            ];
        }
    }

    async findOne(id: number) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException('존재하지 않는 카테고리 입니다.');
        }

        return category;
    }

    async createCategory(createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryRepository.findOne({
            where: { name: createCategoryDto.name },
        });

        if (category) {
            throw new NotFoundException('이미 존재하는 카테고리 입니다');
        }

        return this.categoryRepository.save(createCategoryDto);
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException('존재하지 않는 카테고리 입니다.');
        }
        await this.categoryRepository.update(id, updateCategoryDto);
        return this.categoryRepository.findOne({ where: { id } });
    }

    async deleteCategory(id: number) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException('존재하지 않는 카테고리 입니다.');
        }

        await this.categoryRepository.delete({ id });
        return id;
    }
}
