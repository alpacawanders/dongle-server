import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findAll() {
        const category = await this.categoryRepository.find();

        if (!category) {
            throw new NotFoundException('카테고리가 존재하지 않습니다.');
        }

        return category;
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
