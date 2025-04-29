import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
    Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Public } from '../auth/decorator/public.decorator';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { Role } from '../user/entities/user.entity';
import { GetCategoryDto } from './dto/get-category.dto';

@Controller({ path: 'category', version: '1' })
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Public()
    @Get()
    findAll(@Query() dto: GetCategoryDto) {
        return this.categoryService.findAll(dto);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.findOne(id);
    }

    @RBAC(Role.ADMIN)
    @Post()
    @UseGuards(AuthGuard)
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @RBAC(Role.ADMIN)
    @Patch(':id')
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoryService.updateCategory(id, updateCategoryDto);
    }

    @RBAC(Role.ADMIN)
    @Delete(':id')
    deleteCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.deleteCategory(id);
    }
}
